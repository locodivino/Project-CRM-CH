import { TopHeader } from "@/components/layout/TopHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";

const conversations = [
  { id: 1, name: "Jean Dupont", lastMessage: "Merci pour le devis", time: "10:30", unread: 2 },
  { id: 2, name: "Marie Martin", lastMessage: "RDV confirmé pour demain", time: "09:15", unread: 0 },
  { id: 3, name: "Pierre Durand", lastMessage: "Pouvez-vous m'appeler ?", time: "Hier", unread: 1 },
];

export default function Messenger() {
  return (
    <div className="flex flex-col h-screen">
      <TopHeader title="Messenger" subtitle="Conversations clients" />
      
      <div className="flex-1 flex">
        {/* Sidebar conversations */}
        <div className="w-80 border-r p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-9" />
          </div>
          
          <div className="space-y-2">
            {conversations.map((conv) => (
              <Card key={conv.id} className="p-3 cursor-pointer hover:bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{conv.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{conv.time}</p>
                    {conv.unread > 0 && (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 flex items-center justify-center text-muted-foreground">
            Sélectionnez une conversation
          </div>
          <div className="p-4 border-t flex gap-2">
            <Input placeholder="Écrire un message..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
