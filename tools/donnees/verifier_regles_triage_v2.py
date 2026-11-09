"""Outillage de contrôle des données (hors produit). Contrôles de cohérence du référentiel et des règles v2 : sémantique de référence,
scénarios, monotonie (propriété), jetons et sources, accessibilité des règles depuis la liste fermée, jeu de phrases de référence.
Les évaluateur et extracteur ci-dessous sont des implémentations de RÉFÉRENCE pour contrôler les données ; ce ne sont pas le produit
(SF-001-03 et SF-001-07 restent à implémenter et à tester)."""
import csv, json, random, re, sys, unicodedata, yaml
from pathlib import Path
RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from generer_referentiel_symptomes import norm_expr, expressions, utilisable   # même normalisation que le contrôle d'ambiguïté
KBP = next(p for p in (RACINE / "kb" / "kb_chunks.jsonl", RACINE.parent / "kb" / "kb_chunks.jsonl") if p.exists())
REF = {r["jeton"]: r for r in csv.DictReader(open(RACINE / "data" / "referentiels" / "symptomes.csv", encoding="utf-8"))}
D = yaml.safe_load(open(RACINE / "rules" / "triage_signes_alerte.v2.yaml", encoding="utf-8"))
KB = {json.loads(l)["chunk_id"] for l in open(KBP, encoding="utf-8")}
ORDRE = {"urgence": 3, "consultation_24h": 2, "consultation_48h": 1, "soins_courants": 0}
PRIO = {"immediate": 1, "rapide": 0, None: 0}

def fermer(j):
    j = set(j); ch = True
    while ch:
        ch = False
        for t in list(j):
            for i in REF[t]["implique"].split():
                if i not in j: j.add(i); ch = True
    return j

def vrai(atome, j, ctx):
    if atome in D["composites"]:
        return cond(D["composites"][atome], j, ctx)
    return atome in j

def cond(c, j, ctx):
    ok = True
    if "tous" in c: ok &= all(vrai(a, j, ctx) for a in c["tous"])
    if "au_moins_un" in c: ok &= any(vrai(a, j, ctx) for a in c["au_moins_un"])
    if "au_moins_n" in c: ok &= sum(vrai(a, j, ctx) for a in c["au_moins_n"]["parmi"]) >= c["au_moins_n"]["n"]
    if "tous_groupes" in c: ok &= all(any(vrai(a, j, ctx) for a in g) for g in c["tous_groupes"])
    if c.get("symptome_present"): ok &= len(j) > 0
    if "duree_jours_min" in c: ok &= ctx.get("duree_jours", 0) >= c["duree_jours_min"]
    if "parametre" in c: ok &= all(D["parametres"][k]["valeur"] == v for k, v in c["parametre"].items())
    return ok

def evaluer(jetons, tranche, duree_jours=0):
    j = fermer(jetons); ctx = {"duree_jours": duree_jours}
    best = None
    for r in D["regles"]:
        if tranche in r["tranches"] and cond(r["condition"], j, ctx):
            m = D["correspondance"][r["couleur_source"]]
            k = (ORDRE[m["niveau"]], PRIO[m.get("priorite")])
            if best is None or k > best[0]: best = (k, m["niveau"], m.get("priorite"), r["id"])
    if best is None:
        return ("consultation_48h", None, "aucune_regle") if j else (None, None, None)
    return best[1:]

# 1. Jetons et sources : fragments présents ; chaque texte source retrouvé mot pour mot dans au moins un de ses fragments
TXT = {}
for l in open(KBP, encoding="utf-8"):
    c = json.loads(l); TXT[c["chunk_id"]] = re.sub(r"\s+", " ", unicodedata.normalize("NFC", c["text"]))
def retrouve(texte, frags):
    t = re.sub(r"\s+", " ", unicodedata.normalize("NFC", texte)).strip()
    return any(t in TXT[f] for f in frags)
nb_src = 0
for r in D["regles"]:
    assert r["fragments"] and all(f in KB for f in r["fragments"]), r["id"]
    for ts in r["texte_source"]:
        assert retrouve(ts, r["fragments"]), ("TEXTE SOURCE INTROUVABLE", r["id"], ts); nb_src += 1
