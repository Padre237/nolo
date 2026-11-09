"""Tests de D-032 : compteurs anonymes, localisation, tendances et indicateurs (CA-TEND-01 à 09)."""
import sqlite3
import sys
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import pytest

RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RACINE / "src" / "server"))
sys.path.insert(0, str(Path(__file__).parent))

from etablissements import tendances  # noqa: E402
from etablissements.service import ErreurMetier, Service  # noqa: E402
from test_etablissements import FICHE_OK, INSCRIPTION, Horloge, image, officine_verifiee, xlsx, stock  # noqa: E402

DOUALA = ZoneInfo("Africa/Douala")
POS_DOUALA = (4.05, 9.77)


@pytest.fixture
def h():
    return Horloge()


@pytest.fixture
def svc(tmp_path, h):
    return Service(tmp_path, horloge=h)


def compteurs(svc):
    return [tuple(r) for r in svc._q("SELECT zone, semaine, type, service, satisfaite, n FROM compteurs ORDER BY 1,2,3,4,5")]


def ajouter(svc, zone, semaine, type_, service, satisfaite, n):
    svc._q("INSERT INTO compteurs VALUES (?,?,?,?,?,?) ON CONFLICT(zone, semaine, type, service, satisfaite) DO UPDATE SET n = n + excluded.n",
           (zone, semaine, type_, service, int(satisfaite), n))


# ------------------------------------------------------------------ CA-TEND-01
def test_ca_tend_01_une_recherche_un_compteur_rien_d_autre(svc, h):
    ident = officine_verifiee(svc)
    svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Paracétamol", "500 mg", "comprimé", "disponible"]]))
    svc.rechercher_medicament("paracétamol", *POS_DOUALA)
    sem = tendances.semaine_iso(h())
    assert compteurs(svc) == [("050405", sem, "medicament", "paracetamol", 1, 1)]
    svc.rechercher_medicament("Paracetamol", *POS_DOUALA)
    assert compteurs(svc)[0][-1] == 2
    colonnes = [r[1] for r in svc._q("PRAGMA table_info(compteurs)")]
    assert colonnes == ["zone", "semaine", "type", "service", "satisfaite", "n"]  # ni heure, ni position, ni session
    journal = (svc.dossier / "journal.jsonl").read_text(encoding="utf-8")
    assert "paracetamol" not in journal and "recherche" not in journal


def test_recherche_non_satisfaite_comptee_comme_telle(svc, h):
    svc.rechercher_medicament("artésunate", *POS_DOUALA)  # aucune pharmacie
    assert compteurs(svc) == [("050405", tendances.semaine_iso(h()), "medicament", "artesunate", 0, 1)]


# ------------------------------------------------------------------ CA-TEND-02
def test_ca_tend_02_recherches_sensibles_jamais_comptees(svc):
    for texte in ("lévonorgestrel", "Mifépristone", "Zorglubine"):
        with pytest.raises(ErreurMetier):
            svc.rechercher_medicament(texte, *POS_DOUALA)
    assert svc.compter_recherche("specialite", "psychiatrie", *POS_DOUALA) == {"compte": False}
    assert svc.compter_recherche("specialite", "gynecologie_obstetrique", *POS_DOUALA) == {"compte": False}
    assert compteurs(svc) == []
    svc.compter_recherche("specialite", "pediatrie", *POS_DOUALA)
    svc.compter_recherche("sang", "O-", *POS_DOUALA, satisfaite=False)
    assert {(r[2], r[3], r[4]) for r in compteurs(svc)} == {("specialite", "pediatrie", 1), ("sang", "O-", 0)}
    with pytest.raises(ErreurMetier):
        svc.compter_recherche("specialite", "astrologie", *POS_DOUALA)


# ------------------------------------------------------------------ CA-TEND-03 et 04
def test_ca_tend_03_localisation_par_l_arrondissement_et_le_code_ins(svc):
    zone, mode = svc.zones.localiser(4.0511, 9.7679)
    assert (zone, mode) == ("050405", "dedans")
    assert svc.zones.libelle("departement", zone[:4]) == "Wouri"
    assert svc.zones.libelle("region", zone[:2]) == "Littoral"
    assert svc.zones.localiser(3.8667, 11.5167)[0] == "020701"  # Yaoundé I, rangé dans le Mfoundi par son code


def test_ca_tend_04_repli_a_15_km(svc):
    assert svc.zones.localiser(9.4, 12.9) == ("060109", "proche")  # bande hors polygone, à côté de Mayo-Hourna
    assert svc.zones.localiser(2.9, 9.55) == ("NATIONAL", "hors_zone")  # en mer, à plus de 15 km


