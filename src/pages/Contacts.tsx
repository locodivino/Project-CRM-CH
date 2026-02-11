import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, MoreHorizontal, Loader2, Trash2, Edit } from "lucide-react";
import { useContacts, Contact } from "@/hooks/useContacts";

const tagColors: Record<string, string> = {
  "VIP": "bg-primary/20 text-primary",
  "LAMal": "bg-green-600/20 text-green-700",
  "LCA": "bg-blue-600/20 text-blue-700",
  "3ème Pilier": "bg-purple-600/20 text-purple-700",
  "Auto": "bg-orange-600/20 text-orange-700",
  "client": "bg-green-600/20 text-green-700",
  "prospect": "bg-muted text-muted-foreground",
  "partenaire": "bg-blue-600/20 text-blue-700",
};

export default function Contacts() {
  const navigate = useNavigate();
  const { contacts, loading, addContact, deleteContact } = useContacts();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    civilite: "M.",
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    type: "prospect" as "prospect" | "client" | "partenaire",
    ville: "",
  });

  const filteredContacts = contacts.filter(contact => {
    const q = searchQuery.toLowerCase();
    return (
      contact.nom?.toLowerCase().includes(q) ||
      contact.prenom?.toLowerCase().includes(q) ||
      contact.raison_sociale?.toLowerCase().includes(q) ||
      contact.email?.toLowerCase().includes(q) ||
      contact.ville?.toLowerCase().includes(q)
    );
  });

  const handleAddContact = async () => {
    if (!newContact.nom) return;
    
    await addContact({
      ...newContact,
      statut: "nouveau",
      pays: "Suisse",
    } as Omit<Contact, "id" | "created_at" | "updated_at">);
    
    setNewContact({
      civilite: "M.",
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      type: "prospect",
      ville: "",
    });
    setIsDialogOpen(false);
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("Supprimer ce contact ?")) {
      await deleteContact(id);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Clients"
        subtitle={`${contacts.length} contact${contacts.length > 1 ? 's' : ''}`}
        actions={
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau client
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-4 overflow-auto">
        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un client..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {searchQuery ? "Aucun résultat" : "Aucun contact. Ajoutez votre premier client !"}
          </div>
        ) : (
          /* Table */
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/contacts/${contact.id}`)}>
                    <TableCell className="font-medium">
                      {contact.raison_sociale 
                        ? contact.raison_sociale 
                        : `${contact.civilite || ''} ${contact.prenom || ''} ${contact.nom}`.trim()
                      }
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.email || "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.telephone || contact.telephone_mobile || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={tagColors[contact.type] || ""}>
                        {contact.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.ville || "—"}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Dialog Nouveau Contact */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau contact</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="civilite">Civilité</Label>
                <Select 
                  value={newContact.civilite} 
                  onValueChange={(v) => setNewContact({...newContact, civilite: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M.">M.</SelectItem>
                    <SelectItem value="Mme">Mme</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                    <SelectItem value="Me">Me</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newContact.type} 
                  onValueChange={(v: "prospect" | "client" | "partenaire") => setNewContact({...newContact, type: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="partenaire">Partenaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prenom">Prénom *</Label>
                <Input 
                  id="prenom" 
                  value={newContact.prenom}
                  onChange={(e) => setNewContact({...newContact, prenom: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="nom">Nom *</Label>
                <Input 
                  id="nom" 
                  value={newContact.nom}
                  onChange={(e) => setNewContact({...newContact, nom: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input 
                  id="telephone" 
                  value={newContact.telephone}
                  onChange={(e) => setNewContact({...newContact, telephone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="ville">Ville</Label>
                <Input 
                  id="ville" 
                  value={newContact.ville}
                  onChange={(e) => setNewContact({...newContact, ville: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddContact} disabled={!newContact.nom}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
