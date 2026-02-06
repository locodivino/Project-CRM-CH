import { Sidebar } from "./Sidebar";
import floralBackground from "@/assets/floral-background.jpg";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Background Image - pointer-events-none pour ne pas bloquer les clics */}
      <div
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${floralBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Sidebar - z-20 pour être au-dessus du background */}
      <div className="relative z-20">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <div className="bg-gradient-surface min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};
