# Écarts entre les spécifications et le code

Généré par `python3 tools/sdd_index.py` — ne pas modifier à la main.

11 écarts connus (§9 des `design.md`). Chacun a une tâche « À faire » ou « Partiel » dans son dossier.

| Dossier | Écart |
|---|---|
| [SF-001-09](feature-001-orientation/sf-001-09-cas-ambigu/design.md) Cas ambigu : relèvement prudent et renvoi vers un soignant | FR-180 partiellement : la liste est accessible depuis « Décrire » et « Vérifier » ; le seuil d'ambiguïté (FR-181) et le lien d'intervention humaine (FR-182) n'existent pas. |
| [SF-002-01](feature-002-surveillance/sf-002-01-contribution/design.md) Contribution consentie à la surveillance | Nolo ne transmet aucune contribution (pas de serveur) : les comptes de la console sont fictifs (`compteAire`, `compteRegion`). |
| [SF-004-02](feature-004-recherche-medicament/sf-004-02-recherche-stocks/design.md) Recherche dans les stocks déclarés et classement | FR-402 : la fraîcheur de 12 h (affichage « à confirmer ») n'est pas distinguée à l'écran ; seule l'expiration à 48 h est appliquée. |
| [SF-006-01](feature-006-fiabilite-pharmacies/sf-006-01-soumission-signalement/design.md) Soumission d'un signalement | FR-620 : l'interdiction de se signaler soi-même n'a pas de sens sur l'appareil du citoyen ; elle relève du serveur (à faire). |
| [SF-008-02](feature-008-consentements-droits/sf-008-02-consentement-surveillance/design.md) Consentement à la surveillance | Nolo ne prépare aucune contribution aujourd'hui : FR-811 est satisfaite par absence d'envoi ; la contribution réelle relève de SF-002-01. |
| [SF-008-06](feature-008-consentements-droits/sf-008-06-droits-decision-automatisee/design.md) Droits face à la décision automatisée | Les droits figurent dans la page des conditions mais pas sur les écrans de résultat. |
| [SF-009-02](feature-009-acces-roles-comptes/sf-009-02-authentification-pro/design.md) Authentification des établissements (un compte par établissement) | Nolo : repli d'empreinte non cryptographique si `crypto.subtle` manque (contexte non sécurisé) — prototype seulement, à retirer à l'intégration. |
| [SF-011-03](feature-011-base-connaissances/sf-011-03-recherche/design.md) Recherche documentaire (BM25 ; ChromaDB en option) | FR-1110 : non exécuté (paquets non installables dans l'environnement de Claude) ; à mesurer par l'équipe. |
| [SF-012-01](feature-012-donnees-scenarios/sf-012-01-donnees-patients-surveillance/design.md) Patients et séries de surveillance synthétiques (référence Python) | `patients.csv` utilise les anciens niveaux d'urgence (à régénérer avec les règles v2). |
| [SF-013-05](feature-013-application/sf-013-05-design-system/design.md) Design system « Premium Medical Intelligence » | FR-1322 : le rouge sert aussi aux erreurs de saisie et aux rejets d'import (exceptions déclarées dans `app/docs/DESIGN.md`, Q-013-05-01, TASK-013-05-05). |
| [SF-014-01](feature-014-tendances-demande/sf-014-01-compteurs-anonymes/design.md) Compteurs anonymes de la demande | Nolo n'a pas de serveur : les tendances affichées viennent de compteurs fictifs générés (`app/js/domain/trends.js`) ; le comptage réel est dans le service de référence. |
