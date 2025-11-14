import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import Index from "./pages/Index";
import Knowledge from "./pages/Knowledge";
import Setup from "./pages/Setup";
import HypeClip from "./pages/HypeClip";
import RecordClip from "./pages/RecordClip";
import Glossary from "./pages/Glossary";
import ChartExamples from "./pages/ChartExamples";
import Checklist from "./pages/Checklist";
import FAQ from "./pages/FAQ";
import Resources from "./pages/Resources";
import TradeJournal from "./pages/TradeJournal";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  useSmoothScroll();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/chart-examples" element={<ChartExamples />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/trade-journal" element={<ProtectedRoute><TradeJournal /></ProtectedRoute>} />
            <Route path="/hype" element={<ProtectedRoute><HypeClip /></ProtectedRoute>} />
            <Route path="/record" element={<ProtectedRoute><RecordClip /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
