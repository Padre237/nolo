"""Génère le référentiel interne de symptômes (D-018).

Outillage de génération des données (hors produit) : il sérialise un contenu rédigé à partir des sources et
résout les fragments cités en cherchant le texte source exact dans kb/kb_chunks.jsonl.
Sortie (statut UNDER_REVIEW) : data/referentiels/symptomes.csv
Usage : python3 tools/donnees/generer_referentiel_symptomes.py
"""
import csv, json, re, sys, unicodedata
from pathlib import Path
import yaml

OUT = Path(__file__).resolve().parents[2]          # racine du dépôt
KB = next(p for p in (OUT / "kb" / "kb_chunks.jsonl", OUT.parent / "kb" / "kb_chunks.jsonl") if p.exists())
CH = [json.loads(l) for l in open(KB, encoding="utf-8")]
BYID = {c["chunk_id"]: c for c in CH}
T_ENF = "OUTIL DE TRIAGE INTÉGRÉ INTER-AGENCES : ÂGE < 12 ANS"
T_CARTE = "RISQUE ÉLEVÉ — CARTE DE RÉFÉRENCE"


def norm(s):
    s = unicodedata.normalize("NFC", s)
    return re.sub(r"\s+", " ", s).strip()


def segment(c, page):
    """Partie du texte d'un fragment IITT correspondant à une page (1 adulte, 2 enfant, 3 carte)."""
    t = norm(c["text"])
    i2 = t.find(T_ENF)
    i3 = t.find(T_CARTE)
    p_start, p_end = c["page_start"], c["page_end"]
    if page == 1:
        if p_start > 1:
            return ""
        return t[: i2] if i2 >= 0 else t
    if page == 2:
        if p_end < 2 or p_start > 2:
            return ""
        a = i2 if i2 >= 0 else (0 if p_start == 2 else len(t))
        b = i3 if i3 >= 0 else len(t)
        return t[a:b] if p_end >= 2 else ""
    if page == 3:
        if p_end < 3:
            return ""
        return t[i3:] if i3 >= 0 else (t if p_start == 3 else "")
    return t


def resoudre(doc, texte, page=None):
    """chunk_ids du document contenant le texte source exact (et la bonne page pour l'IITT)."""
    texte = norm(texte)
    out = []
    for c in CH:
        if c["doc_id"] != doc:
            continue
        zone = segment(c, page) if (doc == "INT-OMS-IITT-FR" and page) else norm(c["text"])
        if texte in zone:
            out.append(c["chunk_id"])
    if not out:
        sys.exit(f"TEXTE SOURCE INTROUVABLE : {doc} p{page} « {texte} »")
    return out


A, E, C = 1, 2, 3  # pages IITT : adulte, enfant, carte
IITT = "INT-OMS-IITT-FR"
PCIME = "INT-OMS-PCIME-MANUEL"
SBC = "CMR-MINSANTE-GUIDE-SBC-2023"

