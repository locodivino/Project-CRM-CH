import { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, MoreHorizontal, User, DollarSign } from "lucide-react";

const pipelines = [
  { id: "assurance", name: "Pipeline Assurance" },
  { id: "prevoyance", name: "Prévoyance 3ème Pilier" },
];

const stages = [
  { id: "nouveau", name: "Nouveau Lead", color: "bg-blue-500" },
  { id: "contact", name: "Contacté", color: "bg-orange-500" },
  { id: "analyse", name: "Analyse besoins", color: "bg-purple-500" },
  { id: "devis", name: "Devis envoyé", color: "bg-cyan-500" },
  { id: "negociation", name: "Négociation", color: "bg-yellow-500" },
  { id: "signe", name: "Signé", color: "bg-green-500" },
  { id: "perdu", name: "Perdu", color: "bg-gray-500" },
];

const opportunities = [
  { id: 1, name: "Jean Dupont", value: 4560, stage: "nouveau", type: "LAMal", email: "jean.dupont@gmail.com" },
  { id: 2, name: "Marie Martin", value: 12000, stage: "contact", type: "3ème Pilier", email: "marie.martin@bluewin.ch" },
  { id: 3, name: "Pierre Durand", value: 850, stage: "contact", type: "Auto", email: "p.durand@sunrise.ch" },
  { id: 4, name: "Sophie Bernard", value: 3200, stage: "analyse", type: "Ménage RC", email: "sophie.b@gmail.com" },
  { id: 5, name: "Marc Favre", value: 15000, stage: "devis", type: "LCA", email: "marc.favre@outlook.com" },
  { id: 6, name: "Claire Rochat", value: 7800, stage: "signe", type: "LAMal", email: "claire.rochat@gmail.com" },
  { id: 7, name: "Luc Bonvin", value: 4500, stage: "nouveau", type: "Auto", email: "luc.bonvin@bluewin.ch" },
  { id: 8, name: "Anne Chevalier", value: 9200, stage: "negociation", type: "3ème Pilier", email: "a.chevalier@sunrise.ch" },
];

export default function Opportunities() {
  const [selectedPipeline, setSelectedPipeline] = useState("assurance");

  const getOpportunitiesByStage = (stageId: string) => {
    return opportunities.filter((opp) => opp.stage === stageId);
  };

  const getStageTotal = (stageId: string) => {
    return getOpportunitiesByStage(stageId).reduce((sum, opp) => sum + opp.value, 0);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Opportunités"
        subtitle="Pipeline de vente"
        actions={
          <div className="flex items-center gap-2">
            <Select value={selectedPipeline} onValueChange={setSelectedPipeline}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pipelines.map((pipeline) => (
                  <SelectItem key={pipeline.id} value={pipeline.id}>
                    {pipeline.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle opportunité
            </Button>
          </div>
        }
      />

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 h-full min-w-max">
          {stages.map((stage) => (
            <div key={stage.id} className="flex w-72 flex-col">
              {/* Stage Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                  <span className="font-medium">{stage.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {getOpportunitiesByStage(stage.id).length}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  CHF {getStageTotal(stage.id).toLocaleString()}
                </span>
              </div>

              {/* Opportunity Cards */}
              <div className="flex-1 space-y-3 rounded-lg bg-muted/50 p-3">
                {getOpportunitiesByStage(stage.id).map((opp) => (
                  <Card key={opp.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{opp.name}</p>
                            <p className="text-xs text-muted-foreground">{opp.type}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary">
                        <DollarSign className="h-4 w-4" />
                        CHF {opp.value.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {getOpportunitiesByStage(stage.id).length === 0 && (
                  <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                    Aucune opportunité
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
