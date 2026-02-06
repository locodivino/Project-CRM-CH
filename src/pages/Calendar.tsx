import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Calendrier"
        subtitle="Gérez vos rendez-vous clients"
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau RDV
          </Button>
        }
      />
      
      <div className="flex-1 p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Février 2026</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div key={day} className="bg-background p-3 text-center text-sm font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className="bg-background p-3 min-h-24 hover:bg-muted/50 cursor-pointer"
                >
                  <span className="text-sm text-muted-foreground">
                    {((i % 31) + 1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
