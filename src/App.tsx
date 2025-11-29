import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import "./lib/i18n";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Templates from "./pages/Templates";
import Courses from "./pages/Courses";
import AIPrompts from "./pages/AIPrompts";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import Consulting from "./pages/Consulting";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
                <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
                <Route path="/ai-prompts" element={<PageTransition><AIPrompts /></PageTransition>} />
                <Route path="/consulting" element={<PageTransition><Consulting /></PageTransition>} />
                <Route path="/packages" element={<PageTransition><Packages /></PageTransition>} />
                <Route path="/reviews" element={<PageTransition><Reviews /></PageTransition>} />
                <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
