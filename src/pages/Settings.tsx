import { TopHeader } from "@/components/layout/TopHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, Palette, Loader2 } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useAuth } from "@/contexts/AuthContext";

const settingsSections = [
  {
    title: "Profil",
    description: "Gérez vos informations personnelles",
    icon: User,
  },
  {
    title: "Notifications",
    description: "Paramètres d'alertes et rappels",
    icon: Bell,
  },
  {
    title: "Sécurité",
    description: "Mot de passe et authentification",
    icon: Shield,
  },
  {
    title: "Apparence",
    description: "Thème et personnalisation",
    icon: Palette,
  },
];

export default function Settings() {
  const { user } = useAuth();
  const { settings, updateSetting, loading } = useSettings();

  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Paramètres"
        subtitle="Configuration de l'application"
      />
      
      <div className="flex-1 p-6 space-y-4 overflow-auto">
        {/* Info utilisateur connecté */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compte connecté</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </CardContent>
        </Card>

        {/* Sections de settings */}
        <div className="grid gap-4 md:grid-cols-2">
          {settingsSections.map((section) => (
            <Card key={section.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        {/* Modules actifs - persistés dans Supabase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Modules actifs
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <CardDescription>
              Activez ou désactivez les fonctionnalités — vos choix sont sauvegardés automatiquement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="copilot">CoPilot IA</Label>
                <p className="text-xs text-muted-foreground">Assistant intelligent</p>
              </div>
              <Switch 
                id="copilot" 
                checked={settings.copilot}
                onCheckedChange={(checked) => updateSetting('copilot', checked)}
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="automation">Automatisation</Label>
                <p className="text-xs text-muted-foreground">Workflows automatiques</p>
              </div>
              <Switch 
                id="automation" 
                checked={settings.automation}
                onCheckedChange={(checked) => updateSetting('automation', checked)}
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messenger">Messenger</Label>
                <p className="text-xs text-muted-foreground">Chat interne</p>
              </div>
              <Switch 
                id="messenger" 
                checked={settings.messenger}
                onCheckedChange={(checked) => updateSetting('messenger', checked)}
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="drive">Drive</Label>
                <p className="text-xs text-muted-foreground">Stockage de fichiers</p>
              </div>
              <Switch 
                id="drive" 
                checked={settings.drive}
                onCheckedChange={(checked) => updateSetting('drive', checked)}
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mailbox">Messagerie</Label>
                <p className="text-xs text-muted-foreground">Emails clients</p>
              </div>
              <Switch 
                id="mailbox" 
                checked={settings.mailbox}
                onCheckedChange={(checked) => updateSetting('mailbox', checked)}
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
