"""Parcours navigateur de bout en bout du fil « officine » (D-029), côté établissement et côté citoyen.

Usage : python3 tools/parcours_etablissement.py [--chrome /usr/bin/google-chrome] [--captures dossier]
Lance l'API sur des données neuves, joue le parcours, écrit les captures, sort en erreur au premier écart.
"""
import argparse
import io
import json
import pathlib
import subprocess
import sys
import tempfile
import threading
import time

import uvicorn
from openpyxl import Workbook
from PIL import Image
from playwright.sync_api import sync_playwright

RACINE = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RACINE / "src" / "server"))
from etablissements.app import creer_app  # noqa: E402
from etablissements.service import Service  # noqa: E402

echecs = []


def verifier(cond, msg):
    print(("OK   " if cond else "ÉCHEC ") + msg)
    if not cond:
        echecs.append(msg)


def photo_avec_gps():
    img = Image.new("RGB", (640, 420), (215, 225, 235))
    for x in range(120, 520):
        for y in range(140, 400):
            img.putpixel((x, y), (40, 120, 70))
    exif = Image.Exif()
    exif[0x8825] = {1: "N", 2: (4.0, 3.0, 4.0), 3: "E", 4: (9.0, 46.0, 4.0)}
    t = io.BytesIO()
    img.save(t, "JPEG", exif=exif)
    return t.getvalue()


def classeur(lignes):
    wb = Workbook()
    ws = wb.active
    ws.title = "Stock"
    for l in lignes:
        ws.append(l)
    t = io.BytesIO()
    wb.save(t)
    return t.getvalue()


