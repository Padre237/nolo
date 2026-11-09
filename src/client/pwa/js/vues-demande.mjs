// Vues « Mes indicateurs » et « Tendances de la demande » (D-032).
// Couleurs : dégradé ordinal bleu validé (dataviz, --ordinal, fond clair) ; « moins de 5 » hachuré ; jamais la couleur seule.

export const COULEURS_CLASSES = ["#86b6ef", "#5598e7", "#2a78d6", "#1c5cab", "#0d366b"];
const BARRE = "#2a78d6";
const SVGNS = "http://www.w3.org/2000/svg";

function svg(tag, attrs = {}, ...enfants) {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) n.setAttribute(k, v);
  for (const e of enfants.flat()) if (e != null) n.append(e instanceof Node ? e : document.createTextNode(String(e)));
  return n;
}

function infobulle(cible, texte) {
  const bulle = document.getElementById("infobulle");
  const montrer = (e) => {
    bulle.textContent = typeof texte === "function" ? texte() : texte;
    bulle.hidden = false;
    const x = Math.min(e.clientX + 12, window.innerWidth - bulle.offsetWidth - 8);
    bulle.style.left = `${x}px`;
    bulle.style.top = `${e.clientY + 14}px`;
  };
  cible.addEventListener("pointermove", montrer);
  cible.addEventListener("pointerenter", montrer);
  cible.addEventListener("pointerleave", () => { bulle.hidden = true; });
}

// ------------------------------------------------------------------ Mes indicateurs
export function vueIndicateurs({ el, t, etat }) {
  const i = etat.indicateurs;
  if (!i) return el("p", {}, "…");
  const s = i.stock;
  const tuile = (id, etiquette, valeur, detail) => el("div", { class: "tuile", id: `ind-${id}` },
    el("div", { class: "etiquette" }, etiquette), el("div", { class: "valeur" }, valeur), detail ? el("div", { class: "detail" }, detail) : null);
  const heures = s.secondes_restantes ? t("expire_dans", { h: Math.floor(s.secondes_restantes / 3600), m: Math.floor((s.secondes_restantes % 3600) / 60) }) : t("expire");
  const imp = i.dernier_import;
  return el("div", {}, el("h2", {}, t("ind_titre")),
    el("div", { class: "tuiles" },
      i.visible ? tuile("visibilite", t("ind_visibilite"), t("ind_visible_oui"))
        : i.visibilite === "VERIFIE" ? tuile("visibilite", t("ind_visibilite"), t("ind_sans_stock"), t("ind_sans_stock_aide"))
        : tuile("visibilite", t("ind_visibilite"), t("ind_visible_non"), t(`vis_${i.visibilite}`, { motif: "" })),
      tuile("fraicheur", t("ind_fraicheur"), s.lignes ? heures : t("ind_aucun")),
      tuile("lignes", t("ind_lignes"), String(s.lignes), t("ind_lignes_detail", { d: s.par_niveau.disponible, f: s.par_niveau.faible, r: s.par_niveau.rupture })),
      tuile("rupture", t("ind_rupture"), s.taux_rupture == null ? t("ind_aucun") : `${s.taux_rupture}\u00a0%`),
      tuile("import", t("ind_import"), imp ? `${imp.acceptees}/${imp.acceptees + imp.rejetees}` : t("ind_aucun"),
        imp ? [t("ind_import_detail", { a: imp.acceptees, r: imp.rejetees }), ...Object.entries(imp.motifs || {}).map(([m, n]) => ` · ${t(`motif_${m}`, { suggestion: "…" })} : ${n}`)].join("") : null),
      tuile("fiche", t("ind_fiche"), `${i.fiche.repondues}/${i.fiche.questions}`,
        t("ind_fiche_detail", { r: i.fiche.repondues, q: i.fiche.questions, p: t(i.fiche.photo_facade ? "opt_oui" : "opt_non") })),
      tuile("regularite", t("ind_regularite"), i.regularite_30j == null ? t("ind_aucun") : `${i.regularite_30j}\u00a0%`, t("ind_regularite_aide"))),
    el("p", { class: "note" }, t("ind_fiabilite_bientot")));
}

// ------------------------------------------------------------------ Tendances
const libelleService = (etat, type, code) => {
  const liste = etat.servicesRef?.[type] || [];
  return liste.find((x) => x.code === code)?.[etat.langue] || code;
};

