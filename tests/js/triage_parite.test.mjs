// CA-DEMO-01 — Parité stricte entre le moteur du produit (.mjs) et l'évaluateur de référence Python.
// Le jeu attendu est généré par tools/demo/generer_cas_parite.py (jamais écrit à la main).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chargerPaquet, listeFermee, fermer, TRANCHES } from "../../src/client/ondevice/referentiel.mjs";
import { extraire } from "../../src/client/ondevice/extracteur_lexical.mjs";
import { evaluer } from "../../src/client/ondevice/moteur_triage.mjs";

const ici = dirname(fileURLToPath(import.meta.url));
const paquet = JSON.parse(readFileSync(join(ici, "../../src/client/ondevice/paquet_triage.json"), "utf-8"));
const cas = JSON.parse(readFileSync(join(ici, "fixtures/cas_parite.json"), "utf-8"));
const ref = chargerPaquet(paquet, "demo_synthetique");

test("19 scénarios nommés : même niveau, même priorité, même règle", () => {
  for (const c of cas.scenarios) {
    const r = evaluer(c.jetons, c.tranche, c.duree, ref);
    assert.deepEqual([r.niveau, r.priorite, r.regle], [c.niveau, c.priorite, c.regle], c.nom);
  }
});

test("42 phrases de référence : mêmes jetons, même non_code (TEST-001-03-05)", () => {
  for (const c of cas.phrases) {
    const r = extraire(c.texte, ref.index);
    assert.deepEqual({ jetons: r.jetons, non_code: r.non_code },
      { jetons: c.jetons, non_code: c.non_code }, `${c.id} « ${c.texte} »`);
  }
});

test("listes fermées : mêmes jetons pour chacune des 10 tranches (TEST-001-03-02, TEST-001-03-13)", () => {
  for (const c of cas.listes) {
    const lf = listeFermee(ref, c.tranche).map((e) => e.jeton).sort();
    assert.equal(lf.length, c.nombre, c.tranche);
    assert.deepEqual(lf, c.jetons, c.tranche);
  }
});

test("fermetures transitives identiques (TEST-001-03-07)", () => {
  for (const c of cas.fermetures) {
    assert.deepEqual([...fermer(c.entree, ref)].sort(), c.fermeture, c.entree.join(","));
  }
});

test("400 tirages aléatoires : parité stricte du moteur", () => {
  for (const c of cas.tirages) {
    const r = evaluer(c.jetons, c.tranche, c.duree, ref);
    assert.deepEqual([r.niveau, r.priorite, r.regle], [c.niveau, c.priorite, c.regle],
      `${c.tranche} [${c.jetons.join(",")}] duree=${c.duree}`);
  }
});

test("monotonie : ajouter un jeton n'abaisse jamais le niveau (ADR-005)", () => {
  const ORDRE = { urgence: 3, consultation_24h: 2, consultation_48h: 1, soins_courants: 0 };
  const util = ref.entrees.filter((e) => e.affiche === "oui" && e.usage !== "aucun"
    && !e.sensibilite.startsWith("exclu")).map((e) => e.jeton);
  let x = 7;
  const alea = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648; // générateur déterministe
  for (let i = 0; i < 2000; i++) {
    const tranche = TRANCHES[Math.floor(alea() * TRANCHES.length)];
    const base = [...new Set(Array.from({ length: Math.floor(alea() * 4) }, () => util[Math.floor(alea() * util.length)]))];
    const plus = [...base, util[Math.floor(alea() * util.length)]];
    const a = evaluer(base, tranche, 0, ref);
    const b = evaluer(plus, tranche, 0, ref);
    if (a.niveau) assert.ok(ORDRE[b.niveau] >= ORDRE[a.niveau], `${tranche} ${base.join(",")} + ${plus.at(-1)}`);
  }
});