for k, c in D["composites"].items():
    assert all(f in KB for f in c["fragments"]), k
    for ts in c["texte_source"]:
        assert retrouve(ts, c["fragments"]), ("TEXTE SOURCE INTROUVABLE", k, ts); nb_src += 1
print("sources :", len(D["regles"]), "règles et", len(D["composites"]), "composites ;", nb_src, "textes sources retrouvés mot pour mot dans leurs fragments")
for t, row in REF.items():
    for f in row["sources"].split():
        assert f in KB, (t, f)
# 2. Scénarios
S = [
 # (nom, jetons, tranche, durée en jours, niveau attendu[, priorité attendue])
 ("adulte 58 ans, douleur thoracique aiguë (scénario 1)", ["douleur_thoracique_aigue"], "51_70_ans", 0, "urgence"),
 ("adulte 30 ans, douleur thoracique aiguë sans autre signe", ["douleur_thoracique_aigue"], "18_50_ans", 0, "consultation_48h"),
 ("adulte 30 ans, douleur thoracique + incapacité à parler en respirant mal", ["douleur_thoracique_aigue", "difficulte_respiratoire", "incapacite_parler_marcher"], "18_50_ans", 0, "urgence"),
 ("enfant 3 ans, incapable de boire (PCIME)", ["incapable_de_boire_ou_teter"], "2_5_ans", 0, "urgence"),
 ("enfant 3 ans, fièvre seule (paludisme, PCIME jaune)", ["fievre"], "2_5_ans", 0, "consultation_24h"),
 ("enfant 3 ans, fièvre + raideur de nuque (PCIME)", ["fievre", "raideur_nuque"], "2_5_ans", 0, "urgence"),
 ("enfant 3 ans, diarrhée + sang dans les selles (dysenterie)", ["diarrhee", "sang_dans_selles"], "2_5_ans", 0, "consultation_24h"),
 ("enfant 3 ans, diarrhée depuis 15 jours", ["diarrhee"], "2_5_ans", 15, "consultation_24h"),
 ("nourrisson 5 jours, fièvre", ["fievre"], "moins_8_jours", 0, "urgence"),
 ("nourrisson 3 mois, toux", ["toux"], "2_6_mois", 0, "urgence"),
 ("adulte 40 ans, toux depuis 3 jours", ["toux"], "18_50_ans", 3, "consultation_48h"),
 ("adulte 40 ans, fièvre + raideur de nuque", ["fievre", "raideur_nuque"], "18_50_ans", 0, "urgence"),
 ("adulte 40 ans, morsure de chien", ["morsure_animal"], "18_50_ans", 0, "urgence"),
 ("adulte 30 ans enceinte, céphalée intense", ["grossesse", "cephalee_intense"], "18_50_ans", 0, "urgence"),
 ("adulte 80 ans, brûlure", ["brulure"], "plus_70_ans", 0, "urgence"),
 ("enfant 8 ans, fièvre seule (aucune règle sourcée)", ["fievre"], "5_11_ans", 0, "consultation_48h"),
 # Ajouts de la version 1.1.0 du référentiel
 ("adulte 40 ans, respire mal + confus (détresse respiratoire, carte IITT)", ["difficulte_respiratoire", "etat_conscience_altere"], "18_50_ans", 0, "urgence", "immediate"),
 ("adulte 40 ans, confus seul (critère jaune IITT)", ["etat_conscience_altere"], "18_50_ans", 0, "urgence", "rapide"),
 ("enfant 3 ans, « diarrhée avec du sang » (jeton dérivé)", ["diarrhee_avec_sang"], "2_5_ans", 0, "consultation_24h"),
]
ko = 0
for nom, j, t, dj, att, *p_att in S:
    niv, prio, rid = evaluer(j, t, dj)
    bon = niv == att and (not p_att or prio == p_att[0])
    ko += not bon
    print("OK " if bon else "KO ", f"{nom} -> {niv} ({prio}, {rid})")
