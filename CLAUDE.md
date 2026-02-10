# CRM Assurance Genève

## Contexte
CRM pour courtage assurance à Genève. 183 clients, 492 polices, 8547 PDFs sources.
Self-hosted sur VM ranchin.net (Supabase + n8n + Ollama).
Stack : React 18 + TypeScript + Vite + shadcn/ui + Tailwind + Supabase

## Documentation
- @../docs/01-Discovery.md — Vision, objectifs, métier assurance suisse
- @../docs/02-Framework.md — Stack technique, URLs, dépendances
- @../docs/04-Architecture.md — Infra VM, structure BD (8 tables), RLS, flux données
- @../docs/06-Development.md — Conventions, scripts, phases, SQL utile
- @../BD-CRM-VM_Ranchin.md — Référence complète BD (schémas SQL, données)
- @../CRM-Plan-Developpement.md — Plan détaillé et historique phases

## Commandes essentielles
- `npm run dev` — Lance l'app sur localhost:8080
- `ssh ranchin 'docker ps'` — Vérifier services VM
- `ssh ranchin` puis `docker exec -it supabase-db psql -U supabase_admin -d postgres` — Accès SQL direct

## Conventions
- Composants : PascalCase.tsx, un composant par fichier
- Hooks : useXxx.ts dans src/hooks/
- Tables SQL : snake_case, colonnes snake_case
- Commits : messages en français, préfixés (feat:, fix:, docs:)

## À ne jamais faire
- ❌ Ne pas exposer la Service Role Key dans le code client
- ❌ Ne pas supprimer de données clients sans backup préalable
- ❌ Ne pas modifier les workflows n8n en production sans test draft
- ❌ Ne pas toucher aux tables ref_* sans script de migration versionné
- ❌ Ne pas commit le fichier .env.local

## État actuel
Phase : 1.5 terminée (nomenclature + codes courts)
En cours : Phase 1.6 — identifier compagnies manquantes sur 437 polices
Prochain : Phase 1.7 — connecter UI React aux polices par client
