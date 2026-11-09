// Nolo — position de la personne (SF-008-03) : demandée seulement au moment d'une recherche, après avoir dit
// pourquoi ; arrondie à 2 décimales (≈ 1 km) dès la lecture ; gardée en mémoire de l'onglet, jamais stockée ni
// envoyée. Refus : choix d'un quartier. Page dans un cadre : point de référence de démonstration, et on le dit.
import { versKm } from './facilities.js';

export const arrondir = (lat, lon) => ({ lat: Math.round(lat * 100) / 100, lon: Math.round(lon * 100) / 100 });

/** Quartiers du district de démonstration (fictifs), en km depuis le point de référence. */
export const QUARTIERS = [
  { id: 'reference', x: 0, y: 0 },
  { id: 'carrefour', x: 0.7, y: -0.5 },
  { id: 'colline', x: 1.4, y: -0.9 },
  { id: 'marche', x: -1.2, y: 1.0 },
  { id: 'bois-vert', x: 3.1, y: 1.2 },
  { id: 'palmiers', x: 3.5, y: -2.4 },
  { id: 'rive', x: -6.6, y: 3.6 },
  { id: 'plateau', x: 8.4, y: -5.2 },
];
/** Au-delà, la personne est hors du district de démonstration : les distances partent du point de référence. */
export const RAYON_DISTRICT_KM = 60;

/** Point de départ des distances (km) pour une position lue, un quartier ou la référence. */
export function depart(position) {
  if (!position) return { x: 0, y: 0, horsDistrict: false };
  if (position.source === 'quartier') { const q = QUARTIERS.find((x) => x.id === position.quartier) || QUARTIERS[0]; return { x: q.x, y: q.y, horsDistrict: false }; }
  if (position.source === 'gps') {
    const p = versKm(position.lat, position.lon);
    if (Math.hypot(p.x, p.y) > RAYON_DISTRICT_KM) return { x: 0, y: 0, horsDistrict: true };
    return { ...p, horsDistrict: false };
  }
  return { x: 0, y: 0, horsDistrict: false };
}

/** Demande la position (consentement au moment de l'action) ; résout { source: 'gps' | 'refus' | 'reference', … }. */
export function demanderPosition({ encadre = false, geolocation = globalThis.navigator?.geolocation } = {}) {
  if (encadre || !geolocation) return Promise.resolve({ source: 'reference' });
  return new Promise((resoudre) => {
    geolocation.getCurrentPosition(
      (p) => resoudre({ source: 'gps', ...arrondir(p.coords.latitude, p.coords.longitude) }),
      () => resoudre({ source: 'refus' }),
      { enableHighAccuracy: false, maximumAge: 600000, timeout: 10000 },
    );
  });
}
