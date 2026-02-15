# Architecture — CRM Assurance Genève

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│  UTILISATEUR (navigateur)                                   │
│  http://localhost:8080 (dev) / https://crm.ranchin.net (prod)│
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  VM RANCHIN (194.163.180.203) — Docker                      │
│                                                             │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐             │
│  │  Supabase   │  │   n8n    │  │  Ollama    │             │
│  │  (13 cont.) │  │ workflows│  │  LLMs      │             │
│  │             │  │          │  │  locaux    │             │
│  │ • PostgreSQL│  │ • Webhooks│ │ • qwen2.5  │             │
│  │ • Auth      │  │ • Crons  │  │ • llama3.3 │             │
│  │ • Storage   │  │ • API    │  │ • pgvector │             │
│  │ • Realtime  │  └──────────┘  └────────────┘             │
│  │ • RLS (20p) │                                            │
│  │ • Edge Func │                                            │
│  └─────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
```

## Structure du projet

```
Dev/                             ← REPO GIT (racine du projet)
├── CLAUDE.md                    ← Chef d'orchestre CC (<500 mots)
├── CHANGELOG.md                 ← Historique des changements
├── .claude/                     ← Config Claude Code
├── docs/                        ← Documentation structurée
│   ├── 01-Discovery.md          ← Vision, contexte, métier
│   ├── 02-Framework.md          ← Stack technique
│   ├── 03-PRD-Comparateur.md    ← Specs Comparateur d'offres
│   ├── 04-Architecture.md       ← Ce fichier
│   ├── 06-Development.md        ← Conventions, scripts, phases
│   └── ref/                     ← Documents sources (lecture seule)
│       ├── BD-CRM-VM_Ranchin.md
│       └── CRM-Plan-Developpement.md
├── supabase/                    ← Edge Functions (Phase 2.0)
│   └── functions/
│       └── compare-offres/
├── src/
│   ├── components/
│   │   ├── auth/                ← ProtectedRoute, Login
│   │   ├── ui/                  ← shadcn/ui (Button, Card, Dialog...)
│   │   ├── contacts/            ← ContactInfo, PolicesList
│   │   └── comparateur/         ← Composants Comparateur (Phase 2.0)
│   ├── contexts/
│   │   └── AuthContext.tsx       ← Provider Auth Supabase
│   ├── hooks/
│   │   ├── useContacts.ts
│   │   ├── useContact.ts
│   │   ├── usePolices.ts
│   │   ├── useSettings.ts
│   │   └── useComparaisons.ts   ← Phase 2.0
│   ├── lib/
│   │   └── supabase.ts          ← Client Supabase
│   ├── pages/
│   │   ├── Contacts.tsx
│   │   ├── ContactDetail.tsx
│   │   └── Comparateur.tsx      ← Phase 2.0
│   └── types/
│       ├── index.ts             ← Types existants
│       └── comparateur.ts       ← Phase 2.0
├── .env.local                   ← VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
├── index.html
├── vite.config.ts
└── package.json
```

## Base de données — Tables actuelles + Phase 2.0

### Tables existantes (8)
```
public.
├── contacts              (25 col)  183 clients (142 personnes + 41 sociétés)
├── polices_assurance     (23 col)  492 polices — statut contraint
├── interactions          (7 col)   Historique échanges
├── documents_assurance   (18 col)  Index PDFs (OCR + metadata)
├── user_settings         (6 col)   Préférences utilisateur
├── ref_compagnies        (12 col)  32 compagnies suisses + marques
├── ref_types_assurance   (13 col)  48 types VIE/NON-VIE + codes courts
└── ref_types_documents   (7 col)   17 types documents
```

### Tables Phase 2.0 (3 nouvelles)
```
public.
├── cga_documents         CGA indexées par compagnie/branche
├── comparaisons          Sessions de comparaison
└── comparaison_offres    Offres PDF dans une comparaison
```

Vue dénormalisée : `v_polices_complete` — format `[code_court] / [compagnie] n° [numéro] - [objet]`

## RLS — 20 policies + Phase 2.0

- **Tables métier** (contacts, polices, interactions, documents, settings) : CRUD filtré par `user_id`
- **Tables référence** (ref_compagnies, ref_types_assurance, ref_types_documents) : SELECT pour authentifiés
- **Tables comparateur** (comparaisons, comparaison_offres) : CRUD filtré par `user_id`
- **cga_documents** : SELECT pour authentifiés, INSERT/UPDATE admin only

## Flux de données

```
CSV mandats → normalize_clients.py → Supabase contacts
NAS PDFs → scan_compagnies_v2.sh → map_polices.py → Supabase polices
React UI → supabase-js → Supabase API (RLS) → PostgreSQL
n8n → webhooks/crons → Supabase service_role → PostgreSQL
Comparateur → Edge Function → API Claude → donnees_extraites (JSON)
```

## Intégrations externes

| Service | Usage | Accès |
|---------|-------|-------|
| Supabase (self-hosted) | BDD, Auth, Storage, Edge Functions | API REST + supabase-js |
| n8n (self-hosted) | Automatisation workflows | Webhooks + API |
| Ollama (self-hosted) | LLMs locaux (OCR, analyse) | API locale |
| API Anthropic | Extraction PDF Comparateur | Edge Function (clé secrète) |
| GitHub | Versioning code | github.com/locodivino/Project-CRM-CH |
| NAS local | Documents PDF sources | /Volumes/Data_2TB/... |
