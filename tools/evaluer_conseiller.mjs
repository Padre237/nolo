// SF-016-04 (FR-2215, FR-2216) — Évaluation datée du conseiller « Mes droits santé » de Nolo.
//
//   node tools/evaluer_conseiller.mjs            # écrit docs/quality/eval-conseiller-AAAA-MM-JJ.txt
//
// Sur Q23 à Q40 de kb/eval/questions_test.jsonl (questions de citoyens) : part des questions dont le document
// attendu figure dans les résultats du conseiller (au plus 5, textes camerounais d'abord, seuil de pertinence),
// et part dont la référence exacte (article) y figure ; mesure séparée de Q31 à Q34 et Q38 (anglais sur des
// lois sans version anglaise, glossaire). Cibles [proposition] : document ≥ 11/18 ; anglais ≥ 3/5.
import { readFileSync, writeFileSync } from 'node:fs';
import { creerBase } from '../app/js/domain/base.js';
import { creerIndex } from '../app/js/agents/conseiller/bm25.js';
import { creerGlossaire } from '../app/js/agents/conseiller/glossaire.js';
import { creerConseiller } from '../app/js/agents/conseiller/repondre.js';

const lire = (chemin) => readFileSync(new URL(chemin, import.meta.url), 'utf8');
export const CIBLES = { document: 11, anglais: 3 };
const ANGLAIS = ['Q31', 'Q32', 'Q33', 'Q34', 'Q38'];

export function evaluer() {
  const base = creerBase(JSON.parse(lire('../app/data/base.json')));
  const conseiller = creerConseiller({ base, index: creerIndex(base), glossaire: creerGlossaire(JSON.parse(lire('../app/data/glossaire.json'))) });
  const questions = lire('../kb/eval/questions_test.jsonl').trim().split('\n').map((l) => JSON.parse(l))
    .filter((q) => Number(q.id.slice(1)) >= 23 && Number(q.id.slice(1)) <= 40);
  const lignes = questions.map((q) => {
    const lang = ANGLAIS.includes(q.id) || /^(Can|Who|Is|Do|Are)\b/.test(q.question) ? 'en' : 'fr';
    const { resultats, etendu } = conseiller.chercher(q.question, lang);
    const docs = resultats.map((r) => ({ id: r.id, doc: r.doc, article: base.brut(r.id).article }));
    const doc = docs.some((r) => r.doc === q.attendu_doc || `${r.doc}-EN` === q.attendu_doc || r.doc === `${q.attendu_doc}-EN`);
    const ref = !q.attendu_ref ? doc : docs.some((r) => r.doc.replace(/-EN$/, '') === q.attendu_doc.replace(/-EN$/, '') && (r.article.startsWith(q.attendu_ref) || r.article.replace('Section', 'Article').startsWith(q.attendu_ref.replace('Section', 'Article'))));
    return { id: q.id, lang, doc, ref, etendu, premier: docs[0]?.id || '—', attendu: `${q.attendu_doc} ${q.attendu_ref || ''}`.trim() };
  });
  const compte = (f) => lignes.filter(f).length;
  return {
    lignes,
    document: compte((l) => l.doc), reference: compte((l) => l.ref), total: lignes.length,
    anglais: compte((l) => ANGLAIS.includes(l.id) && l.doc), totalAnglais: ANGLAIS.length,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = evaluer();
  const date = new Date().toISOString().slice(0, 10);
  const texte = [
    `# Évaluation du conseiller « Mes droits santé » (SF-016-04) — ${new Date().toISOString()}`,
    '# Commande : node tools/evaluer_conseiller.mjs',
    `# Questions Q23 à Q40 (${r.total}) ; résultats du conseiller : au plus 5 fragments, CMR- d'abord, seuil BM25 8.`,
    '',
    ...r.lignes.map((l) => `${l.id} [${l.lang}] ${l.ref ? 'REF' : l.doc ? 'DOC' : 'NON'}${l.etendu ? ' (INT-)' : ''}  attendu : ${l.attendu}  ; premier : ${l.premier}`),
    '',
    `Document attendu : ${r.document}/${r.total} (cible ≥ ${CIBLES.document}/${r.total})`,
    `Référence exacte : ${r.reference}/${r.total}`,
    `Anglais sur des lois sans version anglaise (Q31 à Q34, Q38) : ${r.anglais}/${r.totalAnglais} (cible ≥ ${CIBLES.anglais}/${r.totalAnglais})`,
    `Cibles ${r.document >= CIBLES.document && r.anglais >= CIBLES.anglais ? 'atteintes' : 'NON atteintes'}`,
    '',
    '# Réserve : les expressions françaises courantes (`courant_fr`, glossaire 1.2.0) ont été ajoutées le 2026-11-09',
    '# en lisant la question de CA-016-02-01 ; elles recoupent la formulation de Q23, Q26 et Q30. Mesure du même jour',
    '# sans elles : document 18/18, référence exacte 12/18. Une mesure non biaisée demande des questions nouvelles.',
    '# Index : les 816 fragments de la base embarquée (app/data/base.json), pas les 2 034 de kb/ (kb/eval/run_eval.py).',
  ].join('\n');
  writeFileSync(new URL(`../docs/quality/eval-conseiller-${date}.txt`, import.meta.url), `${texte}\n`);
  console.log(texte);
}
