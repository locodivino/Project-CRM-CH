import { Contact } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Smartphone, MapPin, Briefcase, Calendar, Hash } from "lucide-react";

interface ContactInfoProps {
  contact: Contact;
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}

export function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Coordonnées */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Coordonnées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <InfoRow icon={Mail} label="Email" value={contact.email} />
          <InfoRow icon={Phone} label="Téléphone fixe" value={contact.telephone} />
          <InfoRow icon={Smartphone} label="Mobile" value={contact.telephone_mobile} />
          <InfoRow 
            icon={MapPin} 
            label="Adresse" 
            value={[contact.adresse, [contact.code_postal, contact.ville].filter(Boolean).join(' '), contact.pays]
              .filter(Boolean).join('\n')} 
          />
        </CardContent>
      </Card>

      {/* Informations personnelles */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <InfoRow 
            icon={Calendar} 
            label="Date de naissance" 
            value={contact.date_naissance 
              ? new Date(contact.date_naissance).toLocaleDateString('fr-CH')
              : undefined} 
          />
          <InfoRow icon={Hash} label="N° AVS" value={contact.numero_avs} />
          <InfoRow icon={Briefcase} label="Profession" value={contact.profession} />
          <InfoRow icon={Briefcase} label="Employeur" value={contact.employeur} />
          <InfoRow icon={Hash} label="Source" value={contact.source} />
        </CardContent>
      </Card>

      {/* Notes */}
      {contact.notes && (
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{contact.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
