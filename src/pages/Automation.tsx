import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Zap, Play, Pause } from "lucide-react";

const workflows = [
  { id: 1, name: "Relance échéance 30j", status: "active", triggers: 156, lastRun: "Il y a 2h" },
  { id: 2, name: "Email bienvenue client", status: "active", triggers: 89, lastRun: "Il y a 1h" },
  { id: 3, name: "Rappel RDV J-1", status: "paused", triggers: 234, lastRun: "Hier" },
];

export default function Automation() {
  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Automatisation"
        subtitle="Workflows automatiques"
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau workflow
          </Button>
        }
      />
      
      <div className="flex-1 p-6 space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{workflow.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {workflow.triggers} déclenchements • {workflow.lastRun}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                  {workflow.status === "active" ? "Actif" : "En pause"}
                </Badge>
                <Button variant="ghost" size="icon">
                  {workflow.status === "active" ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
