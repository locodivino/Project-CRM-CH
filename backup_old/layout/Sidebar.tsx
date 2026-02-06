import { 
  Building2, 
  Calendar, 
  TrendingUp, 
  CheckSquare, 
  Users, 
  MessageSquare, 
  FileText, 
  BarChart3,
  Mail,
  Zap,
  Bot,
  Settings,
  HelpCircle,
  ChevronLeft,
  Search
} from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const navigationItems = [
  { id: 'crm', icon: Building2, label: 'CRM', path: '/' },
  { id: 'calendar', icon: Calendar, label: 'Calendrier', path: '/calendar' },
  { id: 'marketing', icon: TrendingUp, label: 'Marketing', path: '/marketing' },
  { id: 'tasks', icon: CheckSquare, label: 'Tâches et projets', path: '/tasks' },
  { id: 'collaboration', icon: Users, label: 'Collaboration', path: '/collaboration' },
  { id: 'messenger', icon: MessageSquare, label: 'Messenger', path: '/messenger' },
  { id: 'documents', icon: FileText, label: 'Documents', path: '/documents' },
  { id: 'drive', icon: BarChart3, label: 'Drive', path: '/drive' },
  { id: 'mailbox', icon: Mail, label: 'Messagerie', path: '/mailbox' },
  { id: 'automation', icon: Zap, label: 'Automatisation', path: '/automation' },
  { id: 'copilot', icon: Bot, label: 'Mon CoPilot', path: '/copilot' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              Bitrix24
            </h1>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft 
              className={`h-4 w-4 text-sidebar-foreground transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 bg-sidebar-accent border border-sidebar-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-soft'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="space-y-1">
          <Link 
            to="/settings" 
            className="w-full flex items-center px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <Settings className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
            {!isCollapsed && <span>Paramètres</span>}
          </Link>
          <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <HelpCircle className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
            {!isCollapsed && <span>Aide</span>}
          </button>
        </div>
      </div>
    </div>
  );
};