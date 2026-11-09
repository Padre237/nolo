// Console des établissements (D-029, fil « officine »). Module ES sans étape de construction.
import { traduire, messageErreur } from "./i18n-etablissement.mjs";
import { conditionVraie } from "./conditions.mjs";
import { vueIndicateurs, vueTendances, dessinerCarte } from "./vues-demande.mjs";

const API = "/api/v1";
const CLE_JETON = "boussole.ets.jeton";
const CLE_LANGUE = "boussole.langue";
const memoire = {};
const stockage = {
  lire(store, cle) { try { return window[store].getItem(cle); } catch { return memoire[cle] ?? null; } },
  ecrire(store, cle, v) { try { window[store].setItem(cle, v); } catch { memoire[cle] = v; } },
  retirer(store, cle) { try { window[store].removeItem(cle); } catch { delete memoire[cle]; } },
};

const etat = {
  langue: new URLSearchParams(location.search).get("lang") || stockage.lire("localStorage", CLE_LANGUE) || "fr",
  jeton: stockage.lire("sessionStorage", CLE_JETON),
  ecran: "auth", onglet: "connexion", vue: "accueil",
  profil: null, definition: null, territoire: null, reponses: {}, erreursFiche: {},
  inscription: {}, emailEnAttente: null, codeDemo: null, mdpEnAttente: null,
  message: null, rapport: null, desactivationArmee: false,
  indicateurs: null, tendances: null, zonesRef: null, servicesRef: null, carteZone: null, cleCarte: null,
  filtresTend: { niveau: "ma_zone", region: "", departement: "", arrondissement: "", type: "", typeService: "", service: "", semaines: 4 },
};
if (!["fr", "en"].includes(etat.langue)) etat.langue = "fr";

const t = (cle, vars) => traduire(etat.langue, cle, vars);
const principal = document.getElementById("principal");

// ------------------------------------------------------------------ outils
function el(tag, attrs = {}, ...enfants) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (k === "texte") n.textContent = v;
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const e of enfants.flat()) if (e != null && e !== false) n.append(e instanceof Node ? e : document.createTextNode(String(e)));
  return n;
}

async function api(methode, chemin, corps) {
  const init = { method: methode, headers: {} };
  if (etat.jeton) init.headers.Authorization = `Bearer ${etat.jeton}`;
  if (corps instanceof FormData) init.body = corps;
  else if (corps !== undefined) { init.headers["Content-Type"] = "application/json"; init.body = JSON.stringify(corps); }
  const rep = await fetch(API + chemin, init);
  const donnees = await rep.json().catch(() => ({}));
  if (!rep.ok) {
    const err = { code: donnees.erreur || "E-INCONNUE", details: donnees.details || {}, statut: rep.status };
    if (err.code === "E-AUTH-REQUISE" && etat.ecran === "tableau") deconnecterLocal();
    throw err;
  }
  return donnees;
}

function annoncer(type, texte) { etat.message = { type, texte }; }
function blocMessage() {
  if (!etat.message) return null;
  const m = el("div", { class: `message ${etat.message.type}`, role: etat.message.type === "erreur" ? "alert" : "status" }, etat.message.texte);
  etat.message = null;
  return m;
}
const erreurTexte = (e) => messageErreur(etat.langue, e.code);
const libelleOption = (o) => (/^\d\d:\d\d$/.test(o) ? o : t(`opt_${o}`));
const dateLocale = (iso) => new Date(iso).toLocaleString(etat.langue === "fr" ? "fr-FR" : "en-GB", { dateStyle: "short", timeStyle: "short" });

/** Même règle que le serveur : une question masquée n'est pas gardée (FR-ETS-05). */
function reponsesVisibles() {
  const propres = {};
  for (const q of etat.definition) {
    if (!conditionVraie(q.si, propres)) continue;
    const v = etat.reponses[q.id];
    if (v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)) propres[q.id] = v;
  }
  return propres;
}

