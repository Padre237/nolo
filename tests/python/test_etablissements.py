"""Tests du fil « officine » de D-029 (CA-ETS applicables à cette livraison)."""
import io
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import pytest
from openpyxl import load_workbook
from PIL import Image

RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RACINE / "src" / "server"))

from etablissements import fiches, securite, stock  # noqa: E402
from etablissements.service import ErreurMetier, Service  # noqa: E402

DOUALA = ZoneInfo("Africa/Douala")


class Horloge:
    def __init__(self):
        self.t = datetime(2026, 11, 9, 10, 0, tzinfo=DOUALA)  # lundi, 10 h

    def __call__(self):
        return self.t

    def avancer(self, **kw):
        self.t += timedelta(**kw)


@pytest.fixture
def h():
    return Horloge()


@pytest.fixture
def svc(tmp_path, h):
    return Service(tmp_path, horloge=h)


INSCRIPTION = {
    "type": "officine", "nom": "Pharmacie du Marché (démo)", "email": "contact@pharmacie-demo.cm",
    "niu": "M041618186649L", "lat": 4.0511, "lon": 9.7679, "precision_m": 12, "region": "littoral",
    "district": "DS-DEMO-LIT-1", "quartier": "Face au marché central", "telephone": "+237 699 00 00 01",
    "secteur": "prive_lucratif", "mot_de_passe": "Boussole-2026!", "conditions_acceptees": True,
}

FICHE_OK = {
    "C1": False, "C2": ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    "C3_sem_o": "08:00", "C3_sem_f": "20:00", "C3_sam_o": "08:00", "C3_sam_f": "14:00",
    "C3_dim_o": "ferme", "C3_dim_f": "ferme", "C4": "partiel", "C5": ["fr", "en"],
    "C6": ["especes", "mobile_money"], "O1": "AUT-DEMO-2021-044", "O2": True, "O3": "ORD-DEMO-1188",
    "O4": True, "O5": ["nuits"], "O6": False, "C8": "+237699000002",
}


def image(exif_gps=False, fmt="JPEG"):
    img = Image.new("RGB", (40, 30), (200, 120, 40))
    tampon = io.BytesIO()
    if exif_gps:
        exif = Image.Exif()
        exif[0x8825] = {1: "N", 2: (4.0, 3.0, 4.0), 3: "E", 4: (9.0, 46.0, 4.0)}
        exif[0x010F] = "Fabricant-test"
        img.save(tampon, fmt, exif=exif)
    else:
        img.save(tampon, fmt)
    return tampon.getvalue()


def inscrire_et_connecter(svc, **modifs):
    donnees = {**INSCRIPTION, **modifs}
    r = svc.inscrire(donnees)
    svc.confirmer_email(donnees["email"], r["code_demo"])
    return svc.connecter(donnees["email"], donnees["mot_de_passe"])["id"]


def officine_verifiee(svc, **modifs):
    ident = inscrire_et_connecter(svc, **modifs)
    svc.ajouter_photo(ident, image(), "facade", True)
    svc.soumettre_fiche(ident, FICHE_OK)
    return ident


def xlsx(lignes):
    from openpyxl import Workbook
    wb = Workbook()
    ws = wb.active
    ws.title = "Stock"
    for l in lignes:
        ws.append(l)
    t = io.BytesIO()
    wb.save(t)
    return t.getvalue()


# ------------------------------------------------------------------ CA-ETS-01
@pytest.mark.parametrize("niu,ok", [
    ("M041618186649L", True), ("m041618186649l", True), ("M 0416 1818 6649 L", True), ("P041618186649Q", True),
    ("M04161818664L", False), ("041618186649L", False), ("M041618186649", False), ("M0416181866A9L", False),
    ("MM41618186649L", False), ("", False),
])
def test_ca_ets_01_format_niu(niu, ok):
    assert securite.niu_valide(niu) is ok


def test_ca_ets_01_inscription_refuse_niu_mal_forme(svc):
    with pytest.raises(ErreurMetier) as e:
        svc.inscrire({**INSCRIPTION, "niu": "M04161818664L"})
    assert e.value.code == "E-ETS-NIU-FORMAT"


