"""Journal d'audit en ajout seul, chaîné par SHA-256 (Principe VIII).

Version autonome pour cette livraison : à brancher sur le journal du dépôt à l'intégration.
"""
import hashlib
import json
import pathlib
import threading

CHAMPS_INTERDITS = {"mot_de_passe", "code", "jeton", "email", "langue", "numero_ordre"}


class Journal:
    def __init__(self, chemin: pathlib.Path):
        self.chemin = pathlib.Path(chemin)
        self.chemin.parent.mkdir(parents=True, exist_ok=True)
        self._verrou = threading.Lock()

    def _dernier_hash(self) -> str:
        if not self.chemin.exists():
            return "0" * 64
        dernier = "0" * 64
        with self.chemin.open(encoding="utf-8") as f:
            for ligne in f:
                if ligne.strip():
                    dernier = json.loads(ligne)["hash"]
        return dernier

    def ecrire(self, horodatage: str, acteur: str, action: str, details: dict | None = None) -> dict:
        details = details or {}
        interdits = CHAMPS_INTERDITS & set(details)
        if interdits:
            raise ValueError(f"Champs interdits dans le journal : {sorted(interdits)}")
        with self._verrou:
            precedent = self._dernier_hash()
            entree = {"horodatage": horodatage, "acteur": acteur, "action": action,
                      "details": details, "precedent": precedent}
            canon = json.dumps(entree, sort_keys=True, ensure_ascii=False)
            entree["hash"] = hashlib.sha256((precedent + canon).encode("utf-8")).hexdigest()
            with self.chemin.open("a", encoding="utf-8") as f:
                f.write(json.dumps(entree, ensure_ascii=False) + "\n")
            return entree

    def lire(self, acteur: str | None = None) -> list[dict]:
        if not self.chemin.exists():
            return []
        with self.chemin.open(encoding="utf-8") as f:
            entrees = [json.loads(l) for l in f if l.strip()]
        return [e for e in entrees if acteur is None or e["acteur"] == acteur]

    def verifier_chaine(self) -> bool:
        precedent = "0" * 64
        for e in self.lire():
            copie = {k: v for k, v in e.items() if k != "hash"}
            if copie["precedent"] != precedent:
                return False
            canon = json.dumps(copie, sort_keys=True, ensure_ascii=False)
            if hashlib.sha256((precedent + canon).encode("utf-8")).hexdigest() != e["hash"]:
                return False
            precedent = e["hash"]
        return True