// ------------------------------------------------------------------ rendu général
function rendre() {
  document.documentElement.lang = etat.langue;
  document.getElementById("titre-app").textContent = t("app_titre");
  document.getElementById("bandeau-demo").textContent = t("bandeau_demo");
  document.querySelectorAll("[data-langue]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.langue === etat.langue)));
  document.getElementById("langues").setAttribute("aria-label", t("langue_groupe"));
  principal.replaceChildren(etat.ecran === "auth" ? ecranAuth() : etat.ecran === "code" ? ecranCode() : ecranTableau());
  if (etat.ecran === "tableau" && etat.vue === "tendances") dessinerCarte(ctxDemande());
}

function ctxDemande() {
  return { el, t, etat, recharger: async () => { await chargerTendances(); rendre(); } };
}

async function chargerTendances() {
  if (etat.profil?.visibilite !== "VERIFIE") return;
  if (!etat.zonesRef) etat.zonesRef = await api("GET", "/zones");
  if (!etat.servicesRef) etat.servicesRef = await api("GET", "/referentiel/services");
  const f = etat.filtresTend;
  const q = new URLSearchParams({ semaines: String(f.semaines) });
  if (f.niveau !== "ma_zone") {
    q.set("niveau", f.niveau);
    q.set("zone", { national: "", region: f.region, departement: f.departement, arrondissement: f.arrondissement }[f.niveau] || "");
  }
  if (f.type) q.set("type", f.type);
  if (f.service) q.set("service", f.service);
  try {
    etat.tendances = await api("GET", `/etablissements/moi/tendances?${q}`);
    const cle = `${etat.tendances.niveau}:${etat.tendances.zone}`;
    if (cle !== etat.cleCarte) {
      etat.carteZone = await api("GET", `/zones/carte?niveau=${etat.tendances.niveau}&zone=${encodeURIComponent(etat.tendances.zone)}`);
      etat.cleCarte = cle;
    }
  } catch (err) { etat.tendances = null; annoncer("erreur", erreurTexte(err)); }
}

// ------------------------------------------------------------------ connexion / inscription
function ecranAuth() {
  const onglets = el("div", { class: "onglets", role: "tablist" },
    ["connexion", "inscription"].map((o) => el("button", {
      type: "button", role: "tab", "aria-selected": String(etat.onglet === o), id: `onglet-${o}`,
      onclick: () => { etat.onglet = o; rendre(); if (o === "inscription") prendrePosition(); },
    }, t(`onglet_${o}`))));
  return el("div", {}, el("h1", {}, t("app_titre")), onglets, blocMessage(),
    etat.onglet === "connexion" ? formConnexion() : formInscription());
}

function champ(id, cle, input, aide) {
  return el("div", {}, el("label", { class: "champ", for: id }, t(cle)), input, aide ? el("p", { class: "aide" }, aide) : null);
}

function formConnexion() {
  const f = el("form", { class: "carte", id: "form-connexion", novalidate: true },
    champ("cx-email", "champ_email", el("input", { id: "cx-email", type: "email", name: "email", autocomplete: "username", required: true })),
    champ("cx-mdp", "champ_mdp", el("input", { id: "cx-mdp", type: "password", name: "mot_de_passe", autocomplete: "current-password", required: true })),
    el("div", { class: "actions" }, el("button", { class: "principal", type: "submit" }, t("btn_connexion"))));
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    await connecter(f.email.value, f.mot_de_passe.value);
  });
  return f;
}

async function connecter(email, mdp) {
  try {
    const r = await api("POST", "/etablissements/connexion", { email, mot_de_passe: mdp });
    etat.jeton = r.jeton;
    stockage.ecrire("sessionStorage", CLE_JETON, r.jeton);
    etat.ecran = "tableau"; etat.vue = "accueil";
    await chargerProfil();
  } catch (err) {
    if (err.code === "E-AUTH-EMAIL-NON-CONFIRME") {
      etat.emailEnAttente = email.trim().toLowerCase(); etat.mdpEnAttente = mdp;
      const r = await api("POST", "/etablissements/code/renvoyer", { email }).catch(() => ({}));
      etat.codeDemo = r.code_demo || null; etat.ecran = "code";
    } else annoncer("erreur", erreurTexte(err));
  }
  rendre();
}

