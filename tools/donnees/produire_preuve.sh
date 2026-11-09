#!/usr/bin/env bash
# Produit la preuve d'exécution des contrôles de données de triage (outillage hors produit).
# Usage (depuis la racine du dépôt) :
#   bash tools/donnees/produire_preuve.sh > docs/quality/preuve-AAAA-MM-JJ-generation-donnees.txt
# La base de connaissances doit être disponible en kb/kb_chunks.jsonl ou ../kb/kb_chunks.jsonl.
set -u
cd "$(dirname "$0")/../.."
RACINE=$(pwd)
KBDIR=$( [ -f kb/kb_chunks.jsonl ] && echo "$RACINE/kb" || echo "$(dirname "$RACINE")/kb" )

echo "# Preuve d'exécution — génération et contrôle des données de triage"
echo "# Outillage hors produit (tools/donnees/). Ce document NE prouve PAS le fonctionnement du produit :"
echo "# l'extracteur et le moteur de SF-001-03 et SF-001-07 ne sont pas encore écrits."
echo "# Date : $(date -Iseconds) ; $(python3 --version) ; PyYAML $(python3 -c 'import yaml; print(yaml.__version__)')"
echo
echo '$ python3 tools/donnees/generer_referentiel_symptomes.py'
python3 tools/donnees/generer_referentiel_symptomes.py; echo "code de sortie : $?"
echo '$ sha256sum data/referentiels/symptomes.csv'
sha256sum data/referentiels/symptomes.csv
TMPA=$(mktemp); cp data/referentiels/symptomes.csv "$TMPA"
echo '$ python3 tools/donnees/generer_referentiel_symptomes.py   # seconde exécution (reproductibilité)'
python3 tools/donnees/generer_referentiel_symptomes.py > /dev/null; echo "code de sortie : $?"
echo '$ cmp data/referentiels/symptomes.csv <copie de la première exécution>'
cmp data/referentiels/symptomes.csv "$TMPA" && echo "identique octet pour octet"
rm -f "$TMPA"
echo '$ grep -m1 empreinte_sha256 data/referentiels/symptomes.meta.yaml   # empreinte déclarée'
grep -m1 empreinte_sha256 data/referentiels/symptomes.meta.yaml
echo '$ python3 tools/donnees/generer_regles_triage_v2.py'
python3 tools/donnees/generer_regles_triage_v2.py; echo "code de sortie : $?"
echo '$ sha256sum rules/triage_signes_alerte.v2.yaml data/referentiels/phrases_extraction_reference.json data/referentiels/historique/*.csv'
sha256sum rules/triage_signes_alerte.v2.yaml data/referentiels/phrases_extraction_reference.json data/referentiels/historique/*.csv
echo '$ diff <(cut -d, -f1,2 data/referentiels/historique/symptomes-1.0.0.csv) <(cut -d, -f1,2 data/referentiels/symptomes.csv)'
diff <(cut -d, -f1,2 data/referentiels/historique/symptomes-1.0.0.csv) <(cut -d, -f1,2 data/referentiels/symptomes.csv)
echo "(stabilité des codes : seules des lignes ajoutées en fin de fichier sont admises)"
echo
echo '$ python3 tools/donnees/verifier_regles_triage_v2.py'
python3 tools/donnees/verifier_regles_triage_v2.py; echo "code de sortie : $?"
echo
echo "# Contrôles de mutation : le vérificateur DOIT échouer (code de sortie 1) sur des données dégradées, copies temporaires."
mutation() {   # $1 : libellé ; $2 : commande de dégradation exécutée dans la copie
  local T; T=$(mktemp -d)
  mkdir -p "$T/proj/data"; cp -r tools rules "$T/proj/"; cp -r data/referentiels "$T/proj/data/"; ln -s "$KBDIR" "$T/kb"
  ( cd "$T/proj" && eval "$2" )
  echo "## Mutation : $1"
  python3 "$T/proj/tools/donnees/verifier_regles_triage_v2.py" 2>&1 | grep -E "^KO|échec|inaccessible|conformes" | cut -c1-180
  echo "code de sortie : ${PIPESTATUS[0]} (attendu : 1)"
  rm -rf "$T"
}
mutation "référentiel 1.0.0 (scénario du jeton dérivé retiré : ce jeton n'existe pas en 1.0.0)" \
  "cp data/referentiels/historique/symptomes-1.0.0.csv data/referentiels/symptomes.csv; sed -i '/jeton dérivé/d' tools/donnees/verifier_regles_triage_v2.py"
mutation "paramètre risque_paludisme = faible" \
  "python3 -c \"import yaml;p='rules/triage_signes_alerte.v2.yaml';d=yaml.safe_load(open(p,encoding='utf-8'));d['parametres']['risque_paludisme']['valeur']='faible';yaml.safe_dump(d,open(p,'w',encoding='utf-8'),allow_unicode=True,sort_keys=False)\""
