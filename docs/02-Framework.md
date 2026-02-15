# Framework — CRM Assurance Genève

## Stack principale

| Couche | Technologie | Version/Détail |
|--------|-------------|----------------|
| Frontend | React + TypeScript | 18.x + Vite |
| UI | shadcn/ui + Tailwind CSS | Composants accessibles |
| Backend | Supabase (self-hosted) | PostgreSQL + Auth + Storage + Realtime |
| Automatisation | n8n (self-hosted) | Workflows, webhooks, intégrations |
| IA locale | Ollama | qwen2.5-coder:32b, llama3.3:70b |
| IA cloud | API Anthropic Claude | claude-sonnet-4-20250514 (Comparateur) |
| Embeddings | pgvector | Intégré à Supabase PostgreSQL |
| Hébergement | Contabo VPS | 6 CPU, 12 GB RAM, 150 GB SSD |
| DNS/SSL | Cloudflare + Let's Encrypt | ranchin.net |
| Conteneurs | Docker | 13 containers actifs |

## Outils de développement

| Outil | Usage |
|-------|-------|
| VS Code | IDE principal + extensions Claude Code |
| Git/GitHub | Versioning — github.com/locodivino/Project-CRM-CH |
| Lovable | Génération initiale UI depuis maquettes |
| Claude Code | Développement assisté (Terminal + IDE) |
| Claude Chat | Planification, architecture, debug conceptuel |

## Dépendances clés

| Package | Usage |
|---------|-------|
| @supabase/supabase-js | Client Supabase |
| react-router-dom | Routing SPA |
| shadcn/ui | Composants UI |
| tailwindcss | Styles utilitaires |
| lucide-react | Icônes |
| vite | Build tool |

## URLs de service

| Service | URL |
|---------|-----|
| Supabase API | https://supabase.ranchin.net |
| Supabase Studio | https://supabase.ranchin.net/project/default |
| App locale (dev) | http://localhost:8080 |
| n8n | https://n8n.ranchin.net |

## Justification des choix

- **Self-hosted** : Données clients sensibles (assurance, N° AVS) — pas de cloud tiers
- **Supabase** : PostgreSQL + Auth + RLS intégrés, alternative open-source à Firebase
- **n8n** : Automatisation no-code, hébergé sur la même VM, webhooks natifs
- **React/TS** : Généré par Lovable, écosystème mature, bonne intégration Supabase
- **LLMs locaux** : Analyse documentaire OCR sans envoyer les données clients à l'extérieur
- **API Claude (Comparateur)** : Extraction structurée de PDFs via Edge Function sécurisée
