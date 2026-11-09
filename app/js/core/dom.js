// Nolo — gabarits HTML sûrs et mise à jour du DOM sans perte du focus ni des saisies.

class Safe {
  constructor(value) { this.value = value; }
  toString() { return this.value; }
}

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

/** Insère une chaîne déjà sûre (balisage produit par le code, jamais par l'utilisateur). */
export const raw = (s) => new Safe(String(s));

function serialise(v) {
  if (v === null || v === undefined || v === false) return '';
  if (v instanceof Safe) return v.value;
  if (Array.isArray(v)) return v.map(serialise).join('');
  return escape(v);
}

/** Gabarit étiqueté : les valeurs sont échappées, sauf celles passées par raw() ou html``. */
export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += serialise(values[i]) + strings[i + 1];
  return new Safe(out);
}

/** Attributs booléens : attr('checked', vrai) → « checked » ou rien. */
export const attr = (name, on) => (on ? raw(` ${name}`) : '');

// ── Mise à jour minimale du DOM ────────────────────────────────────────────
const keyOf = (n) => (n.nodeType === 1 ? n.getAttribute('data-cle') || n.id || null : null);

function sameKind(a, b) {
  if (a.nodeType !== b.nodeType) return false;
  if (a.nodeType !== 1) return true;
  return a.tagName === b.tagName && keyOf(a) === keyOf(b);
}

function morphAttributes(from, to) {
  for (const { name } of [...from.attributes]) if (!to.hasAttribute(name)) from.removeAttribute(name);
  for (const { name, value } of [...to.attributes]) if (from.getAttribute(name) !== value) from.setAttribute(name, value);
  const tag = from.tagName;
  if (tag === 'INPUT') {
    const type = from.type;
    if (type === 'checkbox' || type === 'radio') {
      const want = to.hasAttribute('checked');
      if (from.checked !== want) from.checked = want;
    } else if (to.hasAttribute('value') && (document.activeElement !== from || from.hasAttribute('data-force'))) {
      // Champ contrôlé seulement : un champ sans attribut value (mot de passe, code) garde sa saisie.
      const want = to.getAttribute('value');
      if (from.value !== want) from.value = want;
    }
  } else if (tag === 'TEXTAREA') {
    if (document.activeElement !== from) {
      const want = to.textContent;
      if (from.value !== want) from.value = want;
    }
  } else if (tag === 'SELECT') {
    const sel = to.querySelector('option[selected]');
    if (sel && from.value !== sel.value) from.value = sel.value;
  }
}

function morphNode(from, to) {
  if (from.nodeType === 3 || from.nodeType === 8) {
    if (from.nodeValue !== to.nodeValue) from.nodeValue = to.nodeValue;
    return;
  }
  morphAttributes(from, to);
  if (from.tagName === 'TEXTAREA') return;
  if (from.hasAttribute('data-garder')) return; // zone gérée par du code (animation en cours)
  morphChildren(from, to);
}

function morphChildren(from, to) {
  const toNodes = [...to.childNodes];
  let cursor = from.firstChild;
  for (const want of toNodes) {
    // Chercher un nœud de même clé plus loin pour préserver l'état (focus, saisie).
    let match = null;
    const wantKey = keyOf(want);
    if (wantKey) {
      for (let n = cursor; n; n = n.nextSibling) if (keyOf(n) === wantKey && sameKind(n, want)) { match = n; break; }
    } else if (cursor && sameKind(cursor, want)) {
      match = cursor;
    }
    if (match) {
      if (match !== cursor) from.insertBefore(match, cursor);
      morphNode(match, want);
      cursor = match.nextSibling;
    } else {
      const fresh = want.cloneNode(true);
      from.insertBefore(fresh, cursor);
    }
  }
  while (cursor) { const next = cursor.nextSibling; from.removeChild(cursor); cursor = next; }
}

/** Remplace le contenu de `target` par `markup` en ne touchant que ce qui a changé. */
export function patch(target, markup) {
  const tpl = document.createElement('template');
  tpl.innerHTML = String(markup);
  morphChildren(target, tpl.content);
}