function formInscription() {
  const d = etat.inscription;
  const ter = etat.territoire;
  const types = el("select", { id: "in-type", name: "type", required: true },
    el("option", { value: "" }, t("choisir")),
    ter.types.map((ty) => el("option", { value: ty, disabled: !ter.types_disponibles.includes(ty) },
      `${t(`type_${ty}`)}${ter.types_disponibles.includes(ty) ? "" : " " + t("bientot")}`)));
  const region = el("select", { id: "in-region", name: "region", required: true },
    el("option", { value: "" }, t("choisir")),
    Object.entries(ter.regions).map(([c, l]) => el("option", { value: c }, l[etat.langue])));
  const district = el("select", { id: "in-district", name: "district", required: true });
  const remplirDistricts = () => {
    district.replaceChildren(el("option", { value: "" }, t("choisir")),
      ...(ter.districts[region.value] || []).map((c) => el("option", { value: c }, c)));
  };
  region.addEventListener("change", remplirDistricts);
  const secteur = el("select", { id: "in-secteur", name: "secteur", required: true },
    el("option", { value: "" }, t("choisir")),
    ["public", "prive_lucratif", "prive_confessionnel", "associatif"].map((s) => el("option", { value: s }, t(`secteur_${s}`))));
  const gps = el("p", { class: "aide", id: "gps-etat", "aria-live": "polite" }, d.gpsMessage || "");
  const f = el("form", { class: "carte", id: "form-inscription", novalidate: true },
    champ("in-type", "champ_type", types),
    champ("in-nom", "champ_nom", el("input", { id: "in-nom", type: "text", name: "nom", maxlength: "120", required: true })),
    champ("in-email", "champ_email", el("input", { id: "in-email", type: "email", name: "email", autocomplete: "username", required: true })),
    champ("in-niu", "champ_niu", el("input", { id: "in-niu", type: "text", name: "niu", maxlength: "20", autocapitalize: "characters", required: true }), t("aide_niu")),
    el("fieldset", {}, el("legend", {}, t("champ_position")), gps,
      el("div", { class: "ligne" },
        champ("in-lat", "champ_lat", el("input", { id: "in-lat", type: "number", step: "0.000001", name: "lat", required: true })),
        champ("in-lon", "champ_lon", el("input", { id: "in-lon", type: "number", step: "0.000001", name: "lon", required: true }))),
      el("p", { class: "aide" }, t("aide_position")),
      el("div", { class: "actions" }, el("button", { type: "button", class: "secondaire", onclick: prendrePosition }, t("btn_gps")))),
    el("div", { class: "ligne" }, champ("in-region", "champ_region", region), champ("in-district", "champ_district", district)),
    champ("in-quartier", "champ_quartier", el("input", { id: "in-quartier", type: "text", name: "quartier", maxlength: "120", required: true }), t("aide_quartier")),
    el("div", { class: "ligne" },
      champ("in-tel", "champ_telephone", el("input", { id: "in-tel", type: "tel", name: "telephone", required: true })),
      champ("in-secteur", "champ_secteur", secteur)),
    el("div", { class: "ligne" },
      champ("in-mdp", "champ_mdp", el("input", { id: "in-mdp", type: "password", name: "mot_de_passe", autocomplete: "new-password", required: true })),
      champ("in-mdp2", "champ_mdp2", el("input", { id: "in-mdp2", type: "password", name: "mot_de_passe2", autocomplete: "new-password", required: true }))),
    el("p", { class: "aide" }, t("aide_mdp")),
    el("label", { class: "case" }, el("input", { type: "checkbox", name: "conditions", id: "in-conditions" }), el("span", {}, t("case_conditions"))),
    el("p", {}, el("a", { href: `conditions-etablissements.html?lang=${etat.langue}`, target: "_blank", rel: "noopener", id: "lien-conditions-ets" }, t("lien_conditions"))),
    el("div", { class: "actions" }, el("button", { class: "principal", type: "submit" }, t("btn_inscription"))));
  // Restaurer la saisie après un changement de langue ou une erreur.
  for (const [k, v] of Object.entries(d.valeurs || {})) {
    const champ = f.elements[k];
    if (!champ || champ.type === "password") continue;
    if (champ.type === "checkbox") champ.checked = v === "on";
    else champ.value = v;
  }
  if (d.valeurs?.region) { region.value = d.valeurs.region; remplirDistricts(); district.value = d.valeurs.district || ""; }
  if (d.lat != null) { f.lat.value = d.lat; f.lon.value = d.lon; }
  f.addEventListener("input", () => { d.valeurs = Object.fromEntries(new FormData(f)); });
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f));
    d.valeurs = v;
    if (v.mot_de_passe !== v.mot_de_passe2) { annoncer("erreur", t("mdp_differents")); rendre(); return; }
    const charge = {
      type: v.type, nom: v.nom, email: v.email, niu: v.niu, lat: Number(v.lat), lon: Number(v.lon),
      precision_m: d.precision ?? null, region: v.region, district: v.district, quartier: v.quartier,
      telephone: v.telephone, secteur: v.secteur, mot_de_passe: v.mot_de_passe, conditions_acceptees: f.conditions.checked,
    };
    if (!v.lat || !v.lon) { charge.lat = null; charge.lon = null; }
    try {
      const r = await api("POST", "/etablissements/inscription", charge);
      etat.emailEnAttente = v.email.trim().toLowerCase(); etat.mdpEnAttente = v.mot_de_passe;
      etat.codeDemo = r.code_demo || null; etat.ecran = "code"; etat.inscription = {};
    } catch (err) { annoncer("erreur", erreurTexte(err)); }
    rendre();
  });
  return f;
}

