"""SF-001-03 (TASK-001-03-06) — Schéma fermé de la requête d'extraction : le texte nettoyé, rien d'autre
(jamais la tranche d'âge, D-023 ; aucun champ interdit du journal)."""
CHAMPS = {"texte"}
TAILLE_MAX = 32 * 1024


def valider(brut: bytes, corps) -> str | None:
    """Code d'erreur (§9 des exigences de SF-001-03) ou None."""
    if len(brut) > TAILLE_MAX:
        return "E-VAL-005"
    if not isinstance(corps, dict):
        return "E-VAL-001"
    if set(corps) - CHAMPS:
        return "E-VAL-004"
    if not isinstance(corps.get("texte"), str) or not corps["texte"].strip():
        return "E-VAL-001"
    return None