def test_zone_sans_code_valide_au_niveau_national_seulement(svc, h):
    zone, _ = svc.zones.localiser(6.5466, 10.4462)
    assert zone.startswith("PROV-")
    sems = tendances.semaines_completes(h(), 4)
    lignes = [(zone, sems[-1], "medicament", "paracetamol", 1, 40)]
    assert tendances.calculer(lignes, "national", "", sems, [])["plus_recherches"][0]["valeur"] == 40
    assert tendances.calculer(lignes, "region", "07", sems, [])["plus_recherches"] == []


# ------------------------------------------------------------------ CA-TEND-05
def test_ca_tend_05_seuil_et_arrondi(h):
    assert [tendances.afficher(n) for n in (0, 3, 4, 5, 22, 23, 27, 28)] == [None, None, None, 5, 20, 25, 25, 30]
    sems = tendances.semaines_completes(h(), 4)
    lignes = [("050405", sems[0], "medicament", "paracetamol", 1, 23), ("050405", sems[1], "medicament", "quinine", 1, 3)]
    r = tendances.calculer(lignes, "arrondissement", "050405", sems, [])
    assert [(x["service"], x["valeur"]) for x in r["plus_recherches"]] == [("paracetamol", 25)]
    assert r["carte"] == {"050405": 2}
    r = tendances.calculer(lignes, "arrondissement", "050405", sems, [], service="quinine")
    assert r["carte"] == {"050405": 0} and r["total"] is None


# ------------------------------------------------------------------ CA-TEND-06
def test_ca_tend_06_semaines_completes_seulement(h):
    h.t = datetime(2026, 11, 9, 8, 0, tzinfo=DOUALA)  # lundi, semaine 2026-W46
    assert tendances.semaine_iso(h.t) == "2026-W46"
    assert tendances.semaines_completes(h.t, 4) == ["2026-W42", "2026-W43", "2026-W44", "2026-W45"]
    assert tendances.semaines_completes(h.t, 4, decalage=4) == ["2026-W38", "2026-W39", "2026-W40", "2026-W41"]


def test_semaine_en_cours_jamais_montree(svc, h):
    ident = officine_verifiee(svc)
    ajouter(svc, "050405", tendances.semaine_iso(h()), "medicament", "paracetamol", 1, 50)
    assert svc.tendances(ident)["plus_recherches"] == []
    h.avancer(days=7)
    assert svc.tendances(ident)["plus_recherches"][0]["valeur"] == 50


# ------------------------------------------------------------------ CA-TEND-07
def test_ca_tend_07_demande_non_satisfaite(svc, h):
    ident = officine_verifiee(svc)
    sem = tendances.semaines_completes(h(), 4)[-1]
    ajouter(svc, "050405", sem, "medicament", "artesunate", 0, 30)
    ajouter(svc, "050405", sem, "medicament", "artesunate", 1, 10)
    ajouter(svc, "050405", sem, "medicament", "quinine", 0, 4)
    ajouter(svc, "050405", sem, "medicament", "quinine", 1, 20)
    r = svc.tendances(ident)
    assert r["non_satisfaite"] == [{"type": "medicament", "service": "artesunate", "non_satisfaites": 30, "part": 75}]


def test_agregation_par_code_ins(svc, h):
    ident = officine_verifiee(svc)
    sem = tendances.semaines_completes(h(), 4)[-1]
    ajouter(svc, "050405", sem, "medicament", "paracetamol", 1, 12)   # Douala V
    ajouter(svc, "050401", sem, "medicament", "paracetamol", 1, 12)   # Douala I
    ajouter(svc, "020701", sem, "medicament", "paracetamol", 1, 12)   # Yaoundé I
    assert svc.tendances(ident, "departement", "0504")["plus_recherches"][0]["valeur"] == 25
    assert svc.tendances(ident, "region", "05")["plus_recherches"][0]["valeur"] == 25
    assert svc.tendances(ident, "national", "")["plus_recherches"][0]["valeur"] == 35
    r = svc.tendances(ident)
    assert (r["niveau"], r["zone"], r["zone_etablissement"]) == ("arrondissement", "050405", "050405")


def test_tendance_hausse_seulement_au_dela_des_seuils(svc, h):
    ident = officine_verifiee(svc)
    cour = tendances.semaines_completes(h(), 4)
    prec = tendances.semaines_completes(h(), 4, decalage=4)
    ajouter(svc, "050405", cour[0], "medicament", "paracetamol", 1, 30)
    ajouter(svc, "050405", prec[0], "medicament", "paracetamol", 1, 20)
    ajouter(svc, "050405", cour[0], "medicament", "quinine", 1, 15)
    ajouter(svc, "050405", prec[0], "medicament", "quinine", 1, 5)
    r = {x["service"]: x["tendance"] for x in svc.tendances(ident)["plus_recherches"]}
    assert r == {"paracetamol": "hausse", "quinine": None}  # quinine : moins de 20 recherches