# ------------------------------------------------------------------ CA-ETS-02
def test_ca_ets_02_niu_et_email_uniques(svc):
    svc.inscrire(INSCRIPTION)
    with pytest.raises(ErreurMetier) as e:
        svc.inscrire({**INSCRIPTION, "email": "autre@demo.cm"})
    assert e.value.code == "E-ETS-NIU-DEJA-UTILISE"
    with pytest.raises(ErreurMetier) as e:
        svc.inscrire({**INSCRIPTION, "niu": "M011122233344P"})
    assert e.value.code == "E-ETS-EMAIL-DEJA-UTILISE"


# ------------------------------------------------------------------ CA-ETS-03
def test_ca_ets_03_sans_code_pas_de_connexion_ni_fiche(svc, h):
    r = svc.inscrire(INSCRIPTION)
    with pytest.raises(ErreurMetier) as e:
        svc.connecter(INSCRIPTION["email"], INSCRIPTION["mot_de_passe"])
    assert e.value.code == "E-AUTH-EMAIL-NON-CONFIRME"
    with pytest.raises(ErreurMetier) as e:
        svc.soumettre_fiche(r["id"], FICHE_OK)
    assert e.value.code == "E-ETS-COMPTE-INACTIF"
    with pytest.raises(ErreurMetier) as e:
        svc.confirmer_email(INSCRIPTION["email"], "000000" if r["code_demo"] != "000000" else "111111")
    assert e.value.code == "E-ETS-CODE-INVALIDE"
    h.avancer(minutes=16)
    with pytest.raises(ErreurMetier) as e:
        svc.confirmer_email(INSCRIPTION["email"], r["code_demo"])
    assert e.value.code == "E-ETS-CODE-EXPIRE"
    nouveau = svc.renvoyer_code(INSCRIPTION["email"])["code_demo"]
    svc.confirmer_email(INSCRIPTION["email"], nouveau)
    assert svc.profil(r["id"])["etat_compte"] == "ACTIF"


def test_code_a_usage_unique(svc):
    r = svc.inscrire(INSCRIPTION)
    svc.confirmer_email(INSCRIPTION["email"], r["code_demo"])
    with pytest.raises(ErreurMetier):
        svc.confirmer_email(INSCRIPTION["email"], r["code_demo"])


def test_mot_de_passe_jamais_en_clair(svc, tmp_path):
    svc.inscrire(INSCRIPTION)
    brut = (tmp_path / "etablissements.sqlite").read_bytes()
    assert INSCRIPTION["mot_de_passe"].encode() not in brut
    for interdit in (INSCRIPTION["mot_de_passe"], INSCRIPTION["email"]):
        assert interdit not in (tmp_path / "journal.jsonl").read_text(encoding="utf-8")


@pytest.mark.parametrize("mdp,code", [("court", "E-ETS-MDP-COURT"), ("abcM041618186649Lxyz", "E-ETS-MDP-CONTIENT-NIU")])
def test_mot_de_passe_refuse(svc, mdp, code):
    with pytest.raises(ErreurMetier) as e:
        svc.inscrire({**INSCRIPTION, "mot_de_passe": mdp})
    assert e.value.code == code


# ------------------------------------------------------------------ fiche (FR-ETS-05, FR-ETS-06)
def test_fiche_questions_masquees_non_enregistrees():
    reponses = {**FICHE_OK, "C1": True, "O7": True}
    propres, erreurs = fiches.valider_fiche("officine", reponses)
    assert erreurs == []
    for masque in ("C2", "C3_sem_o", "O6", "O7"):
        assert masque not in propres
    assert propres["C8"] == "+237699000002"  # 24 h sur 24 : numéro de nuit demandé


def test_fiche_champs_conditionnels_obligatoires():
    reponses = {k: v for k, v in FICHE_OK.items() if k not in ("O5", "C8")}
    _, erreurs = fiches.valider_fiche("officine", reponses)
    assert {e["champ"] for e in erreurs} == {"O5", "C8"}
    _, erreurs = fiches.valider_fiche("officine", {**FICHE_OK, "C6": ["assurance"]})
    assert {e["champ"] for e in erreurs} == {"C7"}
    _, erreurs = fiches.valider_fiche("officine", {**FICHE_OK, "C3_dim_o": "08:00"})
    assert {e["code"] for e in erreurs} == {"E-FICHE-HORAIRES"}