function prendrePosition() {
  const d = etat.inscription;
  const afficher = (texte) => { d.gpsMessage = texte; const p = document.getElementById("gps-etat"); if (p) p.textContent = texte; };
  if (!navigator.geolocation) { afficher(t("gps_refus")); return; }
  afficher(t("gps_en_cours"));
  navigator.geolocation.getCurrentPosition((pos) => {
    d.lat = Number(pos.coords.latitude.toFixed(6)); d.lon = Number(pos.coords.longitude.toFixed(6));
    d.precision = Math.round(pos.coords.accuracy);
    const f = document.getElementById("form-inscription");
    if (f) { f.lat.value = d.lat; f.lon.value = d.lon; }
    afficher(t(d.precision > 50 ? "gps_imprecise" : "gps_precision", { m: d.precision }));
  }, () => afficher(t("gps_refus")), { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
}

function ecranCode() {
  const f = el("form", { class: "carte", id: "form-code", novalidate: true },
    el("p", {}, t("code_texte", { email: etat.emailEnAttente })),
    etat.codeDemo ? el("div", { class: "message attention", id: "code-demo" }, t("code_demo", { code: etat.codeDemo })) : null,
    champ("code", "champ_code", el("input", { id: "code", name: "code", type: "text", inputmode: "numeric", maxlength: "6", autocomplete: "one-time-code" })),
    el("div", { class: "actions" },
      el("button", { class: "principal", type: "submit" }, t("btn_confirmer")),
      el("button", { class: "secondaire", type: "button", onclick: async () => {
        const r = await api("POST", "/etablissements/code/renvoyer", { email: etat.emailEnAttente }).catch(() => ({}));
        etat.codeDemo = r.code_demo || null; annoncer("info", t("code_renvoye")); rendre();
      } }, t("btn_renvoyer"))));
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await api("POST", "/etablissements/confirmation", { email: etat.emailEnAttente, code: f.code.value });
      const mdp = etat.mdpEnAttente; etat.mdpEnAttente = null; etat.codeDemo = null;
      if (mdp) return connecter(etat.emailEnAttente, mdp);
      etat.ecran = "auth"; etat.onglet = "connexion";
    } catch (err) { annoncer("erreur", erreurTexte(err)); }
    rendre();
  });
  return el("div", {}, el("h1", {}, t("code_titre")), blocMessage(), f);
}

// ------------------------------------------------------------------ tableau de bord
async function chargerProfil() {
  etat.profil = await api("GET", "/etablissements/moi");
  if (!etat.definition) etat.definition = (await api("GET", `/etablissements/fiche-definition?type=${etat.profil.type}`)).questions;
  if (!etat.reponsesModifiees) etat.reponses = { ...etat.profil.fiche };
}

function deconnecterLocal() {
  stockage.retirer("sessionStorage", CLE_JETON);
  Object.assign(etat, { jeton: null, ecran: "auth", onglet: "connexion", profil: null, definition: null, reponses: {}, reponsesModifiees: false });
}

const VUES = ["accueil", "indicateurs", "fiche", "photos", "stock", "tendances", "apercu", "compte", "historique"];

function ecranTableau() {
  const p = etat.profil;
  const nav = el("nav", { class: "vues", "aria-label": p.nom },
    VUES.map((v) => el("button", { type: "button", id: `vue-${v}`, "aria-current": etat.vue === v ? "page" : false,
      onclick: async () => {
        // Quitter la fiche enregistre le brouillon : aucune réponse n'est perdue en changeant d'onglet.
        if (etat.vue === "fiche" && v !== "fiche" && etat.reponsesModifiees) {
          await api("PUT", "/etablissements/moi/fiche", { reponses: reponsesVisibles() }).then(() => { etat.reponsesModifiees = false; }).catch(() => {});
        }
        etat.vue = v; etat.rapport = null; await rafraichir();
      } }, t(`nav_${v}`))),
    el("button", { type: "button", id: "btn-deconnexion", onclick: async () => {
      await api("POST", "/etablissements/moi/deconnexion").catch(() => {}); deconnecterLocal(); rendre();
    } }, t("btn_deconnexion")));
  const contenu = { accueil: vueAccueil, fiche: vueFiche, photos: vuePhotos, stock: vueStock,
    apercu: vueApercu, compte: vueCompte, historique: vueHistorique,
    indicateurs: () => vueIndicateurs(ctxDemande()), tendances: () => vueTendances(ctxDemande()) }[etat.vue]();
  return el("div", {}, el("h1", {}, p.nom, " ", el("span", { class: `badge ${p.visibilite}`, id: "badge-visibilite" }, t(`res_${p.visibilite}`) ?? "")), nav, blocMessage(), contenu);
}

