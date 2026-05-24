import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import "./lib/i18n";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

import ScrollToTop from "./components/ScrollToTop";
import LanguageWrapper from "./components/LanguageWrapper";
import RootRedirect from "./components/RootRedirect";



// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Courses = lazy(() => import("./pages/Courses"));
const AIPrompts = lazy(() => import("./pages/AIPrompts"));
const Packages = lazy(() => import("./pages/Packages"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Consulting = lazy(() => import("./pages/Consulting"));
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const Support = lazy(() => import("./pages/Support"));

const PixelCafeTycoon = lazy(() => import("./pages/PixelCafeTycoon"));
const AITraining = lazy(() => import("./pages/AITraining"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NotionTemplates = lazy(() => import("./pages/NotionTemplates"));
const NotionTemplateDetail = lazy(() => import("./pages/NotionTemplateDetail"));

const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));



const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
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
                  <Route path="/:lang" element={<LanguageWrapper />}>
                    <Route index element={<Home />} />
                    <Route path="notion" element={<PageTransition><NotionTemplates /></PageTransition>} />
                    <Route path="notion/:slug" element={<PageTransition><NotionTemplateDetail /></PageTransition>} />
                    <Route path="blog" element={<PageTransition><Blog /></PageTransition>} />
                    <Route path="blog/:slug" element={<PageTransition><BlogPostDetail /></PageTransition>} />
                    <Route path="courses" element={<PageTransition><Courses /></PageTransition>} />
                    <Route path="ai-prompts" element={<PageTransition><AIPrompts /></PageTransition>} />
                    <Route path="consulting" element={<PageTransition><Consulting /></PageTransition>} />
                    <Route path="packages" element={<PageTransition><Packages /></PageTransition>} />
                    <Route path="reviews" element={<PageTransition><Reviews /></PageTransition>} />
                    <Route path="faq" element={<PageTransition><FAQ /></PageTransition>} />
                    <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
                    <Route path="portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
                    <Route path="cases" element={<PageTransition><Cases /></PageTransition>} />
                    <Route path="cases/:id" element={<PageTransition><CaseDetail /></PageTransition>} />
                    <Route path="support" element={<PageTransition><Support /></PageTransition>} />

                    <Route path="ai-training" element={<PageTransition><AITraining /></PageTransition>} />
                    <Route path="games/pixel-cafe-tycoon" element={<PageTransition><PixelCafeTycoon /></PageTransition>} />
                    <Route path="privacy" element={<PageTransition><Privacy /></PageTransition>} />
                    <Route path="terms" element={<PageTransition><Terms /></PageTransition>} />
                    <Route path="cookies" element={<PageTransition><Cookies /></PageTransition>} />
                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                  </Route>
                  <Route path="/notiontemplates" element={<Navigate to="/ru/notion" replace />} />
                  <Route path="*" element={<RootRedirect />} />
                </Routes>
              </Suspense>
            </main>
            <ScrollToTop />


          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
