import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const TasksFilters = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="h-8">
          <input type="checkbox" className="mr-2" />
          Nom
        </Button>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <span>Règles d'automatisation</span>
        <span>Extensions</span>
      </div>
    </div>
  );
};