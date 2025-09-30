import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AppHeader from "@/components/layout/AppHeader";
import Toolbar from "@/components/layout/Toolbar";
import Dashboard from "@/pages/Dashboard";
import Segment from "@/pages/Segment";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <AppHeader />
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/segment/:id" element={<Segment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </TooltipProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