async function rafraichir() {
  try { await chargerProfil(); } catch (err) { if (err.code !== "E-AUTH-REQUISE") annoncer("erreur", erreurTexte(err)); }
  if (etat.vue === "stock" && etat.ecran === "tableau") etat.stock = await api("GET", "/etablissements/moi/stock").catch(() => ({ lignes: [] }));
  if (etat.vue === "historique" && etat.ecran === "tableau") etat.historique = (await api("GET", "/etablissements/moi/historique").catch(() => ({ entrees: [] }))).entrees;
  if (etat.vue === "apercu" && etat.ecran === "tableau") etat.apercu = await api("GET", "/etablissements/moi/apercu").catch(() => null);
  if (etat.vue === "indicateurs" && etat.ecran === "tableau") etat.indicateurs = await api("GET", "/etablissements/moi/indicateurs").catch(() => null);
  if (etat.vue === "tendances" && etat.ecran === "tableau") await chargerTendances();
  rendre();
}

function vueAccueil() {
  const p = etat.profil;
  const fait = (ok) => (ok ? "fait" : false);
  const ficheEnvoyee = p.visibilite !== "FICHE_INCOMPLETE";
  return el("div", {},
    el("div", { class: "carte" }, el("h2", {}, t("etat_titre")),
      el("p", { id: "etat-visibilite" }, t(`vis_${p.visibilite}`, { motif: p.motif_refus || "" })),
      p.alertes.map((a) => el("div", { class: "message attention", id: `alerte-${a.code}` }, t(`alerte_${a.code}`, { date: a.expire_le ? dateLocale(a.expire_le) : "" })))),
    el("div", { class: "carte" }, el("h2", {}, t("etapes_titre")),
      el("ol", { class: "etapes" },
        el("li", { class: fait(p.photos.some((x) => x.role === "facade")) }, t("etape_photo")),
        el("li", { class: fait(ficheEnvoyee) }, t("etape_fiche")),
        el("li", { class: fait(p.visibilite === "VERIFIE") }, t("etape_verif")),
        el("li", {}, t("etape_stock")))));
}

// ------------------------------------------------------------------ fiche
const SECTIONS = [
  ["section_horaires", (id) => id === "C1" || id === "C2" || id.startsWith("C3_")],
  ["section_accueil", (id) => ["C4", "C5", "C6", "C7"].includes(id)],
  ["section_pharmacie", (id) => id.startsWith("O") || id === "C8"],
];

function vueFiche() {
  const propres = {};
  const blocs = new Map(SECTIONS.map(([cle]) => [cle, []]));
  let horairesFaits = false;
  for (const q of etat.definition) {
    if (!conditionVraie(q.si, propres)) continue;
    const v = etat.reponses[q.id];
    if (v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)) propres[q.id] = v;
    const section = SECTIONS.find(([, test]) => test(q.id))[0];
    if (q.groupe === "C3") {
      if (!horairesFaits) { blocs.get(section).push(questionHoraires()); horairesFaits = true; }
      continue;
    }
    blocs.get(section).push(question(q));
  }
  const f = el("form", { id: "form-fiche", novalidate: true },
    el("p", { class: "aide" }, t("fiche_intro")),
    SECTIONS.map(([cle]) => el("div", { class: "carte" }, el("h3", {}, t(cle)), blocs.get(cle))),
    el("div", { class: "actions" },
      el("button", { type: "button", class: "secondaire", id: "btn-brouillon", onclick: async () => {
        try { await api("PUT", "/etablissements/moi/fiche", { reponses: reponsesVisibles() }); etat.reponsesModifiees = false; annoncer("ok", t("fiche_enregistree")); await chargerProfil(); }
        catch (err) { annoncer("erreur", erreurTexte(err)); }
        rendre();
      } }, t("btn_enregistrer")),
      el("button", { type: "submit", class: "principal", id: "btn-soumettre" }, t("btn_soumettre"))));
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    etat.erreursFiche = {};
    try {
      await api("POST", "/etablissements/moi/fiche/soumettre", { reponses: reponsesVisibles() });
      etat.reponsesModifiees = false;
      annoncer("ok", t("fiche_soumise")); etat.vue = "accueil"; await chargerProfil();
    } catch (err) {
      for (const x of err.details?.erreurs || []) etat.erreursFiche[x.champ] = x.code;
      annoncer("erreur", erreurTexte(err));
      if (etat.erreursFiche.C9) annoncer("erreur", messageErreur(etat.langue, "E-FICHE-PHOTO-FACADE"));
    }
    rendre();
  });
  return f;
}

function erreurChamp(id) {
  const code = etat.erreursFiche[id];
  return code ? el("p", { class: "err-champ", id: `err-${id}` }, messageErreur(etat.langue, code)) : null;
}

function changer(id, valeur, reRendre) {
  etat.reponses[id] = valeur;
  etat.reponsesModifiees = true;
  delete etat.erreursFiche[id];
  if (reRendre) rendre();
}