def test_fiche_exige_photo_de_facade(svc):
    ident = inscrire_et_connecter(svc)
    with pytest.raises(ErreurMetier) as e:
        svc.soumettre_fiche(ident, FICHE_OK)
    assert {"champ": "C9", "code": "E-FICHE-PHOTO-FACADE"} in e.value.details["erreurs"]


def test_type_non_disponible_dans_cette_livraison(svc):
    with pytest.raises(ErreurMetier) as e:
        svc.inscrire({**INSCRIPTION, "type": "hopital"})
    assert e.value.code == "E-ETS-TYPE-NON-DISPONIBLE"


# ------------------------------------------------------------------ CA-ETS-05 et 06
def test_ca_ets_05_niu_absent_de_la_liste_reste_invisible(svc, h):
    ident = officine_verifiee(svc, niu="M555555555555Z", email="b@demo.cm", nom="Pharmacie Bis (démo)")
    p = svc.profil(ident)
    assert p["visibilite"] == "EN_ATTENTE_VERIFICATION" and p["etat_compte"] == "ACTIF"
    svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Amoxicilline", "500 mg", "gélule", "disponible"]]))
    assert svc.rechercher_medicament("amoxicilline", 4.05, 9.77)["resultats"] == []


def test_ca_ets_06_decision_du_verificateur(svc):
    ident = officine_verifiee(svc, niu="M555555555555Z", email="b@demo.cm")
    svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Amoxicilline", "500 mg", "gélule", "disponible"]]))
    with pytest.raises(ErreurMetier):
        svc.decision_verificateur("M555555555555Z", False, "")
    svc.decision_verificateur("M555555555555Z", True)
    assert [r["id"] for r in svc.rechercher_medicament("amoxicilline", 4.05, 9.77)["resultats"]] == [ident]
    autre = officine_verifiee(svc, niu="M666666666666Z", email="c@demo.cm")
    svc.decision_verificateur("M666666666666Z", False, "Autorisation d'ouverture introuvable")
    assert svc.profil(autre)["visibilite"] == "REFUSE"
    assert svc.profil(autre)["motif_refus"] == "Autorisation d'ouverture introuvable"


def test_niu_de_la_liste_simulee_verifie_automatiquement(svc):
    ident = officine_verifiee(svc)
    assert svc.profil(ident)["visibilite"] == "VERIFIE"


# ------------------------------------------------------------------ CA-ETS-07 et 08 : import
def test_ca_ets_07_rapport_ligne_par_ligne(svc):
    ident = officine_verifiee(svc)
    contenu = xlsx([
        stock.COLONNES,
        ["Paracétamol", "500 mg", "comprimé", "disponible"],
        ["Zorglubine", "", "comprimé", "disponible"],
        ["Paraxon demo", "", "comprimé", "disponible"],
        ["Mifépristone", "200 mg", "comprimé", "disponible"],
        ["Ibuprofène", "400 mg", "comprimé", "beaucoup"],
        ["Amoxicilline", "250 mg/5 ml", "sirop", "faible"],
    ])
    r = svc.importer_stock(ident, "stock.xlsx", contenu)
    assert r["acceptees"] == 2
    motifs = {x["ligne"]: x["motif"] for x in r["rejetees"]}
    assert motifs == {3: "DCI_INCONNUE", 4: "NOM_COMMERCIAL", 5: "EXCLU_ART75", 6: "NIVEAU_INVALIDE"}
    assert [x for x in r["rejetees"] if x["motif"] == "NOM_COMMERCIAL"][0]["suggestion"] == "paracetamol"
    assert {l["dci"] for l in svc.stock(ident)["lignes"]} == {"paracetamol", "amoxicilline"}


def test_import_csv_point_virgule_et_formules(svc):
    ident = officine_verifiee(svc)
    csv = "dci;dosage;forme;niveau\nParacetamol;1 g;comprime;disponible\n=CMD();;comprimé;disponible\n".encode()
    r = svc.importer_stock(ident, "stock.csv", csv)
    assert r["acceptees"] == 1 and r["rejetees"][0]["motif"] == "FORMULE"


