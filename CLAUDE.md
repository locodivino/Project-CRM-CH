# CRM Assurance Genève

## Contexte
CRM pour courtage assurance à Genève (CA3P Sàrl). 183 clients, 492 polices, 440 identifiées (89.4%).
Self-hosted sur VM ranchin.net (Supabase + n8n + Ollama).
Stack : React 18 + TypeScript + Vite + shadcn/ui + Tailwind + Supabase

## Documentation
- @docs/01-Discovery.md — Vision, objectifs, métier assurance suisse
- @docs/02-Framework.md — Stack technique, URLs, dépendances
- @docs/03-PRD-Comparateur.md — Specs Comparateur d'offres (Phase 2.0)
- @docs/04-Architecture.md — Infra VM, structure BD, RLS, flux données
- @docs/06-Development.md — Conventions, scripts, phases, SQL utile
- @docs/ref/BD-CRM-VM_Ranchin.md — Référence complète BD (schémas SQL)
- @docs/ref/CRM-Plan-Developpement.md — Plan détaillé et historique phases

## Commandes essentielles
- `npm run dev` — Lance l'app sur localhost:5173
- `ssh ranchin 'docker ps'` — Vérifier services VM
- `ssh ranchin` puis `docker exec -it supabase-db psql -U supabase_admin -d postgres` — Accès SQL direct

## Architecture src/
```
src/
├── types/index.ts              # Types partagés (Contact, Police, Compagnie, TypeAssurance)
├── hooks/
│   ├── useContacts.ts          # Liste tous les contacts (CRUD)
│   ├── useContact.ts           # Un contact par ID (read + update)
│   └── usePolices.ts           # Polices d'un contact (JOIN compagnies + types)
├── components/contacts/
│   ├── PolicesList.tsx          # Tableau polices avec stats
│   └── ContactInfo.tsx          # Fiche coordonnées + infos
├── pages/
│   ├── Contacts.tsx             # Liste contacts (cliquable → détail)
│   └── ContactDetail.tsx        # Page détail : onglets Polices / Infos / Documents
└── lib/supabase.ts              # Client Supabase
```

## Routes
- `/login` — Connexion
- `/` — Dashboard
- `/contacts` — Liste contacts
- `/contacts/:id` — Détail contact + polices
- `/calendar`, `/documents`, `/messenger`, `/mailbox`, `/drive`, `/automation`, `/copilot`, `/settings`

## Conventions
- Composants : PascalCase.tsx, un composant par fichier
- Hooks : useXxx.ts dans src/hooks/
- Types : dans src/types/index.ts
- Tables SQL : snake_case, colonnes snake_case
- Commits : messages en français, préfixés par phase

## À ne jamais faire
- Ne pas exposer la Service Role Key dans le code client
- Ne pas supprimer de données clients sans backup préalable
- Ne pas modifier les workflows n8n en production sans test draft
- Ne pas toucher aux tables ref_* sans script de migration versionné
- Ne pas commit le fichier .env.local

## État actuel — 15 février 2026
Phase 1.7 terminée : UI Contact + Polices fonctionnelle
En cours : Specs Comparateur d'offres (Phase 2.0) — terminées
Prochain : Phase 2.0a — MVP Comparateur (tables SQL + Edge Function + UI)

## Base de données
- 183 contacts (142 personnes + 41 sociétés)
- 492 polices (440 identifiées, 52 à traiter)
- 18 compagnies actives (AXA dominant : 284 polices)
- 48 types d'assurance avec codes courts
- Sécurité : pgcrypto AES-256 sur 5 colonnes, RLS activé, Security Invoker