function question(q) {
  const v = etat.reponses[q.id];
  const aide = ["O1", "O3"].includes(q.id) ? el("p", { class: "aide" }, t(`aide_${q.id}`)) : null;
  if (q.type === "bool") {
    return el("fieldset", { id: `q-${q.id}` }, el("legend", {}, t(`q_${q.id}`)),
      el("div", { class: "choix" }, [true, false].map((b) => el("label", {},
        el("input", { type: "radio", name: q.id, value: String(b), checked: v === b, onchange: () => changer(q.id, b, true) }),
        t(b ? "opt_oui" : "opt_non")))), erreurChamp(q.id));
  }
  if (q.type === "case") {
    return el("div", { id: `q-${q.id}` }, el("label", { class: "case" },
      el("input", { type: "checkbox", name: q.id, checked: v === true, onchange: (e) => changer(q.id, e.target.checked || undefined, false) }),
      el("span", {}, t(`q_${q.id}`))), erreurChamp(q.id));
  }
  if (q.type === "choix") {
    const s = el("select", { id: `in-${q.id}`, name: q.id, onchange: (e) => changer(q.id, e.target.value || undefined, true) },
      el("option", { value: "" }, t("choisir")), q.options.map((o) => el("option", { value: o, selected: v === o }, libelleOption(o))));
    return el("div", { id: `q-${q.id}` }, champ(`in-${q.id}`, `q_${q.id}`, s), erreurChamp(q.id));
  }
  if (q.type === "choix_multiple") {
    const actuel = Array.isArray(v) ? v : [];
    return el("fieldset", { id: `q-${q.id}` }, el("legend", {}, t(`q_${q.id}`)),
      el("div", { class: "choix" }, q.options.map((o) => el("label", {},
        el("input", { type: "checkbox", name: q.id, value: o, checked: actuel.includes(o), onchange: (e) => {
          const suivant = e.target.checked ? [...actuel, o] : actuel.filter((x) => x !== o);
          changer(q.id, q.options.filter((x) => suivant.includes(x)), true);
        } }), libelleOption(o)))), erreurChamp(q.id));
  }
  const input = el("input", { id: `in-${q.id}`, name: q.id, type: q.type === "telephone" ? "tel" : "text", maxlength: String(q.max || 40),
    value: v ?? "", oninput: (e) => changer(q.id, e.target.value, false) });
  return el("div", { id: `q-${q.id}` }, champ(`in-${q.id}`, `q_${q.id}`, input, aide?.textContent), erreurChamp(q.id));
}

function questionHoraires() {
  const heures = etat.definition.find((q) => q.id === "C3_sem_o").options;
  const select = (id) => el("select", { id: `in-${id}`, name: id, "aria-label": id, onchange: (e) => changer(id, e.target.value || undefined, false) },
    el("option", { value: "" }, "—"), heures.map((o) => el("option", { value: o, selected: etat.reponses[id] === o }, libelleOption(o))));
  const lignes = [["sem", "h_sem"], ["sam", "h_sam"], ["dim", "h_dim"]];
  return el("fieldset", { id: "q-C3" }, el("legend", {}, t("q_C3")),
    el("div", { class: "horaires" }, el("span", {}), el("strong", {}, t("h_o")), el("strong", {}, t("h_f")),
      lignes.flatMap(([j, cle]) => [el("span", {}, t(cle)), select(`C3_${j}_o`), select(`C3_${j}_f`)])),
    lignes.map(([j]) => erreurChamp(`C3_${j}_o`) || erreurChamp(`C3_${j}_f`)));
}

// ------------------------------------------------------------------ photos
function vuePhotos() {
  const p = etat.profil;
  const f = el("form", { class: "carte", id: "form-photo", novalidate: true },
    champ("ph-fichier", "champ_photo", el("input", { id: "ph-fichier", type: "file", name: "fichier", accept: "image/jpeg,image/png" })),
    champ("ph-role", "champ_role", el("select", { id: "ph-role", name: "role" },
      ["facade", "interieur", "autre"].map((r) => el("option", { value: r }, t(`role_${r}`))))),
    el("label", { class: "case" }, el("input", { type: "checkbox", name: "aucune_personne", id: "ph-personne" }), el("span", {}, t("case_aucune_personne"))),
    el("div", { class: "actions" }, el("button", { class: "principal", type: "submit" }, t("btn_ajouter_photo"))));
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (f.fichier.files[0]) fd.append("fichier", f.fichier.files[0]);
    fd.append("role", f.role.value);
    fd.append("aucune_personne", String(f.aucune_personne.checked));
    try { await api("POST", "/etablissements/moi/photos", fd); await chargerProfil(); }
    catch (err) { annoncer("erreur", erreurTexte(err)); }
    rendre();
  });
  return el("div", {}, el("div", { class: "carte" }, el("h2", {}, t("photos_titre")), el("p", { class: "aide" }, t("photos_intro")),
    p.photos.length ? el("div", { class: "photos" }, p.photos.map((ph) => el("figure", {},
      el("img", { src: `${API}/photos/${ph.id}`, alt: t(`role_${ph.role}`) }),
      el("figcaption", {}, t(`role_${ph.role}`), el("button", { type: "button", onclick: async () => {
        await api("DELETE", `/etablissements/moi/photos/${ph.id}`).catch((err) => annoncer("erreur", erreurTexte(err)));
        await chargerProfil(); rendre();
      } }, t("btn_supprimer"))))))
      : el("p", {}, t("photos_aucune"))), f);
}