export function vueTendances(ctx) {
  const { el, t, etat } = ctx;
  if (etat.profil.visibilite !== "VERIFIE") return el("div", { class: "message info", id: "tend-non-verifie" }, t("tend_non_verifie"));
  const r = etat.tendances;
  const f = etat.filtresTend;
  return el("div", {}, el("h2", {}, t("tend_titre")), el("p", { class: "aide" }, t("tend_intro")),
    filtres(ctx),
    el("p", { class: "note" }, t("tend_garde_fous")), el("p", { class: "note" }, t("tend_demo")),
    r ? el("div", { id: "tend-resultats" },
      el("p", { id: "tend-zone" }, t("tend_zone", { zone: libelleZone(ctx, r) }), " · ",
        t("tend_total", { v: r.total == null ? t("moins_de_5") : r.total.toLocaleString(etat.langue) })),
      el("div", { class: "carte" }, el("h3", {}, t("tend_top")), el("p", { class: "note" }, t("tend_top_aide")), classement(ctx, r)),
      el("div", { class: "carte" }, el("h3", {}, t("tend_non_sat")), el("p", { class: "note" }, t("tend_non_sat_aide")), nonSatisfaite(ctx, r)),
      el("div", { class: "carte" }, el("h3", {}, t("tend_serie"), f.service ? ` : ${libelleService(etat, f.typeService, f.service)}` : ""), serie(ctx, r)),
      el("div", { class: "carte" }, el("h3", {}, t("tend_carte")), el("div", { id: "carte-zone" }, "…"), legendeCarte(ctx),
        el("p", { class: "attribution" }, el("a", { href: "https://www.openstreetmap.org/copyright", target: "_blank", rel: "noopener" }, t("attribution")))))
      : el("p", {}, "…"));
}

function libelleZone({ etat, t }, r) {
  const h = etat.zonesRef;
  if (r.niveau === "national") return t("niv_national");
  if (r.niveau === "region") return h.regions.find((x) => x.code === r.zone)?.[etat.langue] || r.zone;
  if (r.niveau === "departement") return h.departements.find((x) => x.code === r.zone)?.nom || r.zone;
  return h.arrondissements.find((x) => x.code === r.zone)?.nom || r.zone;
}

function filtres(ctx) {
  const { el, t, etat, recharger } = ctx;
  const f = etat.filtresTend;
  const h = etat.zonesRef;
  const select = (id, cle, options, valeur, onchange) => el("div", {}, el("label", { for: id }, t(cle)),
    el("select", { id, onchange: (e) => onchange(e.target.value) }, options.map(([v, l]) => el("option", { value: v, selected: v === valeur }, l))));
  const regionDe = f.region || (f.zone || "").slice(0, 2);
  const depDe = f.departement || (f.zone || "").slice(0, 4);
  const champs = [
    select("f-niveau", "f_niveau", [["ma_zone", t("niv_ma_zone")], ["national", t("niv_national")], ["region", t("niv_region")],
      ["departement", t("niv_departement")], ["arrondissement", t("niv_arrondissement")]], f.niveau, (v) => {
      f.niveau = v;
      if (v === "region") f.region = f.region || etat.tendances?.zone_etablissement?.slice(0, 2) || "05";
      if (v === "departement" || v === "arrondissement") {
        f.region = f.region || etat.tendances?.zone_etablissement?.slice(0, 2) || "05";
        f.departement = f.departement || etat.tendances?.zone_etablissement?.slice(0, 4) || h.departements.find((d) => d.region === f.region).code;
      }
      if (v === "arrondissement") f.arrondissement = f.arrondissement || etat.tendances?.zone_etablissement || h.arrondissements.find((a) => a.departement === f.departement)?.code;
      recharger();
    }),
  ];
  if (["region", "departement", "arrondissement"].includes(f.niveau)) {
    champs.push(select("f-region", "f_region", h.regions.map((x) => [x.code, x[etat.langue]]), f.region, (v) => {
      f.region = v; f.departement = h.departements.find((d) => d.region === v).code;
      f.arrondissement = h.arrondissements.find((a) => a.departement === f.departement)?.code; recharger();
    }));
  }
  if (["departement", "arrondissement"].includes(f.niveau)) {
    champs.push(select("f-departement", "f_departement", h.departements.filter((d) => d.region === f.region).map((d) => [d.code, d.nom]), f.departement, (v) => {
      f.departement = v; f.arrondissement = h.arrondissements.find((a) => a.departement === v)?.code; recharger();
    }));
  }
  if (f.niveau === "arrondissement") {
    champs.push(select("f-arrondissement", "f_arrondissement", h.arrondissements.filter((a) => a.departement === f.departement).map((a) => [a.code, a.nom]),
      f.arrondissement, (v) => { f.arrondissement = v; recharger(); }));
  }
  champs.push(select("f-type", "f_type", [["", t("type_tous")], ["medicament", t("type_medicament")], ["specialite", t("type_specialite")], ["sang", t("type_sang")]],
    f.type, (v) => { f.type = v; if (f.typeService && v && v !== f.typeService) { f.service = ""; f.typeService = ""; } recharger(); }));
  const typesListe = f.type ? [f.type] : ["medicament", "specialite", "sang"];
  const opts = [["", t("service_tous")], ...typesListe.flatMap((ty) => (etat.servicesRef?.[ty] || []).map((x) => [`${ty}:${x.code}`, x[etat.langue]]))];
  champs.push(select("f-service", "f_service", opts, f.service ? `${f.typeService}:${f.service}` : "", (v) => {
    [f.typeService, f.service] = v ? v.split(":") : ["", ""]; recharger();
  }));
  champs.push(select("f-periode", "f_periode", [4, 8, 12].map((n) => [String(n), t("periode_n", { n })]), String(f.semaines), (v) => { f.semaines = Number(v); recharger(); }));
  void regionDe; void depDe;
  return el("div", { class: "carte filtres", id: "filtres-tendances" }, champs);
}

