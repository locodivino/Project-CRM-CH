export interface Contact {
  id: string;
  type: 'prospect' | 'client' | 'partenaire';
  statut: string;
  civilite?: string;
  prenom?: string;
  nom: string;
  raison_sociale?: string;
  date_naissance?: string;
  numero_avs?: string;
  email?: string;
  telephone?: string;
  telephone_mobile?: string;
  adresse?: string;
  code_postal?: string;
  ville?: string;
  pays: string;
  profession?: string;
  employeur?: string;
  source?: string;
  notes?: string;
  tags?: string[];
  fichier_source?: string;
  created_at: string;
  updated_at: string;
}

export interface Police {
  id: string;
  contact_id: string;
  compagnie: string;
  compagnie_id?: number;
  type_assurance: string;
  type_assurance_id?: number;
  numero_police?: string;
  sous_numero?: string;
  marque?: string;
  objet_assure?: string;
  prime_mensuelle?: number;
  prime_annuelle?: number;
  franchise?: number;
  periodicite_paiement?: string;
  monnaie?: string;
  date_debut?: string;
  date_echeance?: string;
  date_resiliation?: string;
  statut: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  ref_compagnie?: { nom: string };
  ref_type?: { code_court: string; nom_fr: string; categorie: string; branche: string };
}

export interface Compagnie {
  id: number;
  nom: string;
  nom_complet?: string;
  type?: string;
  actif: boolean;
}

export interface TypeAssurance {
  id: number;
  code: string;
  code_court: string;
  categorie: string;
  branche: string;
  sous_branche?: string;
  nom_fr: string;
  base_legale?: string;
  obligatoire: boolean;
  actif: boolean;
}

export const STATUT_COLORS: Record<string, string> = {
  offre: 'bg-amber-100 text-amber-800 border-amber-200',
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  suspendue: 'bg-orange-100 text-orange-800 border-orange-200',
  'résiliée': 'bg-red-100 text-red-800 border-red-200',
};

export const TYPE_COLORS: Record<string, string> = {
  'Personnes': 'bg-blue-100 text-blue-800',
  'Choses': 'bg-teal-100 text-teal-800',
  'Véhicules': 'bg-slate-100 text-slate-800',
  'Santé': 'bg-rose-100 text-rose-800',
  'Prévoyance': 'bg-purple-100 text-purple-800',
  'Entreprise': 'bg-indigo-100 text-indigo-800',
};