@pytest.mark.parametrize("nom,contenu,code", [
    ("stock.pdf", b"%PDF-1.7 ...", "E-STOCK-FORMAT"),
    ("stock.xlsx", b"%PDF-1.7 deguise", "E-STOCK-FORMAT"),
    ("photo.jpg", b"\xff\xd8\xff\xe0 rien", "E-STOCK-FORMAT"),
    ("faux.xlsx", b"PK\x03\x04 pas un classeur", "E-STOCK-FICHIER-ILLISIBLE"),
    ("vide.csv", "nom;quantite\nx;1\n".encode(), "E-STOCK-ENTETE"),
])
def test_ca_ets_08_formats_refuses(svc, nom, contenu, code):
    ident = officine_verifiee(svc)
    with pytest.raises(ErreurMetier) as e:
        svc.importer_stock(ident, nom, contenu)
    assert e.value.code == code


def test_import_avant_fiche_refuse(svc):
    ident = inscrire_et_connecter(svc)
    with pytest.raises(ErreurMetier) as e:
        svc.importer_stock(ident, "s.csv", stock.modele_csv())
    assert e.value.code == "E-STOCK-FICHE-AVANT"


def test_modele_xlsx_relu_par_l_import(svc):
    ident = officine_verifiee(svc)
    modele = stock.modele_xlsx(svc.ref)
    wb = load_workbook(io.BytesIO(modele))
    assert wb.sheetnames[0] == "Stock" and wb["Listes"].sheet_state == "hidden"
    assert len(wb["Stock"].data_validations.dataValidation) == 3
    r = svc.importer_stock(ident, "modele.xlsx", modele)
    assert r["acceptees"] == 1 and r["rejetees"] == []


# ------------------------------------------------------------------ CA-ETS-09 : 48 h
def test_ca_ets_09_expiration_et_confirmation(svc, h):
    ident = officine_verifiee(svc)
    svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Paracétamol", "500 mg", "comprimé", "disponible"]]))
    assert len(svc.rechercher_medicament("paracétamol", 4.05, 9.77)["resultats"]) == 1
    h.avancer(hours=36, minutes=1)
    assert svc.profil(ident)["alertes"][0]["code"] == "STOCK_EXPIRE_BIENTOT"
    h.avancer(hours=12)
    assert svc.rechercher_medicament("paracétamol", 4.05, 9.77)["resultats"] == []
    assert svc.profil(ident)["alertes"][0]["code"] == "STOCK_EXPIRE"
    svc.confirmer_stock(ident)
    assert len(svc.rechercher_medicament("paracétamol", 4.05, 9.77)["resultats"]) == 1


# ------------------------------------------------------------------ CA-ETS-10 : photos
def test_ca_ets_10_metadonnees_supprimees(svc):
    ident = inscrire_et_connecter(svc)
    brut = image(exif_gps=True)
    assert Image.open(io.BytesIO(brut)).getexif().get(0x8825)
    pid = svc.ajouter_photo(ident, brut, "facade", True)["id"]
    stockee = Image.open(svc.fichier_photo(pid))
    assert not stockee.getexif() and "exif" not in stockee.info


def test_photo_exige_la_case_et_un_vrai_format(svc):
    ident = inscrire_et_connecter(svc)
    with pytest.raises(ErreurMetier) as e:
        svc.ajouter_photo(ident, image(), "facade", False)
    assert e.value.code == "E-PHOTO-PERSONNES"
    with pytest.raises(ErreurMetier) as e:
        svc.ajouter_photo(ident, b"%PDF-1.7", "facade", True)
    assert e.value.code == "E-PHOTO-FORMAT"


# ------------------------------------------------------------------ CA-ETS-11 : blocage
def test_ca_ets_11_blocage_apres_5_echecs(svc, h):
    inscrire_et_connecter(svc)
    for _ in range(5):
        with pytest.raises(ErreurMetier) as e:
            svc.connecter(INSCRIPTION["email"], "mauvais-mot-de-passe")
        assert e.value.code == "E-AUTH-IDENTIFIANTS"
    with pytest.raises(ErreurMetier) as e:
        svc.connecter(INSCRIPTION["email"], INSCRIPTION["mot_de_passe"])
    assert e.value.code == "E-AUTH-BLOQUE"
    h.avancer(minutes=15, seconds=1)
    assert svc.connecter(INSCRIPTION["email"], INSCRIPTION["mot_de_passe"])["jeton"]


