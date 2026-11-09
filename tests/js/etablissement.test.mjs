// CA-ETS-13 (catalogues) et parité des conditions de la fiche entre le client et le serveur.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { CATALOGUES, ERREURS, traduire } from "../../src/client/pwa/js/i18n-etablissement.mjs";
import { conditionVraie } from "../../src/client/pwa/js/conditions.mjs";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

test("CA-ETS-13 : catalogues FR et EN aux mêmes clés, sans valeur vide", () => {
  for (const cat of [CATALOGUES, ERREURS]) {
    assert.deepEqual(Object.keys(cat.fr).sort(), Object.keys(cat.en).sort());
    for (const l of ["fr", "en"]) for (const [k, v] of Object.entries(cat[l])) assert.ok(v.trim(), `${l}.${k} vide`);
  }
});

test("Toute clé utilisée par la console existe dans le catalogue", () => {
  const code = ["etablissement.mjs", "vues-demande.mjs"].map((f) => readFileSync(join(RACINE, "src/client/pwa/js", f), "utf8")).join("\n");
  const directes = [...code.matchAll(/\bt\("([a-z_A-Z0-9]+)"/g)].map((m) => m[1]);
  for (const cle of directes) assert.ok(cle in CATALOGUES.fr, `clé absente : ${cle}`);
  assert.throws(() => traduire("fr", "cle_qui_n_existe_pas"), /inconnue/);
});

test("Chaque question, option, motif, action et code d'erreur du serveur a son libellé", () => {
  const sortie = execFileSync("python3", ["-c", `
import json, sys, re, pathlib
sys.path.insert(0, "src/server")
from etablissements import fiches, stock
src = "".join(p.read_text() for p in pathlib.Path("src/server/etablissements").glob("*.py"))
print(json.dumps({
  "questions": [q["id"] for q in fiches.DEFINITIONS["officine"]],
  "options": sorted({o for q in fiches.DEFINITIONS["officine"] for o in q.get("options", []) if ":" not in o}),
  "motifs": sorted(set(re.findall(r'rejet\\("([A-Z_0-9]+)"', src))),
  "actions": sorted(set(re.findall(r'_log\\([^,]+, "([a-z_]+)"', src))),
  "erreurs": sorted(set(re.findall(r'"(E-(?:ETS|AUTH|FICHE|PHOTO|STOCK|REQUETE|TEND)[A-Z0-9-]*)"', src))),
  "formes": stock.LIBELLES_FORMES and list(stock.LIBELLES_FORMES),
}))`], { cwd: RACINE, encoding: "utf8" });
  const d = JSON.parse(sortie);
  for (const id of d.questions) if (!id.startsWith("C3_")) assert.ok(`q_${id}` in CATALOGUES.fr, `question ${id}`);
  for (const o of d.options) assert.ok(`opt_${o}` in CATALOGUES.fr, `option ${o}`);
  for (const m of d.motifs) assert.ok(`motif_${m}` in CATALOGUES.fr, `motif ${m}`);
  for (const a of d.actions) assert.ok(`act_${a}` in CATALOGUES.fr, `action ${a}`);
  for (const f of d.formes) assert.ok(`forme_${f}` in CATALOGUES.fr, `forme ${f}`);
  for (const e of d.erreurs) assert.ok(e in ERREURS.fr, `erreur ${e}`);
  assert.ok(d.erreurs.includes("E-TEND-NON-VERIFIE"), "les codes D-032 sont bien couverts par ce test");
});

test("Parité des conditions de la fiche entre JavaScript et Python (500 jeux de réponses)", () => {
  const sortie = execFileSync("python3", ["-c", `
import json, random, sys
sys.path.insert(0, "src/server")
from etablissements import fiches
random.seed(42)
defs = fiches.DEFINITIONS["officine"]
cas = []
for _ in range(500):
    r = {"C1": random.choice([True, False, None]), "O4": random.choice([True, False, None]),
         "C6": random.sample(["especes", "mobile_money", "carte", "assurance"], random.randint(0, 3)),
         "C7": random.choice([True, False, None])}
    r = {k: v for k, v in r.items() if v is not None}
    attendu = {q["id"]: fiches.condition_vraie(q.get("si"), r) for q in defs}
    cas.append({"reponses": r, "attendu": attendu})
print(json.dumps({"definition": defs, "cas": cas}))`], { cwd: RACINE, encoding: "utf8", maxBuffer: 1 << 26 });
  const { definition, cas } = JSON.parse(sortie);
  for (const { reponses, attendu } of cas) {
    for (const q of definition) assert.equal(conditionVraie(q.si, reponses), attendu[q.id], `${q.id} ${JSON.stringify(reponses)}`);
  }
});