# 3. Monotonie : ajouter un jeton ne baisse jamais le niveau (5 000 tirages)
random.seed(7)
util = [t for t, r in REF.items() if r["affiche"] == "oui" and r["usage"] != "aucun" and not r["sensibilite"].startswith("exclu")]
viol = 0
for _ in range(5000):
    t = random.choice(D["tranches_age"]); base = random.sample(util, random.randint(0, 4)); plus = base + [random.choice(util)]
    a, b = evaluer(base, t), evaluer(plus, t)
    if a[0] and ORDRE[b[0]] < ORDRE[a[0]]: viol += 1
print("monotonie :", viol, "violation(s) sur 5000")
# 4. Jetons affichés pour le triage sans aucune règle (aboutissent au niveau par défaut)
usage = set()
for r in D["regles"]:
    c = r["condition"]
    for k in ("tous", "au_moins_un"): usage |= set(c.get(k, []))
    if "au_moins_n" in c: usage |= set(c["au_moins_n"]["parmi"])
    for g in c.get("tous_groupes", []): usage |= set(g)
for c in D["composites"].values():
    for k in ("tous", "au_moins_un"): usage |= set(c.get(k, []))
sans = sorted(t for t, r in REF.items() if r["affiche"] == "oui" and "triage" in r["usage"] and t not in usage and not any(i in usage for i in fermer([t]) - {t}))
print("jetons de triage sans règle (niveau par défaut) :", sans)
print("scénarios en échec :", ko, "sur", len(S))
# 5. Accessibilité : pour chaque règle et chaque tranche, chaque jeton de la condition est présenté dans la liste fermée
#    de la tranche (FR-121 : public de la tranche, ou jeton utilisé par une règle applicable) ou impliqué par une entrée présentée.
PUB = {"tous": set(D["tranches_age"]), "nourrisson": {"moins_8_jours", "8_jours_2_mois"},
       "enfant": set(D["tranches_age"][:6]), "adulte": set(D["tranches_age"][6:])}
def atomes(c, acc):
    for k in ("tous", "au_moins_un"):
        for a in c.get(k, []): (atomes(D["composites"][a], acc) if a in D["composites"] else acc.add(a))
    if "au_moins_n" in c:
        for a in c["au_moins_n"]["parmi"]: (atomes(D["composites"][a], acc) if a in D["composites"] else acc.add(a))
    for g in c.get("tous_groupes", []):
        for a in g: (atomes(D["composites"][a], acc) if a in D["composites"] else acc.add(a))
    return acc
par_tranche = {t: set() for t in D["tranches_age"]}
for r in D["regles"]:
    for t in r["tranches"]: par_tranche[t] |= atomes(r["condition"], set())
def liste_fermee(t):
    return {j for j, r in REF.items() if r["affiche"] == "oui" and not r["sensibilite"].startswith("exclu")
            and (t in PUB[r["public"]] or j in par_tranche[t])}
inacc = []
for t in D["tranches_age"]:
    lf = liste_fermee(t); atteints = set().union(*(fermer([j]) for j in lf))
    inacc += [(t, j) for j in sorted(par_tranche[t]) if j not in atteints]
print("accessibilité depuis la liste fermée :", len(inacc), "jeton(s) inaccessible(s)", inacc)
# 6. Jeu de phrases de référence (extracteur lexical de référence : correspondance sur tout le texte, union des expressions)
IDX = {}
for r in REF.values():
    if utilisable(r):
        for e in expressions(r): IDX[e] = r["jeton"]
def extraire(texte):
    n = " " + norm_expr(texte) + " "
    jetons = sorted({j for e, j in IDX.items() if f" {e} " in n})
    non_code = 0
    for seg in re.split(r"[.,;:!?\n]", texte):
        ns = " " + norm_expr(seg) + " "
        if any(f" {e} " in ns for e in IDX):
            continue
        mots = "".join(ch for ch in unicodedata.normalize("NFD", seg) if unicodedata.category(ch) != "Mn").lower()
        if any(len(m) >= 4 for m in re.findall(r"[a-z0-9]+", mots)):
            non_code += 1
    return jetons, non_code
