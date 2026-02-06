import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface Settings {
  copilot: boolean;
  automation: boolean;
  messenger: boolean;
  drive: boolean;
  mailbox: boolean;
}

const defaultSettings: Settings = {
  copilot: true,
  automation: true,
  messenger: true,
  drive: true,
  mailbox: true,
};

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Charger les settings au démarrage
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadSettings() {
      const { data, error } = await supabase
        .from('user_settings')
        .select('setting_key, setting_value')
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur chargement settings:', error);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const loadedSettings = { ...defaultSettings };
        data.forEach((row) => {
          if (row.setting_key in loadedSettings) {
            loadedSettings[row.setting_key as keyof Settings] = row.setting_value;
          }
        });
        setSettings(loadedSettings);
      }
      
      setLoading(false);
    }

    loadSettings();
  }, [user]);

  // Mettre à jour un setting
  const updateSetting = async (key: keyof Settings, value: boolean) => {
    if (!user) return;

    // Mise à jour optimiste (UI immédiate)
    setSettings((prev) => ({ ...prev, [key]: value }));

    // Upsert dans Supabase
    const { error } = await supabase
      .from('user_settings')
      .upsert(
        {
          user_id: user.id,
          setting_key: key,
          setting_value: value,
        },
        {
          onConflict: 'user_id,setting_key',
        }
      );

    if (error) {
      console.error('Erreur sauvegarde setting:', error);
      // Rollback en cas d'erreur
      setSettings((prev) => ({ ...prev, [key]: !value }));
    }
  };

  return { settings, updateSetting, loading };
}
