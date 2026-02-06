import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

const mockTasks = [
  {
    id: 1,
    name: "Révision du contrat client",
    activity: "En cours",
    dueDate: "2025-01-10",
    createdBy: "Marie Dubois",
    responsible: "Jean Martin",
    project: "Projet Alpha",
    tags: ["Urgent", "Client"],
  },
  {
    id: 2,
    name: "Développement nouvelle fonctionnalité",
    activity: "À faire",
    dueDate: "2025-01-15",
    createdBy: "Pierre Laurent",
    responsible: "Sophie Chen",
    project: "Projet Beta",
    tags: ["Développement"],
  },
  {
    id: 3,
    name: "Préparation présentation",
    activity: "Terminé",
    dueDate: "2025-01-05",
    createdBy: "Anne Miller",
    responsible: "Lucas Roy",
    project: "Projet Gamma",
    tags: ["Présentation"],
  },
];

export const TasksList = () => {
  return (
    <div className="bg-card rounded-lg border border-border">
      {mockTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Créer une tâche
          </h3>
          <p className="text-muted-foreground max-w-md">
            Cette vue montre la liste des tâches et leur(s) responsable(s).
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" />
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="h-auto p-0 font-medium">
                  Nom <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="h-auto p-0 font-medium">
                  Activité <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Date limite</TableHead>
              <TableHead>Créé par</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Balisés</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">
                    {task.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      task.activity === "En cours" ? "secondary" :
                      task.activity === "Terminé" ? "default" : "outline"
                    }
                  >
                    {task.activity}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {task.createdBy}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                      {task.responsible.charAt(0)}
                    </div>
                    <span className="text-foreground">{task.responsible}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {task.project}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};