# jeton, libellé FR, libellé EN, domaine, public, observable, affiché, usage, sensibilité, [(doc, page, texte source)], implique, synonymes FR, synonymes EN
S = [
 ("inconscient", "Inconscient, ne réagit pas", "Unconscious, does not respond", "neurologique", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Inconscient"), (IITT, E, "Ne réagit pas"), (PCIME, None, "LÉTHARGIIQUE OU INCONSCIENT")], [], "inconscient|ne répond pas|perte de connaissance|ne se réveille pas", "unconscious|unresponsive|passed out|not waking up"),
 ("lethargie", "Anormalement endormi, difficile à réveiller", "Abnormally sleepy, hard to wake", "neurologique", "enfant", "oui", "oui", "triage", "sante",
  [(PCIME, None, "Observer si l’enfant est léthargique"), (IITT, E, "léthargie")], [], "léthargique|somnolent|mou|amorphe|anormalement endormi|difficile à réveiller", "lethargic|drowsy|floppy|hard to wake"),
 ("convulsions", "Convulsions pendant cette maladie", "Convulsions during this illness", "neurologique", "tous", "oui", "oui", "triage+surveillance", "sante",
  [(PCIME, None, "L’enfant a-t-il des convulsions ?")], [], "convulsion|crise|crises convulsives|tremblements violents", "seizure|convulsion"),
 ("convulsions_actives", "Convulsions en ce moment", "Seizure happening now", "neurologique", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Convulsions actives"), (IITT, E, "Convulsions actives")], ["convulsions"], "convulse maintenant|crise en cours", "seizing now|ongoing seizure"),
 ("etat_conscience_altere", "Confus, désorienté ou somnolent de façon inhabituelle", "Confused, disoriented or unusually drowsy", "neurologique", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "État de conscience altéré ou agitation (sans critères rouges)"), (IITT, E, "État de conscience altéré (confusion, agitation, irritabilité permanente ou léthargie)")], ["confusion_somnolence_agitation"], "confus|confuse|confusion|désorienté|ne reconnaît plus|délire", "confused|disoriented|delirious"),
 ("agitation_irritabilite", "Agitation ou irritabilité permanente", "Agitation or constant irritability", "neurologique", "tous", "oui", "oui", "triage", "sante",
  [(IITT, E, "Agitation, irritabilité permanente ou léthargie"), (IITT, A, "État de conscience altéré ou agitation (sans critères rouges)")], [], "agité|irritable|pleure sans arrêt", "agitated|irritable|inconsolable"),
 ("cephalee", "Maux de tête", "Headache", "neurologique", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "maux de tête"), (IITT, E, "Maux de tête (sans critères rouges)")], [], "mal de tête|céphalée|migraine", "headache|head pain"),
 ("cephalee_intense", "Maux de tête très intenses", "Very severe headache", "neurologique", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Céphalée intense")], ["cephalee"], "mal de tête atroce|céphalée intense", "worst headache|severe headache"),
 ("raideur_nuque", "Nuque raide", "Stiff neck", "neurologique", "tous", "oui", "oui", "triage+surveillance", "sante",
  [(IITT, A, "raideur cervicale"), (IITT, E, "avec raideur de la nuque"), (SBC, None, "raideur de la nuque")], [], "cou raide|raideur cervicale|raideur de la nuque|ne peut pas plier le cou", "stiff neck|neck stiffness"),
 ("fievre", "Fièvre (corps chaud)", "Fever (hot body)", "general", "tous", "oui", "oui", "triage+surveillance", "sante",
  [(IITT, A, "hypothermie ou fièvre"), (PCIME, None, "il faut classer l’enfant qui a de la fièvre"), (SBC, None, "fièvre")], [], "fièvre|corps chaud|température|chaud au toucher", "fever|high temperature|feverish"),
 ("hypothermie", "Corps anormalement froid (température basse mesurée)", "Abnormally cold body (low measured temperature)", "general", "tous", "avec_appareil", "non", "triage", "sante",
  [(IITT, A, "hypothermie ou fièvre")], [], "hypothermie|froid", "hypothermia"),
 ("hypoglycemie_connue", "Taux de sucre bas mesuré (hypoglycémie)", "Low measured blood sugar", "general", "tous", "avec_appareil", "non", "triage", "sante",
  [(IITT, A, "Hypoglycémie"), (IITT, E, "Hypoglycémie (si connue)")], [], "hypoglycémie|sucre bas", "hypoglycaemia|low sugar"),
 ("signes_neuro_focaux", "Faiblesse soudaine d'un côté du corps, bouche déviée ou difficulté soudaine à parler", "Sudden weakness on one side, drooping face or sudden difficulty speaking", "neurologique", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Signes neurologiques focaux aigus")], [], "paralysie d'un côté|bouche de travers|parole difficile|hémiplégie", "one-sided weakness|facial droop|slurred speech"),
 ("paralysie_membre_soudaine", "Ne bouge plus soudainement un bras ou une jambe", "Suddenly cannot move an arm or a leg", "neurologique", "tous", "oui", "oui", "triage+surveillance", "sante",
  [(SBC, None, "brusquement ne marche plus")], ["signes_neuro_focaux"], "paralysie|ne marche plus|ne bouge plus la jambe", "paralysis|cannot move limb"),
 ("troubles_visuels_aigus", "Trouble soudain de la vue", "Sudden vision problem", "neurologique", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Troubles visuels aigus"), (IITT, A, "Troubles visuels")], [], "vue brouillée|ne voit plus|vision double", "blurred vision|vision loss|double vision"),
 ("evanouissement_recent", "S'est évanoui récemment puis a repris connaissance", "Fainted recently and woke up", "circulation", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Évanouissement récent")], [], "malaise|syncope|s'est évanoui", "fainted|syncope|blackout"),
 ("alteration_etat_general", "Très affaibli depuis peu (état général qui se dégrade)", "Recently very weak (general condition getting worse)", "general", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Altération de l'état général récent")], [], "très faible|se dégrade", "very weak|deteriorating"),
 ("douleur_severe", "Douleur très forte", "Very severe pain", "general", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Douleur sévère (sans critères rouges)"), (IITT, E, "Douleur sévère")], [], "douleur insupportable|très mal", "unbearable pain|severe pain"),
 ("fatigue", "Fatigue", "Tiredness", "general", "tous", "oui", "oui", "triage", "sante", [], [], "fatigué|épuisé|épuisement", "tired|fatigue"),
 ("stridor", "Bruit aigu en inspirant (respiration bruyante)", "High-pitched noise when breathing in", "respiration", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Stridor"), (IITT, E, "Stridor")], [], "stridor|sifflement en inspirant|respiration bruyante", "stridor|noisy breathing in"),
 ("difficulte_respiratoire", "Difficulté à respirer, essoufflement", "Difficulty breathing, shortness of breath", "respiration", "tous", "oui", "oui", "triage+surveillance", "sante",
  [(SBC, None, "difficultés respiratoires")], [], "essoufflé|respire mal|manque d'air|a du mal à respirer|difficulté à respirer|difficulté respiratoire", "short of breath|breathless|hard to breathe|difficulty breathing"),
 ("souffle_court", "Souffle court", "Short breath", "respiration", "tous", "oui", "non", "surveillance", "sante",
  [(SBC, None, "souffle court")], ["difficulte_respiratoire"], "souffle court", "short breath"),
 ("respiration_tres_rapide_ou_lente", "Respire très vite ou très lentement", "Breathing very fast or very slowly", "respiration", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Respiration très rapide ou très lente"), (IITT, C, "Respiration très rapide")], [], "respire très vite|respire vite|halète|respiration lente", "very fast breathing|very slow breathing"),
 ("incapacite_parler_marcher", "Ne peut pas parler ou marcher sans aide", "Cannot speak or walk without help", "respiration", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, C, "Incapacité à parler ou marcher sans aide")], [], "ne peut plus parler|ne tient pas debout", "cannot talk|cannot walk"),
 ("incapacite_parler_manger_teter", "Ne peut pas parler, manger ou téter", "Cannot speak, eat or breastfeed", "respiration", "enfant", "oui", "oui", "triage", "sante",
  [(IITT, C, "Incapacité à parler, manger ou téter")], [], "ne peut ni parler ni manger", "cannot feed|cannot eat or talk"),
 ("confusion_somnolence_agitation", "Confus, somnolent ou agité en respirant mal", "Confused, drowsy or agitated while breathing badly", "respiration", "adulte", "oui", "non", "triage", "sante",
  [(IITT, C, "Confusion, somnolence ou agitation")], [], "", ""),
 ("battement_ailes_nez_geignement", "Narines qui battent ou gémissements en respirant", "Flaring nostrils or grunting when breathing", "respiration", "enfant", "oui", "oui", "triage", "sante",
  [(IITT, C, "Battement des ailes du nez, geignement")], [], "narines qui bougent|geint|gémit", "nasal flaring|grunting"),
 ("muscles_accessoires", "Respire en forçant : creux sous les côtes, cou ou ventre qui se contractent, tête qui hoche", "Working hard to breathe: chest drawing in, neck or belly muscles, head bobbing", "respiration", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Utilisation de muscles accessoires (ex. scalènes, intercostaux, abdominaux)"), (IITT, C, "Utilisation des muscles accessoires (ex. hochement de tête, tirage sous-costal)")], [], "tirage|côtes qui se creusent|hoche la tête|respire en forçant", "chest indrawing|head bobbing|working hard to breathe"),
 ("cyanose", "Lèvres ou langue bleues", "Blue lips or tongue", "respiration", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Détresse respiratoire* ou cyanose centrale"), (IITT, E, "Détresse respiratoire* ou cyanose centrale")], [], "lèvres bleues|langue bleue|cyanosé", "blue lips|cyanosis"),
 ("sifflement", "Respiration sifflante", "Wheezing", "respiration", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Sifflement (sans critères rouges)"), (IITT, E, "Sifflement (sans critères rouges)")], [], "respiration sifflante|siffle", "wheezing|whistling"),
 ("gonflement_bouche_gorge_cou", "Gonflement ou masse dans la bouche, la gorge ou le cou", "Swelling or lump in the mouth, throat or neck", "respiration", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Gonflement/masse de la bouche, la gorge ou le cou"), (IITT, E, "Tout gonflement/masse de la bouche, la gorge ou le cou")], [], "gorge gonflée|cou gonflé|langue gonflée", "swollen throat|swollen tongue|neck lump"),
 ("toux", "Toux", "Cough", "respiration", "tous", "oui", "oui", "triage+surveillance", "sante", [(SBC, None, "toux")], [], "tousse|toux", "cough|coughing"),
 ("maux_gorge", "Mal de gorge", "Sore throat", "respiration", "tous", "oui", "oui", "surveillance", "sante", [(SBC, None, "maux de gorge")], [], "gorge qui gratte|angine", "sore throat"),
 ("rhume", "Rhume, nez qui coule", "Cold, runny nose", "respiration", "tous", "oui", "oui", "surveillance", "sante", [(SBC, None, "rhume")], [], "rhume|nez qui coule|enrhumé", "runny nose|cold"),
 ("saignements_abondants", "Saignement abondant", "Heavy bleeding", "circulation", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Saignements abondants"), (IITT, E, "Saignements abondants")], ["saignements"], "hémorragie|saigne beaucoup", "heavy bleeding|haemorrhage"),
 ("saignements_continus", "Saignement qui ne s'arrête pas (peu abondant)", "Bleeding that does not stop (not heavy)", "circulation", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Saignements continus (sans critères rouges)")], ["saignements"], "saigne encore|ne s'arrête pas de saigner|saignement qui ne s'arrête pas", "keeps bleeding|bleeding that does not stop"),
 ("saignements", "Saignement", "Bleeding", "circulation", "tous", "oui", "non", "surveillance", "sante", [(SBC, None, "saignements")], [], "saigne|sang", "bleeding"),
 ("pouls_faible_rapide", "Pouls faible et rapide", "Weak and fast pulse", "circulation", "tous", "non", "non", "triage", "sante",
  [(IITT, A, "Pouls faible et rapide")], [], "", ""),
 ("recoloration_capillaire_lente", "Recoloration capillaire > 3 secondes", "Capillary refill > 3 seconds", "circulation", "tous", "non", "non", "triage", "sante",
  [(IITT, A, "Recoloration capillaire > 3 sec"), (IITT, E, "Temps de recoloration capillaire > 3 s")], [], "", ""),
 ("extremites_froides", "Mains et pieds froids", "Cold hands and feet", "circulation", "enfant", "oui", "oui", "triage", "sante",
  [(IITT, E, "Extrémités froides")], [], "mains froides|pieds froids", "cold hands|cold feet"),
 ("paleur_severe", "Très pâle", "Very pale", "circulation", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Pâleur sévère (sans critères rouges)"), (IITT, E, "Pâleur sévère (sans critères rouges)")], [], "pâle|paleur", "very pale|pallor"),
 ("yeux_creuses", "Yeux enfoncés (creusés)", "Sunken eyes", "circulation", "enfant", "oui", "oui", "triage", "sante",
  [(IITT, E, "yeux creusés")], [], "yeux enfoncés", "sunken eyes"),
 ("pli_cutane_lent", "Pli de la peau qui s'efface très lentement", "Skin pinch goes back very slowly", "circulation", "enfant", "non", "non", "triage", "sante",
  [(IITT, E, "pli cutané qui s'efface très lentement")], [], "", ""),
 ("boit_peu", "Boit peu", "Drinks little", "digestif", "enfant", "oui", "oui", "triage", "sante",
  [(IITT, E, "boit peu")], [], "ne boit presque pas", "drinking little"),
 ("incapable_de_boire_ou_teter", "Incapable de boire ou de téter", "Unable to drink or breastfeed", "digestif", "enfant", "oui", "oui", "triage", "sante",
  [(PCIME, None, "L’enfant est-il capable de boire ou de téter ?")], ["incapacite_boire_se_nourrir", "incapacite_teter"], "ne peut pas boire|ne tète pas|ne tète plus|ne boit plus", "cannot drink|cannot breastfeed"),
 ("incapacite_boire_se_nourrir", "Incapable de boire ou de se nourrir", "Unable to drink or eat", "digestif", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Incapacité à boire ou se nourrir"), (IITT, E, "Incapacité à boire ou se nourrir")], [], "ne peut rien avaler|ne mange plus", "cannot eat"),
 ("incapacite_teter", "Nouveau-né incapable de téter", "Newborn unable to breastfeed", "digestif", "nourrisson", "oui", "non", "surveillance", "sante",
  [(SBC, None, "incapable de téter")], [], "", ""),
 ("vomit_tout", "Vomit tout ce qu'il avale", "Vomits everything", "digestif", "tous", "oui", "oui", "triage", "sante",
  [(PCIME, None, "L’enfant vomit-il tout ce qu’il avale ?"), (IITT, A, "Vomit tout ou diarrhée continue"), (IITT, E, "Vomit tout")], [], "vomit tout|ne garde rien", "vomits everything|cannot keep anything down"),
 ("diarrhee_continue", "Diarrhée qui ne s'arrête pas", "Continuous diarrhoea", "digestif", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Vomit tout ou diarrhée continue"), (IITT, E, "Diarrhée continue")], ["diarrhee"], "diarrhée sans arrêt", "non-stop diarrhoea"),
 ("deshydratation", "Déshydratation (évaluation clinique)", "Dehydration (clinical assessment)", "digestif", "enfant", "non", "non", "triage", "sante",
  [(IITT, E, "Déshydratation")], [], "", ""),
 ("diarrhee", "Diarrhée", "Diarrhoea", "digestif", "tous", "oui", "oui", "triage+surveillance", "sante", [(SBC, None, "diarrhée")], [], "selles liquides|diarrhée", "diarrhoea|diarrhea|loose stools"),
 ("diarrhee_aqueuse", "Selles liquides, 3 fois ou plus en 24 heures", "Watery stools, 3 or more times in 24 hours", "digestif", "tous", "oui", "oui", "surveillance", "sante",
  [(SBC, None, "trois selles liquides ou plus")], ["diarrhee"], "selles comme de l'eau", "watery diarrhoea|watery stools"),
 ("sang_dans_selles", "Sang dans les selles", "Blood in stools", "digestif", "tous", "oui", "oui", "triage+surveillance", "sante",
  [(PCIME, None, "Sang dans les selles"), (SBC, None, "sang visible dans les")], [], "selles sanglantes|sang dans les selles", "bloody stools"),
 ("douleur_abdominale", "Douleur au ventre", "Abdominal pain", "digestif", "tous", "oui", "oui", "surveillance", "sante", [(SBC, None, "douleurs abdominales")], [], "mal au ventre", "stomach ache|belly pain"),
 ("douleur_abdominale_aigue", "Douleur au ventre apparue récemment", "Recent abdominal pain", "digestif", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Douleur abdominale ou thoracique aiguë (> 50 ans)")], ["douleur_abdominale"], "mal au ventre soudain", "sudden belly pain"),
 ("douleur_abdominale_severe", "Douleur au ventre très forte", "Very severe abdominal pain", "digestif", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Douleur abdominale sévère")], ["douleur_abdominale", "douleur_severe"], "", ""),
 ("douleur_thoracique", "Douleur à la poitrine", "Chest pain", "circulation", "tous", "oui", "non", "triage", "sante", [], [], "mal à la poitrine|douleur thoracique", "chest pain"),
 ("douleur_thoracique_aigue", "Douleur à la poitrine apparue récemment", "Recent chest pain", "circulation", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Douleur abdominale ou thoracique aiguë (> 50 ans)")], ["douleur_thoracique"], "douleur poitrine soudaine|oppression thoracique", "sudden chest pain|chest tightness"),
 ("douleur_dos", "Mal de dos", "Back pain", "general", "tous", "oui", "oui", "triage", "sante", [], [], "mal au dos|lombalgie", "back pain"),
 ("incapacite_uriner", "Ne peut pas uriner", "Cannot pass urine", "general", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Incapacité à uriner")], [], "n'urine plus|bloqué pour uriner", "cannot urinate"),
 ("douleur_testiculaire", "Douleur aiguë des testicules ou des bourses", "Acute pain in the testicles or scrotum", "general", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Douleur testiculaire/scrotale aiguë ou priapisme"), (IITT, E, "Douleur testiculaire/scrotale aiguë ou priapisme")], [], "mal aux testicules|bourses douloureuses", "testicular pain|scrotal pain"),
 ("priapisme", "Érection prolongée et douloureuse", "Prolonged painful erection", "general", "tous", "oui", "non", "triage", "exclu_avis_juriste",
  [(IITT, A, "Douleur testiculaire/scrotale aiguë ou priapisme")], [], "", ""),
 ("agression_sexuelle", "Agression sexuelle", "Sexual assault", "contexte", "tous", "oui", "non", "aucun", "exclu_art48",
  [(IITT, A, "Agression sexuelle"), (IITT, E, "Agression sexuelle")], [], "", ""),
 ("traumatisme", "Blessure ou choc récent (chute, coup, accident)", "Recent injury (fall, blow, accident)", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Autre traumatisme/brûlures (sans critères rouges)"), (IITT, E, "Traumatisme/brûlures (sans critères rouges)")], [], "blessé|blessure|accident|a fait une chute|est tombé|est tombée|a reçu un coup", "injury|injured|accident|had a fall|fell down"),
 ("chute_deux_fois_hauteur", "Chute d'une hauteur d'au moins deux fois sa taille", "Fall from at least twice own height", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Chute de deux fois sa hauteur")], ["traumatisme_haut_risque", "traumatisme"], "chute de haut", "fall from height"),
 ("traumatisme_penetrant", "Plaie par objet qui a pénétré le corps (couteau, balle, objet pointu)", "Penetrating wound (knife, bullet, sharp object)", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Tout traumatisme pénétrant (en excluant ceux des parties distales du coude/genou si saignement contrôlé)")], ["traumatisme_haut_risque", "traumatisme"], "coup de couteau|blessure par balle|plaie pénétrante", "stab wound|gunshot|penetrating wound"),
 ("trauma_ecrasement", "Écrasé (par un objet lourd, un éboulement)", "Crushed (by heavy object, collapse)", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Trauma par écrasement")], ["traumatisme_haut_risque", "traumatisme"], "écrasé|coincé sous", "crushed"),
 ("polytraumatisme", "Blessures à plusieurs endroits du corps", "Injuries in several body areas", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Polytraumatisme (blessures sur plusieurs zones du corps)")], ["traumatisme_haut_risque", "traumatisme"], "blessé partout", "multiple injuries"),
 ("sous_anticoagulants", "Trouble de la coagulation ou traitement qui fluidifie le sang", "Bleeding disorder or blood-thinning treatment", "contexte", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Patient présentant un trouble de la coagulation ou sous anticoagulants")], [], "anticoagulant|hémophilie", "anticoagulant|blood thinner"),
 ("accident_haute_cinetique", "Accident de la route à grande vitesse", "High-speed road accident", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Accident de la voie publique à haute cinétique")], ["traumatisme_haut_risque", "traumatisme"], "accident grave|choc violent", "high-speed crash"),
 ("pieton_cycliste_percute", "Piéton ou cycliste renversé par un véhicule", "Pedestrian or cyclist hit by a vehicle", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Piéton ou cycliste percuté par un véhicule")], ["traumatisme_haut_risque", "traumatisme"], "renversé par une voiture|renversé par une moto", "hit by a car"),
 ("passager_decede", "Autre passager du même véhicule décédé sur place", "Another passenger in the same vehicle died", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Autre passager du même véhicule décédé sur place")], ["traumatisme_haut_risque", "traumatisme"], "", ""),
 ("accident_sans_ceinture", "Accident de la route sans ceinture", "Road accident without seat belt", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Accident de la route sans ceinture")], ["traumatisme_haut_risque", "traumatisme"], "", ""),
 ("coince_ou_ejecte", "Coincé dans le véhicule ou éjecté (y compris à moto)", "Trapped in or thrown from the vehicle (including motorbikes)", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Coincé dans ou éjecté du véhicule (y compris les motos)")], ["traumatisme_haut_risque", "traumatisme"], "éjecté de la moto|coincé dans la voiture", "thrown from motorbike|trapped in car"),
 ("traumatisme_haut_risque", "Traumatisme à haut risque (dérivé)", "High-risk trauma (derived)", "traumatisme", "tous", "oui", "non", "triage", "sante",
  [(IITT, A, "Traumatisme à haut risque*"), (IITT, E, "Traumatisme à haut risque*")], [], "", ""),
 ("brulure", "Brûlure", "Burn", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Autre traumatisme/brûlures (sans critères rouges)")], [], "brûlé|brûlure", "burn|burnt"),
 ("brulure_etendue", "Brûlure étendue (plus de 15 % de la surface du corps)", "Large burn (more than 15% of the body)", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Plus de 15 % de la surface corporelle")], ["brulure", "traumatisme_haut_risque"], "grande brûlure|brûlure étendue", "large burn"),
 ("brulure_visage_cou_circulaire", "Brûlure du visage, du cou ou qui fait le tour d'un membre", "Burn of face or neck, or all around a limb", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Brûlures circonférentielles ou du visage ou du cou")], ["brulure", "traumatisme_haut_risque"], "brûlure au visage|brûlure du visage|brûlure au cou", "face burn|burnt face|neck burn"),
 ("brulure_inhalation", "Brûlure par inhalation (fumée, feu dans un lieu fermé)", "Inhalation burn (smoke, fire in closed space)", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "Brûlures par inhalation")], ["brulure", "traumatisme_haut_risque"], "a respiré de la fumée|brûlure par inhalation", "smoke inhalation|inhalation burn"),
 ("membre_menace", "Après une blessure, membre douloureux et pâle, faible, engourdi ou très gonflé", "After an injury, painful limb that is pale, weak, numb or very swollen", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, C, "douloureux + au moins un des signes suivants : pâleur, faiblesse, engourdissement ou œdème massif après un traumatisme")], ["traumatisme"], "", ""),
 ("membre_sans_pouls", "Membre sans pouls", "Limb without pulse", "traumatisme", "tous", "non", "non", "triage", "sante",
  [(IITT, C, "patient avec membre sans pouls")], [], "", ""),
 ("empoisonnement_exposition", "A avalé, respiré ou touché un poison ou un produit chimique dangereux", "Swallowed, breathed in or touched a poison or dangerous chemical", "contexte", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Empoisonnement/ingestion ou exposition à des substances chimiques dangereuses*"), (IITT, C, "Les patients présentant un risque élevé d'ingestion ou d'exposition doivent initialement être catégorisés rouges")], [], "intoxication|empoisonné|a bu un produit", "poisoning|swallowed chemical"),
 ("morsure_serpent", "Morsure de serpent", "Snake bite", "contexte", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Morsure de serpent"), (IITT, E, "Morsure de serpent")], [], "mordu par un serpent", "snake bite"),
 ("morsure_animal", "Morsure d'animal (chien ou autre mammifère)", "Animal bite (dog or other mammal)", "contexte", "tous", "oui", "oui", "triage+surveillance", "sante",
  [(IITT, A, "Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal, blessure par piqûre d'aiguille)"), (SBC, None, "mordue par un chien")], ["exposition_prophylaxie"], "mordu par un chien|mordu par un animal|morsure d'animal", "dog bite|animal bite"),
 ("piqure_aiguille", "Blessure par une aiguille déjà utilisée", "Needle-stick injury", "contexte", "adulte", "oui", "oui", "triage", "sante",
  [(IITT, A, "Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal, blessure par piqûre d'aiguille)")], ["exposition_prophylaxie"], "piqué par une seringue", "needle-stick"),
 ("exposition_prophylaxie", "Exposition nécessitant une prophylaxie d'urgence (dérivé)", "Exposure needing urgent prophylaxis (derived)", "contexte", "tous", "oui", "non", "triage", "sante",
  [(IITT, A, "Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal, blessure par piqûre d'aiguille)"), (IITT, E, "Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal)")], [], "", ""),
 ("deformation_membre", "Bras ou jambe très déformé", "Badly deformed arm or leg", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Déformation d'un membre importante et visible")], ["traumatisme"], "membre tordu", "deformed limb"),
 ("fracture_ouverte", "Os visible à travers une plaie", "Bone visible through a wound", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Fracture ouverte")], ["traumatisme"], "os qui sort", "open fracture"),
 ("luxation_suspectee", "Articulation déboîtée", "Dislocated joint", "traumatisme", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Suspicion de luxation")], ["traumatisme"], "épaule déboîtée|luxation", "dislocation"),
 ("diagnostic_chirurgie_urgente", "Un soignant a déjà dit qu'une opération urgente est nécessaire", "A health worker already said urgent surgery is needed", "contexte", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Diagnostic connu nécessitant une intervention chirurgicale d'urgence"), (IITT, E, "Diagnostic connu nécessitant une intervention chirurgicale d'urgence")], [], "", ""),
 ("eruption_aggravation", "Nouvelle éruption de la peau qui s'aggrave en quelques heures, ou peau qui pèle", "New rash getting worse within hours, or peeling skin", "peau", "tous", "oui", "oui", "triage", "sante",
  [(IITT, A, "Nouvelle éruption cutanée qui s'aggrave au fil des heures ou desquamation (sans critères rouges)"), (IITT, E, "Nouvelle éruption cutanée qui s'aggrave au fil des heures ou desquamation (sans critères rouges)")], ["eruption_cutanee"], "boutons qui s'étendent|peau qui pèle", "spreading rash|peeling skin"),
 ("eruption_cutanee", "Boutons ou éruption sur la peau", "Rash or spots on the skin", "peau", "tous", "oui", "oui", "surveillance", "sante",
  [(SBC, None, "éruption")], [], "boutons|éruption|plaques rouges", "rash|spots"),
 ("jaunissement_yeux", "Blanc des yeux jaune", "Yellow whites of the eyes", "peau", "tous", "oui", "oui", "surveillance", "sante",
  [(SBC, None, "jaunissement du blanc de l’œil")], [], "yeux jaunes|jaunisse", "yellow eyes|jaundice"),
 ("jaunissement_peau", "Peau jaune (paumes, plantes des pieds, ongles)", "Yellow skin (palms, soles, nails)", "peau", "tous", "oui", "oui", "surveillance", "sante",
  [(SBC, None, "jaunissement des yeux ou de la peau")], [], "peau jaune", "yellow skin"),
 ("lesion_cutanee", "Plaie ou lésion de la peau", "Skin wound or lesion", "peau", "tous", "oui", "oui", "surveillance", "sante", [(SBC, None, "lésion cutanée")], [], "plaie|lésion", "skin lesion"),
 ("emergence_ver", "Ver qui sort de la peau", "Worm coming out of the skin", "peau", "tous", "oui", "oui", "surveillance", "sante", [(SBC, None, "l’émergence d’un ver")], [], "ver sous la peau", "guinea worm"),
 ("vaccination_recente", "Vaccination récente", "Recent vaccination", "contexte", "tous", "oui", "oui", "surveillance", "sante", [(SBC, None, "tout autre symptôme survenu après une")], [], "vacciné récemment", "recently vaccinated"),
 ("autre_symptome", "Autre symptôme", "Other symptom", "general", "tous", "oui", "oui", "surveillance", "sante", [], [], "", ""),
 ("raideur", "Nouveau-né raide", "Stiff newborn", "neurologique", "nourrisson", "oui", "oui", "surveillance", "sante", [(SBC, None, "devient raide")], [], "", ""),
 ("fonte_musculaire_severe", "Très maigre, muscles fondus", "Very thin, severe muscle wasting", "general", "enfant", "oui", "oui", "triage", "sante",
  [(IITT, E, "Malnutrition avec fonte musculaire sévère visible OU œdème aux deux pieds")], [], "très maigre|squelettique", "severe wasting|very thin"),
 ("oedeme_deux_pieds", "Les deux pieds gonflés", "Both feet swollen", "general", "enfant", "oui", "oui", "triage", "sante",
  [(IITT, E, "Malnutrition avec fonte musculaire sévère visible OU œdème aux deux pieds")], [], "pieds enflés", "swollen feet"),
 ("grossesse", "Enceinte", "Pregnant", "grossesse", "tous", "oui", "oui", "triage", "sante_avis_juriste",
  [(IITT, A, "GROSSESSE AVEC AU MOINS UN DES CRITÈRES SUIVANTS :"), (IITT, E, "Grossesse (sans critères rouges)"), (IITT, C, "Grossesse")], [], "enceinte|grossesse", "pregnant|pregnancy"),
 ("accouchement_declenche", "Le travail de l'accouchement a commencé", "Labour has started", "grossesse", "tous", "oui", "oui", "triage", "sante_avis_juriste",
  [(IITT, A, "Accouchement déclenché")], ["grossesse"], "contractions de l'accouchement|perte des eaux|a perdu les eaux|le travail a commencé", "labour|labor|waters broke"),
 ("grossesse_complications", "Enceinte et adressée par un soignant pour une complication", "Pregnant and referred for a complication", "grossesse", "tous", "oui", "oui", "triage", "sante_avis_juriste",
  [(IITT, A, "Grossesse adressée pour complications")], ["grossesse"], "", ""),
 ("pression_arterielle_elevee", "Tension mesurée : PAS ≥ 160 ou PAD ≥ 110", "Measured BP: SBP ≥ 160 or DBP ≥ 110", "grossesse", "adulte", "avec_appareil", "non", "triage", "sante",
  [(IITT, A, "PAS ≥ 160 ou PAD ≥ 110")], [], "", ""),
 ("signes_vitaux_haut_risque", "Signes vitaux à haut risque (FC, FR, température, SpO2, AVPU mesurés)", "High-risk vital signs (measured)", "general", "tous", "avec_appareil", "non", "triage", "sante",
  [(IITT, A, "SpO2 < 92 %"), (IITT, E, "SpO2 < 92 %")], [], "", ""),
 ("frequence_cardiaque_extreme", "Fréquence cardiaque < 50 ou > 150 (mesurée)", "Heart rate < 50 or > 150 (measured)", "circulation", "adulte", "avec_appareil", "non", "triage", "sante",
  [(IITT, A, "FC < 50 ou > 150")], [], "", ""),
 ("ischemie_ecg", "ECG montrant une ischémie aiguë", "ECG showing acute ischaemia", "circulation", "adulte", "avec_appareil", "non", "triage", "sante",
  [(IITT, A, "ECG mettant en évidence une ischémie aiguë (si ECG)")], [], "", ""),
 ("violence_agressivite", "Violence ou agressivité (critère d'établissement)", "Violence or aggressiveness (facility criterion)", "contexte", "adulte", "non", "non", "aucun", "sante",
  [(IITT, A, "Violence ou agressivité")], [], "", ""),
 # --- Ajouts de la version 1.1.0 (toujours en fin de liste : les codes existants ne changent jamais)
 ("diarrhee_avec_sang", "Diarrhée avec du sang", "Diarrhoea with blood", "digestif", "tous", "oui", "non", "triage", "sante",
  [(PCIME, None, "Quand il y a du sang dans les selles d’une personne qui a la diarrhée")], ["diarrhee", "sang_dans_selles"],
  "diarrhée avec du sang|diarrhée avec sang|diarrhée sanglante|dysenterie", "bloody diarrhoea|bloody diarrhea|dysentery"),
]

def norm_expr(t):
    """Normalisation de l'extracteur lexical (SF-001-03, design §6) : sans accents, minuscules, tout caractère autre
    qu'une lettre ou un chiffre (apostrophes comprises) remplacé par une espace, « s » ou « x » final retiré des mots
    de 4 lettres ou plus."""
    t = "".join(ch for ch in unicodedata.normalize("NFD", t) if unicodedata.category(ch) != "Mn").lower()
    t = re.sub(r"[^a-z0-9]+", " ", t)
    mots = [m[:-1] if len(m) >= 4 and m[-1] in "sx" else m for m in t.split()]
    return " ".join(mots)


def expressions(r):
    """Expressions indexées pour une entrée utilisable : libellés et synonymes FR et EN."""
    ex = [r["libelle_fr"], r["libelle_en"]] + r["synonymes_fr"].split("|") + r["synonymes_en"].split("|")
    return [e for e in (norm_expr(x) for x in ex) if e]


def utilisable(r):
    return not r["sensibilite"].startswith("exclu") and r["observable_non_professionnel"] == "oui"


def controler(rows):
    """Contrôles bloquants : codes stables par rapport au fichier existant, une expression = un seul jeton."""
    dossier = OUT / "data" / "referentiels"
    anciens = [dossier / "symptomes.csv"] + sorted((dossier / "historique").glob("symptomes-*.csv"))
    for ancien in (a for a in anciens if a.exists()):
        prec = {r["jeton"]: r["code"] for r in csv.DictReader(open(ancien, encoding="utf-8"))}
        for r in rows:
            assert prec.get(r["jeton"], r["code"]) == r["code"], f"CODE MODIFIÉ : {r['jeton']} ({ancien.name})"
        manquants = set(prec) - {r["jeton"] for r in rows}
        assert not manquants, f"JETONS SUPPRIMÉS : {sorted(manquants)} ({ancien.name})"
    vu = {}
    for r in rows:
        if not utilisable(r):
            continue
        for e in expressions(r):
            assert vu.setdefault(e, r["jeton"]) == r["jeton"], f"EXPRESSION AMBIGUË « {e} » : {vu[e]} / {r['jeton']}"
    return len(vu)


def generer():
    seen = set()
    rows = []
    for i, s in enumerate(S, 1):
        (jeton, lfr, len_, dom, pub, obs, aff, usage, sens, srcs, impl, syfr, syen) = s
        assert jeton not in seen, jeton
        seen.add(jeton)
        cids, txts = [], []
        for doc, page, txt in srcs:
            cids += resoudre(doc, txt, page)
            txts.append(f"{doc} : « {txt} »")
        rows.append({"code": f"SYM-{i:03d}", "jeton": jeton, "libelle_fr": lfr, "libelle_en": len_,
                     "libelle_source": " | ".join(txts), "synonymes_fr": syfr, "synonymes_en": syen,
                     "domaine": dom, "public": pub, "observable_non_professionnel": obs, "affiche": aff,
                     "usage": usage, "sensibilite": sens, "sources": " ".join(dict.fromkeys(cids)),
                     "implique": " ".join(impl), "snomed_gps_id": "", "statut": "PROPOSITION"})
    for r in rows:
        for j in r["implique"].split():
            assert j in seen, (r["jeton"], j)
    # Règle de sécurité : rien d'exclu ne doit être affiché ni utilisé
    for r in rows:
        if r["sensibilite"].startswith("exclu"):
            assert r["affiche"] == "non" and r["usage"] in ("aucun", "triage"), r["jeton"]

    nb_expr = controler(rows)
    (OUT / "data" / "referentiels").mkdir(parents=True, exist_ok=True)
    with open(OUT / "data" / "referentiels" / "symptomes.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print(len(rows), "entrées ;", sum(r["affiche"] == "oui" for r in rows), "affichées ;",
          sum(r["observable_non_professionnel"] != "oui" for r in rows), "non observables ou avec appareil ;",
          sum(r["sensibilite"].startswith("exclu") for r in rows), "exclues ;", nb_expr, "expressions indexées, aucune ambiguë ; codes stables")


if __name__ == "__main__":
    generer()
