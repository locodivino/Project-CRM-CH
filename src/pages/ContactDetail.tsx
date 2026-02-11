import { useParams, useNavigate } from "react-router-dom";
import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Loader2, Shield, User, FileText } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { usePolices } from "@/hooks/usePolices";
import { PolicesList } from "@/components/contacts/PolicesList";
import { ContactInfo } from "@/components/contacts/ContactInfo";

const typeColors: Record<string, string> = {
  client: "bg-green-600/20 text-green-700",
  prospect: "bg-muted text-muted-foreground",
  partenaire: "bg-blue-600/20 text-blue-700",
};

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contact, loading: loadingContact } = useContact(id);
  const { polices, loading: loadingPolices, stats } = usePolices(id);

  if (loadingContact) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-muted-foreground">Contact introuvable</p>
        <Button variant="outline" onClick={() => navigate('/contacts')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux contacts
        </Button>
      </div>
    );
  }

  const displayName = contact.raison_sociale
    ? contact.raison_sociale
    : `${contact.civilite || ''} ${contact.prenom || ''} ${contact.nom}`.trim();

  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title={displayName}
        subtitle={
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={typeColors[contact.type] || ""}>
              {contact.type}
            </Badge>
            {contact.ville && (
              <span className="text-muted-foreground">• {contact.ville}</span>
            )}
            {stats.actives > 0 && (
              <span className="text-muted-foreground">
                • {stats.actives} police{stats.actives > 1 ? 's' : ''} active{stats.actives > 1 ? 's' : ''}
              </span>
            )}
          </div>
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/contacts')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="polices" className="w-full">
          <TabsList>
            <TabsTrigger value="polices" className="gap-2">
              <Shield className="h-4 w-4" />
              Polices ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="infos" className="gap-2">
              <User className="h-4 w-4" />
              Informations
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="polices" className="mt-4">
            <PolicesList polices={polices} loading={loadingPolices} stats={stats} />
          </TabsContent>

          <TabsContent value="infos" className="mt-4">
            <ContactInfo contact={contact} />
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              Documents — Phase 2.0
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
