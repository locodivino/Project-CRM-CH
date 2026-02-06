import { Button } from "@/components/ui/button";

interface IntegrationOption {
  name: string;
  icon: string;
  color: string;
}

const integrationOptions: IntegrationOption[] = [
  { name: 'Google Calendar', icon: '📅', color: 'text-blue-600' },
  { name: 'Calendrier iCloud', icon: '🍎', color: 'text-gray-800' },
  { name: 'Calendrier Office365', icon: '📧', color: 'text-orange-600' },
];

export const CalendarIntegration = () => {
  return (
    <div className="text-center py-12">
      {/* Empty State Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <div className="text-4xl text-muted-foreground">📅</div>
        </div>
      </div>

      {/* No Events Message */}
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Il n'y a aucun événement
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Vous pouvez ajouter des événements à partir de calendriers tiers pour conserver tous vos événements au même endroit.
      </p>

      {/* Integration Options */}
      <div className="flex justify-center space-x-6 mb-8">
        {integrationOptions.map((option) => (
          <button
            key={option.name}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              {option.icon}
            </div>
            <span className={`text-sm font-medium ${option.color}`}>
              {option.name}
            </span>
          </button>
        ))}
      </div>

      {/* Connect Calendar Button */}
      <Button 
        variant="outline" 
        size="lg"
        className="border-2 border-dashed border-border hover:border-primary hover:bg-primary/5"
      >
        CONNECTER UN CALENDRIER
      </Button>
    </div>
  );
};