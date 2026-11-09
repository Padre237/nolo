// SF-001-03 — Validation du paquet, exclusions, refus (TEST-001-03-01/03/04 adaptés au paquet JSON, FR-113).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chargerPaquet, listeFermee, TRANCHES, ErreurReferentiel } from "../../src/client/ondevice/referentiel.mjs";

const ici = dirname(fileURLToPath(import.meta.url));
const charge = () => JSON.parse(readFileSync(join(ici, "../../src/client/ondevice/paquet_triage.json"), "utf-8"));

test("chargement : 110 entrées, codes et jetons uniques, snomed vide (TEST-001-03-01)", () => {
  const ref = chargerPaquet(charge(), "demo_synthetique");
  assert.equal(ref.entrees.length, 110);
  assert.equal(new Set(ref.entrees.map((e) => e.code)).size, 110);
  assert.equal(ref.entrees.filter((e) => e.snomed_gps_id.trim()).length, 0);
});

test("FR-113 : refus hors mode démo tant que validateur_clinique est vide", () => {
  const p = charge();
  assert.equal(p.validateur_clinique, null);
  assert.throws(() => chargerPaquet(p, "complet"), ErreurReferentiel);
  assert.throws(() => chargerPaquet(p, "sans_donnees_personnelles"), ErreurReferentiel);
  assert.ok(chargerPaquet(p, "demo_synthetique"));
});

test("exclusions : agression_sexuelle et priapisme absents des 10 listes et de l'index (TEST-001-03-03)", () => {
  const ref = chargerPaquet(charge(), "demo_synthetique");
  for (const t of TRANCHES) {
    const jetons = new Set(listeFermee(ref, t).map((e) => e.jeton));
    assert.ok(!jetons.has("agression_sexuelle") && !jetons.has("priapisme"), t);
  }
  for (const jeton of ref.index.values()) {
    assert.ok(jeton !== "agression_sexuelle" && jeton !== "priapisme", jeton);
  }
});

test("paquet invalide refusé : jeton dupliqué, code modifié, snomed rempli, expression ambiguë (TEST-001-03-04)", () => {
  const casser = (f) => { const p = charge(); f(p); assert.throws(() => chargerPaquet(p, "demo_synthetique"), ErreurReferentiel); };
  casser((p) => { p.referentiel.entrees[5].jeton = p.referentiel.entrees[4].jeton; });
  casser((p) => { p.referentiel.entrees[5].code = "SYM-001"; });
  casser((p) => { p.referentiel.entrees[5].snomed_gps_id = "386661006"; });
  casser((p) => { p.referentiel.entrees[3].synonymes_fr += "|" + p.referentiel.entrees[9].libelle_fr; });
  casser((p) => { p.referentiel.entrees[7].implique = "jeton_inconnu"; });
  casser((p) => { p.schema = "autre/9"; });
});

test("liste fermée de 5_11_ans : critères adultes de la règle grossesse accessibles (CA-001-03-02)", () => {
  const ref = chargerPaquet(charge(), "demo_synthetique");
  const jetons = new Set(listeFermee(ref, "5_11_ans").map((e) => e.jeton));
  assert.ok(jetons.has("cephalee_intense") && jetons.has("douleur_abdominale_severe"));
  const deux_cinq = new Set(listeFermee(ref, "2_5_ans").map((e) => e.jeton));
  assert.ok(deux_cinq.has("incapable_de_boire_ou_teter"));
  for (const e of listeFermee(ref, "2_5_ans")) assert.notEqual(e.public, "adulte", e.jeton);
});
