"""Onglet Stock (D-029 §7.1) : modèle à télécharger, lecture d'un fichier XLSX ou CSV, rapport ligne par ligne."""
import csv
import io
import json
import pathlib
import unicodedata
import zipfile

from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

COLONNES = ["dci", "dosage", "forme", "niveau"]
TAILLE_MAX = 2 * 1024 * 1024
LIGNES_MAX = 2000

LIBELLES_FORMES = {
    "comprime": ("comprimé", "tablet"), "gelule": ("gélule", "capsule"), "sirop": ("sirop", "syrup"),
    "suspension": ("suspension", "suspension"), "injectable": ("injectable", "injectable"),
    "pommade": ("pommade", "ointment"), "suppositoire": ("suppositoire", "suppository"),
    "sachet": ("sachet", "sachet"), "autre": ("autre", "other"),
}
LIBELLES_NIVEAUX = {"disponible": ("disponible", "available"), "faible": ("faible", "low"), "rupture": ("rupture", "out of stock")}


def normaliser(texte) -> str:
    t = unicodedata.normalize("NFKD", str(texte or "")).encode("ascii", "ignore").decode("ascii")
    t = t.lower().replace("_", " ").replace("-", " ").replace("+", " ")
    return " ".join(t.split())


class Referentiel:
    def __init__(self, chemin: pathlib.Path):
        data = json.loads(pathlib.Path(chemin).read_text(encoding="utf-8"))
        self.version = data["version"]
        self.dci = {d["code"]: d for d in data["dci"]}
        self.exclus = {d["code"]: d for d in data["exclus_art75"]}
        self.formes = data["formes"]
        self.niveaux = data["niveaux"]
        self._index = {}
        for d in data["dci"]:
            for cle in (d["code"], d["fr"], d["en"]):
                self._index[normaliser(cle)] = ("dci", d["code"])
        for d in data["exclus_art75"]:
            for cle in (d["code"], d["fr"], d["en"]):
                self._index[normaliser(cle)] = ("exclu", d["code"])
        for nom, code in data["noms_commerciaux_fictifs"].items():
            self._index[normaliser(nom)] = ("commercial", code)
        self._formes = {}
        for code in self.formes:
            for cle in (code, *LIBELLES_FORMES.get(code, ())):
                self._formes[normaliser(cle)] = code
        self._niveaux = {}
        for code in self.niveaux:
            for cle in (code, *LIBELLES_NIVEAUX.get(code, ())):
                self._niveaux[normaliser(cle)] = code

    def reconnaitre(self, texte):
        return self._index.get(normaliser(texte))

    def forme(self, texte):
        return self._formes.get(normaliser(texte))

    def niveau(self, texte):
        return self._niveaux.get(normaliser(texte))

    def sensible(self, code: str) -> bool:
        return bool(self.dci.get(code, {}).get("sensible"))


# ---------------------------------------------------------------- modèles

def modele_xlsx(ref: Referentiel) -> bytes:
    wb = Workbook()
    ws = wb.active
    ws.title = "Stock"
    ws.append(COLONNES)
    for c in ws[1]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor="0A5EA8")
    ws.append(["Paracétamol", "500 mg", "comprimé", "disponible"])
    for col, largeur in zip("ABCD", (42, 14, 16, 14)):
        ws.column_dimensions[col].width = largeur
    listes = wb.create_sheet("Listes")
    dcis = sorted(d["fr"] for d in ref.dci.values())
    formes = [LIBELLES_FORMES[f][0] for f in ref.formes]
    niveaux = [LIBELLES_NIVEAUX[n][0] for n in ref.niveaux]
    for i, v in enumerate(dcis, 1):
        listes.cell(row=i, column=1, value=v)
    for i, v in enumerate(formes, 1):
        listes.cell(row=i, column=2, value=v)
    for i, v in enumerate(niveaux, 1):
        listes.cell(row=i, column=3, value=v)
    listes.sheet_state = "hidden"
    for formule, plage in ((f"=Listes!$A$1:$A${len(dcis)}", "A2:A2001"),
                           (f"=Listes!$B$1:$B${len(formes)}", "C2:C2001"),
                           (f"=Listes!$C$1:$C${len(niveaux)}", "D2:D2001")):
        dv = DataValidation(type="list", formula1=formule, allow_blank=True, showErrorMessage=True)
        ws.add_data_validation(dv)
        dv.add(plage)
    aide = wb.create_sheet("Mode d'emploi - How to")
    for ligne in [
        "Une ligne par médicament. Choisissez la DCI, la forme et le niveau dans les listes. Le dosage est facultatif.",
        "One row per medicine. Pick the INN, form and level from the lists. Strength is optional.",
        "Le fichier envoyé remplace tout le stock déclaré. Chaque ligne reste visible 48 h.",
        "The uploaded file replaces your whole declared stock. Each row stays visible for 48 h.",
        "Pas de nom commercial, pas de formule, 2 000 lignes au plus. / No brand names, no formulas, 2,000 rows at most.",
    ]:
        aide.append([ligne])
    aide.column_dimensions["A"].width = 120
    tampon = io.BytesIO()
    wb.save(tampon)
    return tampon.getvalue()


