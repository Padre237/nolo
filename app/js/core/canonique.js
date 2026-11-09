// Nolo — sérialisation canonique, identique à `json.dumps(sort_keys=True, separators=(",", ":"),
// ensure_ascii=False)` de la référence Python : mêmes empreintes de part et d'autre (FR-1903, FR-1944).
import { sha256Hex } from './sha256.js';

function nombre(n) {
  if (!Number.isFinite(n)) throw new Error(`nombre non sérialisable : ${n}`);
  return JSON.stringify(n);
}

export function canonique(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'number') return nombre(v);
  if (typeof v === 'string' || typeof v === 'boolean') return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(canonique).join(',')}]`;
  const cles = Object.keys(v).filter((k) => v[k] !== undefined).sort();
  return `{${cles.map((k) => `${JSON.stringify(k)}:${canonique(v[k])}`).join(',')}}`;
}

/** « sha256:<hex> » de la forme canonique. */
export const empreinte = (v) => `sha256:${sha256Hex(canonique(v))}`;