def test_serie_hebdomadaire(svc, h):
    ident = officine_verifiee(svc)
    sems = tendances.semaines_completes(h(), 4)
    ajouter(svc, "050405", sems[1], "medicament", "paracetamol", 1, 12)
    ajouter(svc, "050405", sems[2], "medicament", "paracetamol", 1, 3)
    r = svc.tendances(ident, service="paracetamol")
    assert [x["valeur"] for x in r["serie"]] == [None, 10, None, None]


# ------------------------------------------------------------------ CA-TEND-08 et 09
def test_ca_tend_08_reserve_aux_etablissements_verifies(svc):
    ident = officine_verifiee(svc, niu="M555555555555Z", email="b@demo.cm")
    with pytest.raises(ErreurMetier) as e:
        svc.tendances(ident)
    assert e.value.code == "E-TEND-NON-VERIFIE"


@pytest.mark.parametrize("args,code", [
    (("region", "99"), "E-TEND-ZONE"), (("arrondissement", "PROV-fonfuka"), "E-TEND-ZONE"),
    (("national", "", "astrologie"), "E-TEND-TYPE"),
])
def test_parametres_invalides(svc, args, code):
    ident = officine_verifiee(svc)
    with pytest.raises(ErreurMetier) as e:
        svc.tendances(ident, *args)
    assert e.value.code == code
    with pytest.raises(ErreurMetier) as e:
        svc.tendances(ident, semaines=6)
    assert e.value.code == "E-TEND-PERIODE"


def test_ca_tend_09_aucune_valeur_brute_ni_route_brute(svc, h):
    ident = officine_verifiee(svc)
    import random
    rnd = random.Random(3)
    for sem in tendances.semaines_completes(h(), 12):
        for serv in ("paracetamol", "quinine", "artesunate", "amoxicilline"):
            ajouter(svc, "050405", sem, "medicament", serv, rnd.random() < .7, rnd.randint(0, 60))
    for semaines in (4, 8, 12):
        r = svc.tendances(ident, "national", "", semaines=semaines, service="quinine")
        valeurs = [x["valeur"] for x in r["plus_recherches"]] + [x["non_satisfaites"] for x in r["non_satisfaite"]] + \
                  [x["valeur"] for x in r["serie"]] + [r["total"]]
        assert all(v is None or (v >= 5 and v % 5 == 0) for v in valeurs)
    from etablissements.app import creer_app
    chemins = [getattr(rt, "path", "") for rt in creer_app(svc).routes]
    assert not any("compteur" in c for c in chemins)


# ------------------------------------------------------------------ Mes indicateurs
def test_indicateurs(svc, h):
    ident = officine_verifiee(svc)
    svc.importer_stock(ident, "s.xlsx", xlsx([stock.COLONNES, ["Paracétamol", "", "comprimé", "disponible"],
                                              ["Amoxicilline", "", "gélule", "rupture"], ["Zorglubine", "", "comprimé", "disponible"]]))
    i = svc.indicateurs(ident)
    assert i["visible"] and i["stock"]["lignes"] == 2 and i["stock"]["taux_rupture"] == 50
    assert i["dernier_import"]["motifs"] == {"DCI_INCONNUE": 1}
    assert i["fiche"]["photo_facade"] and i["fiche"]["repondues"] == i["fiche"]["questions"]
    assert i["regularite_30j"] == 100
    h.avancer(days=3)  # stock expiré depuis un jour
    i = svc.indicateurs(ident)
    assert not i["visible"] and i["regularite_30j"] < 100


def test_carte_d_un_arrondissement_couvre_son_departement(svc, h):
    ident = officine_verifiee(svc)
    sem = tendances.semaines_completes(h(), 4)[-1]
    ajouter(svc, "050405", sem, "medicament", "paracetamol", 1, 12)
    ajouter(svc, "050401", sem, "medicament", "paracetamol", 1, 60)
    ajouter(svc, "020701", sem, "medicament", "paracetamol", 1, 60)
    r = svc.tendances(ident)
    assert r["carte"] == {"050405": 1, "050401": 3}  # Yaoundé I, hors du département, n'y figure pas
    assert r["plus_recherches"][0]["valeur"] == 10   # le classement reste celui de l'arrondissement
