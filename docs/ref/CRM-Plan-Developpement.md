# Plan de développement — CRM Assurance Genève

> **Note :** Ce fichier est une copie de référence (lecture seule). L'original est dans le dossier parent crm-assurance-geneve/.
> Dernière copie : 15 février 2026

## Vision du projet

Transformer le prototype UI en un CRM fonctionnel et opérationnel pour le courtage en assurances à Genève, avec une base de données structurée et normalisée.

**Stack :** React 18 + TypeScript + Vite + shadcn-ui + Tailwind CSS + Supabase
**Serveur :** ranchin.net (self-hosted Supabase + n8n + LLMs locaux)

---

## État actuel — 15 février 2026

### ✅ Phases terminées

| Phase | Description | Date | Statut |
|-------|-------------|------|--------|
| 0.1–0.4 | Setup (Git, Supabase, Auth, Settings) | | ✅ |
| 1.1–1.2 | Tables CRM + Normalisation clients | | ✅ |
| 1.3 | Taxonomie Assurances Suisses | 7 fév 2026 | ✅ |
| 1.4 | Import 182 clients Supabase | 7 fév 2026 | ✅ |
| 1.4b | Import 492 polices depuis NAS | 7 fév 2026 | ✅ |
| 1.5 | Nomenclature finale + codes courts | 7 fév 2026 | ✅ |
| 1.5b | Sécurité BD (pgcrypto, RLS, Security Invoker) | 11 fév 2026 | ✅ |
| 1.6 | Identification compagnies (440/492 = 89.4%) | 11 fév 2026 | ✅ |
| 1.7 | UI React : page détail Contact + Polices | 11 fév 2026 | ✅ |

### 🔜 Prochaines étapes

| Phase | Description | Statut |
|-------|-------------|--------|
| 1.7b | Corrections UI suite aux tests | 🔜 |
| 1.8 | Identifier les 52 polices restantes | 🔜 |
| **2.0a** | **Comparateur d'offres — MVP** | **🔜** |
| **2.0b** | **Comparateur — Intégration CGA** | 🔜 |
| **2.0c** | **Comparateur — Features courtier** | 🔜 |
| 3 | Documents & Stockage | 🔜 |
| 4 | CoPilot IA & Dashboard intelligent | 🔜 |
| 5 | Marketing & Automatisation | 🔜 |
| 6 | Intégrations externes | 🔜 |

---

## Données clés

- 183 contacts (142 personnes + 41 sociétés)
- 492 polices (440 identifiées, 52 à traiter)
- 32 compagnies, 48 types d'assurance
- 8547 documents PDF sources
- Top compagnie : AXA (284 polices)

---

## Patterns numéros de police

| Pattern | Compagnie |
|---------|-----------|
| X.XXX.XXX, XX.XXX.XXX | AXA |
| 3.XXX.XXX | AXA Vie |
| XXXXXXX X XXXX | Vaudoise |
| TXX.X.XXX.XXX | Allianz |
| 4.XXX.XXX.XXX | Helvetia |
| G-XXXX-XXXX | La Mobilière |
| XXXXXXXX (8 chiffres) | Generali |
| 73.XXX.XX | Swiss Life |

---

*Document de référence — Original dans crm-assurance-geneve/CRM-Plan-Developpement.md*
