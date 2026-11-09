// SF-001-03 — Référentiel sur l'appareil : repli sur la version embarquée, liste fermée, performance,
// accessibilité des règles (TEST-001-03-02, -04, -06, -13).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chargerPaquet, chargerReferentiel, listeFermee, fermer, TRANCHES, ErreurReferentiel } from "../../src/client/ondevice/referentiel.mjs";
import { extraire } from "../../src/client/ondevice/extracteur_lexical.mjs";

const ici = dirname(fileURLToPath(import.meta.url));
const brut = () => JSON.parse(readFileSync(join(ici, "../../src/client/ondevice/paquet_triage.json"), "utf-8"));
const ref = chargerPaquet(brut(), "demo_synthetique");

test("TEST-001-03-02 : liste fermée de 2_5_ans (77 entrées, pas d'adulte) et de 5_11_ans", () => {
  const l = listeFermee(ref, "2_5_ans");
  assert.equal(l.length, 77);
  assert.ok(l.some((e) => e.jeton === "incapable_de_boire_ou_teter"));
  assert.ok(!l.some((e) => e.public === "adulte"));
  const m = new Set(listeFermee(ref, "5_11_ans").map((e) => e.jeton));
  for (const j of ["cephalee_intense", "douleur_abdominale_severe"]) assert.ok(m.has(j), j);
});

test("TEST-001-03-04 : un référentiel invalide est refusé et la version embarquée reste active", () => {
  const p = brut();
  p.referentiel.entrees[1].jeton = p.referentiel.entrees[0].jeton;
  const r = chargerReferentiel(p, { mode: "demo_synthetique", embarque: ref });
  assert.equal(r.ref, ref);
  assert.ok(r.erreur instanceof ErreurReferentiel);
  const ok = chargerReferentiel(brut(), { mode: "demo_synthetique", embarque: null });
  assert.equal(ok.erreur, null);
  assert.equal(ok.ref.entrees.length, 110);
  assert.throws(() => chargerReferentiel(p, { mode: "demo_synthetique", embarque: null }).ref.entrees, TypeError);
});

test("TEST-001-03-06 : extraction rapide (médiane ≤ 50 ms sur un texte de 500 caractères)", () => {
  const texte = "Mon enfant a de la fièvre depuis trois jours, il tousse beaucoup, il vomit tout ce qu'il mange et il a la diarrhée. ".repeat(5).slice(0, 500);
  const d = [];
  for (let i = 0; i < 100; i++) { const t0 = performance.now(); extraire(texte, ref.index); d.push(performance.now() - t0); }
  d.sort((a, b) => a - b);
  assert.ok(d[50] <= 50, `${d[50]} ms`);
});

test("TEST-001-03-13 : 0 jeton de condition inaccessible depuis la liste fermée de sa tranche", () => {
  const R = ref.paquet.regles;
  const atomes = (c, acc = new Set()) => {
    const b = (a) => (R.composites[a] ? atomes(R.composites[a], acc) : acc.add(a));
    (c.tous ?? []).forEach(b); (c.au_moins_un ?? []).forEach(b);
    if (c.au_moins_n) c.au_moins_n.parmi.forEach(b);
    for (const g of c.tous_groupes ?? []) g.forEach(b);
    return acc;
  };
  const inaccessibles = [];
  for (const t of TRANCHES) {
    const liste = new Set(listeFermee(ref, t).map((e) => e.jeton));
    const atteints = fermer([...liste], ref);
    for (const r of R.regles.filter((x) => x.tranches.includes(t))) for (const j of atomes(r.condition)) if (!atteints.has(j)) inaccessibles.push(`${t} ${r.id} ${j}`);
  }
  assert.deepEqual(inaccessibles, []);
});
