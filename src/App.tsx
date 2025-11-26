import { lazy, Suspense } from "react";
import { MinimalistCandleBackground } from "./components/visuals/MinimalistCandleBackground";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { FloatingCandlestickAssistant } from "@/components/FloatingCandlestickAssistant";
import { AnimatedCandlestickBackground } from "@/components/AnimatedCandlestickBackground";
import { OnboardingTour } from "@/components/OnboardingTour";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy load secondary pages for better performance
const Setup = lazy(() => import("./pages/Setup"));
const Glossary = lazy(() => import("./pages/Glossary"));
const ChartExamples = lazy(() => import("./pages/ChartExamples"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Resources = lazy(() => import("./pages/Resources"));
const TradeJournal = lazy(() => import("./pages/TradeJournal"));
const FractalModel = lazy(() => import("./pages/FractalModel"));
const Sequences = lazy(() => import("./pages/Sequences"));
const SequenceIdentifier = lazy(() => import("./pages/SequenceIdentifier"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const C2Patterns = lazy(() => import("./pages/C2Patterns"));
const Knowledge = lazy(() => import("./pages/Knowledge"));

const queryClient = new QueryClient();

const App = () => {
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-menu focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Toaster />
        <Sonner />
        <MinimalistCandleBackground />
        <BrowserRouter>
          <Navbar />
          <OnboardingTour />
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center space-y-4">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/fractal-model" element={<FractalModel />} />
              <Route path="/sequences" element={<Sequences />} />
              <Route path="/sequence-identifier" element={<SequenceIdentifier />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/c2-patterns" element={<C2Patterns />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/chart-examples" element={<ChartExamples />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/trade-journal" element={<ProtectedRoute><TradeJournal /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
