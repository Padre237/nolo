// SF-001-05 et SF-001-06 — Tests d'acceptation des règles PCIME et IITT contre le moteur du produit
// (TEST-001-05-01 à 06, TEST-001-06-01 à 05), et SF-001-04 — contrôle de l'empreinte au chargement (TEST-001-04-03).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chargerPaquet, ErreurReferentiel } from "../../src/client/ondevice/referentiel.mjs";
import { evaluer } from "../../src/client/ondevice/moteur_triage.mjs";
import { empreinte } from "../../src/client/ondevice/empreinte.mjs";

const ici = dirname(fileURLToPath(import.meta.url));
const brut = () => JSON.parse(readFileSync(join(ici, "../../src/client/ondevice/paquet_triage.json"), "utf-8"));
const ref = chargerPaquet(brut(), "demo_synthetique");
const R = ref.paquet.regles;
const PCIME = ["2_6_mois", "6_mois_2_ans", "2_5_ans"];
const ev = (jetons, tranche, duree = 0, r = ref) => evaluer(jetons, tranche, duree, r);
const nivPrio = (x) => (x.niveau === "urgence" ? x.priorite : x.niveau);

test("TEST-001-05-01 : 8 règles PCIME, toutes sur 2_6_mois, 6_mois_2_ans, 2_5_ans", () => {
  const p = R.regles.filter((r) => r.outil === "pcime");
  assert.equal(p.length, 8);
  for (const r of p) assert.deepEqual([...r.tranches].sort(), [...PCIME].sort(), r.id);
  for (const t of ["8_jours_2_mois", "5_11_ans"]) {
    assert.ok(!ev(["incapable_de_boire_ou_teter"], t).regles_satisfaites.some((x) => x.id.startsWith("PCIME")), t);
  }
});

test("TEST-001-05-02 : chaque signe général de danger suffit (15 cas sur 15)", () => {
  let n = 0;
  for (const t of PCIME) for (const j of ["incapable_de_boire_ou_teter", "vomit_tout", "convulsions", "lethargie", "inconscient"]) {
    const r = ev([j], t);
    assert.equal(nivPrio(r), "immediate", `${t} ${j}`);
    assert.ok(r.regles_satisfaites.some((x) => x.id.startsWith("PCIME-SGD")), `${t} ${j}`);
    n += 1;
  }
  assert.equal(n, 15);
});

test("TEST-001-05-03 : fièvre et raideur de nuque à 3 ans → urgence immédiate (PCIME-MFTG-01)", () => {
  const r = ev(["fievre", "raideur_nuque"], "2_5_ans");
  assert.equal(nivPrio(r), "immediate");
  assert.ok(r.regles_satisfaites.some((x) => x.id === "PCIME-MFTG-01"));
});

test("TEST-001-05-04 : fièvre seule — consultation_24h si risque de paludisme élevé, sinon consultation_48h", () => {
  assert.equal(ev(["fievre"], "2_5_ans").regle, "PCIME-J-01");
  assert.equal(ev(["fievre"], "2_5_ans").niveau, "consultation_24h");
  const p = brut();
  p.regles.parametres.risque_paludisme.valeur = "faible";
  p.empreinte_canonique = empreinte({ referentiel: p.referentiel, regles: p.regles }); // copie reconstruite par l'outil
  const r = ev(["fievre"], "2_5_ans", 0, chargerPaquet(p, "demo_synthetique"));
  assert.equal(r.niveau, "consultation_48h");
});

test("TEST-001-05-05 : diarrhée avec sang, cochée séparément ou reconnue ensemble → PCIME-J-02", () => {
  for (const j of [["diarrhee", "sang_dans_selles"], ["diarrhee_avec_sang"]]) {
    const r = ev(j, "2_5_ans");
    assert.equal(r.niveau, "consultation_24h", j.join("+"));
    assert.ok(r.regles_satisfaites.some((x) => x.id === "PCIME-J-02"), j.join("+"));
  }
});

test("TEST-001-05-06 : diarrhée depuis 14 jours → PCIME-J-03 ; 13 jours → consultation_48h", () => {
  assert.equal(ev(["diarrhee"], "2_5_ans", 14).regle, "PCIME-J-03");
  assert.equal(ev(["diarrhee"], "2_5_ans", 13).niveau, "consultation_48h");
});

test("TEST-001-06-01 : critères dont la source fixe un âge", () => {
  const cas = [
    [["douleur_thoracique_aigue"], "18_50_ans", "consultation_48h"], [["douleur_thoracique_aigue"], "51_70_ans", "immediate"],
    [["brulure"], "18_50_ans", "rapide"], [["brulure"], "plus_70_ans", "immediate"],
    [["brulure"], "2_5_ans", "rapide"], [["brulure"], "6_mois_2_ans", "immediate"],
    [["toux"], "moins_8_jours", "immediate"], [["toux"], "2_6_mois", "rapide"], [["toux"], "6_mois_2_ans", "consultation_48h"],
  ];
  for (const [j, t, attendu] of cas) assert.equal(nivPrio(ev(j, t)), attendu, `${j} ${t}`);
});

