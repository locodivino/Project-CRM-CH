import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Contact } from '@/types';

export function useContact(contactId: string | undefined) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContact = useCallback(async () => {
    if (!contactId) {
      setContact(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: err } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', contactId)
      .single();

    if (err) {
      setError(err.message);
    } else {
      setContact(data);
    }
    setLoading(false);
  }, [contactId]);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  const updateContact = async (updates: Partial<Contact>) => {
    if (!contactId) return { error: 'Pas de contact' };

    const { data, error: err } = await supabase
      .from('contacts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', contactId)
      .select()
      .single();

    if (err) return { error: err.message };
    setContact(data);
    return { data };
  };

  return { contact, loading, error, updateContact, refetch: fetchContact };
}
