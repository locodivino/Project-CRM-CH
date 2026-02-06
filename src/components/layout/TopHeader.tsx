import { ReactNode } from "react";

interface TopHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function TopHeader({ title, subtitle, actions }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
