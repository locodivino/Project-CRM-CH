import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, Shield, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { mainNavigation, bottomNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ backgroundColor: "hsl(var(--sidebar-background))" }}
    >
      {/* Header - Logo & Account */}
      <div 
        className="flex h-16 items-center justify-between px-3"
        style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: "hsl(var(--sidebar-primary))" }}
            >
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                CRM Assurance
              </span>
              <span className="text-xs" style={{ color: "hsl(var(--sidebar-muted))" }}>
                Genève
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-lg mx-auto"
            style={{ backgroundColor: "hsl(var(--sidebar-primary))" }}
          >
            <Shield className="h-5 w-5 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("h-8 w-8", collapsed && "hidden")}
          style={{ color: "hsl(var(--sidebar-muted))" }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="mx-auto mt-2 h-8 w-8"
          style={{ color: "hsl(var(--sidebar-muted))" }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Search */}
      {!collapsed && (
        <div className="p-3">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" 
              style={{ color: "hsl(var(--sidebar-muted))" }}
            />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 border-0"
              style={{ 
                backgroundColor: "hsl(var(--sidebar-accent))",
                color: "hsl(var(--sidebar-foreground))"
              }}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2">
        <nav className="flex flex-col gap-1 py-2">
          {mainNavigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-2">
              {section.label && !collapsed && (
                <div className="mb-1 px-3 py-2">
                  <span 
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "hsl(var(--sidebar-muted))" }}
                  >
                    {section.label}
                  </span>
                </div>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-2"
                  )}
                  activeClassName="sidebar-active"
                >
                  <item.icon className="h-5 w-5 shrink-0" style={{ color: "hsl(var(--sidebar-foreground))" }} />
                  {!collapsed && (
                    <>
                      <span className="flex-1" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="h-5 min-w-5 justify-center px-1.5 text-xs"
                          style={{ 
                            backgroundColor: "hsl(var(--sidebar-primary))",
                            color: "white"
                          }}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Navigation + User */}
      <div 
        className="p-2"
        style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}
      >
        {bottomNavigation.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              collapsed && "justify-center px-2"
            )}
            activeClassName="sidebar-active"
          >
            <item.icon className="h-5 w-5 shrink-0" style={{ color: "hsl(var(--sidebar-foreground))" }} />
            {!collapsed && (
              <span style={{ color: "hsl(var(--sidebar-foreground))" }}>{item.title}</span>
            )}
          </NavLink>
        ))}
        
        {/* Logout button */}
        <button
          onClick={handleSignOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:opacity-80",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" style={{ color: "hsl(var(--sidebar-muted))" }} />
          {!collapsed && (
            <span style={{ color: "hsl(var(--sidebar-muted))" }}>Déconnexion</span>
          )}
        </button>
      </div>
    </aside>
  );
}
