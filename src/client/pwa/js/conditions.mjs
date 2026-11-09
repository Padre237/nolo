// Évaluation des conditions de la fiche : même règle que le serveur (fiches.py, condition_vraie).
export function conditionVraie(cond, reponses) {
  if (!cond) return true;
  if (cond.ou) return cond.ou.some((c) => conditionVraie(c, reponses));
  if (cond.et) return cond.et.every((c) => conditionVraie(c, reponses));
  const v = reponses[cond.champ];
  if ("egal" in cond) return v === cond.egal;
  if ("contient" in cond) return Array.isArray(v) && v.includes(cond.contient);
  throw new Error(`Condition inconnue : ${JSON.stringify(cond)}`);
}
