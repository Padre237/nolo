"""Prépare le référentiel des zones (D-032) à partir des polygones OpenStreetMap et des listes de codes INS.

Entrées (donnees/zones/) : sources/cmr_ADM3.geojson, sources/arrondissements.csv, sources/departements.csv,
correspondance-arrondissements.csv (colonne code_ins_valide remplie par l'équipe).
Sorties (donnees/zones/) : arrondissements.geojson (géométrie complète, pour la localisation),
arrondissements-carte.geojson (géométrie simplifiée, pour l'affichage), hierarchie.json.
Données © contributeurs OpenStreetMap, ODbL 1.0 : voir donnees/zones/LICENCE-ODbL.md.

Usage : python3 -I tools/preparer_zones.py
"""
import csv
import json
import pathlib
import unicodedata

RACINE = pathlib.Path(__file__).resolve().parent.parent
Z = RACINE / "donnees" / "zones"
REGIONS = {  # préfixe INS -> (code à 2 lettres du CSV, français, anglais)
    "01": ("AD", "Adamaoua", "Adamawa"), "02": ("CE", "Centre", "Centre"), "03": ("ES", "Est", "East"),
    "04": ("EN", "Extrême-Nord", "Far North"), "05": ("LT", "Littoral", "Littoral"), "06": ("NO", "Nord", "North"),
    "07": ("NW", "Nord-Ouest", "North-West"), "08": ("OU", "Ouest", "West"), "09": ("SU", "Sud", "South"),
    "10": ("SW", "Sud-Ouest", "South-West"),
}
TOLERANCE_CARTE = 0.004  # degrés (~400 m) : suffisant pour une carte par classes


def cle(s):
    s = s.replace("’", "'")
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return "".join(c if c.isalnum() else "-" for c in s).strip("-")


def simplifier(points, tol):
    """Douglas-Peucker itératif sur un anneau fermé."""
    if len(points) <= 5:
        return points
    garder = [False] * len(points)
    garder[0] = garder[-1] = True
    pile = [(0, len(points) - 1)]
    while pile:
        a, b = pile.pop()
        (x1, y1), (x2, y2) = points[a][:2], points[b][:2]
        dmax, imax = 0.0, None
        dx, dy = x2 - x1, y2 - y1
        n2 = dx * dx + dy * dy
        for i in range(a + 1, b):
            x, y = points[i][:2]
            if n2 == 0:
                d = ((x - x1) ** 2 + (y - y1) ** 2) ** 0.5
            else:
                t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / n2))
                d = ((x - x1 - t * dx) ** 2 + (y - y1 - t * dy) ** 2) ** 0.5
            if d > dmax:
                dmax, imax = d, i
        if imax is not None and dmax > tol:
            garder[imax] = True
            pile += [(a, imax), (imax, b)]
    res = [[round(p[0], 4), round(p[1], 4)] for p, k in zip(points, garder) if k]
    return res if len(res) >= 4 else [[round(p[0], 4), round(p[1], 4)] for p in points]


def simplifier_geom(g):
    if g["type"] == "Polygon":
        return {"type": "Polygon", "coordinates": [simplifier(r, TOLERANCE_CARTE) for r in g["coordinates"]]}
    return {"type": "MultiPolygon", "coordinates": [[simplifier(r, TOLERANCE_CARTE) for r in p] for p in g["coordinates"]]}


def main():
    deps = {r["code_ins"]: r for r in csv.DictReader(open(Z / "sources" / "departements.csv", encoding="utf-8"))}
    arrs = {r["code_ins"]: r for r in csv.DictReader(open(Z / "sources" / "arrondissements.csv", encoding="utf-8"))}
    corr = {r["polygone_adm3"]: r for r in csv.DictReader(open(Z / "correspondance-arrondissements.csv", encoding="utf-8"), delimiter=";")}
    src = json.load(open(Z / "sources" / "cmr_ADM3.geojson", encoding="utf-8"))
    complet, carte, valides, provisoires = [], [], 0, 0
    for f in src["features"]:
        nom = f["properties"]["name"]
        code = (corr.get(nom, {}).get("code_ins_valide") or "").strip()
        if code and code in arrs:
            valides += 1
            r = REGIONS[code[:2]]
            props = {"id": code, "code_ins": code, "nom": arrs[code]["label"], "nom_polygone": nom,
                     "departement_code": code[:4], "departement": deps[code[:4]]["label"],
                     "region_prefixe": code[:2], "region_code": r[0], "region_fr": r[1], "region_en": r[2]}
        else:
            provisoires += 1
            props = {"id": f"PROV-{cle(nom)}", "code_ins": None, "nom": nom, "nom_polygone": nom,
                     "departement_code": None, "departement": None, "region_prefixe": None,
                     "region_code": None, "region_fr": None, "region_en": None}
        complet.append({"type": "Feature", "properties": props, "geometry": f["geometry"]})
        carte.append({"type": "Feature", "properties": {k: props[k] for k in ("id", "nom", "departement_code", "region_prefixe")},
                      "geometry": simplifier_geom(f["geometry"])})
    entete = {"attribution": "© OpenStreetMap contributors", "licence": "ODbL 1.0",
              "licence_url": "https://www.openstreetmap.org/copyright"}
    (Z / "arrondissements.geojson").write_text(json.dumps({"type": "FeatureCollection", **entete, "features": complet},
                                                          ensure_ascii=False), encoding="utf-8")
    (Z / "arrondissements-carte.geojson").write_text(json.dumps({"type": "FeatureCollection", **entete, "features": carte},
                                                                ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    hier = {"regions": [{"code": p, "lettres": r[0], "fr": r[1], "en": r[2]} for p, r in REGIONS.items()],
            "departements": [{"code": c, "nom": d["label"], "region": c[:2]} for c, d in sorted(deps.items())],
            "arrondissements": sorted([{"code": f["properties"]["code_ins"], "nom": f["properties"]["nom"],
                                        "departement": f["properties"]["departement_code"]}
                                       for f in complet if f["properties"]["code_ins"]], key=lambda a: a["code"]),
            **entete}
    (Z / "hierarchie.json").write_text(json.dumps(hier, ensure_ascii=False, indent=1), encoding="utf-8")
    sommets = lambda fc: sum(len(r) for f in fc for poly in ([f["geometry"]["coordinates"]] if f["geometry"]["type"] == "Polygon" else f["geometry"]["coordinates"]) for r in poly)
    print(f"Arrondissements : {valides} avec code INS validé, {provisoires} provisoires (niveau national seulement)")
    print(f"Sommets : {sommets(complet)} (localisation) -> {sommets(carte)} (carte) ; "
          f"taille carte : {(Z / 'arrondissements-carte.geojson').stat().st_size // 1024} Ko")


if __name__ == "__main__":
    main()
