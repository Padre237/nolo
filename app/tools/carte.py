"""Extrait les 10 régions du Cameroun de Natural Earth (domaine public), simplifie (Douglas-Peucker), projette en chemins SVG."""
import json, math, sys
src, dst = sys.argv[1], sys.argv[2]
d = json.load(open(src, encoding='utf-8'))
feats = [f for f in d['features'] if f['properties'].get('adm0_a3') == 'CMR']
IDS = {'Adamaoua': 'adamaoua', 'Centre': 'centre', 'Est': 'est', 'Extrême-Nord': 'extreme-nord', 'Littoral': 'littoral', 'Nord': 'nord', 'Nord-Ouest': 'nord-ouest', 'Ouest': 'ouest', 'Sud': 'sud', 'Sud-Ouest': 'sud-ouest'}
LAT0 = 7.0
kx = math.cos(math.radians(LAT0))
def proj(lon, lat): return (lon * kx, -lat)
def dp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dmax, idx = 0, 0
    L = math.hypot(x2 - x1, y2 - y1) or 1e-12
    for i in range(1, len(pts) - 1):
        x0, y0 = pts[i]
        dd = abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / L
        if dd > dmax: dmax, idx = dd, i
    if dmax > eps: return dp(pts[:idx + 1], eps)[:-1] + dp(pts[idx:], eps)
    return [pts[0], pts[-1]]
rings = {}
allpts = []
for f in feats:
    g = f['geometry']; polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    rid = IDS[f['properties']['name']]
    rs = []
    for poly in polys:
        ring = [proj(*c) for c in poly[0]]
        m = len(ring) // 2
        s = dp(ring[:m + 1], 0.012)[:-1] + dp(ring[m:], 0.012)
        if len(s) >= 4: rs.append(s); allpts += s
    rings[rid] = rs
minx = min(p[0] for p in allpts); maxx = max(p[0] for p in allpts); miny = min(p[1] for p in allpts); maxy = max(p[1] for p in allpts)
W = 600; S = W / (maxx - minx); H = (maxy - miny) * S
def sv(p): return ((p[0] - minx) * S, (p[1] - miny) * S)
out = {}
for rid, rs in rings.items():
    path = ''; cx = cy = n = 0
    big = max(rs, key=len)
    for r in rs:
        q = [sv(p) for p in r]
        path += 'M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in q) + 'Z'
    # centre de gravité du plus grand anneau (aire signée)
    q = [sv(p) for p in big]; A = 0
    for i in range(len(q) - 1):
        x0, y0 = q[i]; x1, y1 = q[i + 1]; c = x0 * y1 - x1 * y0; A += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c
    A /= 2; cx /= (6 * A); cy /= (6 * A)
    out[rid] = {'d': path, 'cx': round(cx, 1), 'cy': round(cy, 1)}
js = "// Limites des 10 régions du Cameroun — Natural Earth 1:10m, admin 1 (domaine public), simplifiées.\n"
js += f"// Projection équirectangulaire (cos 7°). Généré par outils/carte.py ; ne pas modifier à la main.\nexport const VUE = {{ largeur: {W}, hauteur: {round(H)} }};\n"
js += "export const REGIONS_SVG = " + json.dumps(out, ensure_ascii=False) + ";\n"
open(dst, 'w', encoding='utf-8').write(js)
print('octets', len(js), 'hauteur', round(H), {k: len(v['d']) for k, v in out.items()})
