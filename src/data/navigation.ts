import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Users,
  Target,
  FileText,
  Bot,
  Zap,
  FolderOpen,
  Mail,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export const mainNavigation: NavSection[] = [
  {
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Calendrier", url: "/calendar", icon: Calendar },
      { title: "Clients", url: "/contacts", icon: Users },
      { title: "Opportunités", url: "/opportunities", icon: Target },
      { title: "Documents", url: "/documents", icon: FileText },
    ],
  },
  {
    label: "Outils",
    items: [
      { title: "Messenger", url: "/messenger", icon: MessageSquare },
      { title: "Messagerie", url: "/mailbox", icon: Mail },
      { title: "Drive", url: "/drive", icon: FolderOpen },
      { title: "Automatisation", url: "/automation", icon: Zap },
      { title: "CoPilot IA", url: "/copilot", icon: Bot },
    ],
  },
];

export const bottomNavigation: NavItem[] = [
  { title: "Paramètres", url: "/settings", icon: Settings },
];
