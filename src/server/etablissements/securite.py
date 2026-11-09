"""NIU, mots de passe, codes et jetons (D-029 §4 et §9)."""
import hashlib
import hmac
import re
import secrets

# Q1 : n'importe quelle lettre majuscule au début et à la fin, 12 chiffres entre les deux (ex. M041618186649L).
MOTIF_NIU = re.compile(r"^[A-Z][0-9]{12}[A-Z]$")


def normaliser_niu(texte: str) -> str:
    return re.sub(r"\s+", "", str(texte or "")).upper()


def niu_valide(texte: str) -> bool:
    return bool(MOTIF_NIU.match(normaliser_niu(texte)))


# scrypt (bibliothèque standard) : fonction de hachage lente, en remplacement d'Argon2id ou bcrypt,
# absents de l'environnement (écart consigné dans les preuves).
_N, _R, _P = 2**14, 8, 1


def hacher_mot_de_passe(mot_de_passe: str) -> str:
    sel = secrets.token_bytes(16)
    empreinte = hashlib.scrypt(mot_de_passe.encode("utf-8"), salt=sel, n=_N, r=_R, p=_P, dklen=32)
    return f"scrypt${_N}${_R}${_P}${sel.hex()}${empreinte.hex()}"


def verifier_mot_de_passe(mot_de_passe: str, stocke: str) -> bool:
    try:
        algo, n, r, p, sel, empreinte = stocke.split("$")
        if algo != "scrypt":
            return False
        calcule = hashlib.scrypt(mot_de_passe.encode("utf-8"), salt=bytes.fromhex(sel),
                                 n=int(n), r=int(r), p=int(p), dklen=32)
        return hmac.compare_digest(calcule.hex(), empreinte)
    except (ValueError, TypeError):
        return False


def mot_de_passe_acceptable(mot_de_passe: str, niu: str, nom: str) -> str | None:
    """Renvoie un code d'erreur, ou None si le mot de passe est accepté."""
    if not isinstance(mot_de_passe, str) or len(mot_de_passe) < 10:
        return "E-ETS-MDP-COURT"
    bas = mot_de_passe.lower()
    if niu and normaliser_niu(niu).lower() in bas:
        return "E-ETS-MDP-CONTIENT-NIU"
    nom_simple = re.sub(r"\s+", "", (nom or "").lower())
    if len(nom_simple) >= 4 and nom_simple in re.sub(r"\s+", "", bas):
        return "E-ETS-MDP-CONTIENT-NOM"
    return None


def nouveau_code() -> str:
    return f"{secrets.randbelow(10**6):06d}"


def empreinte(texte: str) -> str:
    return hashlib.sha256(texte.encode("utf-8")).hexdigest()


def nouveau_jeton() -> str:
    return secrets.token_urlsafe(32)
