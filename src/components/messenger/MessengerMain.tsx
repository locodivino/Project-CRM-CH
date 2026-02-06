import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export const MessengerMain = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-64 h-48">
            {/* Main illustration area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 relative">
                {/* Chat bubbles */}
                <div className="absolute top-4 left-4 w-8 h-6 bg-white rounded-lg shadow-soft"></div>
                <div className="absolute top-12 left-8 w-12 h-6 bg-blue-500 rounded-lg"></div>
                <div className="absolute top-20 right-4 w-10 h-6 bg-white rounded-lg shadow-soft"></div>
                
                {/* Calendar icon */}
                <div className="absolute bottom-8 left-4 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">📅</span>
                </div>
                
                {/* Shopping cart icon */}
                <div className="absolute top-6 right-8 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🛒</span>
                </div>
                
                {/* Time icon */}
                <div className="absolute bottom-4 right-8 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⏰</span>
                </div>
                
                {/* Cute mascot */}
                <div className="w-16 h-16 bg-pink-300 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">🐻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text content */}
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Sélectionnez un chat pour commencer à communiquer
        </h2>
        
        <p className="text-muted-foreground mb-6">ou</p>
        
        <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
          <UserPlus className="h-4 w-4 mr-2" />
          Inviter des utilisateurs
        </Button>
      </div>
    </div>
  );
};