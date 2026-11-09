// SF-001-03 — Extracteur lexical exécuté sur l'appareil (FR-122).
// La normalisation est STRICTEMENT identique à norm_expr de tools/donnees/generer_referentiel_symptomes.py :
// décomposition NFD sans diacritiques, minuscules, tout caractère non alphanumérique remplacé par une espace,
// « s » ou « x » final retiré des mots de 4 lettres ou plus. La parité est testée (TEST-001-03-14).

/** Normalise un texte ou une expression. */
export function normaliser(texte) {
  const sansAccents = texte.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const mots = sansAccents.replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
  return mots.map((m) => (m.length >= 4 && (m.endsWith("s") || m.endsWith("x")) ? m.slice(0, -1) : m)).join(" ");
}

/** Une entrée est utilisable si elle n'est pas exclue et observable sans appareil (D-020, D-022). */
export function utilisable(entree) {
  return !entree.sensibilite.startsWith("exclu") && entree.observable_non_professionnel === "oui";
}

/** Expressions indexées d'une entrée : libellés et synonymes FR et EN, normalisés. */
export function expressions(entree) {
  const brutes = [entree.libelle_fr, entree.libelle_en,
    ...entree.synonymes_fr.split("|"), ...entree.synonymes_en.split("|")];
  return brutes.map(normaliser).filter(Boolean);
}

/** Construit l'index expression normalisée -> jeton. Rejette toute expression ambiguë (FR-124). */
export function construireIndex(entrees) {
  const index = new Map();
  for (const e of entrees) {
    if (!utilisable(e)) continue;
    for (const expr of expressions(e)) {
      const existant = index.get(expr);
      if (existant !== undefined && existant !== e.jeton) {
        throw new ErreurReferentiel(`expression ambiguë « ${expr} » : ${existant} / ${e.jeton}`);
      }
      index.set(expr, e.jeton);
    }
  }
  return index;
}

export class ErreurReferentiel extends Error {}

/**
 * Extraction : union des jetons dont une expression apparaît en mots entiers dans le texte (FR-122).
 * non_code : nombre de segments (séparés par . , ; : ! ? ou retour à la ligne) sans aucune expression
 * reconnue et contenant au moins un mot de 4 lettres ou plus (avant retrait du pluriel).
 * Seul ce nombre est conservé ; le texte n'est jamais stocké ni transmis (FR-120, BR-001-03-04).
 */
export function extraire(texte, index) {
  const n = ` ${normaliser(texte)} `;
  const jetons = new Set();
  for (const [expr, jeton] of index) {
    if (n.includes(` ${expr} `)) jetons.add(jeton);
  }
  let nonCode = 0;
  for (const segment of texte.split(/[.,;:!?\n]/)) {
    const ns = ` ${normaliser(segment)} `;
    let reconnu = false;
    for (const expr of index.keys()) {
      if (ns.includes(` ${expr} `)) { reconnu = true; break; }
    }
    if (reconnu) continue;
    const mots = segment.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().match(/[a-z0-9]+/g) || [];
    if (mots.some((m) => m.length >= 4)) nonCode += 1;
  }
  return { jetons: [...jetons].sort(), non_code: nonCode };
}
