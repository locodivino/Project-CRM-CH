# Discovery — CRM Assurance Genève

## Problème à résoudre

Gestion manuelle et fragmentée de 183 clients d'assurance à Genève : fichiers CSV, dossiers NAS avec 8547 PDFs dans 222 dossiers, pas de vue centralisée des polices, interactions et documents. Besoin d'un outil professionnel adapté au courtage suisse.

## Utilisateurs cibles

- **Courtier principal** (Yves-Michel) — Gestion quotidienne des clients, polices, renouvellements
- **Futurs collaborateurs** — Accès partagé au portefeuille

## Objectifs

- **Principal** : Centraliser 183 clients, 492 polices et 8547 documents dans un CRM opérationnel
- Automatiser les processus via n8n (renouvellements, relances, rapports)
- Intégrer des agents IA pour le traitement des demandes et l'analyse documentaire
- Respecter la réglementation suisse (FINMA, LAMal, LCA, LAA, LPP)

## Contraintes

- **Techniques** : Self-hosted sur VM Contabo (pas de cloud tiers pour les données clients)
- **Business** : Courtage actif — le CRM doit être opérationnel progressivement, pas de big bang
- **Légales** : Données personnelles sensibles (N° AVS, santé), conformité LPD (protection des données suisse)
- **Données** : Sources multiples — CSV mandats, dossiers NAS avec PDFs, future intégration compagnies

## Critères de succès

- 100% des clients et polices accessibles depuis le CRM
- Recherche instantanée par client, police, compagnie ou type
- Documents PDF indexés et liés aux bonnes polices
- Automatisation des échéances et renouvellements
- Temps de saisie réduit de 70% vs processus actuel

## Spécificités métier — Assurance Suisse

### Réglementation clé
| Loi | Domaine |
|-----|---------|
| FINMA | Autorité fédérale de surveillance |
| LAMal | Assurance-maladie obligatoire |
| LCA | Contrat d'assurance |
| LCR | Circulation routière (RC véhicules) |
| LAA | Assurance-accidents (obligatoire employeur) |
| LPP | Prévoyance professionnelle (2ème pilier) |
| ECA | Établissement Cantonal d'Assurance Genève (bâtiments) |

### Dates clés
- **1er janvier** : Échéance principale LAMal
- **30 septembre** : Limite résiliation LAMal (30 nov pour complémentaires)
- **1er octobre** : Échéance fréquente polices non-vie
- **31 mars** : Limite résiliation auto (préavis 3 mois)

### Identifiants
- **N° AVS** : 756.XXXX.XXXX.XX (13 chiffres)
- **N° Police** : Format variable selon compagnie
