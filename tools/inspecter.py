#!/usr/bin/env python3
"""Inspection visuelle réelle de Nolo (SF-013-10) : 47 états pilotés dans Chrome, à plusieurs largeurs.

Mesure, pour chaque état : débordement horizontal (et éléments fautifs), cibles de moins de 44 px
(hors colonnes de graphique, qui ont un tableau équivalent), nombre de h1 dans <main>, erreurs de console.

Usage : python3 tools/inspecter.py [DOSSIER_CAPTURES] [LARGEURS]   ex. : python3 tools/inspecter.py /tmp/captures 360,390,768,1440
Variable CAPTURER=0 pour ne pas enregistrer de captures. Le script lance lui-même un serveur local sur app/.
Code de sortie : 0 si aucun défaut, 1 sinon. Dépendances : Playwright (Python) et Chrome (/usr/bin/google-chrome,
ou le navigateur désigné par la variable NOLO_CHROME).
"""
import json, sys, os, subprocess, time, pathlib, socket
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8765/"
APP = pathlib.Path(__file__).resolve().parent.parent / "app"
SORTIE = sys.argv[1] if len(sys.argv) > 1 else "/tmp/nolo-captures"
LARGEURS = [int(x) for x in (sys.argv[2] if len(sys.argv) > 2 else "360,390,768,1440").split(",")]
CAPTURER = os.environ.get("CAPTURER", "1") == "1"
os.makedirs(SORTIE, exist_ok=True)

MESURE = """() => {
  const vw = document.documentElement.clientWidth;
  const deb = document.documentElement.scrollWidth > vw + 1;
  const fautifs = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width && r.right > vw + 1 && getComputedStyle(el).position !== 'fixed' && !el.closest('.registre-defile, .onglets, .pro__nav, .vh, .annonces')) fautifs.push((el.className && el.className.baseVal === undefined ? el.className : el.tagName) + ' ' + Math.round(r.right));
  }
  const petits = [];
  for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, summary, [tabindex="0"]')) {
    const cible = el.closest('label') || el;
    const r = cible.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (el.classList.contains('vh') || el.closest('.vh') || el.classList.contains('lien-evitement')) continue;
    if (el.closest('.colonnes')) continue; // colonnes de graphique : tableau équivalent fourni
    if (getComputedStyle(cible).visibility === 'hidden') continue;
    if (r.height < 44 || r.width < 44) petits.push(`${el.tagName}.${(el.className||'').toString().slice(0,30)} "${(el.textContent||el.getAttribute('aria-label')||'').trim().slice(0,24)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
  }
  const h1 = document.querySelectorAll('main h1').length;
  return { debordement: deb, fautifs: fautifs.slice(0, 6), petits: [...new Set(petits)].slice(0, 12), h1 };
}"""

def serveur():
    s = socket.socket()
    try:
        s.connect(("127.0.0.1", 8765)); s.close(); return None
    except OSError:
        pass
    p = subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", str(APP)],
                         stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.0)
    return p


