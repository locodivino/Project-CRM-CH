# PRD — Comparateur d'Offres d'Assurance

> Phase 2.0 du CRM Assurance Genève
> Version 1.0 — 15 février 2026

---

## 1. Objectif

Ajouter un onglet « Comparateur » dans le CRM permettant au courtier de :
1. Uploader 2 à 5 propositions d'assurance en PDF
2. Obtenir automatiquement un tableau comparatif structuré
3. Bénéficier d'une analyse approfondie via les CGA pré-indexées
4. Sauvegarder et exporter les comparaisons pour les clients

## 2. Deux niveaux de comparaison

| Niveau | Description | Source | Livré en |
|--------|------------|--------|----------|
| **Niveau 1** | Primes, franchises, couvertures, sommes assurées | PDFs uploadés | MVP |
| **Niveau 2** | Exclusions, délais, valeur à neuf, territorialité | PDFs + CGA pré-indexées | V2 |

## 3. Data Model — Nouvelles tables

### 3.1 cga_documents

```sql
CREATE TABLE cga_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  compagnie_id uuid REFERENCES ref_compagnies(id),
  branche text NOT NULL,
  edition text NOT NULL,
  date_validite_des date NOT NULL,
  date_validite_au date,
  fichier_storage_path text NOT NULL,
  clauses_indexees jsonb DEFAULT '{}',
  indexation_status text DEFAULT 'pending',
  indexed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (compagnie_id, branche, edition)
);
CREATE INDEX idx_cga_branche_validite ON cga_documents(branche, date_validite_au);
```

### 3.2 comparaisons

```sql
CREATE TABLE comparaisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  contact_id uuid REFERENCES contacts(id),
  branche text NOT NULL,
  objet_assure text,
  titre text,
  status text DEFAULT 'processing',
  resultat_comparaison jsonb,
  notes_courtier text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 3.3 comparaison_offres

```sql
CREATE TABLE comparaison_offres (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comparaison_id uuid REFERENCES comparaisons(id) ON DELETE CASCADE,
  compagnie_id uuid REFERENCES ref_compagnies(id),
  cga_document_id uuid REFERENCES cga_documents(id),
  fichier_storage_path text NOT NULL,
  nom_fichier_original text NOT NULL,
  donnees_extraites jsonb,
  prime_annuelle_ttc numeric(10,2),
  prime_annuelle_ht numeric(10,2),
  devise text DEFAULT 'CHF',
  duree_contrat text,
  extraction_status text DEFAULT 'pending',
  extraction_error text,
  created_at timestamptz DEFAULT now(),
  ordre_affichage integer DEFAULT 0
);
```

### 3.4 RLS Policies

- comparaisons et comparaison_offres : user_id = auth.uid()
- cga_documents : SELECT pour tous les authentifiés, INSERT/UPDATE admin only

### 3.5 Storage Buckets

- `comparateur-offres` — PDFs propositions (privé par user)
- `cga-documents` — PDFs CGA (lecture publique authentifiée)

## 4. Structure JSON d'extraction

Champ `donnees_extraites` dans comparaison_offres :

```json
{
  "compagnie": "Helvetia",
  "produit": "Assurance véhicule à moteur",
  "numero_proposition": "13.000.832.383",
  "cga_edition": "Septembre 2024",
  "date_proposition": "2026-01-29",
  "vehicule": {
    "marque": "Suzuki",
    "modele": "S-Cross 1.5 Compact+ Hybrid",
    "prix_catalogue": 34490,
    "mise_en_circulation": "2023-03-06",
    "type_moteur": "Hybride",
    "plaque": "VS 80301"
  },
  "couvertures": [
    {
      "type": "rc",
      "label": "Responsabilité civile",
      "inclus": true,
      "somme_assuree": 100000000,
      "franchise": 0,
      "prime_ht": 357.00,
      "bonus_malus": "M00/30%",
      "details": { "protection_bonus": "Standard" }
    }
  ],
  "primes": {
    "total_ht": 1302.90,
    "timbre_federal": 60.60,
    "prevention_accidents": 2.70,
    "bureau_national": 4.20,
    "total_ttc": 1370.40
  },
  "conditions_speciales": ["Rabais unique 20% RC + Casco + Accidents, expire 01.01.2027"],
  "resiliation": {
    "premiere_possibilite": "01.01.2027",
    "preavis_mois": 3,
    "periodicite": "annuelle au 01.01"
  }
}
```

## 5. Architecture technique

```
React Frontend → Edge Function "compare-offres" → API Anthropic Claude → Supabase (Storage + DB)
```

- Edge Function gère la clé API (jamais côté client)
- Modèle : claude-sonnet-4-20250514
- Coût estimé : ~$0.025 par PDF

## 6. Composants React

| Fichier | Rôle |
|---------|------|
| `pages/Comparateur.tsx` | Page principale |
| `components/comparateur/UploadZone.tsx` | Drag & drop multi-PDF |
| `components/comparateur/CompareTable.tsx` | Tableau comparatif |
| `components/comparateur/CompareTableRow.tsx` | Ligne individuelle |
| `components/comparateur/CgaStatusBadge.tsx` | Badge ✅/⚠️/🔒 |
| `components/comparateur/OffreHeader.tsx` | En-tête colonne (compagnie, prime) |
| `components/comparateur/ExtractionProgress.tsx` | Progression par fichier |
| `components/comparateur/ExportPdfButton.tsx` | Export PDF |
| `components/comparateur/ClientSelector.tsx` | Lier à un contact |
| `components/comparateur/CourtierNotes.tsx` | Notes avec sauvegarde auto |
| `hooks/useComparaisons.ts` | CRUD liste comparaisons |
| `hooks/useComparaison.ts` | Une comparaison par ID |
| `hooks/useExtractOffre.ts` | Appel Edge Function + polling |
| `hooks/useCgaDocuments.ts` | Lecture CGA disponibles |
| `types/comparateur.ts` | Types TypeScript |

Routes : `/comparateur` et `/comparateur/:id`

## 7. Roadmap

- **Phase 2.0a (MVP)** : Upload + extraction + tableau (Niveau 1)
- **Phase 2.0b (CGA)** : Indexation CGA + matching + tableau enrichi
- **Phase 2.0c (Courtier)** : Export PDF, notes, historique, branches supplémentaires

## 8. Sécurité

- Clé API Anthropic dans secrets Edge Function uniquement
- RLS sur toutes les tables
- LPD : données personnelles protégées par user
- Disclaimer FINMA sur l'export PDF
- Taille max PDF : 10 MB, max 5 offres par comparaison

---

*Voir le document Word complet (CRM_Comparateur_Offres_Specs_v1.0.docx) pour les détails exhaustifs.*
