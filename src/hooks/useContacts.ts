import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

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

export function useContacts() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les contacts
  const fetchContacts = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  // Ajouter un contact
  const addContact = async (contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Non connecté' };

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ ...contact, user_id: user.id }])
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }
    
    setContacts(prev => [data, ...prev]);
    return { data };
  };

  // Mettre à jour un contact
  const updateContact = async (id: string, updates: Partial<Contact>) => {
    const { data, error } = await supabase
      .from('contacts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    setContacts(prev => prev.map(c => c.id === id ? data : c));
    return { data };
  };

  // Supprimer un contact
  const deleteContact = async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    setContacts(prev => prev.filter(c => c.id !== id));
    return { success: true };
  };

  return { 
    contacts, 
    loading, 
    error, 
    addContact, 
    updateContact, 
    deleteContact,
    refetch: fetchContacts 
  };
}
