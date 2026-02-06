import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Upload, Search, Filter, MoreHorizontal } from "lucide-react";

const contacts = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@gmail.com", phone: "+41 79 123 45 67", tags: ["VIP", "LAMal"], status: "Actif" },
  { id: 2, name: "Marie Martin", email: "marie.martin@bluewin.ch", phone: "+41 78 234 56 78", tags: ["Client"], status: "Actif" },
  { id: 3, name: "Pierre Durand", email: "p.durand@sunrise.ch", phone: "+41 76 345 67 89", tags: ["Prospect"], status: "Actif" },
  { id: 4, name: "Sophie Bernard", email: "sophie.b@gmail.com", phone: "+41 79 456 78 90", tags: ["Client", "3ème Pilier"], status: "Actif" },
  { id: 5, name: "Marc Favre", email: "marc.favre@outlook.com", phone: "+41 78 567 89 01", tags: ["VIP"], status: "Actif" },
  { id: 6, name: "Claire Rochat", email: "claire.rochat@gmail.com", phone: "+41 76 678 90 12", tags: ["Prospect"], status: "En attente" },
  { id: 7, name: "Luc Bonvin", email: "luc.bonvin@bluewin.ch", phone: "+41 79 789 01 23", tags: ["Client", "Auto"], status: "Actif" },
  { id: 8, name: "Anne Chevalier", email: "a.chevalier@sunrise.ch", phone: "+41 78 890 12 34", tags: ["Client"], status: "Actif" },
];

const tagColors: Record<string, string> = {
  "VIP": "bg-primary/20 text-primary",
  "LAMal": "bg-green-600/20 text-green-700",
  "LCA": "bg-blue-600/20 text-blue-700",
  "3ème Pilier": "bg-purple-600/20 text-purple-700",
  "Auto": "bg-orange-600/20 text-orange-700",
  "Client": "bg-green-600/20 text-green-700",
  "Prospect": "bg-muted text-muted-foreground",
};

export default function Contacts() {
  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Clients"
        subtitle="Gérez vos clients et prospects"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau client
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-4">
        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un client..." className="pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>

        {/* Contacts Table */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                  <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className={tagColors[tag] || "bg-gray-100"}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={contact.status === "Actif" ? "default" : "secondary"}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
