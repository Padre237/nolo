"""SF-007-09 et SF-007-10 (incrément démo D-025) — Journal d'audit en ajout seul, chaîné par SHA-256.

Conforme au §6 des contrats de gouvernance : sérialisation canonique, premier `hash_precedent` = 64 zéros,
contrôle récursif des champs interdits AVANT écriture (FR-713) ; une violation n'écrit jamais le contenu,
mais un événement `journal.violation_bloquee` vide, puis lève une erreur.
"""
from __future__ import annotations

import hashlib
import hmac as hmac_mod
import json
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Callable
from zoneinfo import ZoneInfo

DOUALA = ZoneInfo("Africa/Douala")
ZERO = "sha256:" + "0" * 64


class ChampInterdit(Exception):
    def __init__(self, champ: str):
        super().__init__(f"champ interdit dans un événement d'audit : {champ}")
        self.champ = champ


def canonique(evenement: dict) -> str:
    return json.dumps(evenement, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def empreinte(objet: Any) -> str:
    return "sha256:" + hashlib.sha256(canonique(objet).encode()).hexdigest()


def pseudonymiser(valeur: str, cle: bytes) -> str:
    """Pseudonyme HMAC-SHA256 (ADR-011) : stable pour une clé, non inversible."""
    return "hmac:" + hmac_mod.new(cle, valeur.encode(), hashlib.sha256).hexdigest()


class JournalAudit:
    """Journal JSON Lines en ajout seul. L'horloge est injectée (ADR-013)."""

    def __init__(self, chemin: Path, politique, horloge: Callable[[], datetime] | None = None,
                 regles: dict | None = None):
        self.chemin = Path(chemin)
        self.chemin.parent.mkdir(parents=True, exist_ok=True)
        self.politique = politique
        self.horloge = horloge or (lambda: datetime.now(DOUALA))
        self.regles = regles or {"fichier": "rules/triage_signes_alerte.v2.yaml", "version": "2.0.0"}
        self._interdits = set(politique.valeur("journal_audit.champs_interdits"))

    # -- contrôles -------------------------------------------------------------------------------
    def _verifier_champs(self, objet: Any, chemin: str = "") -> None:
        if isinstance(objet, dict):
            for k, v in objet.items():
                if k in self._interdits:
                    raise ChampInterdit(f"{chemin}{k}")
                self._verifier_champs(v, f"{chemin}{k}.")
        elif isinstance(objet, list):
            for i, v in enumerate(objet):
                self._verifier_champs(v, f"{chemin}{i}.")

    def _dernier_hash(self) -> str:
        if not self.chemin.exists() or self.chemin.stat().st_size == 0:
            return ZERO
        dernier = self.chemin.read_text(encoding="utf-8").rstrip("\n").rsplit("\n", 1)[-1]
        return json.loads(dernier)["hash"]

    # -- écriture --------------------------------------------------------------------------------
    def ecrire(self, *, agent: str, action: str, decision: str, mode: str, session: str = "anonyme",
               contributeurs: list[str] | None = None, entree_minimisee: dict | None = None,
               fragments: list[str] | None = None, cles_politique: list[str] | None = None,
               repli: str | None = None, justification_code: str = "", validateur_humain: dict | None = None,
               horodatage: datetime | None = None) -> dict:
        evt = {
            "event_id": f"evt-{uuid.uuid4()}",
            "horodatage": (horodatage or self.horloge()).isoformat(),
            "session": session,
            "mode": mode,
            "agent": agent,
            "contributeurs": contributeurs or [],
            "action": action,
            "entree_minimisee": entree_minimisee or {"categories": [], "destination": None,
                                                     "empreinte_entree": None, "entree": None},
            "fragments": fragments or [],
            "politique": {"version": self.politique.version, "empreinte": self.politique.empreinte,
                          "cles": cles_politique or []},
            "regles": self.regles,
            "decision": decision,
            "repli": repli,
            "justification_code": justification_code,
            "validateur_humain": validateur_humain,
        }
        try:
            self._verifier_champs(evt)
        except ChampInterdit:
            vide = {"event_id": f"evt-{uuid.uuid4()}", "horodatage": evt["horodatage"], "session": "anonyme",
                    "mode": mode, "agent": "journal", "contributeurs": [], "action": "journal.violation_bloquee",
                    "entree_minimisee": {"categories": [], "destination": None, "empreinte_entree": None,
                                         "entree": None},
                    "fragments": [], "politique": evt["politique"], "regles": self.regles, "decision": "BLOQUE",
                    "repli": None, "justification_code": "CHAMP_INTERDIT_JOURNAL", "validateur_humain": None}
            self._chainer_et_ecrire(vide)
            raise
        return self._chainer_et_ecrire(evt)

    def _chainer_et_ecrire(self, evt: dict) -> dict:
        evt["hash_precedent"] = self._dernier_hash()
        evt["hash"] = empreinte(evt)
        with open(self.chemin, "a", encoding="utf-8") as f:
            f.write(canonique(evt) + "\n")
        return evt

    # -- vérification de la chaîne (SF-007-11 partiel) --------------------------------------------
    def verifier_chaine(self) -> list[str]:
        erreurs: list[str] = []
        precedent = ZERO
        if not self.chemin.exists():
            return erreurs
        for i, ligne in enumerate(self.chemin.read_text(encoding="utf-8").splitlines(), 1):
            evt = json.loads(ligne)
            h = evt.pop("hash")
            if evt.get("hash_precedent") != precedent:
                erreurs.append(f"ligne {i} : hash_precedent inattendu")
            if empreinte(evt) != h:
                erreurs.append(f"ligne {i} : empreinte invalide")
            precedent = h
        return erreurs

    def lire(self) -> list[dict]:
        if not self.chemin.exists():
            return []
        return [json.loads(l) for l in self.chemin.read_text(encoding="utf-8").splitlines()]
