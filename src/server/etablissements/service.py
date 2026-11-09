"""Service du fil « officine » (D-029). Toute la logique métier ; l'API ne fait que la traduire en HTTP."""
import io
import json
import math
import pathlib
import secrets
import sqlite3
import threading
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from PIL import Image, UnidentifiedImageError

from . import fiches, securite, stock, tendances
from .zones import Zones
from .journal import Journal

FUSEAU = ZoneInfo("Africa/Douala")
RACINE = pathlib.Path(__file__).resolve().parents[3]
DONNEES = RACINE / "donnees"

DUREE_STOCK = timedelta(hours=48)       # FR-402, FR-ETS-10
ALERTE_STOCK = timedelta(hours=12)
DUREE_CODE = timedelta(minutes=15)
DUREE_SESSION = timedelta(hours=8)
ECHECS_MAX, DUREE_BLOCAGE = 5, timedelta(minutes=15)
PHOTOS_MAX, PHOTO_TAILLE_MAX = 5, 5 * 1024 * 1024
RAYONS_KM, RESULTATS_MIN = [5, 10, 20, 50], 3
DEPLACEMENT_REVERIFICATION_M = 500


class ErreurMetier(Exception):
    def __init__(self, code, statut=400, **details):
        super().__init__(code)
        self.code, self.statut, self.details = code, statut, details


SCHEMA = """
CREATE TABLE IF NOT EXISTS etablissements (
  id TEXT PRIMARY KEY, type TEXT NOT NULL, nom TEXT NOT NULL, email TEXT NOT NULL UNIQUE, niu TEXT NOT NULL UNIQUE,
  lat REAL NOT NULL, lon REAL NOT NULL, precision_m REAL, region TEXT NOT NULL, district TEXT NOT NULL,
  quartier TEXT NOT NULL, telephone TEXT NOT NULL, secteur TEXT NOT NULL, mdp TEXT NOT NULL,
  etat_compte TEXT NOT NULL, visibilite TEXT NOT NULL, motif_refus TEXT, fiche TEXT NOT NULL DEFAULT '{}',
  echecs INTEGER NOT NULL DEFAULT 0, bloque_jusqua TEXT, cree_le TEXT NOT NULL, maj_le TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS codes (email TEXT NOT NULL, empreinte TEXT NOT NULL, expire_le TEXT NOT NULL,
  usage TEXT NOT NULL, utilise INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS sessions (empreinte TEXT PRIMARY KEY, etablissement_id TEXT NOT NULL, expire_le TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS photos (id TEXT PRIMARY KEY, etablissement_id TEXT NOT NULL, role TEXT NOT NULL,
  fichier TEXT NOT NULL, ajoute_le TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS compteurs (zone TEXT NOT NULL, semaine TEXT NOT NULL, type TEXT NOT NULL,
  service TEXT NOT NULL, satisfaite INTEGER NOT NULL, n INTEGER NOT NULL,
  PRIMARY KEY (zone, semaine, type, service, satisfaite));
CREATE TABLE IF NOT EXISTS stock (etablissement_id TEXT NOT NULL, dci TEXT NOT NULL, dosage TEXT NOT NULL,
  forme TEXT NOT NULL, niveau TEXT NOT NULL, sensible INTEGER NOT NULL, declare_le TEXT NOT NULL,
  PRIMARY KEY (etablissement_id, dci, dosage, forme));
"""

SECTEURS = ["public", "prive_lucratif", "prive_confessionnel", "associatif"]
ROLES_PHOTO = ["facade", "interieur", "autre"]


def distance_m(lat1, lon1, lat2, lon2):
    r = 6371000.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = math.radians(lat2 - lat1), math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