def run():
    rapport = {}
    with sync_playwright() as p:
        nav = p.chromium.launch(executable_path=os.environ.get("NOLO_CHROME", "/usr/bin/google-chrome"), args=["--no-sandbox"])
        for w in LARGEURS:
            h = 900 if w >= 768 else 800
            ctx = nav.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, service_workers="block", locale="fr-FR", timezone_id="Africa/Douala")
            page = ctx.new_page()
            erreurs = []
            page.on("console", lambda m: erreurs.append(m.text) if m.type == "error" else None)
            page.on("pageerror", lambda e: erreurs.append(str(e)))
            etapes = []

            def capture(nom, plein=True):
                page.evaluate("document.activeElement && document.activeElement.blur(); window.scrollTo(0,0)")
                page.wait_for_timeout(1500)
                m = page.evaluate(MESURE)
                etapes.append((nom, m))
                if CAPTURER:
                    page.screenshot(path=f"{SORTIE}/{w}-{nom}.png", full_page=plein)

            def aller(hash_):
                page.evaluate(f"location.hash = '{hash_}'")
                page.wait_for_timeout(400)

            page.goto(BASE)
            page.evaluate("localStorage.clear()")
            page.goto(BASE + "#/bienvenue")
            capture("01-bienvenue")
            page.click("label[for=consent-orientation]")
            page.click("label[for=consent-surveillance]")
            page.click("[data-act=valider]")
            capture("02-bienvenue-age")
            page.click("label[for=age-mineur]")
            page.click("[data-act=valider]")
            capture("03-bienvenue-parental")
            page.click("label[for=accord-parental]")
            page.click("[data-act=valider]")
            capture("04-bienvenue-fait")
            page.click("text=Continuer")
            capture("05-accueil")
            aller("#/decrire")
            page.click("[data-act=analyser]") if page.query_selector("[data-act=analyser]") else page.click("button[type=submit]")
            capture("06-decrire-erreurs")
            page.click("[data-act=exemple][data-i='0']")
            capture("07-decrire-exemple")
            page.click("button[type=submit]")
            capture("08-verifier")
            for b in page.query_selector_all("[data-act=repondre][data-valeur=non]"):
                b.click()
            page.click("[data-act=voir]")
            capture("09-pistes")
            aller("#/ou-aller")
            capture("10-ou-aller")
            aller("#/fiche")
            capture("11-fiche")
            # Urgence
            aller("#/decrire")
            page.click("[data-act=exemple][data-i='1']")
            page.click("button[type=submit]")
            capture("12-verifier-danger")
            page.click("[data-act=voir]")
            capture("13-urgence")
            page.click(".decision summary")
            capture("40-urgence-decision")
            # Art. 48
            aller("#/decrire")
            page.click("label[for=qui-moi]")
            page.fill("#age", "29")
            page.fill("#texte", "Fièvre, boutons sur la peau, ganglions gonflés, mal de gorge et grande fatigue depuis une semaine.")
            page.click("button[type=submit]")
            for b in page.query_selector_all("[data-act=repondre][data-valeur=non]"):
                b.click()
            page.click("[data-act=voir]")
            capture("14-confidentiel")
            # Hors champ
            aller("#/decrire")
            page.click("[data-act=exemple][data-i='4']")
            page.click("button[type=submit]")
            for b in page.query_selector_all("[data-act=repondre][data-valeur=non]"):
                b.click()
            page.click("[data-act=voir]")
            capture("15-hors-champ")
            # Recherches
            aller("#/chercher/medicament")
            page.click("[data-act=dci][data-id=paracetamol]")
            capture("16-medicament")
            aller("#/chercher/sang")
            page.click("[data-act=groupe][data-g='O+']")
            capture("17-sang")
            aller("#/chercher/service")
            page.select_option("#sp", "pediatrie")
            capture("18-service")
            aller("#/conditions")
            capture("19-conditions")
            aller("#/mes-donnees")
            capture("20-mes-donnees")
            # Espace pro
            aller("#/pro")
            capture("21-pro-entree")
            page.click("[data-act=demo]")
            capture("22-pro-accueil")
            aller("#/pro/tableau/stock")
            page.click("[data-act=exemple-stock]")
            capture("23-pro-stock")
            aller("#/pro/tableau/tendances")
            capture("24-pro-tendances")
            aller("#/pro/tableau/fiche")
            capture("25-pro-fiche")
            aller("#/pro/tableau/indicateurs")
            capture("26-pro-indicateurs")
            aller("#/pro/tableau/compte")
            capture("27-pro-compte")
            page.click("[data-act=deconnexion]")
            aller("#/pro/inscription")
            page.click("button[type=submit]")
            capture("28-inscription-0")
            page.click("label[for=type-officine]")
            page.click("button[type=submit]")
            page.fill("#i-niu", "M04161818664L")
            page.click("button[type=submit]")
            capture("29-inscription-1-erreurs")
            aller("#/pro/conditions")
            capture("47-pro-conditions")
            # Hôpital et centres spécialisés
            aller("#/pro")
            page.click("[data-act=demo][data-quel=hopital]")
            aller("#/pro/tableau/services")
            capture("31-hopital-services")
            aller("#/pro/tableau/fiche")
            capture("32-hopital-fiche")
            page.click("[data-act=deconnexion]") if page.query_selector("[data-act=deconnexion]") else None
            aller("#/chercher/service")
            page.select_option("#sp", "nephrologie")
            capture("33-recherche-dialyse")
            # Espace ministère
            aller("#/ministere")
            capture("34-ministere-entree")
            page.click("[data-act=ouvrir]")
            capture("35-ministere-carte")
            aller("#/ministere/signaux")
            capture("36-ministere-signaux")
            aller("#/ministere/agrements")
            capture("37-ministere-agrements")
            aller("#/ministere/offre")
            capture("38-ministere-offre")
            aller("#/ministere/politique")
            capture("39-ministere-politique")
            aller("#/ministere/journal")
            page.click("[data-act=verifier-chaine]")
            capture("41-ministere-journal")
            aller("#/ministere/coordination")
            page.click("[data-act=cellule-apdp][data-v=defavorable]")
            page.click("[data-act=cellule-derouler]")
            capture("42-ministere-cellule")
            aller("#/ministere/ab")
            page.click("[data-act=rejouer-ab]")
            capture("43-ministere-ab")
            page.click("[data-act=mode-simule][data-v=complet]")
            capture("44-ministere-ab-complet")
            aller("#/droits")
            capture("45-droits")
            page.click("[data-act=exemple][data-i='0']")
            page.wait_for_selector(".extraits")
            capture("46-droits-reponse")
            # Anglais
            aller("#/")
            page.click("button[data-act=langue][data-valeur=en]")
            capture("30-home-en")
            rapport[w] = {"etapes": etapes, "erreurs": erreurs}
            ctx.close()
        nav.close()
    for w, r in rapport.items():
        print(f"\n=== {w}px === erreurs console : {r['erreurs'][:5]}")
        for nom, m in r["etapes"]:
            flag = []
            if m["debordement"]: flag.append(f"DEBORDEMENT {m['fautifs']}")
            if m["petits"]: flag.append(f"cibles<44 : {m['petits']}")
            if m["h1"] != 1: flag.append(f"h1={m['h1']}")
            print(f"  {nom}: {'OK' if not flag else ' | '.join(flag)}")
    defauts = sum(1 for r in rapport.values() for (_, m) in r["etapes"] if m["debordement"] or m["petits"] or m["h1"] != 1)
    erreurs = sum(len(r["erreurs"]) for r in rapport.values())
    mesures = sum(len(r["etapes"]) for r in rapport.values())
    print(f"\nRÉSUMÉ : {mesures} mesures ({len(rapport)} largeurs) ; {defauts} état(s) avec défaut ; {erreurs} erreur(s) de console")
    return 0 if defauts == 0 and erreurs == 0 else 1


if __name__ == "__main__":
    srv = serveur()
    try:
        code = run()
    finally:
        if srv:
            srv.terminate()
    sys.exit(code)
