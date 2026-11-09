"""API HTTP du fil « officine » (Starlette). Lancement : python3 tools/lancer_demo.py"""
import json
import os
import pathlib

from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import FileResponse, JSONResponse, Response
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

from . import fiches, stock, tendances
from .service import RACINE, ErreurMetier, Service

PWA = RACINE / "src" / "client" / "pwa"


def creer_app(service: Service) -> Starlette:
    def erreur(e: ErreurMetier):
        return JSONResponse({"erreur": e.code, "details": e.details}, status_code=e.statut)

    def jeton(req: Request):
        entete = req.headers.get("authorization", "")
        return entete[7:] if entete.lower().startswith("bearer ") else None

    async def corps(req: Request):
        try:
            return await req.json()
        except (json.JSONDecodeError, ValueError):
            raise ErreurMetier("E-REQUETE-JSON")

    def route(fn, auth=False):
        async def gestion(req: Request):
            try:
                ident = service.authentifier(jeton(req)) if auth else None
                res = await fn(req, ident) if auth else await fn(req)
                return res if isinstance(res, Response) else JSONResponse(res)
            except ErreurMetier as e:
                return erreur(e)
        return gestion

    # --------------------------------------------------- publiques
    async def inscription(req):
        return service.inscrire(await corps(req))

    async def confirmation(req):
        d = await corps(req)
        return service.confirmer_email(d.get("email"), d.get("code"))

    async def renvoyer(req):
        return service.renvoyer_code((await corps(req)).get("email"))

    async def connexion(req):
        d = await corps(req)
        return service.connecter(d.get("email"), d.get("mot_de_passe"))

    async def definition(req):
        t = req.query_params.get("type", "officine")
        if t not in fiches.DEFINITIONS:
            raise ErreurMetier("E-ETS-TYPE-NON-DISPONIBLE", 404)
        return {"type": t, "questions": fiches.definition_publique(t)}

    async def territoire(req):
        return {"regions": service.territoire["regions"], "districts": service.territoire["districts_demo"],
                "types": fiches.TYPES, "types_disponibles": sorted(fiches.TYPES_DISPONIBLES)}

    async def modele_xlsx(req):
        return Response(stock.modele_xlsx(service.ref),
                        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        headers={"Content-Disposition": 'attachment; filename="modele-stock-medicaments.xlsx"'})

    async def modele_csv(req):
        return Response(stock.modele_csv(), media_type="text/csv; charset=utf-8",
                        headers={"Content-Disposition": 'attachment; filename="modele-stock-medicaments.csv"'})

    async def referentiel(req):
        return {"version": service.ref.version,
                "dci": [{"code": d["code"], "fr": d["fr"], "en": d["en"], "sensible": bool(d.get("sensible"))}
                        for d in service.ref.dci.values()]}

    async def recherche(req):
        q = req.query_params
        try:
            lat, lon = float(q["lat"]), float(q["lon"])
        except (KeyError, ValueError):
            raise ErreurMetier("E-RECHERCHE-POSITION")
        return service.rechercher_medicament(q.get("dci", ""), lat, lon, q.get("langue", "fr"))

    async def tuile(req):
        return service.tuile(req.query_params.get("region", ""))

    async def photo(req):
        return FileResponse(service.fichier_photo(req.path_params["pid"]), media_type="image/jpeg")

    # --------------------------------------------------- authentifiées
    async def moi(req, ident):
        return service.profil(ident)

    async def fiche_enregistrer(req, ident):
        return service.enregistrer_fiche(ident, (await corps(req)).get("reponses", {}))

    async def fiche_soumettre(req, ident):
        return service.soumettre_fiche(ident, (await corps(req)).get("reponses"))

    async def photo_ajouter(req, ident):
        form = await req.form()
        fichier = form.get("fichier")
        if fichier is None or not hasattr(fichier, "read"):
            raise ErreurMetier("E-PHOTO-FORMAT")
        return service.ajouter_photo(ident, await fichier.read(), form.get("role", ""),
                                     form.get("aucune_personne") == "true")

    async def photo_supprimer(req, ident):
        return service.supprimer_photo(ident, req.path_params["pid"])

    async def stock_importer(req, ident):
        form = await req.form()
        fichier = form.get("fichier")
        if fichier is None or not hasattr(fichier, "read"):
            raise ErreurMetier("E-STOCK-FORMAT")
        return service.importer_stock(ident, fichier.filename, await fichier.read())

    async def stock_lire(req, ident):
        return service.stock(ident)

    async def stock_confirmer(req, ident):
        return service.confirmer_stock(ident)

    async def informations(req, ident):
        return service.modifier_informations(ident, await corps(req))

    async def desactiver(req, ident):
        return service.desactiver(ident)

    async def historique(req, ident):
        return {"entrees": service.historique(ident)}

    async def apercu(req, ident):
        return service.apercu_public(ident)

    async def tendances_vue(req, ident):
        q = req.query_params
        return service.tendances(ident, q.get("niveau") or None, q.get("zone") or "", q.get("type") or None,
                                 q.get("service") or None, q.get("semaines", "4"))

    async def indicateurs(req, ident):
        return service.indicateurs(ident)

    async def zones(req):
        h = service.zones.hierarchie
        return {k: h[k] for k in ("regions", "departements", "arrondissements", "attribution", "licence", "licence_url")}

    async def zones_carte(req):
        q = req.query_params
        niveau, code = q.get("niveau", "national"), q.get("zone", "")
        if not service.zones.zone_valide(niveau, code):
            raise ErreurMetier("E-TEND-ZONE")
        return service.zones.carte(niveau, code)

    async def services(req):
        return {"medicament": [{"code": d["code"], "fr": d["fr"], "en": d["en"]}
                               for d in service.ref.dci.values() if not d.get("sensible")],
                "specialite": [{"code": c, "fr": l[0], "en": l[1]} for c, l in tendances.SPECIALITES.items()],
                "sang": [{"code": g, "fr": g, "en": g} for g in tendances.GROUPES_SANGUINS]}

    async def deconnexion(req, ident):
        service.deconnecter(jeton(req))
        return {}

    p = "/api/v1"
    routes = [
        Route(f"{p}/etablissements/inscription", route(inscription), methods=["POST"]),
        Route(f"{p}/etablissements/confirmation", route(confirmation), methods=["POST"]),
        Route(f"{p}/etablissements/code/renvoyer", route(renvoyer), methods=["POST"]),
        Route(f"{p}/etablissements/connexion", route(connexion), methods=["POST"]),
        Route(f"{p}/etablissements/fiche-definition", route(definition)),
        Route(f"{p}/territoire", route(territoire)),
        Route(f"{p}/etablissements/stock/modele.xlsx", route(modele_xlsx)),
        Route(f"{p}/etablissements/stock/modele.csv", route(modele_csv)),
        Route(f"{p}/referentiel/dci", route(referentiel)),
        Route(f"{p}/recherche/medicament", route(recherche)),
        Route(f"{p}/tuile/stocks", route(tuile)),
        Route(f"{p}/photos/{{pid}}", route(photo)),
        Route(f"{p}/etablissements/moi", route(moi, True)),
        Route(f"{p}/etablissements/moi/fiche", route(fiche_enregistrer, True), methods=["PUT"]),
        Route(f"{p}/etablissements/moi/fiche/soumettre", route(fiche_soumettre, True), methods=["POST"]),
        Route(f"{p}/etablissements/moi/photos", route(photo_ajouter, True), methods=["POST"]),
        Route(f"{p}/etablissements/moi/photos/{{pid}}", route(photo_supprimer, True), methods=["DELETE"]),
        Route(f"{p}/etablissements/moi/stock", route(stock_importer, True), methods=["POST"]),
        Route(f"{p}/etablissements/moi/stock", route(stock_lire, True), methods=["GET"]),
        Route(f"{p}/etablissements/moi/stock/confirmer", route(stock_confirmer, True), methods=["POST"]),
        Route(f"{p}/etablissements/moi/informations", route(informations, True), methods=["PATCH"]),
        Route(f"{p}/etablissements/moi/desactiver", route(desactiver, True), methods=["POST"]),
        Route(f"{p}/etablissements/moi/historique", route(historique, True)),
        Route(f"{p}/etablissements/moi/apercu", route(apercu, True)),
        Route(f"{p}/etablissements/moi/deconnexion", route(deconnexion, True), methods=["POST"]),
        Route(f"{p}/etablissements/moi/tendances", route(tendances_vue, True)),
        Route(f"{p}/etablissements/moi/indicateurs", route(indicateurs, True)),
        Route(f"{p}/zones", route(zones)),
        Route(f"{p}/zones/carte", route(zones_carte)),
        Route(f"{p}/referentiel/services", route(services)),
        Mount("/", app=StaticFiles(directory=str(PWA), html=True)),
    ]
    return Starlette(routes=routes)


def app_par_defaut():
    dossier = pathlib.Path(os.environ.get("BOUSSOLE_DONNEES", RACINE / "var" / "demo"))
    return creer_app(Service(dossier))