class Service:
    def __init__(self, dossier: pathlib.Path, horloge=None, mode="demo_synthetique"):
        self.dossier = pathlib.Path(dossier)
        self.dossier.mkdir(parents=True, exist_ok=True)
        (self.dossier / "photos").mkdir(exist_ok=True)
        self.horloge = horloge or (lambda: datetime.now(FUSEAU))
        self.mode = mode
        self.journal = Journal(self.dossier / "journal.jsonl")
        self.ref = stock.Referentiel(DONNEES / "referentiel_dci_demo.json")
        self.agrement = json.loads((DONNEES / "agrement_simule.json").read_text(encoding="utf-8"))
        self.territoire = json.loads((DONNEES / "territoire_demo.json").read_text(encoding="utf-8"))
        self.zones = Zones(DONNEES / "zones")
        self._db = sqlite3.connect(self.dossier / "etablissements.sqlite", check_same_thread=False)
        self._db.row_factory = sqlite3.Row
        self._verrou = threading.RLock()
        with self._verrou:
            self._db.executescript(SCHEMA)

    # ------------------------------------------------------------ outils
    def maintenant(self) -> datetime:
        return self.horloge()

    def _iso(self, d=None) -> str:
        return (d or self.maintenant()).isoformat(timespec="seconds")

    def _log(self, acteur, action, **details):
        self.journal.ecrire(self._iso(), acteur, action, details)

    def _q(self, sql, params=(), un=False):
        with self._verrou:
            cur = self._db.execute(sql, params)
            self._db.commit()
            return cur.fetchone() if un else cur.fetchall()

    def _ets(self, ident):
        row = self._q("SELECT * FROM etablissements WHERE id=?", (ident,), un=True)
        if row is None:
            raise ErreurMetier("E-ETS-INTROUVABLE", 404)
        return row

    # ------------------------------------------------------------ inscription
    def inscrire(self, d: dict) -> dict:
        type_ets = d.get("type")
        if type_ets not in fiches.TYPES:
            raise ErreurMetier("E-ETS-TYPE")
        if type_ets not in fiches.TYPES_DISPONIBLES:
            raise ErreurMetier("E-ETS-TYPE-NON-DISPONIBLE")
        nom = str(d.get("nom") or "").strip()
        if not 3 <= len(nom) <= 120:
            raise ErreurMetier("E-ETS-NOM", champ="nom")
        email = str(d.get("email") or "").strip().lower()
        if "@" not in email or "." not in email.split("@")[-1] or len(email) > 120:
            raise ErreurMetier("E-ETS-EMAIL", champ="email")
        niu = securite.normaliser_niu(d.get("niu"))
        if not securite.niu_valide(niu):
            raise ErreurMetier("E-ETS-NIU-FORMAT", champ="niu")
        try:
            lat, lon = float(d.get("lat")), float(d.get("lon"))
        except (TypeError, ValueError):
            raise ErreurMetier("E-ETS-POSITION", champ="position")
        if not (1.0 <= lat <= 13.5 and 8.0 <= lon <= 16.5):  # boîte englobant le Cameroun
            raise ErreurMetier("E-ETS-POSITION-HORS-PAYS", champ="position")
        region = d.get("region")
        if region not in self.territoire["regions"]:
            raise ErreurMetier("E-ETS-REGION", champ="region")
        district = d.get("district")
        if district not in self.territoire["districts_demo"][region]:
            raise ErreurMetier("E-ETS-DISTRICT", champ="district")
        quartier = str(d.get("quartier") or "").strip()[:120]
        if len(quartier) < 2:
            raise ErreurMetier("E-ETS-QUARTIER", champ="quartier")
        telephone = str(d.get("telephone") or "").strip()
        if not fiches.telephone_valide(telephone):
            raise ErreurMetier("E-ETS-TELEPHONE", champ="telephone")
        if d.get("secteur") not in SECTEURS:
            raise ErreurMetier("E-ETS-SECTEUR", champ="secteur")
        erreur_mdp = securite.mot_de_passe_acceptable(d.get("mot_de_passe"), niu, nom)
        if erreur_mdp:
            raise ErreurMetier(erreur_mdp, champ="mot_de_passe")
        if d.get("conditions_acceptees") is not True:
            raise ErreurMetier("E-ETS-CONDITIONS", champ="conditions")
        if self._q("SELECT 1 FROM etablissements WHERE niu=?", (niu,), un=True):
            raise ErreurMetier("E-ETS-NIU-DEJA-UTILISE", 409, champ="niu")
        if self._q("SELECT 1 FROM etablissements WHERE email=?", (email,), un=True):
            raise ErreurMetier("E-ETS-EMAIL-DEJA-UTILISE", 409, champ="email")
        ident = "ETS-" + secrets.token_hex(4).upper()
        precision = d.get("precision_m")
        self._q("""INSERT INTO etablissements (id,type,nom,email,niu,lat,lon,precision_m,region,district,quartier,
                   telephone,secteur,mdp,etat_compte,visibilite,cree_le,maj_le)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (ident, type_ets, nom, email, niu, lat, lon, float(precision) if precision is not None else None,
                 region, district, quartier, telephone, d["secteur"], securite.hacher_mot_de_passe(d["mot_de_passe"]),
                 "EMAIL_NON_CONFIRME", "FICHE_INCOMPLETE", self._iso(), self._iso()))
        self._log(ident, "inscription", type=type_ets, region=region, district=district)
        code = self._emettre_code(email, "confirmation")
        return {"id": ident, **({"code_demo": code} if self.mode == "demo_synthetique" else {})}

    def _emettre_code(self, email, usage):
        code = securite.nouveau_code()
        self._q("UPDATE codes SET utilise=1 WHERE email=? AND usage=?", (email, usage))
        self._q("INSERT INTO codes (email,empreinte,expire_le,usage) VALUES (?,?,?,?)",
                (email, securite.empreinte(email + code), self._iso(self.maintenant() + DUREE_CODE), usage))
        # Envoi simulé : en démonstration, le code est renvoyé à l'interface (D-029b).
        return code

    def renvoyer_code(self, email):
        email = str(email or "").strip().lower()
        row = self._q("SELECT id, etat_compte FROM etablissements WHERE email=?", (email,), un=True)
        if row is None or row["etat_compte"] != "EMAIL_NON_CONFIRME":
            return {}  # même réponse dans tous les cas : on ne révèle pas si l'e-mail existe
        code = self._emettre_code(email, "confirmation")
        return {"code_demo": code} if self.mode == "demo_synthetique" else {}

    def confirmer_email(self, email, code):
        email = str(email or "").strip().lower()
        row = self._q("""SELECT rowid, * FROM codes WHERE email=? AND usage='confirmation' AND utilise=0
                         ORDER BY rowid DESC LIMIT 1""", (email,), un=True)
        if row is None or row["empreinte"] != securite.empreinte(email + str(code or "").strip()):
            raise ErreurMetier("E-ETS-CODE-INVALIDE")
        if datetime.fromisoformat(row["expire_le"]) < self.maintenant():
            raise ErreurMetier("E-ETS-CODE-EXPIRE")
        self._q("UPDATE codes SET utilise=1 WHERE rowid=?", (row["rowid"],))
        ets = self._q("SELECT id FROM etablissements WHERE email=?", (email,), un=True)
        self._q("UPDATE etablissements SET etat_compte='ACTIF', maj_le=? WHERE id=?", (self._iso(), ets["id"]))
        self._log(ets["id"], "email_confirme")
        return {"id": ets["id"]}

    # ------------------------------------------------------------ connexion
    def connecter(self, email, mot_de_passe):
        email = str(email or "").strip().lower()
        ets = self._q("SELECT * FROM etablissements WHERE email=?", (email,), un=True)
        if ets is None:
            securite.hacher_mot_de_passe("x" * 10)  # même coût de calcul qu'un vrai essai
            raise ErreurMetier("E-AUTH-IDENTIFIANTS", 401)
        if ets["bloque_jusqua"] and datetime.fromisoformat(ets["bloque_jusqua"]) > self.maintenant():
            raise ErreurMetier("E-AUTH-BLOQUE", 429, jusqua=ets["bloque_jusqua"])
        if not securite.verifier_mot_de_passe(str(mot_de_passe or ""), ets["mdp"]):
            echecs = ets["echecs"] + 1
            if echecs >= ECHECS_MAX:
                self._q("UPDATE etablissements SET echecs=0, bloque_jusqua=? WHERE id=?",
                        (self._iso(self.maintenant() + DUREE_BLOCAGE), ets["id"]))
                self._log(ets["id"], "compte_bloque", minutes=15)
            else:
                self._q("UPDATE etablissements SET echecs=? WHERE id=?", (echecs, ets["id"]))
                self._log(ets["id"], "connexion_echouee", echecs=echecs)
            raise ErreurMetier("E-AUTH-IDENTIFIANTS", 401)
        if ets["etat_compte"] == "EMAIL_NON_CONFIRME":
            raise ErreurMetier("E-AUTH-EMAIL-NON-CONFIRME", 403)
        if ets["etat_compte"] == "SUSPENDU":
            raise ErreurMetier("E-AUTH-SUSPENDU", 403)
        if ets["etat_compte"] == "DESACTIVE":
            self._q("UPDATE etablissements SET etat_compte='ACTIF' WHERE id=?", (ets["id"],))
            self._log(ets["id"], "compte_reactive")
        self._q("UPDATE etablissements SET echecs=0, bloque_jusqua=NULL WHERE id=?", (ets["id"],))
        jeton = securite.nouveau_jeton()
        self._q("INSERT INTO sessions (empreinte, etablissement_id, expire_le) VALUES (?,?,?)",
                (securite.empreinte(jeton), ets["id"], self._iso(self.maintenant() + DUREE_SESSION)))
        self._log(ets["id"], "connexion_reussie")
        return {"jeton": jeton, "id": ets["id"]}

    def authentifier(self, jeton):
        if not jeton:
            raise ErreurMetier("E-AUTH-REQUISE", 401)
        row = self._q("SELECT * FROM sessions WHERE empreinte=?", (securite.empreinte(jeton),), un=True)
        if row is None or datetime.fromisoformat(row["expire_le"]) < self.maintenant():
            raise ErreurMetier("E-AUTH-REQUISE", 401)
        ets = self._ets(row["etablissement_id"])
        if ets["etat_compte"] != "ACTIF":
            raise ErreurMetier("E-AUTH-REQUISE", 401)
        return ets["id"]

    def deconnecter(self, jeton):
        self._q("DELETE FROM sessions WHERE empreinte=?", (securite.empreinte(jeton or ""),))

    # ------------------------------------------------------------ profil et fiche
    def profil(self, ident):
        e = self._ets(ident)
        photos = self._q("SELECT id, role, ajoute_le FROM photos WHERE etablissement_id=? ORDER BY ajoute_le", (ident,))
        return {
            "id": e["id"], "type": e["type"], "nom": e["nom"], "email": e["email"], "niu": e["niu"],
            "lat": e["lat"], "lon": e["lon"], "precision_m": e["precision_m"], "region": e["region"],
            "district": e["district"], "quartier": e["quartier"], "telephone": e["telephone"], "secteur": e["secteur"],
            "etat_compte": e["etat_compte"], "visibilite": e["visibilite"], "motif_refus": e["motif_refus"],
            "fiche": json.loads(e["fiche"]), "photos": [dict(p) for p in photos],
            "alertes": self._alertes(ident),
        }

    def enregistrer_fiche(self, ident, reponses: dict):
        e = self._ets(ident)
        propres, _ = fiches.valider_fiche(e["type"], reponses or {})
        self._q("UPDATE etablissements SET fiche=?, maj_le=? WHERE id=?",
                (json.dumps(propres, ensure_ascii=False), self._iso(), ident))
        self._log(ident, "fiche_enregistree", champs=len(propres))
        return {"fiche": propres}

    def soumettre_fiche(self, ident, reponses: dict | None = None):
        e = self._ets(ident)
        if e["etat_compte"] != "ACTIF":
            raise ErreurMetier("E-ETS-COMPTE-INACTIF", 403)
        # Seul contrôle bloquant propre à D-029 : le format du NIU (FR-ETS-06).
        if not securite.niu_valide(e["niu"]):
            raise ErreurMetier("E-ETS-NIU-FORMAT", champ="niu")
        source = reponses if reponses is not None else json.loads(e["fiche"])
        propres, erreurs = fiches.valider_fiche(e["type"], source)
        if not self._q("SELECT 1 FROM photos WHERE etablissement_id=? AND role='facade'", (ident,), un=True):
            erreurs.append({"champ": "C9", "code": "E-FICHE-PHOTO-FACADE"})
        if erreurs:
            raise ErreurMetier("E-FICHE-INCOMPLETE", erreurs=erreurs)
        self._q("UPDATE etablissements SET fiche=?, maj_le=? WHERE id=?",
                (json.dumps(propres, ensure_ascii=False), self._iso(), ident))
        self._log(ident, "fiche_soumise")
        return self._verifier_agrement(ident)

    def _verifier_agrement(self, ident):
        e = self._ets(ident)
        if e["niu"] in self.agrement.get(e["type"], []):
            visibilite, mode = "VERIFIE", "liste_simulee"
        else:
            visibilite, mode = "EN_ATTENTE_VERIFICATION", "file_verificateur"
        self._q("UPDATE etablissements SET visibilite=?, motif_refus=NULL, maj_le=? WHERE id=?",
                (visibilite, self._iso(), ident))
        self._log(ident, "verification", resultat=visibilite, mode=mode)
        return {"visibilite": visibilite}

    def decision_verificateur(self, niu, valider: bool, motif: str = "", verificateur="verificateur-demo"):
        e = self._q("SELECT * FROM etablissements WHERE niu=?", (securite.normaliser_niu(niu),), un=True)
        if e is None:
            raise ErreurMetier("E-ETS-INTROUVABLE", 404)
        if e["visibilite"] != "EN_ATTENTE_VERIFICATION":
            raise ErreurMetier("E-ETS-PAS-EN-ATTENTE", 409)
        if not valider and len(motif.strip()) < 5:
            raise ErreurMetier("E-ETS-MOTIF-REQUIS")
        visibilite = "VERIFIE" if valider else "REFUSE"
        self._q("UPDATE etablissements SET visibilite=?, motif_refus=?, maj_le=? WHERE id=?",
                (visibilite, None if valider else motif.strip()[:300], self._iso(), e["id"]))
        self._log(e["id"], "verification", resultat=visibilite, mode="manuel", par=verificateur)
        return {"visibilite": visibilite}

    def modifier_informations(self, ident, champs: dict):
        """Champs sensibles (NIU, position de plus de 500 m) : nouvelle vérification (CA-ETS-12)."""
        e = self._ets(ident)
        reverifier, maj = None, {}  # None · "niu" (liste d'agrément) · "manuel" (déménagement)
        if "niu" in champs:
            niu = securite.normaliser_niu(champs["niu"])
            if not securite.niu_valide(niu):
                raise ErreurMetier("E-ETS-NIU-FORMAT", champ="niu")
            if niu != e["niu"]:
                if self._q("SELECT 1 FROM etablissements WHERE niu=? AND id<>?", (niu, ident), un=True):
                    raise ErreurMetier("E-ETS-NIU-DEJA-UTILISE", 409, champ="niu")
                maj["niu"], reverifier = niu, "niu"
        if "lat" in champs or "lon" in champs:
            lat, lon = float(champs.get("lat", e["lat"])), float(champs.get("lon", e["lon"]))
            if distance_m(e["lat"], e["lon"], lat, lon) > DEPLACEMENT_REVERIFICATION_M:
                # La liste d'agrément ne prouve que le NIU, pas l'adresse : un déménagement passe par le vérificateur.
                reverifier = "manuel"
            maj["lat"], maj["lon"] = lat, lon
        for cle in ("nom", "quartier", "telephone"):
            if cle in champs:
                valeur = str(champs[cle]).strip()
                if cle == "telephone" and not fiches.telephone_valide(valeur):
                    raise ErreurMetier("E-ETS-TELEPHONE", champ="telephone")
                maj[cle] = valeur[:120]
        if not maj:
            return {"visibilite": e["visibilite"]}
        ensembles = ", ".join(f"{k}=?" for k in maj)
        self._q(f"UPDATE etablissements SET {ensembles}, maj_le=? WHERE id=?", (*maj.values(), self._iso(), ident))
        self._log(ident, "informations_modifiees", champs=sorted(maj), reverification=reverifier)
        if reverifier and e["visibilite"] != "FICHE_INCOMPLETE":
            if reverifier == "manuel":
                self._q("UPDATE etablissements SET visibilite='EN_ATTENTE_VERIFICATION', motif_refus=NULL WHERE id=?", (ident,))
                self._log(ident, "verification", resultat="EN_ATTENTE_VERIFICATION", mode="file_verificateur")
                return {"visibilite": "EN_ATTENTE_VERIFICATION"}
            return self._verifier_agrement(ident)
        return {"visibilite": self._ets(ident)["visibilite"]}

    def desactiver(self, ident):
        self._q("UPDATE etablissements SET etat_compte='DESACTIVE', maj_le=? WHERE id=?", (self._iso(), ident))
        self._q("DELETE FROM sessions WHERE etablissement_id=?", (ident,))
        self._log(ident, "compte_desactive")
        return {"etat_compte": "DESACTIVE"}

    def historique(self, ident):
        return [{"horodatage": x["horodatage"], "action": x["action"], "details": x["details"]}
                for x in reversed(self.journal.lire(ident))]

    # ------------------------------------------------------------ photos
    def ajouter_photo(self, ident, contenu: bytes, role: str, aucune_personne: bool):
        if aucune_personne is not True:
            raise ErreurMetier("E-PHOTO-PERSONNES")
        if role not in ROLES_PHOTO:
            raise ErreurMetier("E-PHOTO-ROLE")
        if len(contenu) > PHOTO_TAILLE_MAX:
            raise ErreurMetier("E-PHOTO-TROP-GROSSE")
        n = self._q("SELECT COUNT(*) AS n FROM photos WHERE etablissement_id=?", (ident,), un=True)["n"]
        if n >= PHOTOS_MAX:
            raise ErreurMetier("E-PHOTO-TROP-NOMBREUSES")
        try:
            img = Image.open(io.BytesIO(contenu))
            if img.format not in ("JPEG", "PNG"):
                raise ErreurMetier("E-PHOTO-FORMAT")
            img.load()
        except (UnidentifiedImageError, OSError):
            raise ErreurMetier("E-PHOTO-FORMAT")
        # Réécriture des seuls pixels : position GPS, appareil et autres métadonnées disparaissent.
        propre = Image.new("RGB", img.size)
        propre.paste(img.convert("RGB"))
        pid = "PH-" + secrets.token_hex(6)
        fichier = self.dossier / "photos" / f"{pid}.jpg"
        propre.save(fichier, "JPEG", quality=85)
        self._q("INSERT INTO photos (id, etablissement_id, role, fichier, ajoute_le) VALUES (?,?,?,?,?)",
                (pid, ident, role, fichier.name, self._iso()))
        self._log(ident, "photo_ajoutee", role=role)
        return {"id": pid}

    def supprimer_photo(self, ident, pid):
        row = self._q("SELECT * FROM photos WHERE id=? AND etablissement_id=?", (pid, ident), un=True)
        if row is None:
            raise ErreurMetier("E-PHOTO-INTROUVABLE", 404)
        (self.dossier / "photos" / row["fichier"]).unlink(missing_ok=True)
        self._q("DELETE FROM photos WHERE id=?", (pid,))
        self._log(ident, "photo_supprimee")
        return {}

    def fichier_photo(self, pid):
        row = self._q("SELECT fichier FROM photos WHERE id=?", (pid,), un=True)
        if row is None:
            raise ErreurMetier("E-PHOTO-INTROUVABLE", 404)
        return self.dossier / "photos" / row["fichier"]

    # ------------------------------------------------------------ stock
    def importer_stock(self, ident, nom_fichier, contenu: bytes):
        e = self._ets(ident)
        if e["visibilite"] == "FICHE_INCOMPLETE":
            raise ErreurMetier("E-STOCK-FICHE-AVANT", 409)
        try:
            lignes = stock.lire_fichier(nom_fichier, contenu)
            acceptees, rejetees = stock.analyser(lignes, self.ref)
        except stock.FormatRefuse as err:
            self._log(ident, "stock_refuse", motif=err.code)
            raise ErreurMetier(err.code)
        maintenant = self._iso()
        with self._verrou:
            self._db.execute("DELETE FROM stock WHERE etablissement_id=?", (ident,))
            self._db.executemany(
                "INSERT INTO stock VALUES (?,?,?,?,?,?,?)",
                [(ident, l["dci"], l["dosage"], l["forme"], l["niveau"], int(l["sensible"]), maintenant) for l in acceptees])
            self._db.commit()
        motifs = {}
        for r in rejetees:
            motifs[r["motif"]] = motifs.get(r["motif"], 0) + 1
        self._log(ident, "stock_importe", acceptees=len(acceptees), rejetees=len(rejetees), motifs=motifs)
        return {"acceptees": len(acceptees), "rejetees": rejetees, "declare_le": maintenant}

    def confirmer_stock(self, ident):
        n = self._q("SELECT COUNT(*) AS n FROM stock WHERE etablissement_id=?", (ident,), un=True)["n"]
        if n == 0:
            raise ErreurMetier("E-STOCK-VIDE")
        self._q("UPDATE stock SET declare_le=? WHERE etablissement_id=?", (self._iso(), ident))
        self._log(ident, "stock_confirme", lignes=n)
        return {"lignes": n}

    def stock(self, ident):
        lignes = []
        for r in self._q("SELECT * FROM stock WHERE etablissement_id=? ORDER BY dci", (ident,)):
            expire = datetime.fromisoformat(r["declare_le"]) + DUREE_STOCK
            reste = (expire - self.maintenant()).total_seconds()
            lignes.append({"dci": r["dci"], "libelle_fr": self.ref.dci[r["dci"]]["fr"], "libelle_en": self.ref.dci[r["dci"]]["en"],
                           "dosage": r["dosage"], "forme": r["forme"], "niveau": r["niveau"], "declare_le": r["declare_le"],
                           "expire_le": self._iso(expire), "visible": reste > 0, "secondes_restantes": max(0, int(reste))})
        return {"lignes": lignes}

    def _alertes(self, ident):
        alertes = []
        lignes = self._q("SELECT MIN(declare_le) AS d, COUNT(*) AS n FROM stock WHERE etablissement_id=?", (ident,), un=True)
        if lignes["n"]:
            expire = datetime.fromisoformat(lignes["d"]) + DUREE_STOCK
            if expire <= self.maintenant():
                alertes.append({"code": "STOCK_EXPIRE"})
            elif expire - self.maintenant() <= ALERTE_STOCK:
                alertes.append({"code": "STOCK_EXPIRE_BIENTOT", "expire_le": self._iso(expire)})
        return alertes

    # ------------------------------------------------------------ côté citoyen
    def _visibles(self):
        return self._q("SELECT * FROM etablissements WHERE etat_compte='ACTIF' AND visibilite='VERIFIE'")

    def _ouvert(self, fiche: dict, quand: datetime) -> bool:
        if fiche.get("C1") is True:
            return True
        jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
        jour = jours[quand.weekday()]
        if jour not in fiche.get("C2", []):
            return False
        cle = "sem" if quand.weekday() < 5 else ("sam" if quand.weekday() == 5 else "dim")
        o, f = fiche.get(f"C3_{cle}_o"), fiche.get(f"C3_{cle}_f")
        if not o or not f or o == "ferme":
            return False
        h = quand.strftime("%H:%M")
        return o <= h < f if o < f else (h >= o or h < f)  # fermeture après minuit

    def rechercher_medicament(self, texte, lat, lon, langue="fr"):
        trouve = self.ref.reconnaitre(texte)
        if trouve is None:
            raise ErreurMetier("E-RECHERCHE-DCI-INCONNUE", 404)
        nature, code = trouve
        if nature == "exclu":
            raise ErreurMetier("E-RECHERCHE-EXCLU-ART75", 403)
        if self.ref.sensible(code):
            # Art. 48 : le serveur ne traite pas cette recherche ; le téléphone filtre la tuile (FR-408).
            raise ErreurMetier("RECHERCHE_SUR_APPAREIL", 409)
        lat, lon = round(float(lat), 2), round(float(lon), 2)  # Principe V
        quand = self.maintenant()
        limite = self._iso(quand - DUREE_STOCK)
        candidats = []
        for e in self._visibles():
            lignes = self._q("""SELECT * FROM stock WHERE etablissement_id=? AND dci=? AND niveau<>'rupture'
                                AND declare_le>? ORDER BY niveau""", (e["id"], code, limite))
            if not lignes:
                continue
            fiche = json.loads(e["fiche"])
            candidats.append({
                "id": e["id"], "nom": e["nom"], "quartier": e["quartier"], "telephone": e["telephone"],
                "distance_km": round(distance_m(lat, lon, e["lat"], e["lon"]) / 1000, 1),
                "ouvert_maintenant": self._ouvert(fiche, quand), "garde": fiche.get("O4", False),
                "presentations": [{"dosage": l["dosage"], "forme": l["forme"], "niveau": l["niveau"],
                                   "declare_le": l["declare_le"]} for l in lignes],
            })
        rayon, retenus = None, []
        for r in RAYONS_KM:
            retenus = [c for c in candidats if c["distance_km"] <= r]
            rayon = r
            if len(retenus) >= RESULTATS_MIN:
                break
        if not retenus and candidats:
            retenus, rayon = [min(candidats, key=lambda c: c["distance_km"])], None
        retenus.sort(key=lambda c: (not c["ouvert_maintenant"], c["distance_km"]))
        self._compter("medicament", code, lat, lon, satisfaite=rayon is not None and bool(retenus))
        return {"dci": code, "libelle": self.ref.dci[code][langue if langue in ("fr", "en") else "fr"],
                "rayon_km": rayon, "elargi": rayon is not None and rayon > RAYONS_KM[0],
                "mention": "ORDONNANCE", "resultats": retenus}

    def tuile(self, region):
        """Tuile régionale téléchargée en bloc : le serveur ne sait pas ce que le téléphone y cherche."""
        if region not in self.territoire["regions"]:
            raise ErreurMetier("E-ETS-REGION")
        limite = self._iso(self.maintenant() - DUREE_STOCK)
        sortie = []
        for e in self._visibles():
            if e["region"] != region:
                continue
            lignes = self._q("""SELECT dci, dosage, forme, niveau, declare_le FROM stock
                                WHERE etablissement_id=? AND niveau<>'rupture' AND declare_le>?""", (e["id"], limite))
            if lignes:
                sortie.append({"id": e["id"], "nom": e["nom"], "quartier": e["quartier"], "lat": e["lat"], "lon": e["lon"],
                               "telephone": e["telephone"], "stock": [dict(l) for l in lignes]})
        return {"region": region, "genere_le": self._iso(), "etablissements": sortie}

    def apercu_public(self, ident):
        e = self._ets(ident)
        fiche = json.loads(e["fiche"])
        fiche.pop("O3", None)  # numéro d'inscription à l'Ordre : vérificateur seulement (Q4)
        fiche.pop("O1", None)
        photos = [p["id"] for p in self._q("SELECT id FROM photos WHERE etablissement_id=?", (ident,))]
        return {"nom": e["nom"], "quartier": e["quartier"], "telephone": e["telephone"], "fiche": fiche,
                "photos": photos, "visible": e["etat_compte"] == "ACTIF" and e["visibilite"] == "VERIFIE",
                "ouvert_maintenant": self._ouvert(fiche, self.maintenant())}

    # ------------------------------------------------------------ D-032 : compteurs anonymes
    def _compter(self, type_, service, lat, lon, satisfaite: bool):
        """Ajoute 1 au compteur (zone, semaine, type, service, satisfaite). Rien d'autre n'est écrit (FR-TEND-01)."""
        zone, _ = self.zones.localiser(round(float(lat), 2), round(float(lon), 2))
        cle = (zone, tendances.semaine_iso(self.maintenant()), type_, service, int(bool(satisfaite)))
        self._q("""INSERT INTO compteurs VALUES (?,?,?,?,?,1)
                   ON CONFLICT(zone, semaine, type, service, satisfaite) DO UPDATE SET n = n + 1""", cle)

    def compter_recherche(self, type_, service, lat, lon, satisfaite: bool = True):
        """Point d'entrée pour les recherches de spécialité et de sang (FR-TEND-01, FR-TEND-02)."""
        if type_ == "specialite":
            if service in tendances.SPECIALITES_SENSIBLES:
                return {"compte": False}
            if service not in tendances.SPECIALITES:
                raise ErreurMetier("E-TEND-SERVICE")
        elif type_ == "sang":
            if service not in tendances.GROUPES_SANGUINS:
                raise ErreurMetier("E-TEND-SERVICE")
        else:
            raise ErreurMetier("E-TEND-TYPE")
        self._compter(type_, service, lat, lon, satisfaite)
        return {"compte": True}

    def zone_par_defaut(self, ident):
        e = self._ets(ident)
        zone, _ = self.zones.localiser(e["lat"], e["lon"])
        code = self.zones.code_ins(zone)
        return ("arrondissement", code) if code else ("national", "")

    def tendances(self, ident, niveau=None, zone=None, type_=None, service=None, semaines=4):
        e = self._ets(ident)
        if e["etat_compte"] != "ACTIF" or e["visibilite"] != "VERIFIE":
            raise ErreurMetier("E-TEND-NON-VERIFIE", 403)  # FR-TEND-10
        if not niveau:
            niveau, zone = self.zone_par_defaut(ident)
        zone = zone or ""
        if niveau not in tendances.NIVEAUX or not self.zones.zone_valide(niveau, zone):
            raise ErreurMetier("E-TEND-ZONE")
        if type_ not in (None, "", *tendances.TYPES):
            raise ErreurMetier("E-TEND-TYPE")
        try:
            semaines = int(semaines)
        except (TypeError, ValueError):
            semaines = 0
        if semaines not in (4, 8, 12):
            raise ErreurMetier("E-TEND-PERIODE")
        cour = tendances.semaines_completes(self.maintenant(), semaines)
        prec = tendances.semaines_completes(self.maintenant(), semaines, decalage=semaines)
        lignes = [tuple(r) for r in self._q(
            f"SELECT zone, semaine, type, service, satisfaite, n FROM compteurs WHERE semaine IN ({','.join('?' * (len(cour) + len(prec)))})",
            (*cour, *prec))]
        res = tendances.calculer(lignes, niveau, zone, cour, prec, type_ or None, service or None)
        if niveau == "arrondissement":
            # La carte montre tout le département : les voisins sont colorés avec les mêmes règles (seuil, classes).
            res["carte"] = tendances.calculer(lignes, "departement", zone[:4], cour, prec, type_ or None, service or None)["carte"]
        ets_zone, _ = self.zones.localiser(e["lat"], e["lon"])
        return {"niveau": niveau, "zone": zone, "type": type_ or None, "service": service or None,
                "zone_etablissement": self.zones.code_ins(ets_zone), **res}

    # ------------------------------------------------------------ D-032 : mes indicateurs
    def indicateurs(self, ident):
        e = self._ets(ident)
        maintenant = self.maintenant()
        lignes = self._q("SELECT niveau, declare_le FROM stock WHERE etablissement_id=?", (ident,))
        visibles = [l for l in lignes if datetime.fromisoformat(l["declare_le"]) + DUREE_STOCK > maintenant]
        par_niveau = {n: sum(1 for l in visibles if l["niveau"] == n) for n in ("disponible", "faible", "rupture")}
        expire = min((datetime.fromisoformat(l["declare_le"]) + DUREE_STOCK for l in visibles), default=None)
        journal = self.journal.lire(ident)
        dernier = next((x["details"] for x in reversed(journal) if x["action"] == "stock_importe"), None)
        # Complétude : réponses données ÷ questions visibles compte tenu des réponses.
        fiche = json.loads(e["fiche"])
        visibles_q, repondues = 0, 0
        propres = {}
        for q in fiches.DEFINITIONS.get(e["type"], []):
            if not fiches.condition_vraie(q.get("si"), propres):
                continue
            visibles_q += 1
            if q["id"] in fiche and fiche[q["id"]] not in ("", [], None):
                repondues += 1
                propres[q["id"]] = fiche[q["id"]]
        facade = bool(self._q("SELECT 1 FROM photos WHERE etablissement_id=? AND role='facade'", (ident,), un=True))
        # Régularité sur 30 jours : part des jours (à midi) couverts par un stock valide, depuis la vérification.
        verifie_le = next((datetime.fromisoformat(x["horodatage"]) for x in journal
                           if x["action"] == "verification" and x["details"].get("resultat") == "VERIFIE"), None)
        fenetres = [datetime.fromisoformat(x["horodatage"]) for x in journal if x["action"] in ("stock_importe", "stock_confirme")]
        regularite = None
        if verifie_le:
            # Un instant par jour, à l'heure actuelle, en remontant 30 jours sans dépasser la vérification.
            instants = [maintenant - timedelta(days=k) for k in range(30) if maintenant - timedelta(days=k) >= verifie_le]
            couverts = sum(any(f <= t < f + DUREE_STOCK for f in fenetres) for t in instants)
            regularite = round(100 * couverts / len(instants))
        return {
            "visible": e["etat_compte"] == "ACTIF" and e["visibilite"] == "VERIFIE" and bool(visibles),
            "visibilite": e["visibilite"],
            "stock": {"lignes": len(visibles), "par_niveau": par_niveau,
                      "taux_rupture": round(100 * par_niveau["rupture"] / len(visibles)) if visibles else None,
                      "expire_le": self._iso(expire) if expire else None,
                      "secondes_restantes": max(0, int((expire - maintenant).total_seconds())) if expire else 0},
            "dernier_import": dernier,
            "fiche": {"questions": visibles_q, "repondues": repondues, "photo_facade": facade},
            "regularite_30j": regularite,
        }
