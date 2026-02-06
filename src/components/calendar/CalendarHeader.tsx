import { ChevronLeft, ChevronRight, Plus, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const tabs = ['Jour', 'Semaine', 'Mois', 'Agenda', 'Invitations'];

export const CalendarHeader = ({ currentMonth, onPrevMonth, onNextMonth }: CalendarHeaderProps) => {
  return (
    <div className="p-6 border-b border-border bg-card">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Calendrier</h1>
        <div className="flex items-center space-x-4">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft">
            <Plus className="h-4 w-4 mr-2" />
            Créer
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filtre et recherche"
              className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            Calendriers
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                index === 2 // "Mois" is active
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tab}
              {tab === 'Invitations' && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded">0</span>
              )}
            </button>
          ))}
        </div>

        {/* Month Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onPrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold text-foreground min-w-[150px] text-center">
              {currentMonth}
            </h2>
            <Button variant="ghost" size="sm" onClick={onNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Agenda</Button>
            <Button variant="outline" size="sm">Aujourd'hui</Button>
          </div>
        </div>
      </div>
    </div>
  );
};