PH = json.load(open(RACINE / "data" / "referentiels" / "phrases_extraction_reference.json", encoding="utf-8"))["phrases"]
ko_ph = 0
for p in PH:
    j, nc = extraire(p["texte"])
    bon = j == p["jetons_attendus"] and nc == p["non_code_attendu"]
    ko_ph += not bon
    if not bon: print("KO ", p["id"], p["texte"], "->", j, nc, "attendu", p["jetons_attendus"], p["non_code_attendu"])
print("phrases de référence :", len(PH) - ko_ph, "/", len(PH), "conformes")
# 7. Jetons des données existantes (code non migré, MT-001) : informatif pour l'ancien fichier de règles, bloquant pour les autres
KBR = KBP.parent
manq = []
pat = KBR / "data" / "synthetic" / "patients.csv"
if pat.exists():
    jp = {t for r in csv.DictReader(open(pat, encoding="utf-8")) for t in re.split(r"[;|]", r["symptomes"]) if t}
    manq += sorted(jp - set(REF))
    print("patients.csv :", len(jp), "jetons,", len(jp - set(REF)), "absent(s) du référentiel", sorted(jp - set(REF)))
sbc = KBR / "rules" / "sbc_definitions.yaml"
if sbc.exists():
    def chaines(x, acc, cle=None):
        if isinstance(x, dict):
            for k, v in x.items(): chaines(v, acc, k)
        elif isinstance(x, list):
            for y in x: chaines(y, acc, cle)
        elif isinstance(x, str) and re.fullmatch(r"[a-z_]+", x) and cle != "evenement": acc.add(x)
        return acc
    js = chaines(yaml.safe_load(open(sbc, encoding="utf-8")), set())
    manq += sorted(js - set(REF))
    print("sbc_definitions.yaml :", len(js), "jetons de symptômes (valeurs « evenement » exclues),", len(js - set(REF)), "absent(s)", sorted(js - set(REF)))
anc = KBR / "rules" / "triage_signes_alerte.yaml"
if anc.exists():
    ja = set(re.findall(r"\b[a-z]+(?:_[a-z]+)+\b", anc.read_text(encoding="utf-8")))
    print("ancien triage_signes_alerte.yaml (remplacé par la v2, informatif) : jetons absents du référentiel :",
          sorted(t for t in ja - set(REF) if t in {"perte_de_conscience", "difficulte_respiratoire_severe"}))
# 8. Témoin minimal par règle : pour chaque règle, chaque alternative de premier niveau et chaque tranche, un ensemble minimal
#    de jetons qui satisfait la condition doit donner au moins le niveau (et la priorité) associés à la couleur de la règle.
def temoin_atome(a):
    return temoin(D["composites"][a])[0] if a in D["composites"] else {a}
def temoin(c, alt=None):
    j, d = set(), 0
    for a in c.get("tous", []): j |= temoin_atome(a)
    if "au_moins_un" in c: j |= temoin_atome(alt if alt is not None else c["au_moins_un"][0])
    if "au_moins_n" in c:
        for a in c["au_moins_n"]["parmi"][: c["au_moins_n"]["n"]]: j |= temoin_atome(a)
    for g in c.get("tous_groupes", []): j |= temoin_atome(g[0])
    if c.get("symptome_present") and not j: j.add("toux")
    if "duree_jours_min" in c: d = c["duree_jours_min"]
    return j, d
nb_t = ko_t = 0
for r in D["regles"]:
    m = D["correspondance"][r["couleur_source"]]
    attendu = (ORDRE[m["niveau"]], PRIO[m.get("priorite")])
    for alt in (r["condition"].get("au_moins_un") or [None]):
        j, d = temoin(r["condition"], alt)
        for t in r["tranches"]:
            nb_t += 1
            niv, prio, rid = evaluer(sorted(j), t, d)
            ok = cond(r["condition"], fermer(j), {"duree_jours": d}) and niv is not None and (ORDRE[niv], PRIO[prio]) >= attendu
            if not ok:
                ko_t += 1; print("KO témoin", r["id"], t, sorted(j), "->", niv, prio, rid)
print("témoins minimaux par règle :", nb_t - ko_t, "/", nb_t, "conformes")
sys.exit(1 if (ko or viol or inacc or ko_ph or manq or ko_t) else 0)
