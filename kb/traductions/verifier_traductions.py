#!/usr/bin/env python3
"""Contrôle des traductions de citations et du glossaire de requêtes (D-027). Outillage de la base, hors produit.

Usage (depuis le dossier kb/) : python3 traductions/verifier_traductions.py
Code de sortie 0 si tout est conforme, 1 sinon.

Contrôles :
  1. chaque `chunk_id` de citations_en.yaml existe dans kb_chunks.jsonl, une seule fois ;
  2. l'empreinte SHA-256 du champ `text` du fragment est égale à `empreinte_sha256_fragment`
     (un fragment relu ou corrigé invalide sa traduction, qui doit être revue) ;
  3. le statut est admis ; une traduction `non_officielle` a un texte (intégral) ou des passages (extrait),
     et chaque `texte_source` d'un extrait figure mot pour mot dans le fragment ;
  4. aucun texte de traduction ne prétend être officiel ; une entrée « anglais_officiel_dans_la_base » désigne un fragment
     anglais existant, de même rang que le fragment français (versions alignées article par section) ;
  5. chaque terme français du glossaire apparaît dans au moins un fragment (comparaison sans accents ni casse),
     et aucune expression anglaise n'est rattachée à deux entrées.
"""
from __future__ import annotations

import hashlib
import json
import sys
import unicodedata
from pathlib import Path

import yaml

KB = Path(__file__).resolve().parent.parent


def plat(t: str) -> str:
    t = unicodedata.normalize("NFD", t.replace("’", "'"))
    return "".join(c for c in t if unicodedata.category(c) != "Mn").lower()


def main() -> int:
    fragments: dict[str, str] = {}
    doublons = []
    for ligne in open(KB / "kb_chunks.jsonl", encoding="utf-8"):
        c = json.loads(ligne)
        if c["chunk_id"] in fragments:
            doublons.append(c["chunk_id"])
        fragments[c["chunk_id"]] = c["text"]
    erreurs: list[str] = [f"fragment en double dans la base : {d}" for d in doublons]

    cit = yaml.safe_load(open(KB / "traductions" / "citations_en.yaml", encoding="utf-8"))
    admis = set(cit["statuts_admis"])
    vus = set()
    compte = {s: 0 for s in admis}
    for e in cit["entrees"]:
        cid = e["chunk_id"]
        if cid in vus:
            erreurs.append(f"{cid} : entrée en double")
        vus.add(cid)
        if cid not in fragments:
            erreurs.append(f"{cid} : fragment absent de la base")
            continue
        emp = hashlib.sha256(fragments[cid].encode("utf-8")).hexdigest()
        if e.get("empreinte_sha256_fragment") != emp:
            erreurs.append(f"{cid} : empreinte différente, le fragment a changé, traduction à revoir")
        st = e.get("statut_traduction")
        if st not in admis:
            erreurs.append(f"{cid} : statut inconnu {st}")
            continue
        compte[st] += 1
        if st == "non_officielle":
            if e.get("portee") == "integrale" and not e.get("traduction_en"):
                erreurs.append(f"{cid} : traduction intégrale vide")
            if e.get("portee") == "extrait":
                if not e.get("passages"):
                    erreurs.append(f"{cid} : extrait sans passage")
                for p in e.get("passages", []):
                    if p["texte_source"] not in fragments[cid]:
                        erreurs.append(f"{cid} : passage introuvable mot pour mot : {p['texte_source'][:60]}…")
                    if not p.get("traduction_en"):
                        erreurs.append(f"{cid} : passage sans traduction")
            textes = [e.get("traduction_en") or ""] + [p.get("traduction_en", "") for p in e.get("passages", [])]
            if any("official translation" in t.lower() and "unofficial" not in t.lower() for t in textes):
                erreurs.append(f"{cid} : un texte se présente comme traduction officielle")
        if st == "anglais_officiel_dans_la_base":
            en = e.get("chunk_id_en")
            if en not in fragments:
                erreurs.append(f"{cid} : fragment anglais officiel absent de la base ({en})")
            elif en.split("::")[1] != cid.split("::")[1]:
                erreurs.append(f"{cid} : fragment anglais {en} non aligné sur le fragment français")
        if st == "version_anglaise_officielle_a_verser" and not e.get("source_anglaise"):
            erreurs.append(f"{cid} : source anglaise officielle non indiquée")

    glo = yaml.safe_load(open(KB / "traductions" / "glossaire_requetes.yaml", encoding="utf-8"))
    corpus = plat("\n".join(fragments.values()))
    absents, anglais = [], {}
    for i, e in enumerate(glo["entrees"]):
        for fr in e["fr"]:
            if plat(fr) not in corpus:
                absents.append(fr)
        for en in e["en"]:
            if en.lower() in anglais:
                erreurs.append(f"glossaire : « {en} » rattachée aux entrées {anglais[en.lower()]} et {i}")
            anglais[en.lower()] = i
    erreurs += [f"glossaire : terme français absent de la base : « {a} »" for a in absents]

    nb_fr = sum(len(e["fr"]) for e in glo["entrees"])
    print(f"citations : {len(cit['entrees'])} entrées — " + ", ".join(f"{k} : {v}" for k, v in sorted(compte.items())))
    print(f"glossaire : {len(glo['entrees'])} entrées, {len(anglais)} expressions anglaises, "
          f"{nb_fr} termes français, {nb_fr - len(absents)} retrouvés dans la base")
    for e in erreurs:
        print("KO ", e)
    print("conforme" if not erreurs else f"{len(erreurs)} erreur(s)")
    return 0 if not erreurs else 1


if __name__ == "__main__":
    sys.exit(main())
