# CHANGELOG — CRM Assurance Genève

> Historique des phases de développement  
> Repo : `Project-CRM-CH` (code React uniquement)  
> Documentation complète : `../BD-CRM-VM_Ranchin.md` et `../CRM-Plan-Developpement.md`

---

## [1.5] — 2026-02-07 — Nomenclature Finale

### Base de données (Supabase)
- Fusion `auto_rc`, `auto_casco_*`, `auto_assistance`, `auto_passagers` → **`vehicule`** (code_court: VM)
- Fusion `rc_privee` → **`menage`** (code_court: Ménage)
- Ajout colonne `code_court` à `ref_types_assurance` — 48 codes (VM, Ménage, PJ, LAA, 3A...)
- Contrainte statut polices : offre → active → suspendue → résiliée (CHECK)
- Vue `v_polices_complete` refaite avec libellé formaté : `VM / AXA n° 7.731.857 - Véhicule GE 23102`

---

## [1.4b] — 2026-02-07 — Import 492 Polices depuis NAS

### Base de données (Supabase)
- Scan 222 dossiers clients NAS, 879 sous-dossiers analysés
- 492 polices importées avec matching fuzzy (nom dossier → contact Supabase)
- Parsing automatique : type assurance, numéro police, compagnie, plaque véhicule
- Fix critique : encodage macOS NFD → NFC pour regex accents français
- 5 aliases clients manuels, 4 exclusions, 30 anciens clients non importés
- Ajout contact Vision Neuve SA
- 15 compagnies détectées automatiquement, 437 restent "À identifier"

### Scripts
- `scripts/deploy_phase1_4b_polices.sh` — Orchestration import
- `scripts/map_polices.py` — Matching + parsing Python (v2)

---

## [1.4] — 2026-02-07 — Import 182 Clients

### Base de données (Supabase)
- Migration `contacts` : +`raison_sociale`, `prenom` nullable, +`fichier_source` (25 colonnes)
- Import 182 clients (142 personnes + 41 sociétés)
- Statut mappé : "signé" → "actif"
- Top villes : Genève (56), Nyon (10), Conches (7), Anières (7)
- Doublon détecté et corrigé

---

## [1.3] — 2026-02-07 — Taxonomie Assurances Suisses

### Base de données (Supabase — ranchin.net)

**Nouvelles tables :**
- `ref_compagnies` — 32 compagnies suisses avec marques/canaux
- `ref_types_assurance` — 47 types hiérarchiques VIE/NON-VIE (FR+DE, base légale)
- `ref_types_documents` — 17 types (police, offre, sinistre, CGA, BVR…)
- `documents_assurance` — Index PDF avec OCR + metadata JSONB

**Migration :**
- `polices_assurance` — +7 colonnes : `compagnie_id` FK, `type_assurance_id` FK, `marque`, `sous_numero`, `objet_assure`, `periodicite_paiement`, `monnaie`

**Vue :** `v_polices_complete` — jointure dénormalisée polices + compagnies + types

**RLS :** 7 nouvelles policies (total : 20)

**Analyse terrain :** Scan de 1580 PDFs → 20 compagnies détectées, mapping marques (Smile→Helvetia, AutoMate→TSM, Winterthur→AXA)

---

## [1.2] — 2026-02-06 — Normalisation Clients CSV

- 182 clients normalisés (141 personnes physiques, 41 sociétés)
- 93% emails valides
- Script : `../scripts/normalize_clients.py`
- Export : `../data/clients_normalises.csv`

---

## [1.1] — 2026-02-06 — Tables CRM

- `contacts` (23 colonnes) — clients, prospects, partenaires
- `polices_assurance` (16 colonnes) — polices d'assurance
- `interactions` (7 colonnes) — historique échanges
- `user_settings` (6 colonnes) — préférences utilisateur
- RLS activé sur toutes les tables (13 policies)

---

## [0.4] — Persistence Settings

- Hook `useSettings` — toggles modules actifs persistés Supabase

---

## [0.3] — Authentification

- Supabase Auth intégré (login/logout)
- `AuthContext`, `ProtectedRoute`, page `Login`
- Compte admin : `admin@ranchin.net`

---

## [0.2] — Supabase Backend

- Supabase self-hosted sur ranchin.net
- PostgreSQL + Auth + Storage + Realtime
- API : `https://supabase.ranchin.net`

---

## [0.1] — Git & Sécurité

- Repo GitHub : `locodivino/Project-CRM-CH`
- `.env.local` dans `.gitignore`
- Clés API sécurisées

---

*Dernière mise à jour : 7 février 2026*
