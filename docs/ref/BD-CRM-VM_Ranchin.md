# 🗄️ Base de Données CRM — Documentation Technique

> **Projet :** CRM Assurance Genève  
> **Serveur :** ranchin.net (self-hosted)  
> **Dernière mise à jour :** 7 février 2026 (Phase 1.5)  
> **Note :** Ce fichier est une copie de référence (lecture seule). L'original est dans le dossier parent crm-assurance-geneve/.

---

## 📡 Infrastructure Serveur

### Connexion SSH
```bash
ssh ranchin
```

### Serveur
| Élément | Valeur |
|---------|--------|
| Hostname | ranchin.net |
| IP | 194.163.180.203 |
| OS | Linux (Docker) |
| Containers | 13 actifs |

### Services disponibles
- **Supabase** (PostgreSQL + Auth + Storage + Realtime)
- **n8n** (Automatisation workflows)
- **LLMs locaux** (qwen2.5-coder:32b, llama3.3:70b)
- **pgvector** (Embeddings IA)

---

## 🔐 Supabase — Configuration

### URLs
| Service | URL |
|---------|-----|
| API | `https://supabase.ranchin.net` |
| Studio | `https://supabase.ranchin.net/project/default` |

---

## 📊 Structure des Tables (8 tables — Phase 1.5)

```
public.
├── user_settings         (6 col)    Préférences utilisateur
├── contacts              (25 col)   183 clients (142 personnes + 41 sociétés)
├── polices_assurance     (23 col)   492 polices
├── interactions          (7 col)    Historique des échanges
├── documents_assurance   (18 col)   Index des documents PDF
├── ref_compagnies        (12 col)   32 compagnies suisses
├── ref_types_assurance   (13 col)   48 types avec code_court
└── ref_types_documents   (7 col)    17 types documents
```

Vue : `v_polices_complete` — format `[code_court] / [compagnie] n° [numéro] - [objet]`

---

## Compagnies (32)

8 généralistes (AXA, Zurich, Vaudoise, Allianz, Helvetia, Generali, La Mobilière, Baloise), 10 caisses maladie, 2 vie, 12 spécialisées.

**Marques/canaux :**
| Marque | Porteur de risques |
|--------|-------------------|
| Smile / smile.bike / smile.direct | Helvetia |
| AutoMate / AutoMate Insurance | TSM |
| Winterthur | AXA (historique) |
| Nationale Suisse | Helvetia (historique) |

---

## Types d'assurance (48)

| Catégorie | Branche | Nb types |
|-----------|---------|----------|
| NON_VIE | sante | 6 |
| NON_VIE | accident | 3 |
| NON_VIE | vehicules | 10 |
| NON_VIE | habitation | 4 |
| NON_VIE | responsabilite | 5 |
| NON_VIE | juridique | 4 |
| NON_VIE | voyage | 2 |
| NON_VIE | entreprise | 6 |
| NON_VIE | cautionnement | 1 |
| VIE | prevoyance | 7 |

---

## 🔒 Row Level Security — 20 policies

- Tables métier (contacts, polices, interactions, documents, settings) : CRUD par user_id
- Tables référence (ref_*) : lecture seule pour authentifiés

---

## 📁 Données

| Métrique | Valeur |
|----------|--------|
| Total contacts | 183 |
| Polices importées | 492 |
| Compagnies identifiées | 440/492 (89.4%) |
| Documents PDF sources | 8547 |
| Top compagnies | AXA (284), Zurich, Vaudoise, Allianz, Helvetia |

---

*Document de référence — Original dans crm-assurance-geneve/BD-CRM-VM_Ranchin.md*
