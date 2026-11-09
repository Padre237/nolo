"""SF-007-01 (incrément démo D-025) — Accès à la politique (`config/policy.yaml`), §7 des contrats.

Toute valeur juridique utilisée par le code passe par `Politique.valeur` ; aucun agent ne lit le YAML
directement. `variante` produit une copie en mémoire pour la simulation « et si » (FR-707) : rien n'est
écrit sur disque.
"""
from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path
from typing import Any

import yaml


class ClePolitiqueInconnue(KeyError):
    pass


def _canonique(donnees: Any) -> str:
    return json.dumps(donnees, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


class Politique:
    def __init__(self, donnees: dict, version: str, empreinte: str, variante_de: str | None = None):
        self._d = donnees
        self.version = version
        self.empreinte = empreinte
        self.variante_de = variante_de  # version d'origine si c'est une variante de simulation

    @classmethod
    def charger(cls, chemin: Path) -> "Politique":
        brut = Path(chemin).read_bytes()
        donnees = yaml.safe_load(brut)
        return cls(donnees, str(donnees["version"]), "sha256:" + hashlib.sha256(brut).hexdigest())

    def _noeud(self, chemin: str):
        noeud = self._d
        parents = []
        for seg in chemin.split("."):
            if not isinstance(noeud, dict) or seg not in noeud:
                raise ClePolitiqueInconnue(chemin)
            parents.append(noeud)
            noeud = noeud[seg]
        return noeud, parents

    def valeur(self, chemin: str) -> Any:
        """Valeur à ce chemin ; un nœud `{valeur: …, statut: …, sources: …}` renvoie sa `valeur`."""
        noeud, _ = self._noeud(chemin)
        if isinstance(noeud, dict) and "valeur" in noeud:
            return noeud["valeur"]
        return noeud

    def source(self, chemin: str) -> list[str]:
        """`chunk_ids` déclarés à côté de la clé, ou chez l'ancêtre le plus proche qui en déclare."""
        noeud, parents = self._noeud(chemin)
        if isinstance(noeud, dict) and noeud.get("sources"):
            return list(noeud["sources"])
        for p in reversed(parents):
            if isinstance(p, dict) and p.get("sources"):
                return list(p["sources"])
        return []

    def variante(self, changements: dict[str, Any]) -> "Politique":
        """Copie de simulation (FR-707) : `{chemin: nouvelle_valeur}` ; jamais écrite sur disque."""
        d = copy.deepcopy(self._d)
        for chemin, v in changements.items():
            noeud = d
            segs = chemin.split(".")
            for seg in segs[:-1]:
                noeud = noeud.setdefault(seg, {})
            dernier = segs[-1]
            if isinstance(noeud.get(dernier), dict) and "valeur" in noeud[dernier]:
                noeud[dernier]["valeur"] = v
            else:
                noeud[dernier] = v
        empreinte = "sha256:" + hashlib.sha256(_canonique(d).encode()).hexdigest()
        return Politique(d, f"{self.version}+variante", empreinte, variante_de=self.version)
