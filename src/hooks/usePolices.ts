import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Police } from '@/types';

export function usePolices(contactId: string | undefined) {
  const [polices, setPolices] = useState<Police[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolices = useCallback(async () => {
    if (!contactId) {
      setPolices([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('polices_assurance')
      .select(`
        *,
        ref_compagnie:ref_compagnies!compagnie_id(nom),
        ref_type:ref_types_assurance!type_assurance_id(code_court, nom_fr, categorie, branche)
      `)
      .eq('contact_id', contactId)
      .order('statut', { ascending: true })
      .order('type_assurance', { ascending: true });

    if (err) {
      setError(err.message);
      console.error('Erreur chargement polices:', err);
    } else {
      setPolices(data || []);
    }
    setLoading(false);
  }, [contactId]);

  useEffect(() => {
    fetchPolices();
  }, [fetchPolices]);

  const stats = {
    total: polices.length,
    actives: polices.filter(p => p.statut === 'active').length,
    prime_totale: polices
      .filter(p => p.statut === 'active')
      .reduce((sum, p) => sum + (p.prime_annuelle || 0), 0),
  };

  return { polices, loading, error, stats, refetch: fetchPolices };
}