function classement(ctx, r) {
  const { el, t, etat, recharger } = ctx;
  if (!r.plus_recherches.length) return el("p", {}, t("tend_vide"));
  const max = Math.max(...r.plus_recherches.map((x) => x.valeur));
  const f = etat.filtresTend;
  return el("div", { class: "rang", id: "tend-top", role: "list" }, r.plus_recherches.flatMap((x) => {
    const libelle = libelleService(etat, x.type, x.service);
    const choisi = f.service === x.service && f.typeService === x.type;
    const piste = el("div", { class: "piste", "aria-hidden": "true" }, el("div", { class: "barre", style: `width:${Math.max(2, (100 * x.valeur) / max)}%` }));
    infobulle(piste, `${libelle} : ${x.valeur}${x.tendance ? ` (${t(`tendance_${x.tendance}`)})` : ""}`);
    return [
      el("button", { type: "button", class: "lien", role: "listitem", "aria-pressed": String(choisi), "data-service": x.service,
        onclick: () => { f.typeService = x.type; f.service = x.service; recharger(); } }, libelle),
      piste,
      el("span", { class: "chiffre" }, x.valeur.toLocaleString(etat.langue),
        x.tendance ? el("span", { class: "fleche" }, `${x.tendance === "hausse" ? "▲" : "▼"} ${t(`tendance_${x.tendance}`)}`) : null),
    ];
  }));
}

function nonSatisfaite({ el, t, etat }, r) {
  if (!r.non_satisfaite.length) return el("p", {}, t("tend_vide"));
  return el("div", { class: "defilement" }, el("table", { id: "tend-non-sat" },
    el("thead", {}, el("tr", {}, ["col_service", "col_non_sat", "col_part"].map((c) => el("th", {}, t(c))))),
    el("tbody", {}, r.non_satisfaite.map((x) => el("tr", {}, el("td", {}, libelleService(etat, x.type, x.service)),
      el("td", {}, x.non_satisfaites.toLocaleString(etat.langue)), el("td", { style: "white-space:nowrap" }, `${x.part}\u00a0%`))))));
}