# ------------------------------------------------------------------ CA-ETS-12 : nouvelle vérification
def test_ca_ets_12_changement_sensible(svc):
    ident = officine_verifiee(svc)
    assert svc.modifier_informations(ident, {"telephone": "+237699000009"})["visibilite"] == "VERIFIE"
    assert svc.modifier_informations(ident, {"lat": 4.0514, "lon": 9.7681})["visibilite"] == "VERIFIE"  # < 500 m
    assert svc.modifier_informations(ident, {"lat": 4.0700, "lon": 9.7681})["visibilite"] == "EN_ATTENTE_VERIFICATION"
    autre = officine_verifiee(svc, niu="M011122233344P", email="d@demo.cm")
    assert svc.modifier_informations(autre, {"niu": "M777777777777Z"})["visibilite"] == "EN_ATTENTE_VERIFICATION"


# ------------------------------------------------------------------ recherche citoyenne
def test_recherche_sensible_jamais_traitee_par_le_serveur(svc):
    ident = officine_verifiee(svc)
    svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Lévonorgestrel", "1,5 mg", "comprimé", "disponible"]]))
    with pytest.raises(ErreurMetier) as e:
        svc.rechercher_medicament("levonorgestrel", 4.05, 9.77)
    assert e.value.code == "RECHERCHE_SUR_APPAREIL"
    tuile = svc.tuile("littoral")
    assert tuile["etablissements"][0]["stock"][0]["dci"] == "levonorgestrel"
    assert "levonorgestrel" not in (svc.dossier / "journal.jsonl").read_text(encoding="utf-8")


def test_recherche_tri_ouvert_puis_distance_et_rupture_exclue(svc, h):
    pres = officine_verifiee(svc)  # ouvert lundi 10 h
    loin = officine_verifiee(svc, niu="M011122233344P", email="e@demo.cm", lat=4.10, lon=9.80)
    for ident, niveau in ((pres, "rupture"), (loin, "faible")):
        svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Artésunate", "", "injectable", niveau]]))
    r = svc.rechercher_medicament("artesunate", 4.05, 9.77)
    assert [x["id"] for x in r["resultats"]] == [loin]
    assert r["mention"] == "ORDONNANCE"
    svc.importer_stock(pres, "s.xlsx", xlsx([stock.COLONNES, ["Artésunate", "", "injectable", "disponible"]]))
    h.t = datetime(2026, 11, 15, 10, 0, tzinfo=DOUALA)  # dimanche : la première est fermée
    svc.confirmer_stock(pres); svc.confirmer_stock(loin)
    r = svc.rechercher_medicament("artesunate", 4.05, 9.77)
    assert [x["ouvert_maintenant"] for x in r["resultats"]] == [False, False]
    assert [x["id"] for x in r["resultats"]] == [pres, loin]  # à égalité d'ouverture : la plus proche


def test_compte_desactive_invisible_puis_reactive(svc):
    ident = officine_verifiee(svc)
    svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Paracétamol", "", "comprimé", "disponible"]]))
    svc.desactiver(ident)
    assert svc.rechercher_medicament("paracetamol", 4.05, 9.77)["resultats"] == []
    svc.connecter(INSCRIPTION["email"], INSCRIPTION["mot_de_passe"])
    assert len(svc.rechercher_medicament("paracetamol", 4.05, 9.77)["resultats"]) == 1


def test_apercu_public_cache_les_references_du_verificateur(svc):
    ident = officine_verifiee(svc)
    apercu = svc.apercu_public(ident)
    assert "O3" not in apercu["fiche"] and "O1" not in apercu["fiche"] and apercu["visible"]


def test_journal_chaine_et_historique(svc):
    ident = officine_verifiee(svc)
    assert svc.journal.verifier_chaine()
    actions = [x["action"] for x in svc.historique(ident)]
    assert actions[-1] == "inscription" and "fiche_soumise" in actions and "verification" in actions
    lignes = (svc.dossier / "journal.jsonl").read_text(encoding="utf-8").splitlines()
    altere = json.loads(lignes[1]); altere["details"]["falsifie"] = True
    lignes[1] = json.dumps(altere)
    (svc.dossier / "journal.jsonl").write_text("\n".join(lignes) + "\n", encoding="utf-8")
    assert not svc.journal.verifier_chaine()


def test_journal_refuse_les_champs_interdits(svc):
    for champ in ("email", "mot_de_passe", "code", "jeton", "numero_ordre", "langue"):
        with pytest.raises(ValueError):
            svc.journal.ecrire("2026-11-09T10:00:00+01:00", "ETS-TEST", "essai", {champ: "x"})