def modele_csv() -> bytes:
    return ("dci;dosage;forme;niveau\nParacétamol;500 mg;comprimé;disponible\n").encode("utf-8-sig")


# ---------------------------------------------------------------- lecture

class FormatRefuse(Exception):
    def __init__(self, code):
        super().__init__(code)
        self.code = code


def _lignes_xlsx(contenu: bytes):
    try:
        wb = load_workbook(io.BytesIO(contenu), read_only=True, data_only=False)
    except (zipfile.BadZipFile, KeyError, ValueError, OSError):
        raise FormatRefuse("E-STOCK-FICHIER-ILLISIBLE")
    ws = wb["Stock"] if "Stock" in wb.sheetnames else wb.worksheets[0]
    return [list(r) for r in ws.iter_rows(values_only=True)]


def _lignes_csv(contenu: bytes):
    try:
        texte = contenu.decode("utf-8-sig")
    except UnicodeDecodeError:
        raise FormatRefuse("E-STOCK-FICHIER-ILLISIBLE")
    if "\x00" in texte:
        raise FormatRefuse("E-STOCK-FICHIER-ILLISIBLE")
    separateur = ";" if texte.split("\n", 1)[0].count(";") >= texte.split("\n", 1)[0].count(",") else ","
    return [r for r in csv.reader(io.StringIO(texte), delimiter=separateur)]


def lire_fichier(nom: str, contenu: bytes):
    """Identifie le format par le contenu, pas par l'extension (D-029 §9)."""
    if len(contenu) > TAILLE_MAX:
        raise FormatRefuse("E-STOCK-TROP-GROS")
    if contenu.startswith(b"%PDF"):
        raise FormatRefuse("E-STOCK-FORMAT")
    if contenu[:3] in (b"\xff\xd8\xff",) or contenu.startswith(b"\x89PNG"):
        raise FormatRefuse("E-STOCK-FORMAT")
    if contenu.startswith(b"PK\x03\x04"):
        return _lignes_xlsx(contenu)
    if (nom or "").lower().endswith((".csv", ".txt")) or b"\n" in contenu[:4096]:
        return _lignes_csv(contenu)
    raise FormatRefuse("E-STOCK-FORMAT")


def analyser(lignes, ref: Referentiel):
    """Renvoie (lignes acceptées, lignes rejetées) ; chaque rejet porte un motif."""
    if not lignes:
        raise FormatRefuse("E-STOCK-VIDE")
    entete = [normaliser(c) for c in lignes[0]]
    if [c for c in entete[:4]] != COLONNES:
        raise FormatRefuse("E-STOCK-ENTETE")
    donnees = [l for l in lignes[1:] if any(c not in (None, "") for c in l)]
    if len(donnees) > LIGNES_MAX:
        raise FormatRefuse("E-STOCK-TROP-DE-LIGNES")
    acceptees, rejetees, vues = [], [], set()
    for numero, brute in enumerate(lignes[1:], start=2):
        if not any(c not in (None, "") for c in brute):
            continue
        cellules = (list(brute) + [None] * 4)[:4]
        dci_t, dosage, forme_t, niveau_t = cellules

        def rejet(motif, **extra):
            rejetees.append({"ligne": numero, "valeur": "" if dci_t is None else str(dci_t)[:80], "motif": motif, **extra})

        if any(isinstance(c, str) and c.strip().startswith("=") for c in cellules):
            rejet("FORMULE"); continue
        if dci_t in (None, ""):
            rejet("DCI_MANQUANTE"); continue
        trouve = ref.reconnaitre(dci_t)
        if trouve is None:
            rejet("DCI_INCONNUE"); continue
        nature, code = trouve
        if nature == "exclu":
            rejet("EXCLU_ART75"); continue
        if nature == "commercial":
            rejet("NOM_COMMERCIAL", suggestion=code); continue
        forme = ref.forme(forme_t)
        if forme is None:
            rejet("FORME_INVALIDE"); continue
        niveau = ref.niveau(niveau_t)
        if niveau is None:
            rejet("NIVEAU_INVALIDE"); continue
        dosage = "" if dosage is None else str(dosage).strip()[:30]
        cle = (code, normaliser(dosage), forme)
        if cle in vues:
            rejet("DOUBLON"); continue
        vues.add(cle)
        acceptees.append({"ligne": numero, "dci": code, "dosage": dosage, "forme": forme, "niveau": niveau,
                          "sensible": ref.sensible(code)})
    return acceptees, rejetees