function serie({ el, t, etat }, r) {
  if (!r.serie.length) return el("p", { id: "tend-serie-vide" }, t("tend_serie_choisir"));
  const L = 640, H = 220, g = 36, b = 28, haut = 12;
  const valeurs = r.serie.map((x) => x.valeur ?? 0);
  const max = Math.max(5, ...valeurs);
  const pas = Math.pow(10, Math.floor(Math.log10(max)));
  const plafond = Math.ceil(max / pas) * pas;
  const y = (v) => haut + (H - haut - b) * (1 - v / plafond);
  const largeur = (L - g - 8) / r.serie.length;
  const graph = svg("svg", { class: "graphique", viewBox: `0 0 ${L} ${H}`, role: "img", id: "tend-graphique",
    "aria-label": `${t("tend_serie")} : ${r.serie.map((x) => `${x.semaine} ${x.valeur ?? t("moins_de_5")}`).join(", ")}` });
  graph.append(svg("defs", {}, svg("pattern", { id: "hachure", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" },
    svg("rect", { width: 6, height: 6, fill: "#eef1f5" }), svg("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "#9aa5b4", "stroke-width": 2 }))));
  for (const v of [0, plafond / 2, plafond]) {
    graph.append(svg("line", { x1: g, x2: L - 4, y1: y(v), y2: y(v), stroke: "#e3e7ec", "stroke-width": 1 }));
    graph.append(svg("text", { x: g - 6, y: y(v) + 4, "text-anchor": "end", "font-size": 11, fill: "#5b6675" }, v.toLocaleString(etat.langue)));
  }
  r.serie.forEach((x, i) => {
    const x0 = g + i * largeur + 3, w = Math.max(4, largeur - 6);
    const num = x.semaine.split("-W")[1];
    let barre;
    if (x.valeur == null) {
      barre = svg("rect", { x: x0, y: y(0) - 8, width: w, height: 8, fill: "url(#hachure)", rx: 2 });
    } else {
      const top = y(x.valeur);
      const hauteur = Math.max(1, y(0) - top);
      const d = `M${x0},${y(0)} V${top + 4} Q${x0},${top} ${x0 + 4},${top} H${x0 + w - 4} Q${x0 + w},${top} ${x0 + w},${top + 4} V${y(0)} Z`;
      barre = hauteur > 5 ? svg("path", { d, fill: BARRE }) : svg("rect", { x: x0, y: top, width: w, height: hauteur, fill: BARRE });
    }
    const cible = svg("rect", { x: g + i * largeur, y: haut, width: largeur, height: H - haut - b + 4, fill: "transparent" });
    infobulle(cible, `${t("semaine_court", { n: num })} (${x.semaine}) : ${x.valeur == null ? t("moins_de_5") : x.valeur}`);
    graph.append(barre, cible);
    if (i % Math.ceil(r.serie.length / 6) === 0 || i === r.serie.length - 1) {
      graph.append(svg("text", { x: x0 + w / 2, y: H - 8, "text-anchor": "middle", "font-size": 11, fill: "#5b6675" }, t("semaine_court", { n: num })));
    }
  });
  graph.append(svg("line", { x1: g, x2: L - 4, y1: y(0), y2: y(0), stroke: "#9aa5b4", "stroke-width": 1 }));
  return graph;
}

function legendeCarte({ el, t }) {
  const puce = (style) => el("span", { class: "puce", style });
  return el("div", { class: "legende", id: "legende-carte" },
    el("span", {}, puce("background:#fff"), t("classe_aucune")),
    el("span", {}, puce("background:repeating-linear-gradient(45deg,#eef1f5 0 3px,#9aa5b4 3px 4px)"), t("classe_0")),
    COULEURS_CLASSES.map((c, i) => el("span", {}, puce(`background:${c}`), t(`classe_${i + 1}`))));
}

/** Dessine la carte après insertion : géométries simplifiées d'OpenStreetMap, projection équirectangulaire corrigée. */
export function dessinerCarte({ t, etat }) {
  const conteneur = document.getElementById("carte-zone");
  const r = etat.tendances;
  const fc = etat.carteZone;
  if (!conteneur || !r || !fc) return;
  const anneaux = (g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const f of fc.features) for (const p of anneaux(f.geometry)) for (const [x, y] of p[0]) {
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  const k = Math.cos(((y0 + y1) / 2) * Math.PI / 180);
  const L = 640, marge = 6;
  const echelle = (L - 2 * marge) / ((x1 - x0) * k || 1);
  const H = Math.min(720, (y1 - y0) * echelle + 2 * marge);
  const ech = Math.min(echelle, (H - 2 * marge) / (y1 - y0 || 1));
  const px = (x) => marge + (x - x0) * k * ech, py = (y) => marge + (y1 - y) * ech;
  const carte = svg("svg", { class: "carte", viewBox: `0 0 ${L} ${H}`, role: "img", id: "carte-svg", "aria-label": t("tend_carte") });
  carte.append(svg("defs", {}, svg("pattern", { id: "hachure-carte", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" },
    svg("rect", { width: 6, height: 6, fill: "#eef1f5" }), svg("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "#9aa5b4", "stroke-width": 1.5 }))));
  const surlignes = [];
  for (const f of fc.features) {
    const id = f.properties.id;
    const d = anneaux(f.geometry).map((poly) => poly.map((ring) => `M${ring.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join("L")}Z`).join("")).join("");
    const c = r.carte[id];
    const fill = c == null ? "#ffffff" : c === 0 ? "url(#hachure-carte)" : COULEURS_CLASSES[c - 1];
    const chemin = svg("path", { d, fill, stroke: c == null ? "#d0d7e0" : "#ffffff", "stroke-width": 0.8, "data-zone": id, "data-classe": c == null ? "aucune" : c });
    const libelle = `${f.properties.nom}${id === r.zone_etablissement ? ` (${t("votre_arrondissement")})` : ""} : ${t(c == null ? "classe_aucune" : `classe_${c}`)}`;
    infobulle(chemin, libelle);
    chemin.append(svg("title", {}, libelle));
    carte.append(chemin);
    if (id === r.zone_etablissement || (r.niveau === "arrondissement" && id === r.zone)) surlignes.push(d);
  }
  // Contour neutre autour des zones, puis l'arrondissement de l'établissement en trait épais (pas de couleur de statut).
  for (const d of surlignes) carte.append(svg("path", { d, fill: "none", stroke: "#1d2733", "stroke-width": 2.2 }));
  conteneur.replaceChildren(carte);
}
