// Nolo — état de l'application. Une seule source ; les écrans lisent, les actions écrivent.

const PREFIXE = 'nolo:';

export const local = {
  read(key, fallback = null) {
    try {
      const v = localStorage.getItem(PREFIXE + key);
      return v === null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem(PREFIXE + key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove(key) { try { localStorage.removeItem(PREFIXE + key); } catch { /* stockage indisponible */ } },
};

export function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set(patch) {
      const next = typeof patch === 'function' ? patch(state) : patch;
      state = { ...state, ...next };
      listeners.forEach((fn) => fn(state));
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
}