/** Témoins minimaux : un ensemble de jetons par alternative de la condition (composites dépliés). */
function temoins(c) {
  const atome = (a) => (R.composites[a] ? temoins(R.composites[a]) : [[a]]);
  let ens = [[]];
  const produit = (alts) => { ens = ens.flatMap((e) => alts.map((a) => [...e, ...a])); };
  if (c.tous) for (const a of c.tous) produit(atome(a));
  if (c.au_moins_un) produit(c.au_moins_un.flatMap(atome));
  if (c.au_moins_n) produit([c.au_moins_n.parmi.slice(0, c.au_moins_n.n).flatMap((a) => atome(a)[0])]);
  if (c.tous_groupes) for (const g of c.tous_groupes) produit(g.flatMap(atome));
  if (c.symptome_present && ens.every((e) => !e.length)) produit([["toux"]]); // « au moins un symptôme » : un symptôme quelconque
  return ens;
}
const ATTENDU = { rouge: "immediate", jaune: "rapide" };
const conforme = (r, couleur) => r.niveau === "urgence" && (ATTENDU[couleur] === "rapide" || r.priorite === "immediate");

for (const [outil, rouges, jaunes, id] of [["iitt_12_ans_plus", 13, 22, "TEST-001-06-02"], ["iitt_moins_12_ans", 16, 16, "TEST-001-06-03"]]) {
  test(`${id} : ${outil} — ${rouges} rouges, ${jaunes} jaunes ; chaque témoin donne au moins le niveau de sa couleur`, () => {
    const regles = R.regles.filter((r) => r.outil === outil);
    assert.equal(regles.filter((r) => r.couleur_source === "rouge").length, rouges);
    assert.equal(regles.filter((r) => r.couleur_source === "jaune").length, jaunes);
    let n = 0;
    for (const r of regles) for (const t of r.tranches) for (const jetons of temoins(r.condition)) {
      const res = ev(jetons, t, r.condition.duree_jours_min ?? 0);
      assert.ok(conforme(res, r.couleur_source), `${r.id} ${t} ${jetons.join("+")} → ${res.niveau} ${res.priorite}`);
      n += 1;
    }
    assert.ok(n >= regles.length);
  });
}

test("TEST-001-06-04 : composites (détresse respiratoire, traumatisme, grossesse)", () => {
  assert.equal(nivPrio(ev(["difficulte_respiratoire"], "18_50_ans")), "consultation_48h");
  assert.equal(nivPrio(ev(["difficulte_respiratoire", "incapacite_parler_marcher"], "18_50_ans")), "immediate");
  assert.equal(nivPrio(ev(["difficulte_respiratoire", "battement_ailes_nez_geignement"], "2_5_ans")), "immediate");
  assert.equal(nivPrio(ev(["traumatisme", "sous_anticoagulants"], "18_50_ans")), "immediate");
  assert.equal(nivPrio(ev(["grossesse", "cephalee_intense"], "5_11_ans")), "immediate");
});

test("TEST-001-06-05 : jetons exclus absents des conditions ; yeux creusés et boit peu à 7 ans → immédiate", () => {
  const texte = JSON.stringify([R.regles.map((r) => r.condition), R.composites]);
  for (const j of ["agression_sexuelle", "priapisme", "signes_vitaux_haut_risque", "violence_agressivite", "pli_cutane_lent", "hypothermie"]) {
    assert.ok(!new RegExp(`"${j}"`).test(texte), j);
  }
  assert.equal(nivPrio(ev(["yeux_creuses", "boit_peu"], "5_11_ans")), "immediate");
});

test("TEST-001-04-03 : une règle modifiée après construction est refusée au chargement (empreinte)", () => {
  const p = brut();
  assert.ok(p.empreinte_canonique, "empreinte canonique absente du paquet");
  p.regles.regles[0].tranches = ["18_50_ans"];
  assert.throws(() => chargerPaquet(p, "demo_synthetique"), (e) => e instanceof ErreurReferentiel && /empreinte/.test(e.message));
  const q = brut();
  q.referentiel.entrees[0].libelle_fr = "modifié";
  assert.throws(() => chargerPaquet(q, "demo_synthetique"), /empreinte/);
});

test("TEST-001-04-01 : paquet sans validateur — refusé en mode complet, accepté en démo avec la mention", () => {
  const p = brut();
  assert.throws(() => chargerPaquet(p, "complet"), ErreurReferentiel);
  const r = chargerPaquet(p, "demo_synthetique");
  assert.match(ev(["toux"], "18_50_ans", 0, r).mention_demo, /non validées cliniquement/);
});
