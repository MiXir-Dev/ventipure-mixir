import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SeoManager } from "@/components/SeoManager";
import { ROUTE_PATHS } from "@/consts/navigation.ts";
import Index from "./pages/Index.tsx";
import Tarifs from "./pages/Tarifs.tsx";
import Contact from "./pages/Contact.tsx";
import Services from "./pages/Services.tsx";
import Equipement from "./pages/Equipement.tsx";
import NosServicesEtSecteurs from "./pages/NosServicesEtSecteurs.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SeoManager />
        <Routes>
          <Route path={ROUTE_PATHS.HOME} element={<Index />} />
          <Route path={ROUTE_PATHS.TARIFS} element={<Tarifs />} />
          <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
          <Route path={ROUTE_PATHS.SERVICES} element={<Services />} />
          <Route path={ROUTE_PATHS.EQUIPEMENT} element={<Equipement />} />
          <Route path={ROUTE_PATHS.SECTEURS} element={<NosServicesEtSecteurs />} />
          <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