// ------------------------------------------------------------------ stock
function vueStock() {
  const p = etat.profil;
  if (p.visibilite === "FICHE_INCOMPLETE") return el("div", { class: "message info", id: "stock-bloque" }, t("stock_bloque_fiche"));
  const lignes = etat.stock?.lignes || [];
  const f = el("form", { class: "carte", id: "form-stock", novalidate: true },
    el("p", {}, t("stock_etape1")),
    el("div", { class: "actions" },
      el("a", { class: "bouton", href: `${API}/etablissements/stock/modele.xlsx`, download: "modele-stock-medicaments.xlsx", id: "modele-xlsx" }, t("btn_modele_xlsx")),
      el("a", { class: "bouton", href: `${API}/etablissements/stock/modele.csv`, download: "modele-stock-medicaments.csv" }, t("btn_modele_csv"))),
    el("p", {}, t("stock_etape2")), el("p", {}, t("stock_etape3")),
    champ("st-fichier", "champ_fichier", el("input", { id: "st-fichier", type: "file", name: "fichier", accept: ".xlsx,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })),
    el("div", { class: "actions" }, el("button", { class: "principal", type: "submit" }, t("btn_envoyer_stock"))));
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (f.fichier.files[0]) fd.append("fichier", f.fichier.files[0]);
    try { etat.rapport = await api("POST", "/etablissements/moi/stock", fd); }
    catch (err) { etat.rapport = null; annoncer("erreur", erreurTexte(err)); }
    await rafraichir();
  });
  const rapport = etat.rapport ? el("div", { class: "carte", id: "rapport" }, el("h2", {}, t("rapport_titre")),
    el("p", { id: "rapport-resume" }, t("rapport_resume", { a: etat.rapport.acceptees, r: etat.rapport.rejetees.length })),
    etat.rapport.rejetees.length ? el("div", { class: "defilement" }, el("table", {}, el("thead", {}, el("tr", {}, el("th", {}, t("col_ligne")), el("th", {}, t("col_valeur")), el("th", {}, t("col_motif")))),
      el("tbody", {}, etat.rapport.rejetees.map((x) => el("tr", {}, el("td", {}, x.ligne), el("td", {}, x.valeur),
        el("td", {}, t(`motif_${x.motif}`, { suggestion: x.suggestion ? libelleDci(x.suggestion) : "" }))))))) : null) : null;
  const tableau = el("div", { class: "carte", id: "stock-actuel" }, el("h2", {}, t("stock_actuel")),
    p.visibilite !== "VERIFIE" && lignes.length ? el("div", { class: "message attention" }, t("stock_non_visible")) : null,
    lignes.length ? el("div", { class: "defilement" }, el("table", {}, el("thead", {}, el("tr", {}, ["col_dci", "col_dosage", "col_forme", "col_niveau", "col_expire"].map((c) => el("th", {}, t(c))))),
      el("tbody", {}, lignes.map((l) => el("tr", {}, el("td", {}, etat.langue === "fr" ? l.libelle_fr : l.libelle_en), el("td", {}, l.dosage),
        el("td", {}, t(`forme_${l.forme}`)), el("td", {}, t(`niv_${l.niveau}`)),
        el("td", {}, l.visible ? t("expire_dans", { h: Math.floor(l.secondes_restantes / 3600), m: Math.floor((l.secondes_restantes % 3600) / 60) }) : t("expire")))))))
      : el("p", {}, t("stock_vide")),
    lignes.length ? el("div", { class: "actions" }, el("button", { type: "button", class: "secondaire", id: "btn-confirmer-stock", onclick: async () => {
      try { await api("POST", "/etablissements/moi/stock/confirmer"); annoncer("ok", t("stock_confirme")); }
      catch (err) { annoncer("erreur", erreurTexte(err)); }
      await rafraichir();
    } }, t("btn_confirmer_stock"))) : null);
  return el("div", {}, el("h2", {}, t("stock_titre")), f, rapport, tableau);
}

let referentiel = null;
const libelleDci = (code) => referentiel?.dci.find((d) => d.code === code)?.[etat.langue] || code;

// ------------------------------------------------------------------ aperçu, compte, historique
function vueApercu() {
  const a = etat.apercu;
  if (!a) return el("p", {}, "…");
  const fiche = a.fiche;
  return el("div", { class: "carte", id: "apercu" }, el("h2", {}, t("apercu_titre")),
    el("p", {}, el("span", { class: `badge ${a.visible ? "VERIFIE" : "EN_ATTENTE_VERIFICATION"}` }, t(a.visible ? "apercu_visible" : "apercu_invisible"))),
    el("h3", {}, a.nom), el("p", {}, a.quartier, " · ", a.telephone),
    el("p", {}, t(fiche.C1 ? "ouvert_24h" : a.ouvert_maintenant ? "ouvert" : "ferme"), fiche.O4 ? ` · ${t("garde")}` : ""),
    a.photos.length ? el("div", { class: "photos" }, a.photos.map((id) => el("img", { src: `${API}/photos/${id}`, alt: "" }))) : null);
}

function vueCompte() {
  const p = etat.profil;
  const f = el("form", { class: "carte", id: "form-compte", novalidate: true }, el("h2", {}, t("compte_infos")),
    el("p", {}, `${t("champ_email")} : ${p.email}`),
    champ("cp-nom", "champ_nom", el("input", { id: "cp-nom", name: "nom", type: "text", value: p.nom })),
    champ("cp-niu", "champ_niu", el("input", { id: "cp-niu", name: "niu", type: "text", value: p.niu }), t("aide_niu")),
    el("div", { class: "ligne" },
      champ("cp-lat", "champ_lat", el("input", { id: "cp-lat", name: "lat", type: "number", step: "0.000001", value: p.lat })),
      champ("cp-lon", "champ_lon", el("input", { id: "cp-lon", name: "lon", type: "number", step: "0.000001", value: p.lon }))),
    champ("cp-quartier", "champ_quartier", el("input", { id: "cp-quartier", name: "quartier", type: "text", value: p.quartier })),
    champ("cp-tel", "champ_telephone", el("input", { id: "cp-tel", name: "telephone", type: "tel", value: p.telephone })),
    el("p", { class: "aide" }, t("aide_reverif")),
    el("div", { class: "actions" }, el("button", { class: "principal", type: "submit" }, t("btn_modifier_infos"))));
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f));
    const changes = {};
    for (const k of ["nom", "niu", "quartier", "telephone"]) if (v[k] !== String(p[k])) changes[k] = v[k];
    if (Number(v.lat) !== p.lat || Number(v.lon) !== p.lon) { changes.lat = Number(v.lat); changes.lon = Number(v.lon); }
    try { await api("PATCH", "/etablissements/moi/informations", changes); annoncer("ok", t("infos_enregistrees")); }
    catch (err) { annoncer("erreur", erreurTexte(err)); }
    await rafraichir();
  });
  const desactiver = el("button", { type: "button", class: "danger", id: "btn-desactiver", onclick: async () => {
    if (!etat.desactivationArmee) { etat.desactivationArmee = true; rendre(); return; }
    etat.desactivationArmee = false;
    await api("POST", "/etablissements/moi/desactiver").catch(() => {});
    deconnecterLocal(); annoncer("info", t("compte_desactive")); rendre();
  } }, t(etat.desactivationArmee ? "desactiver_confirmer" : "btn_desactiver"));
  return el("div", {}, el("h2", {}, t("compte_titre")), f, el("div", { class: "carte" }, desactiver));
}

function vueHistorique() {
  const entrees = etat.historique || [];
  return el("div", { class: "carte" }, el("h2", {}, t("historique_titre")),
    entrees.length ? el("ul", { class: "historique", id: "historique" }, entrees.map((x) => el("li", {},
      el("time", { datetime: x.horodatage }, dateLocale(x.horodatage)),
      t(`act_${x.action}`, { ...x.details, resultat: x.details.resultat ? t(`res_${x.details.resultat}`) : "" }))))
      : el("p", {}, t("historique_vide")));
}

// ------------------------------------------------------------------ démarrage
document.querySelectorAll("[data-langue]").forEach((b) => b.addEventListener("click", () => {
  etat.langue = b.dataset.langue;
  stockage.ecrire("localStorage", CLE_LANGUE, etat.langue);  // préférence locale, jamais envoyée (Principe XIV)
  rendre();
}));

(async function demarrer() {
  etat.territoire = await api("GET", "/territoire");
  referentiel = await api("GET", "/referentiel/dci").catch(() => null);
  if (etat.jeton) {
    try { etat.ecran = "tableau"; await chargerProfil(); } catch { deconnecterLocal(); }
  }
  rendre();
})();
