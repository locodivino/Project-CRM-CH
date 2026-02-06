import { Search, Bell, MessageSquare, FileText, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const chatItems = [
  {
    id: 1,
    title: "Actualités de l'entreprise",
    subtitle: "Partagez des informations importantes et des actualités. Suivez pour rester...",
    icon: "📢",
    type: "channel",
    time: "Jeu",
    color: "bg-green-500"
  },
  {
    id: 2,
    title: "Bitrix24 Support",
    subtitle: "Bonjour ! Je suis AI support agent, votre assistante virtuelle. Je suis ici pour vous...",
    icon: "👤",
    type: "support",
    time: "Jeu",
    color: "bg-orange-500"
  },
  {
    id: 3,
    title: "Chat général",
    subtitle: "Utilisez le chat général pour communiquer, échanger des idées et...",
    icon: "💬",
    type: "general",
    time: "Jeu",
    color: "bg-blue-500"
  },
  {
    id: 4,
    title: "Notes",
    subtitle: "Visible uniquement pour vous",
    icon: "📝",
    type: "notes",
    time: "Jeu",
    color: "bg-yellow-500"
  }
];

export const MessengerSidebar = () => {
  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Chercher un employé ou une conv..."
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <button className="flex items-center space-x-2 text-primary border-b-2 border-primary pb-1">
            <MessageSquare className="h-4 w-4" />
            <span>Chats</span>
          </button>
          <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <Users className="h-4 w-4" />
            <span>CoPilot</span>
          </button>
          <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span>Collabs</span>
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {chatItems.map((chat) => (
            <div
              key={chat.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
            >
              <div className={`w-10 h-10 ${chat.color} rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0`}>
                {chat.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground text-sm truncate">
                    {chat.title}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {chat.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {chat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};