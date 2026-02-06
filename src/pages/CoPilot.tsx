import { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles } from "lucide-react";

const suggestions = [
  "Résume le dossier de Jean Dupont",
  "Quelles polices arrivent à échéance ce mois ?",
  "Rédige un email de relance pour Marie Martin",
  "Compare les offres LAMal pour un client de 35 ans",
];

export default function CoPilot() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="CoPilot IA"
        subtitle="Votre assistant intelligent"
      />
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-primary/10">
              <Bot className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Comment puis-je vous aider ?</h2>
            <p className="text-muted-foreground">
              Posez-moi une question sur vos clients, polices ou demandez-moi de rédiger un document.
            </p>
            
            <div className="grid gap-2 sm:grid-cols-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  className="justify-start text-left h-auto py-3"
                  onClick={() => setMessage(suggestion)}
                >
                  <Sparkles className="h-4 w-4 mr-2 shrink-0" />
                  <span className="text-sm">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
