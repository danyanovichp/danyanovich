import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import "./lib/i18n";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Templates = lazy(() => import("./pages/Templates"));
const TemplateLanding = lazy(() => import("./pages/TemplateLanding"));
const Courses = lazy(() => import("./pages/Courses"));
const AIPrompts = lazy(() => import("./pages/AIPrompts"));
const Packages = lazy(() => import("./pages/Packages"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Consulting = lazy(() => import("./pages/Consulting"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
                    <Route path="/templates/:templateId" element={<PageTransition><TemplateLanding /></PageTransition>} />
                    <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
                    <Route path="/ai-prompts" element={<PageTransition><AIPrompts /></PageTransition>} />
                    <Route path="/consulting" element={<PageTransition><Consulting /></PageTransition>} />
                    <Route path="/packages" element={<PageTransition><Packages /></PageTransition>} />
                    <Route path="/reviews" element={<PageTransition><Reviews /></PageTransition>} />
                    <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                    <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
