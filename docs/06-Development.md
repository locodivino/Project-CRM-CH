# Development — CRM Assurance Genève

## Conventions de nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Fichiers composants | PascalCase.tsx | `ContactList.tsx` |
| Fichiers utilitaires | camelCase.ts | `supabase.ts` |
| Hooks | use + PascalCase.ts | `useContacts.ts` |
| Dossiers | kebab-case | `auth/`, `ui/`, `comparateur/` |
| Variables | camelCase | `contactId` |
| Types/Interfaces | PascalCase | `Contact`, `Police`, `Comparaison` |
| Tables SQL | snake_case | `polices_assurance`, `comparaison_offres` |
| Colonnes SQL | snake_case | `date_echeance`, `prime_annuelle_ttc` |

## Git workflow

- **Branche principale** : `main`
- **Feature branches** : `feature/[nom]` (ex: `feature/comparateur-mvp`)
- **Commits** : Messages clairs en français, préfixés : `fix:`, `feat:`, `refactor:`, `docs:`
- **Repo** : github.com/locodivino/Project-CRM-CH

## Environnement de dev

### Setup local
```bash
cd ~/Projects/crm-assurance-geneve/Dev
npm install          # ou bun install
npm run dev          # Lance sur http://localhost:8080
```

### Variables d'environnement
Fichier : `.env.local`
```env
VITE_SUPABASE_URL=https://supabase.ranchin.net
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Accès PostgreSQL (debug)
```bash
ssh ranchin
cd /home/supabase/supabase/docker
docker exec -it supabase-db psql -U supabase_admin -d postgres
```

## Scripts utilitaires (archive phases 1.x)

Les scripts de migration des phases 1.x sont archivés dans le dossier parent `crm-assurance-geneve/scripts/`. Ils ne font pas partie du repo Git.

| Script | Usage |
|--------|-------|
| `normalize_clients.py` | Normalisation CSV clients (phase 1.2) |
| `scan_compagnies_v2.sh` | Scan PDFs → compagnies + types (phase 1.3) |
| `deploy_phase1_*.sh` | Déploiement phases BD (phases 1.3-1.5) |
| `map_polices.py` | Matching NAS → contacts Supabase (phase 1.4b) |
| `snapshot_supabase.sh` | Snapshot état BD |

## Requêtes SQL fréquentes

```sql
-- Compter les contacts
SELECT COUNT(*) FROM public.contacts;

-- Polices avec noms lisibles
SELECT * FROM public.v_polices_complete;

-- Taxonomie par branche
SELECT categorie, branche, count(*) 
FROM public.ref_types_assurance 
GROUP BY categorie, branche 
ORDER BY categorie, branche;

-- Compagnies actives avec marques
SELECT nom, marques, branches 
FROM public.ref_compagnies 
WHERE actif = true ORDER BY nom;

-- CGA disponibles (Phase 2.0)
SELECT c.nom, g.branche, g.edition, g.indexation_status
FROM public.cga_documents g
JOIN public.ref_compagnies c ON c.id = g.compagnie_id
WHERE g.date_validite_au IS NULL
ORDER BY c.nom, g.branche;
```

## Phases de développement

| Phase | Description | Statut |
|-------|-------------|--------|
| 0.1–0.4 | Setup (Git, Supabase, Auth, Settings) | ✅ |
| 1.1–1.2 | Tables CRM + Normalisation clients | ✅ |
| 1.3 | Taxonomie assurances suisses (32 compagnies, 48 types) | ✅ |
| 1.4 | Import 183 clients Supabase | ✅ |
| 1.4b | Import 492 polices depuis NAS | ✅ |
| 1.5 | Nomenclature finale + codes courts | ✅ |
| 1.6 | Identifier compagnies manquantes (440/492 identifiées) | ✅ |
| 1.7 | UI React : polices par client + onglets | ✅ |
| **2.0a** | **Comparateur d'offres — MVP (Niveau 1)** | **🔜** |
| **2.0b** | **Comparateur — Intégration CGA (Niveau 2)** | 🔜 |
| **2.0c** | **Comparateur — Features courtier** | 🔜 |
| 3 | Documents & Stockage | 🔜 |
| 4 | CoPilot IA & Dashboard intelligent | 🔜 |
| 5 | Marketing & Automatisation | 🔜 |
| 6 | Intégrations externes | 🔜 |