def demarrer_serveur(dossier):
    config = uvicorn.Config(creer_app(Service(dossier)), host="127.0.0.1", port=0, log_level="warning")
    serveur = uvicorn.Server(config)
    threading.Thread(target=serveur.run, daemon=True).start()
    while not serveur.started:
        time.sleep(0.05)
    port = serveur.servers[0].sockets[0].getsockname()[1]
    return serveur, f"http://127.0.0.1:{port}"


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--chrome", default=None)
    p.add_argument("--captures", default=str(RACINE / "docs" / "quality" / "captures-d029"))
    a = p.parse_args()
    captures = pathlib.Path(a.captures)
    captures.mkdir(parents=True, exist_ok=True)
    dossier = pathlib.Path(tempfile.mkdtemp(prefix="d029-"))
    subprocess.run([sys.executable, str(RACINE / "tools" / "generer_tendances_demo.py"), "--donnees", str(dossier)],
                   check=True, capture_output=True)  # compteurs synthétiques des 12 semaines passées (D-032 §8)
    serveur, base = demarrer_serveur(dossier)

    with sync_playwright() as pw:
        nav = pw.chromium.launch(**({"executable_path": a.chrome} if a.chrome else {}))
        ctx = nav.new_context(viewport={"width": 430, "height": 900}, device_scale_factor=2, accept_downloads=True,
                              geolocation={"latitude": 4.051123, "longitude": 9.767912, "accuracy": 12},
                              permissions=["geolocation"], locale="fr-FR", timezone_id="Africa/Douala")
        page = ctx.new_page()
        erreurs_js = []
        page.on("pageerror", lambda e: erreurs_js.append(str(e)))
        requetes = []
        ctx.on("request", lambda r: requetes.append(r.url))
        cap = lambda nom, pg=None: (pg or page).screenshot(path=str(captures / nom), full_page=True)

        # 1. Côté citoyen : aucune officine vérifiée au départ.
        page.goto(f"{base}/recherche-medicament.html?lang=fr")
        page.wait_for_selector("#liste-dci option", state="attached")
        page.fill("#dci", "Paracétamol")
        page.click("button.principal")
        page.wait_for_selector("#sortie .message")
        verifier("Aucune pharmacie vérifiée" in page.inner_text("#sortie"), "citoyen : aucun résultat avant inscription")

        # 2. Inscription.
        page.goto(f"{base}/etablissement.html?lang=fr")
        page.click("#onglet-inscription")
        page.wait_for_function("document.getElementById('in-lat') && document.getElementById('in-lat').value !== ''")
        verifier(page.input_value("#in-lat") == "4.051123" and "12 m" in page.inner_text("#gps-etat"),
                 "position GPS récupérée automatiquement, précision affichée")
        options = page.eval_on_selector_all("#in-type option", "os => os.map(o => [o.value, o.disabled])")
        verifier(["officine", False] in options and ["hopital", True] in options, "seule l'officine est ouverte dans cette livraison")
        page.select_option("#in-type", "officine")
        page.fill("#in-nom", "Pharmacie du Marché (démo)")
        page.fill("#in-email", "contact@pharmacie-demo.cm")
        page.fill("#in-niu", "M04161818664L")
        page.select_option("#in-region", "littoral")
        page.select_option("#in-district", "DS-DEMO-LIT-1")
        page.fill("#in-quartier", "Face au marché central")
        page.fill("#in-tel", "699000001")
        page.select_option("#in-secteur", "prive_lucratif")
        page.fill("#in-mdp", "Boussole-2026!")
        page.fill("#in-mdp2", "Boussole-2026!")
        page.check("#in-conditions")
        cap("01-inscription.png")
        page.click("#form-inscription button[type=submit]")
        page.wait_for_selector(".message.erreur")
        verifier("NIU invalide" in page.inner_text(".message.erreur"), "NIU mal formé refusé avec un message clair")
        verifier(page.input_value("#in-nom") == "Pharmacie du Marché (démo)", "la saisie est conservée après l'erreur")
        page.fill("#in-niu", "m 0416 1818 6649 l")
        page.fill("#in-mdp", "Boussole-2026!")
        page.fill("#in-mdp2", "Boussole-2026!")
        page.click("#form-inscription button[type=submit]")
        page.wait_for_selector("#code-demo")
        code = page.inner_text("#code-demo").split(":")[-1].strip()
        cap("02-code.png")
        page.fill("#code", "000000" if code != "000000" else "111111")
        page.click("#form-code button[type=submit]")
        page.wait_for_selector(".message.erreur")
        verifier("Code incorrect" in page.inner_text(".message.erreur"), "mauvais code refusé")
        page.fill("#code", code)
        page.click("#form-code button[type=submit]")
        page.wait_for_selector("#etat-visibilite")
        verifier("Fiche à compléter" in page.inner_text("#etat-visibilite"), "connecté automatiquement : fiche à compléter")

        # 3. Fiche : questions conditionnelles.
        page.click("#vue-fiche")
        page.wait_for_selector("#q-C1")
        verifier(page.locator("#q-C2").count() == 0 and page.locator("#q-O5").count() == 0, "au départ, C2 et O5 sont masquées")
        page.check("input[name=C1][value=false]")
        verifier(page.locator("#q-C2").count() == 1 and page.locator("#q-C3").count() == 1 and page.locator("#q-O6").count() == 1,
                 "« pas 24 h sur 24 » fait apparaître jours, horaires et ouverture de nuit")
        for j in ("lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"):
            page.check(f"#q-C2 input[value={j}]")
        for cle, v in (("C3_sem_o", "08:00"), ("C3_sem_f", "20:00"), ("C3_sam_o", "08:00"), ("C3_sam_f", "14:00"),
                       ("C3_dim_o", "ferme"), ("C3_dim_f", "ferme")):
            page.select_option(f"#in-{cle}", v)
        page.select_option("#in-C4", "partiel")
        page.check("#q-C5 input[value=fr]"); page.check("#q-C5 input[value=en]")
        page.check("#q-C6 input[value=especes]"); page.check("#q-C6 input[value=mobile_money]")
        verifier(page.locator("#q-C7").count() == 0, "sans « assurance », la question C7 reste masquée")
        page.fill("#in-O1", "AUT-DEMO-2021-044")
        page.check("input[name=O2]")
        page.fill("#in-O3", "ORD-DEMO-1188")
        page.check("input[name=O4][value=true]")
        verifier(page.locator("#q-O5").count() == 1 and page.locator("#q-C8").count() == 1, "la garde fait apparaître son type et le numéro de nuit")
        page.check("#q-O5 input[value=nuits]")
        page.check("input[name=O6][value=false]")
        page.fill("#in-C8", "699000002")
        cap("03-fiche.png")
        page.click("#btn-soumettre")
        page.wait_for_selector(".message.erreur")
        verifier("photo de la façade" in page.inner_text(".message.erreur"), "sans photo de façade, la fiche est refusée")

        # 4. Photos.
        page.click("#vue-photos")
        page.set_input_files("#ph-fichier", {"name": "facade.jpg", "mimeType": "image/jpeg", "buffer": photo_avec_gps()})
        page.click("#form-photo button[type=submit]")
        page.wait_for_selector(".message.erreur")
        verifier("aucune personne" in page.inner_text(".message.erreur").lower(), "photo refusée sans la case « aucune personne »")
        page.set_input_files("#ph-fichier", {"name": "facade.jpg", "mimeType": "image/jpeg", "buffer": photo_avec_gps()})
        page.check("#ph-personne")
        page.click("#form-photo button[type=submit]")
        page.wait_for_selector(".photos img")
        src = page.get_attribute(".photos img", "src")
        img = Image.open(io.BytesIO(page.request.get(base + src).body()))
        verifier(not img.getexif(), "la photo servie n'a plus de métadonnées (GPS, appareil)")
        cap("04-photos.png")

        # 5. Envoi de la fiche → vérifié (NIU dans la liste simulée).
        page.click("#vue-fiche")
        page.click("#btn-soumettre")
        page.wait_for_selector("#etat-visibilite")
        verifier("Vérifié" in page.inner_text("#etat-visibilite"), "NIU de la liste simulée : vérifié et visible")
        cap("05-accueil-verifie.png")

        # 6. Stock : modèle, import, rapport.
        page.click("#vue-stock")
        with page.expect_download() as tele:
            page.click("#modele-xlsx")
        verifier(tele.value.suggested_filename == "modele-stock-medicaments.xlsx", "le modèle Excel se télécharge")
        page.set_input_files("#st-fichier", {"name": "stock.pdf", "mimeType": "application/pdf", "buffer": b"%PDF-1.7 liste"})
        page.click("#form-stock button[type=submit]")
        page.wait_for_selector(".message.erreur")
        verifier("pas un PDF" in page.inner_text(".message.erreur"), "un PDF est refusé")
        fichier = classeur([
            ["dci", "dosage", "forme", "niveau"],
            ["Paracétamol", "500 mg", "comprimé", "disponible"],
            ["Amoxicilline", "500 mg", "gélule", "faible"],
            ["Artésunate", "60 mg", "injectable", "rupture"],
            ["Lévonorgestrel", "1,5 mg", "comprimé", "disponible"],
            ["Zorglubine", "", "comprimé", "disponible"],
            ["Paraxon demo", "", "comprimé", "disponible"],
            ["Mifépristone", "200 mg", "comprimé", "disponible"],
            ["Ibuprofène", "400 mg", "comprimé", "beaucoup"],
        ])
        page.set_input_files("#st-fichier", {"name": "stock.xlsx", "buffer": fichier,
                                             "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
        page.click("#form-stock button[type=submit]")
        page.wait_for_selector("#rapport")
        rapport = page.inner_text("#rapport")
        verifier("4 ligne(s) acceptée(s), 4 ligne(s) rejetée(s)" in rapport, "rapport : 4 acceptées, 4 rejetées")
        verifier(all(m in rapport for m in ("DCI inconnue", "Nom commercial : indiquez la DCI (Paracétamol)",
                                             "Produit exclu", "Niveau hors liste")), "rapport : 4 motifs distincts")
        verifier(page.locator("#stock-actuel tbody tr").count() == 4, "4 lignes de stock affichées avec leur durée restante")
        cap("06-stock-rapport.png")

        # 7. Côté citoyen : la pharmacie apparaît ; la recherche sensible reste sur le téléphone.
        cit = ctx.new_page()
        cit.goto(f"{base}/recherche-medicament.html?lang=fr")
        cit.wait_for_selector("#liste-dci option", state="attached")
        cit.fill("#dci", "Paracétamol")
        cit.click("button.principal")
        cit.wait_for_selector(".resultat")
        texte = cit.inner_text("#sortie")
        verifier("Pharmacie du Marché (démo)" in texte and "Délivré sur ordonnance" in texte, "citoyen : la pharmacie vérifiée apparaît, avec la mention d'ordonnance")
        cap("07-citoyen-resultat.png", cit)
        cit.evaluate("document.getElementById('sortie').replaceChildren()")
        cit.fill("#dci", "Artésunate")
        cit.click("button.principal")
        cit.wait_for_selector("#sortie .message")
        verifier("Aucune pharmacie" in cit.inner_text("#sortie"), "citoyen : un niveau « rupture » n'est pas montré comme disponible")
        avant = len(requetes)
        cit.fill("#dci", "Lévonorgestrel")
        cit.click("button.principal")
        cit.wait_for_selector(".resultat")
        nouvelles = requetes[avant:]
        verifier("Recherche faite sur votre téléphone" in cit.inner_text("#sortie") and "Pharmacie du Marché" in cit.inner_text("#sortie"),
                 "recherche sensible : résultat trouvé sur le téléphone")
        verifier(not any("levonorgestrel" in u.lower() or "vonorgestrel" in u.lower() for u in nouvelles)
                 and any("/tuile/stocks" in u for u in nouvelles), "recherche sensible : seule la tuile est demandée, le serveur ne voit pas le médicament")
        cap("08-citoyen-sensible.png", cit)

        # 7 bis. D-032 : les recherches ont incrémenté les compteurs de la semaine en cours, et rien d'autre.
        from etablissements import tendances as T
        lecture = Service(dossier)
        sem = T.semaine_iso(lecture.maintenant())
        cpt = {(r[2], r[3], r[4]): r[5] for r in lecture._q("SELECT zone, semaine, type, service, satisfaite, n FROM compteurs WHERE semaine=?", (sem,))}
        zones = {r[0] for r in lecture._q("SELECT zone FROM compteurs WHERE semaine=?", (sem,))}
        verifier(cpt == {("medicament", "paracetamol", 0): 1, ("medicament", "paracetamol", 1): 1, ("medicament", "artesunate", 0): 1}
                 and zones == {"050405"},
                 "compteurs : paracétamol non satisfait (avant l'inscription) puis satisfait, artésunate non satisfait ; tout à Douala V")
        verifier(not any(k[1] == "levonorgestrel" for k in cpt), "compteurs : la recherche sensible n'est pas comptée")

        page.click("#vue-indicateurs")
        page.wait_for_selector("#ind-lignes")
        verifier(page.inner_text("#ind-lignes .valeur") == "4" and "25" in page.inner_text("#ind-rupture") and "4/8" in page.inner_text("#ind-import"),
                 "mes indicateurs : 4 lignes, 25 % de rupture, dernier import 4/8")
        cap("11-indicateurs.png")
        page.click("#vue-tendances")
        page.wait_for_selector("#carte-svg path")
        verifier("Douala V" in page.inner_text("#tend-zone"), "tendances : zone par défaut = l'arrondissement de l'établissement")
        verifier(page.inner_text("#tend-non-sat tbody tr:first-child td:first-child") == "Artésunate",
                 "tendances : la rupture d'artésunate arrive en tête de la demande non satisfaite")
        verifier(page.get_attribute(".attribution a", "href") == "https://www.openstreetmap.org/copyright", "carte : attribution OpenStreetMap avec lien vers la licence")
        page.click("button.lien[data-service=artesunate]")
        page.wait_for_selector("#tend-graphique")
        verifier(page.locator("#tend-graphique rect[fill=transparent]").count() == 4, "évolution : une barre par semaine complète (4)")
        page.select_option("#f-niveau", "departement")
        page.wait_for_function("document.getElementById('tend-zone')?.textContent.includes('Wouri')")
        textes = page.eval_on_selector_all("#tend-top .chiffre", "es => es.map(e => e.childNodes[0].textContent)")
        verifier(all(int(x.replace("\u202f", "").replace(" ", "")) % 5 == 0 for x in textes), "tendances : toutes les valeurs affichées sont arrondies à 5")
        cap("12-tendances-departement.png")
        page.select_option("#f-niveau", "ma_zone")
        page.wait_for_function("document.getElementById('tend-zone')?.textContent.includes('Douala V')")

        # 8. Second établissement hors liste : en attente, invisible, puis validé par le vérificateur.
        r = page.request.post(f"{base}/api/v1/etablissements/inscription", data=json.dumps({
            "type": "officine", "nom": "Pharmacie Nouvelle (démo)", "email": "nouvelle@demo.cm", "niu": "M555555555555Z",
            "lat": 4.0605, "lon": 9.7802, "region": "littoral", "district": "DS-DEMO-LIT-2", "quartier": "Carrefour",
            "telephone": "677000003", "secteur": "prive_lucratif", "mot_de_passe": "Nouvelle-2026!", "conditions_acceptees": True}),
            headers={"Content-Type": "application/json"}).json()
        page.request.post(f"{base}/api/v1/etablissements/confirmation", data=json.dumps({"email": "nouvelle@demo.cm", "code": r["code_demo"]}),
                          headers={"Content-Type": "application/json"})
        p2 = ctx.new_page()
        p2.goto(f"{base}/etablissement.html?lang=fr")
        p2.fill("#cx-email", "nouvelle@demo.cm"); p2.fill("#cx-mdp", "Nouvelle-2026!")
        p2.click("#form-connexion button[type=submit]")
        p2.wait_for_selector("#vue-photos")
        p2.click("#vue-photos")
        p2.set_input_files("#ph-fichier", {"name": "f.jpg", "mimeType": "image/jpeg", "buffer": photo_avec_gps()})
        p2.check("#ph-personne"); p2.click("#form-photo button[type=submit]"); p2.wait_for_selector(".photos img")
        jeton = p2.evaluate("sessionStorage.getItem('boussole.ets.jeton')")
        reponses = {"C1": True, "C4": "oui", "C5": ["fr"], "C6": ["especes"], "O1": "AUT-DEMO-2025-090", "O2": True, "O4": False, "C8": "677000004"}
        p2.request.post(f"{base}/api/v1/etablissements/moi/fiche/soumettre", data=json.dumps({"reponses": reponses}),
                        headers={"Content-Type": "application/json", "Authorization": f"Bearer {jeton}"})
        p2.click("#vue-accueil")
        p2.wait_for_selector("#etat-visibilite")
        verifier("En attente de vérification" in p2.inner_text("#etat-visibilite"), "NIU hors liste : en attente de vérification")
        cap("09-en-attente.png", p2)
        p2.click("#vue-tendances")
        p2.wait_for_selector("#tend-non-verifie")
        verifier(p2.locator("#tend-resultats").count() == 0, "tendances refusées à un établissement non vérifié")
        sortie = subprocess.run([sys.executable, str(RACINE / "tools" / "verifier_etablissement.py"), "--donnees", str(dossier),
                                 "--niu", "M555555555555Z", "--valider"], capture_output=True, text=True)
        p2.click("#vue-accueil")
        try:
            p2.wait_for_function("document.getElementById('etat-visibilite')?.textContent.startsWith('Vérifié')", timeout=5000)
        except Exception:
            pass
        verifier("VERIFIE" in sortie.stdout and "Vérifié" in p2.inner_text("#etat-visibilite"), "validation par le vérificateur (outil) : visible")

        # 9. Anglais, historique, déménagement.
        page.click("button[data-langue=en]")
        page.click("#vue-accueil")
        page.wait_for_selector("#etat-visibilite")
        verifier("Verified: citizens can see you." in page.inner_text("#etat-visibilite") and page.is_visible("text=Medicine stock"),
                 "console entièrement en anglais")
        cap("10-console-en.png")
        page.click("button[data-langue=fr]")
        page.click("#vue-historique")
        page.wait_for_selector("#historique li")
        hist = page.inner_text("#historique")
        verifier(all(x in hist for x in ("Inscription", "Fiche envoyée", "Vérification : vérifié", "Stock importé (4 acceptée(s), 4 rejetée(s))")),
                 "historique du compte complet")
        page.click("#vue-compte")
        page.fill("#cp-lat", "4.0700")
        page.click("#form-compte button[type=submit]")
        page.wait_for_selector("#badge-visibilite")
        page.click("#vue-accueil")
        try:
            page.wait_for_function("document.getElementById('etat-visibilite')?.textContent.startsWith('En attente')", timeout=5000)
        except Exception:
            pass
        verifier("En attente de vérification" in page.inner_text("#etat-visibilite"), "déménagement de plus de 500 m : nouvelle vérification")

        # 10. Conditions des établissements et blocage après 5 échecs.
        verifier(page.request.get(f"{base}/conditions-etablissements.html").ok, "la page des conditions des établissements existe")
        for _ in range(5):
            page.request.post(f"{base}/api/v1/etablissements/connexion", data=json.dumps({"email": "nouvelle@demo.cm", "mot_de_passe": "faux-faux-faux"}),
                              headers={"Content-Type": "application/json"})
        r = page.request.post(f"{base}/api/v1/etablissements/connexion", data=json.dumps({"email": "nouvelle@demo.cm", "mot_de_passe": "Nouvelle-2026!"}),
                              headers={"Content-Type": "application/json"})
        verifier(r.status == 429 and r.json()["erreur"] == "E-AUTH-BLOQUE", "5 échecs : connexion bloquée 15 minutes")

        svc = Service(dossier)
        verifier(svc.journal.verifier_chaine(), "journal d'audit : chaîne intacte")
        journal = (dossier / "journal.jsonl").read_text(encoding="utf-8")
        verifier(all(x not in journal for x in ("Boussole-2026!", "contact@pharmacie-demo.cm", "levonorgestrel", "ORD-DEMO-1188")),
                 "journal : ni mot de passe, ni e-mail, ni recherche sensible, ni numéro d'Ordre")
        verifier(not erreurs_js, f"aucune erreur JavaScript {erreurs_js}")
        nav.close()
    serveur.should_exit = True
    print(f"\n{'ÉCHEC' if echecs else 'RÉUSSITE'} : {len(echecs)} échec(s). Captures : {captures}")
    sys.exit(1 if echecs else 0)


if __name__ == "__main__":
    main()
