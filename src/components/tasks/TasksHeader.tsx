import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TasksHeader = () => {
  return (
    <div className="border-b border-border bg-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-foreground">Mes tâches</h1>
            <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
            <Button variant="outline" size="sm">
              Tous les rôles
            </Button>
            <Button variant="outline" size="sm">
              En cours
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="+ recherche"
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-sm">
          <button className="text-primary border-b-2 border-primary pb-2 font-medium">
            Liste
          </button>
          <button className="text-muted-foreground hover:text-foreground pb-2">
            Date limite
          </button>
          <button className="text-muted-foreground hover:text-foreground pb-2">
            Planificateur
          </button>
          <button className="text-muted-foreground hover:text-foreground pb-2">
            Calendrier
          </button>
          <button className="text-muted-foreground hover:text-foreground pb-2">
            Gantt
          </button>
          <div className="flex items-center space-x-2 text-muted-foreground ml-auto">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              En retard
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Commentaires
            </span>
            <span>Tout marquer comme lu</span>
          </div>
        </div>
      </div>
    </div>
  );
};