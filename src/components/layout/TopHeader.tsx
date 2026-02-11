import { ReactNode } from "react";

interface TopHeaderProps {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function TopHeader({ title, subtitle, actions }: TopHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && (
          typeof subtitle === 'string' 
            ? <p className="text-sm text-muted-foreground">{subtitle}</p>
            : <div className="text-sm">{subtitle}</div>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
