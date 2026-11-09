#!/usr/bin/env node
// SF-001-08 (démo) — Triage d'urgence SUR L'APPAREIL : aucun accès réseau, aucun envoi de symptôme (FR-112).
// Usage :
//   node src/client/ondevice/cli/triage.mjs --tranche 51_70_ans --texte "douleur poitrine soudaine"
//   node src/client/ondevice/cli/triage.mjs --tranche 2_5_ans --jetons fievre,raideur_nuque [--duree 3] [--liste]
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chargerPaquet, listeFermee, TRANCHES } from "../referentiel.mjs";
import { extraire } from "../extracteur_lexical.mjs";
import { evaluer } from "../moteur_triage.mjs";

function args(argv) {
  const a = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const cle = argv[i].slice(2);
      a[cle] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
    }
  }
  return a;
}

const a = args(process.argv);
const ici = dirname(fileURLToPath(import.meta.url));
const paquet = JSON.parse(readFileSync(join(ici, "..", "paquet_triage.json"), "utf-8"));
const ref = chargerPaquet(paquet, "demo_synthetique");

if (!a.tranche || !TRANCHES.includes(a.tranche)) {
  console.error(`--tranche obligatoire, parmi : ${TRANCHES.join(", ")}`);
  process.exit(2);
}

if (a.liste) {
  console.log(`Liste fermée (${a.tranche}) — cochez ce qui s'applique :`);
  for (const e of listeFermee(ref, a.tranche)) console.log(`  [${e.domaine}] ${e.libelle_fr}  (${e.jeton})`);
  process.exit(0);
}

let jetons = (a.jetons ? String(a.jetons).split(",") : []).map((s) => s.trim()).filter(Boolean);
let nonCode = 0;
if (a.texte) {
  const ex = extraire(String(a.texte), ref.index); // le texte est analysé ICI et n'est jamais conservé
  jetons = [...new Set([...jetons, ...ex.jetons])].sort();
  nonCode = ex.non_code;
}
const r = evaluer(jetons, a.tranche, a.duree ? Number(a.duree) : 0, ref);

if (a.json) {
  // Sortie machine pour l'exécuteur de scénarios : le moteur du PRODUIT est utilisé, pas une copie.
  console.log(JSON.stringify({ ...r, non_code: nonCode, execution: "sur_appareil",
    numeros_urgence: ref.paquet.numeros_urgence.map((n) => n.valeur) }));
  process.exit(0);
}

const NIVEAUX = {
  urgence: "URGENCE — rendez-vous immédiatement aux urgences les plus proches",
  consultation_24h: "Consultez un centre de santé dans les 24 heures",
  consultation_48h: "Consultez une structure de santé dans les 48 heures",
  soins_courants: "Soins courants",
};

console.log("────────────────────────────────────────────────────────────");
console.log("ORIENTATION (système automatisé — ceci n'est pas un diagnostic)");
console.log("────────────────────────────────────────────────────────────");
if (jetons.length) console.log(`Signes retenus : ${r.jetons_evalues.join(", ")}`);
if (nonCode) console.log(`Éléments non reconnus : ${nonCode} — complétez avec la liste (--liste)`);
if (!r.niveau) {
  console.log("Aucun signe saisi : choisissez des signes dans la liste (--liste).");
} else {
  console.log(`\nNiveau : ${NIVEAUX[r.niveau]}${r.priorite ? ` (priorité ${r.priorite})` : ""}`);
  console.log(`Raison : règle ${r.regle}${r.texte_source.length ? ` — « ${r.texte_source[0]} »` : " (aucun signe d'alerte reconnu ; prudence par défaut)"}`);
  if (r.fragments.length) console.log(`Sources : ${r.fragments.join(", ")}`);
}
console.log(`\nNuméros d'urgence : ${ref.paquet.numeros_urgence.map((n) => `${n.valeur} (${n.libelle})`).join(" · ")}`);
console.log(`⚠ ${ref.paquet.mention_demo}`);
console.log("Vos droits : demander une intervention humaine, donner votre point de vue, contester.");
console.log("Aucun symptôme n'a quitté cet appareil (traitement local, FR-112).");
