"""Localisation d'une position dans un arrondissement (D-032 §2) : polygones ADM3 seulement, hiérarchie par code INS."""
import json
import math
import pathlib

RAYON_REPLI_KM = 15.0  # Q5 : position hors polygone -> arrondissement le plus proche à moins de 15 km
NATIONAL = "NATIONAL"


def _anneaux(g):
    return [g["coordinates"]] if g["type"] == "Polygon" else g["coordinates"]


def _dans_anneau(x, y, r):
    dedans, j = False, len(r) - 1
    for i in range(len(r)):
        xi, yi = r[i][0], r[i][1]
        xj, yj = r[j][0], r[j][1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            dedans = not dedans
        j = i
    return dedans


def _km(lat):
    return 111.32 * math.cos(math.radians(lat)), 110.57


def _distance_segment_km(x, y, a, b):
    kx, ky = _km(y)
    ax, ay, bx, by = (a[0] - x) * kx, (a[1] - y) * ky, (b[0] - x) * kx, (b[1] - y) * ky
    dx, dy = bx - ax, by - ay
    n2 = dx * dx + dy * dy
    t = 0 if n2 == 0 else max(0, min(1, -(ax * dx + ay * dy) / n2))
    return math.hypot(ax + t * dx, ay + t * dy)


class Zones:
    def __init__(self, dossier: pathlib.Path):
        dossier = pathlib.Path(dossier)
        fc = json.loads((dossier / "arrondissements.geojson").read_text(encoding="utf-8"))
        self.hierarchie = json.loads((dossier / "hierarchie.json").read_text(encoding="utf-8"))
        self._carte = json.loads((dossier / "arrondissements-carte.geojson").read_text(encoding="utf-8"))
        self.attribution = {k: fc[k] for k in ("attribution", "licence", "licence_url")}
        self.polygones = []
        for f in fc["features"]:
            xs = [p[0] for poly in _anneaux(f["geometry"]) for r in poly for p in r]
            ys = [p[1] for poly in _anneaux(f["geometry"]) for r in poly for p in r]
            self.polygones.append((f["properties"], f["geometry"], (min(xs), min(ys), max(xs), max(ys))))
        self.par_id = {p["id"]: p for p, _, _ in self.polygones}
        self.noms_dep = {d["code"]: d["nom"] for d in self.hierarchie["departements"]}
        self.regions = {r["code"]: r for r in self.hierarchie["regions"]}

    def localiser(self, lat: float, lon: float):
        """Renvoie (identifiant de zone, mode) ; mode : 'dedans', 'proche' ou 'hors_zone'."""
        x, y = float(lon), float(lat)
        for props, g, b in self.polygones:
            if b[0] <= x <= b[2] and b[1] <= y <= b[3]:
                for poly in _anneaux(g):
                    if _dans_anneau(x, y, poly[0]) and not any(_dans_anneau(x, y, h) for h in poly[1:]):
                        return props["id"], "dedans"
        marge = RAYON_REPLI_KM / 100.0
        meilleur, dmin = None, RAYON_REPLI_KM
        for props, g, b in self.polygones:
            if not (b[0] - marge <= x <= b[2] + marge and b[1] - marge <= y <= b[3] + marge):
                continue
            for poly in _anneaux(g):
                for r in poly:
                    for i in range(len(r) - 1):
                        d = _distance_segment_km(x, y, r[i], r[i + 1])
                        if d < dmin:
                            dmin, meilleur = d, props["id"]
        return (meilleur, "proche") if meilleur else (NATIONAL, "hors_zone")

    def code_ins(self, zone_id):
        p = self.par_id.get(zone_id)
        return p["code_ins"] if p else None

    def libelle(self, niveau, code, langue="fr"):
        if niveau == "national":
            return "Cameroun" if langue == "fr" else "Cameroon"
        if niveau == "region":
            return self.regions[code][langue]
        if niveau == "departement":
            return self.noms_dep[code]
        return self.par_id[code]["nom"]

    def zone_valide(self, niveau, code):
        if niveau == "national":
            return True
        if niveau == "region":
            return code in self.regions
        if niveau == "departement":
            return code in self.noms_dep
        if niveau == "arrondissement":
            return code in self.par_id and self.par_id[code]["code_ins"] is not None
        return False

    def carte(self, niveau, code):
        """Arrondissements (géométrie simplifiée) de la zone demandée."""
        pref = "" if niveau == "national" else code
        feats = [f for f in self._carte["features"]
                 if f["properties"]["id"].startswith(pref) or (niveau == "national")]
        if niveau == "arrondissement":
            dep = code[:4]
            feats = [f for f in self._carte["features"] if f["properties"]["id"].startswith(dep)]
        return {"type": "FeatureCollection", **self.attribution, "features": feats}
