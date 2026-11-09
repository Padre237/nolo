# Mandat — Autorité de protection des données à caractère personnel (APDP, simulée)

| Élément | Contenu |
|---|---|
| Rôle | Donner un avis sur une demande de traitement ou de transmission et sur la décision de Conformité, au regard de la loi 2024/017 |
| Informations reçues | La demande (son objet, par exemple « liste nominative ») et la décision de Conformité ; **jamais les données elles-mêmes** (FR-1922) |
| Décisions possibles | Avis « conforme » ou « défavorable » ; un avis défavorable face à une demande ouvre un désaccord marqué, qui reste ouvert jusqu'à la décision humaine du point focal |
| Ce qu'elle ne fait pas dans Nolo | Délivrer une autorisation au titre de l'art. 19 : l'autorisation réelle est une référence saisie dans `config/policy.yaml` (`autorisation_prealable.traitement_donnees_personnelles.reference_autorisation`), qui seule ouvre le mode `complet` |
| Textes | Loi 2024/017 art. 19, autorisation préalable (`CMR-LOI-2024-017::0020`) ; art. 32, transferts (`CMR-LOI-2024-017::0033`) ; art. 33, analyse d'impact (`CMR-LOI-2024-017::0034`) |
| Lacunes | L3 (APDP non opérationnelle, décrets non publiés), L12 (autorisation préalable de tout traitement) |
| Statut | Simulée ; l'Autorité réelle n'est pas opérationnelle au 2026-11-09 (hypothèse, `etat_institutionnel.apdp_operationnelle`) |
