import { Plus } from "lucide-react";

interface KanbanStage {
  id: string;
  title: string;
  value: string;
  count: number;
  color: string;
}

const stages: KanbanStage[] = [
  { id: 'nouveau', title: 'Nouveau', value: '0 €', count: 0, color: 'bg-blue-500' },
  { id: 'etude', title: 'Étude du dossier', value: '0 €', count: 0, color: 'bg-yellow-500' },
  { id: 'offre', title: 'Offre commerciale', value: '0 €', count: 0, color: 'bg-green-500' },
  { id: 'cours', title: 'En cours', value: '0 €', count: 0, color: 'bg-purple-500' },
  { id: 'facture', title: 'Facture finale', value: '0 €', count: 0, color: 'bg-orange-500' },
];

export const KanbanBoard = () => {
  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors shadow-soft">
              + Créer
            </button>
            <select className="px-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Général</option>
            </select>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
          <span>Transactions en cours</span>
          <span>+ recherche</span>
        </div>
      </div>

      {/* Kanban Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
            {/* Stage Header */}
            <div className={`${stage.color} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{stage.title}</h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">({stage.count})</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{stage.value}</p>
              </div>
            </div>

            {/* Stage Content */}
            <div className="p-4 min-h-[200px] bg-card">
              {/* Add New Button */}
              <button className="w-full border-2 border-dashed border-border rounded-lg p-4 text-muted-foreground hover:border-primary hover:text-primary transition-colors group">
                <Plus className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Transaction rapide</span>
              </button>

              {/* Contact Center Info - only for first stage */}
              {stage.id === 'nouveau' && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Centre de contact</h4>
                  <p className="text-xs text-muted-foreground mb-3">Sources de transaction automatiques</p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Chat en direct</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Appels</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span>Formulaires CRM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Courrier</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Viber</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Telegram</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-background rounded border border-border">
                    <p className="text-xs text-muted-foreground">
                      Importer les données d'un autre CRM ou d'une feuille de calcul Excel
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};