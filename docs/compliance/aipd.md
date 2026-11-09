# Analyse d'impact relative à la protection des données (AIPD) — Nolo

| Champ | Valeur |
|---|---|
| Version | 0.1.0 (2026-11-09) — projet, à relire par le juriste de l'équipe |
| Sous-fonctionnalité | SF-007-16 (FR-708, FR-787) |
| Modèle | RGPD art. 35, faute de décret camerounais sur l'analyse d'impact (loi 2024/017 art. 33, `CMR-LOI-2024-017::0034` ; lacune L3) |
| Responsable du traitement | Équipe CENADI Équipe 2 [coordonnées à compléter] |
| Mode couvert | `demo_synthetique` (prototype) ; conditions du mode `complet` au §5 |

Légende : **[Fait]** constaté dans le code ou un texte ; **[Hyp]** hypothèse ; **[à valider]** décision ou avis manquant. Gravité et vraisemblance : faible, moyenne, élevée (avant mesures → après mesures).

## 1. Description du traitement

Nolo aide une personne à décrire ses signes, l'alerte en cas de danger et l'oriente vers une structure ; il permet de chercher un service, un médicament ou du sang ; il offre un espace aux établissements et une console au ministère. **Données de santé = données sensibles** (art. 5, `CMR-LOI-2024-017::0005`) ; consentement exprès nécessaire mais non suffisant face à l'art. 48 (D-008, `CMR-LOI-2024-017::0048`). Tout traitement est soumis à l'autorisation préalable de l'APDP (art. 19, `CMR-LOI-2024-017::0020` ; lacune L12), non opérationnelle **[Hyp]** : d'où trois modes, et le seul mode `demo_synthetique` (données fictives) aujourd'hui.

## 2. Analyse par finalité

### 2.1 Orientation (citoyen)

| Élément | Contenu |
|---|---|
| Données | Description libre, signes reconnus (codes `SYM-NNN`), âge, réponses aux questions de sécurité ; position arrondie à 2 décimales si la personne l'accepte |
| Base | Consentement exprès « orientation » (art. 9 al. 1) ; alerte d'urgence sans consentement : préservation de la santé (art. 9 al. 2, `CMR-LOI-2024-017::0011`) |
| Où | Sur l'appareil **[Fait]** : description, analyse, moteur v1 et pistes ne quittent pas le téléphone ; aucune requête réseau dans le prototype |
| Risques | Divulgation de données de santé (élevée → faible) ; décision exclusivement automatisée (moyenne → faible) ; erreur d'orientation (moyenne → moyenne) |
| Mesures | Calcul sur l'appareil ; état en mémoire de l'onglet, jamais stocké (FR-154) ; journal sans texte libre ni signe (champs interdits, `policy.yaml > journal_audit`) ; raison de chaque issue et mention « système automatisé » (FR-109, FR-862) ; lien vers un soignant sur chaque écran de résultat (art. 44, `CMR-LOI-2024-017::0044`) ; règles PCIME/IITT sourcées, monotones, jamais abaissées (Principe II) |
| Risque résiduel | Règles non validées cliniquement pour le Cameroun (V7) **[à valider : clinicien]** |

### 2.2 Surveillance syndromique

| Élément | Contenu |
|---|---|
| Données | Contribution : exactement codes `SYM-NNN`, aire de santé, semaine ISO, tranche d'âge (FR-220, `app/js/domain/envoi.js`) |
| Base | Consentement exprès distinct « surveillance » (D-028) ; alternative « mission d'intérêt public » si un cadre est publié (L4) |
| Destinataires | Point focal du district, sur agrégats (seuil 5, arrondi à 5, décalage 7 jours) ; aucune liste nominative (Conformité : `surveillance.transmettre_donnees_individuelles` toujours bloquée) |
| Risques | Réidentification par petits effectifs (élevée → faible) ; profilage (moyenne → faible) ; transmission nominative au district (élevée → faible) |
| Mesures | Seuil et arrondi ; déduplication par appareil pseudonymisé (FR-221) ; validation humaine avant publication ; aucun profil (art. 44 et 65, `CMR-LOI-2024-017::0062` ; lacune L1) |
| Risque résiduel | Absence de cadre de partage application → SIMR (L4, L6) **[à valider : MINSANTE]** |

### 2.3 Signalements en pharmacie

