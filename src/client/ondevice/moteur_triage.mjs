// SF-001-07 (partiel, incrément démo D-025) — Moteur de triage exécuté sur l'appareil (ADR-005).
// Sémantique identique à l'évaluateur de référence tools/donnees/verifier_regles_triage_v2.py :
// conditions monotones, niveau retenu = le plus élevé (urgence > consultation_24h > consultation_48h >
// soins_courants), à niveau égal priorité immediate > rapide, implications fermées avant évaluation.
// La parité est testée par tests/js/triage_parite.test.mjs.
import { fermer } from "./referentiel.mjs";

const ORDRE = { urgence: 3, consultation_24h: 2, consultation_48h: 1, soins_courants: 0 };
const PRIO = { immediate: 1, rapide: 0, null: 0, undefined: 0 };

function vrai(atome, jetons, ctx, composites) {
  if (composites[atome]) return condition(composites[atome], jetons, ctx, composites);
  return jetons.has(atome);
}

function condition(c, jetons, ctx, composites) {
  let ok = true;
  if (c.tous) ok &&= c.tous.every((a) => vrai(a, jetons, ctx, composites));
  if (c.au_moins_un) ok &&= c.au_moins_un.some((a) => vrai(a, jetons, ctx, composites));
  if (c.au_moins_n) ok &&= c.au_moins_n.parmi.filter((a) => vrai(a, jetons, ctx, composites)).length >= c.au_moins_n.n;
  if (c.tous_groupes) ok &&= c.tous_groupes.every((g) => g.some((a) => vrai(a, jetons, ctx, composites)));
  if (c.symptome_present) ok &&= jetons.size > 0;
  if (c.duree_jours_min !== undefined) ok &&= (ctx.duree_jours ?? 0) >= c.duree_jours_min;
  if (c.parametre) ok &&= Object.entries(c.parametre).every(([k, v]) => ctx.parametres[k]?.valeur === v);
  return ok;
}

/**
 * Évalue le triage. Renvoie { niveau, priorite, regle, couleur, texte_source, fragments,
 * regles_satisfaites, mention_demo } — ou des champs nuls si aucun symptôme n'est saisi.
 * Le LLM ne peut jamais abaisser ce niveau (FR-101) : aucune entrée de ce module ne vient d'un modèle.
 */
export function evaluer(jetonsEntres, tranche, dureeJours, ref) {
  const regles = ref.paquet.regles;
  const jetons = fermer(jetonsEntres, ref);
  const ctx = { duree_jours: dureeJours ?? 0, parametres: regles.parametres ?? {} };
  let meilleure = null;
  const satisfaites = [];
  for (const r of regles.regles) {
    if (!r.tranches.includes(tranche)) continue;
    if (!condition(r.condition, jetons, ctx, regles.composites)) continue;
    const m = regles.correspondance[r.couleur_source];
    satisfaites.push({ id: r.id, couleur: r.couleur_source, niveau: m.niveau, priorite: m.priorite ?? null });
    const cle = [ORDRE[m.niveau], PRIO[m.priorite]];
    if (!meilleure || cle[0] > meilleure.cle[0] || (cle[0] === meilleure.cle[0] && cle[1] > meilleure.cle[1])) {
      meilleure = { cle, regle: r, niveau: m.niveau, priorite: m.priorite ?? null };
    }
  }
  const base = { mention_demo: ref.paquet.mention_demo, jetons_evalues: [...jetons].sort(), tranche };
  if (!meilleure) {
    if (jetons.size === 0) return { ...base, niveau: null, priorite: null, regle: null, couleur: null, texte_source: [], fragments: [], regles_satisfaites: [] };
    const d = regles.correspondance.aucune_regle; // consultation_48h si au moins un symptôme (D-021)
    return { ...base, niveau: d.niveau, priorite: null, regle: "aucune_regle", couleur: "aucune_regle", texte_source: [], fragments: [], regles_satisfaites: [] };
  }
  return {
    ...base,
    niveau: meilleure.niveau,
    priorite: meilleure.priorite,
    regle: meilleure.regle.id,
    couleur: meilleure.regle.couleur_source,
    texte_source: meilleure.regle.texte_source,
    fragments: meilleure.regle.fragments,
    regles_satisfaites: satisfaites,
  };
}

export { ORDRE };
