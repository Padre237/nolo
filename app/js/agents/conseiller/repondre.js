// Nolo — conseiller « Mes droits santé » (SF-016-02) : réponse EXTRACTIVE. 1 à 3 extraits de textes trouvés,
// chacun avec sa référence et le statut de sa source ; sinon « aucun fondement » (Principe III). Jamais de
// conclusion juridique rédigée. La question et la réponse restent en mémoire : ni stockage, ni réseau (FR-2209).
import { extrait } from '../../domain/base.js';
import fr from '../../i18n/fr.js';
import en from '../../i18n/en.js';

export const MENTION = { fr: fr.droits.mention, en: en.droits.mention };
/** Seuil de pertinence BM25 [proposition mesurée le 2026-11-09 : questions hors sujet < 8, questions de la base ≥ 8,7]. */
export const SEUIL_PERTINENCE = 8;
const MAX_EXTRAITS = 3;

export function creerConseiller({ base, index, glossaire }) {
  return {
    /** Textes camerounais d'abord ; textes internationaux seulement si aucun ne dépasse le seuil (FR-2202). */
    chercher(question, lang = 'fr') {
      const q = glossaire.enrichir(question);
      const garder = (r) => r.score >= SEUIL_PERTINENCE;
      const cmr = index.chercher(q, { k: 5, prefixe: 'CMR-' }).filter(garder);
      if (cmr.length) return { requete: q, resultats: cmr, etendu: false };
      return { requete: q, resultats: index.chercher(q, { k: 5, prefixe: 'INT-' }).filter(garder), etendu: true };
    },
    repondre(question, lang = 'fr') {
      const { resultats, etendu } = this.chercher(question, lang);
      const trace = [{ agent: 'saisie', noeud: 'SRC', decision: 'TEXTE_SUR_APPAREIL', fragments: [] }, { agent: 'conseiller', noeud: 'M', decision: 'RECHERCHE_BM25', fragments: [] }];
      if (!resultats.length) {
        trace.push({ agent: 'conseiller', noeud: 'P', decision: 'BLOQUE_SANS_FONDEMENT', fragments: [] });
        return { verdict: 'BLOQUE_SANS_FONDEMENT', extraits: [], etendu: false, mention: MENTION[lang], trace };
      }
      const extraits = resultats.slice(0, MAX_EXTRAITS).map((r) => {
        const f = base.fragment(r.id, lang);
        return { id: r.id, idAffiche: f.idAffiche, doc: f.doc, titre: f.titre, article: f.article || f.section, page: f.page, statut: f.statut, extrait: extrait(f.texte, 400), traduction: f.traduction, mention: f.mention, langue: f.traduction ? 'en' : f.langue };
      });
      trace.push({ agent: 'conseiller', noeud: 'P', decision: 'AUTORISE', fragments: extraits.map((x) => x.id) });
      trace.push({ agent: 'conseiller', noeud: 'SINK', decision: 'EXTRAITS_CITES', fragments: [] });
      return { verdict: 'AUTORISE', extraits, etendu, mention: MENTION[lang], trace };
    },
  };
}
