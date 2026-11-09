#!/usr/bin/env python3
"""Contrôle avant publication du dépôt (SF-017-02, TASK-017-02-02 ; FR-2308, CA-017-02-03).

Rien d'interdit dans ce qui serait publié :
- aucun PDF (extension .pdf ou contenu commençant par « %PDF- ») ;
- aucun secret (clé privée, jeton GitHub, clé AWS, jeton Slack, clé « sk- ») ;
- rien du texte « tous droits réservés » INT-OMS-AFRO-SBC-2014 : ni fragment (enregistrement
  « doc_id » hors de sa fiche), ni référence à un fragment (« <doc_id>::NNNN »), ni page, ni texte.
  Seules restent sa fiche de kb/sources.json (une seule) et des mentions documentaires de son identifiant.

Fichiers contrôlés : dans un dépôt git, ceux que `git add -A` publierait (suivis, et non suivis non
ignorés) ; sinon, toute l'arborescence hors .git, environnements virtuels et caches.
Le contrôle ne compare pas le texte au guide original (absent du dépôt) : il cherche ses supports.

Usage : python3 tools/controle_publication.py [--racine DOSSIER]   (code de sortie 0 si conforme, 1 sinon)
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RESERVE = "INT-OMS-AFRO-SBC-2014"
DOSSIER_PAGES_RESERVE = "oms_afro_sbc_2014"           # repli si la fiche ne donne pas pages_dir
EXCLUS_PARCOURS = {".git", ".venv", "venv", "node_modules", "__pycache__", ".pytest_cache"}
SECRETS = {
    "clé privée": re.compile(r"BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY"),
    "jeton GitHub": re.compile(r"\b(?:ghp|gho|ghs|ghu)_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}"),
    "clé AWS": re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    "jeton Slack": re.compile(r"\bxox[bp]-[0-9A-Za-z-]{10,}"),
    "clé « sk- »": re.compile(r"\bsk-[A-Za-z0-9]{20,}"),
}
RE_ENREGISTREMENT = re.compile(r'"doc_id"\s*:\s*"' + re.escape(RESERVE) + '"')
RE_REFERENCE = re.compile(re.escape(RESERVE) + r"::\d+")


def fichiers_publies(racine: Path) -> tuple[list[str], str]:
    """Chemins relatifs (séparateur « / ») des fichiers qui seraient publiés."""
    if (racine / ".git").exists() and shutil.which("git"):
        r = subprocess.run(["git", "-C", str(racine), "ls-files", "-co", "--exclude-standard", "-z"],
                           capture_output=True, check=True)
        chemins = sorted({c for c in r.stdout.decode("utf-8").split("\0") if c and (racine / c).is_file()})
        return chemins, "liste git : suivis, et non suivis non ignorés"
    chemins = []
    for p in racine.rglob("*"):
        rel = p.relative_to(racine)
        if p.is_file() and not EXCLUS_PARCOURS.intersection(rel.parts):
            chemins.append(rel.as_posix())
    return sorted(chemins), "parcours de l'arborescence (pas de dépôt git)"


def fiche_reserve(racine: Path) -> tuple[int, set[str]]:
    """Nombre de fiches du texte réservé dans kb/sources.json, et noms de ses dossiers de pages ou de texte."""
    supports = {DOSSIER_PAGES_RESERVE}
    chemin = racine / "kb" / "sources.json"
    if not chemin.is_file():
        return 0, supports
    sources = json.loads(chemin.read_text(encoding="utf-8"))
    fiches = [s for s in sources if isinstance(s, dict) and s.get("doc_id") == RESERVE]
    for s in fiches:
        for cle in ("pages_dir", "text_file"):
            if s.get(cle):
                supports.add(Path(s[cle]).name)
    return len(fiches), supports


def controler(racine: Path) -> int:
    chemins, mode = fichiers_publies(racine)
    nb_fiches, supports = fiche_reserve(racine)
    problemes: list[tuple[str, str]] = []
    compte = {"PDF": 0, "secret": 0, "fragment réservé": 0, "référence réservée": 0, "page ou texte réservés": 0}

    def signaler(categorie: str, detail: str) -> None:
        compte[categorie] += 1
        problemes.append((categorie, detail))

    if nb_fiches > 1:
        problemes.append(("fiche réservée", f"kb/sources.json : {nb_fiches} fiches {RESERVE} (une seule permise)"))

    for rel in chemins:
        parties = rel.split("/")
        if any(p in supports or Path(p).stem in supports for p in parties):
            signaler("page ou texte réservés", rel)
        donnees = (racine / rel).read_bytes()
        if rel.lower().endswith(".pdf") or donnees.startswith(b"%PDF-"):
            signaler("PDF", rel)
            continue
        if b"\0" in donnees[:8192]:
            continue                                   # binaire (image, police) : pas de recherche de texte
        texte = donnees.decode("utf-8", errors="replace")
        for nom, motif in SECRETS.items():
            if motif.search(texte):
                signaler("secret", f"{rel} ({nom})")
        if RE_REFERENCE.search(texte):
            signaler("référence réservée", f"{rel} ({len(RE_REFERENCE.findall(texte))} référence(s) {RESERVE}::NNNN)")
        enregistrements = len(RE_ENREGISTREMENT.findall(texte))
        if rel == "kb/sources.json":
            enregistrements -= min(nb_fiches, 1)       # la fiche elle-même est permise
        if enregistrements > 0:
            signaler("fragment réservé", f"{rel} ({enregistrements} enregistrement(s) doc_id {RESERVE})")

    print(f"Contrôle avant publication (FR-2308) — racine : {racine}")
    print(f"Fichiers contrôlés : {len(chemins)} ({mode})")
    print(f"PDF : {compte['PDF']}")
    print(f"Secrets : {compte['secret']}")
    print(f"Texte réservé {RESERVE} : fiche {nb_fiches} (kb/sources.json) ; fragments {compte['fragment réservé']} ; "
          f"références {compte['référence réservée']} ; pages ou texte {compte['page ou texte réservés']}")
    for categorie, detail in problemes:
        print(f"PROBLÈME [{categorie}] {detail}")
    if problemes:
        print(f"NON CONFORME : {len(problemes)} problème(s)")
        return 1
    print("Conforme : rien d'interdit")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--racine", type=Path, default=ROOT, help="racine du dépôt à contrôler (par défaut : ce dépôt)")
    a = ap.parse_args()
    return controler(a.racine.resolve())


if __name__ == "__main__":
    sys.exit(main())
