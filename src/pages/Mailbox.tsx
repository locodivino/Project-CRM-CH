import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Mail, Inbox, Send, Archive } from "lucide-react";

const folders = [
  { title: "Boîte de réception", count: 24, icon: Inbox },
  { title: "Envoyés", count: 156, icon: Send },
  { title: "Archives", count: 892, icon: Archive },
];

export default function Mailbox() {
  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Messagerie"
        subtitle="Emails clients"
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau message
          </Button>
        }
      />
      
      <div className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {folders.map((folder) => (
            <Card key={folder.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{folder.title}</CardTitle>
                <folder.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{folder.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Configuration email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connectez votre compte email pour synchroniser vos messages.
            </p>
            <Button className="mt-4">Configurer</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