| Élément | Contenu |
|---|---|
| Données | Pharmacie, médicament, jour, constat ; pseudonyme du compte côté serveur ; jamais pour un médicament sensible (P3) |
| Base | Consentement « signalements » (D-028) |
| Risques | Lien personne ↔ médicament révélant l'état de santé (élevée → faible) ; manipulation de la réputation d'une pharmacie (moyenne → faible) |
| Mesures | Signalements sensibles sans DCI ni pseudonyme (`fiabilite.enregistrer_signalement_sensible`) ; limites D-030 ; score lissé, gel de rafale et revue humaine (Principe VI) ; retrait de l'accord = effacement sur l'appareil (FR-844) |
| Risque résiduel | Aucun texte sur la notation publique d'établissements (L10) |

### 2.4 Tendances de la demande

| Élément | Contenu |
|---|---|
| Données | Compteur `(arrondissement, semaine ISO, type, service, satisfaite)` incrémenté à la recherche ; rien d'autre (D-032) |
| Risques | Inférence sur des personnes par petits effectifs (moyenne → faible) ; révélation de recherches sensibles (élevée → nulle) |
| Mesures | Seuil 5, arrondi à 5, semaines complètes, aucune alerte, aucun export brut ; recherches sensibles jamais comptées, faites sur l'appareil |

### 2.5 Comptes des établissements

| Élément | Contenu |
|---|---|
| Données | E-mail, NIU, nom, position, téléphone, fiche, photos, stocks, historique du compte (D-029, D-031) |
| Base | Information des professionnels (art. 21, `CMR-LOI-2024-017::0022`) ; conditions `#/pro/conditions` |
| Risques | Accès non autorisé au compte (moyenne → faible) ; personne reconnaissable sur une photo (moyenne → faible) |
| Mesures | Hachage lent du mot de passe, blocage après 5 échecs ; métadonnées des photos supprimées ; références d'autorisation jamais publiées |
| Risque résiduel | Durées de conservation non fixées (art. 13 et 28, `CMR-LOI-2024-017::0029`) **[à valider : juriste]** |

### 2.6 Module expérimental des pistes (POC)

| Élément | Contenu |
|---|---|
| Données | Signes reconnus et âge ; pistes et scores calculés sur l'appareil |
| Base | Démonstration seulement (`diagnostic_poc.modes_autorises`), principe décidé par D-033 ; constitution 2.0.0 non ratifiée |
| Risques | Exercice illégal de la médecine par un logiciel (loi 90/036 art. 16, transcription non officielle, `CMR-LOI-90-036::0015` ; lacunes L5, V9) (élevée → moyenne) ; déduction d'une catégorie de l'art. 48 (élevée → faible) ; transmission d'une hypothèse (élevée → nulle) |
| Mesures | Module bloqué hors démonstration ou désactivé (Conformité, `MODULE_POC_INACTIF`) ; transmission bloquée (`TRANSMISSION_POC_INTERDITE`) ; message neutre sans nom pour l'art. 48 ; masquage en urgence ; mot « probabilité » interdit ; journal minimal (version, empreinte, nombre) ; mention « table de démonstration » |
| Risque résiduel | Pas de base clinique locale (L15) ; responsabilité d'un calcul fait uniquement sur l'appareil (L16) **[à valider : juriste]** |

## 3. Transferts hors du Cameroun

Aucun dans le prototype **[Fait]** (pas de serveur appelé). Données personnelles vers l'étranger bloquées sans décret ni autorisation (art. 32, `CMR-LOI-2024-017::0033`, `policy.yaml > transfert_hors_pays`) ; repli : modèle local, anonymisation, refus.

## 4. Droits des personnes

Accès, rectification, effacement, retrait de chaque accord (« Mes données ») ; opposition à la décision automatisée et intervention humaine (lien vers un soignant) ; information par la page des conditions (16 rubriques, FR = EN) ; contact et réclamation **[à compléter]**.

## 5. Conditions avant tout usage réel (mode `complet`)

1. Autorisation préalable de l'APDP (art. 19), référence saisie dans `config/policy.yaml`.
2. Validation clinique des règles PCIME/IITT et de leur correspondance avec les niveaux (V7, D-021).
3. Avis du juriste sur l'art. 48 et le calcul sur l'appareil (D-008, L16), sur la grossesse et le priapisme (D-022), sur les durées de conservation.
4. Hébergement au Cameroun ; décret sur les transferts (L3) avant tout appel à un service étranger.
5. Le module POC reste désactivé hors démonstration tant qu'aucun régime pour les logiciels d'aide à l'orientation n'existe (L5).

## 6. Conclusion

En mode `demo_synthetique`, sur données fictives, le risque résiduel est **faible** : aucune donnée personnelle réelle, calculs sur l'appareil, aucune transmission. Un usage réel n'est pas acceptable aujourd'hui sans les conditions du §5 ; ce constat est l'objet du registre des lacunes (`docs/compliance/registre-lacunes.md`).
