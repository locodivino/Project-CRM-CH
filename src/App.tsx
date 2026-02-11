import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Login from "./pages/Login";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";
import Opportunities from "./pages/Opportunities";
import Documents from "./pages/Documents";
import Messenger from "./pages/Messenger";
import Mailbox from "./pages/Mailbox";
import Drive from "./pages/Drive";
import Automation from "./pages/Automation";
import CoPilot from "./pages/CoPilot";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Route publique */}
            <Route path="/login" element={<Login />} />

            {/* Routes protégées avec Layout */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Index />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<ContactDetail />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/messenger" element={<Messenger />} />
              <Route path="/mailbox" element={<Mailbox />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/copilot" element={<CoPilot />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
