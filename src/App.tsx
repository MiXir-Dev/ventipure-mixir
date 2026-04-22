import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SeoManager } from "@/components/SeoManager";
import { ROUTE_PATHS } from "@/consts/navigation.ts";
import Index from "./pages/Index.tsx";

const Services = lazy(() => import("./pages/Services.tsx"));
const Tarifs = lazy(() => import("./pages/Tarifs.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Equipement = lazy(() => import("./pages/Equipement.tsx"));
const NosServicesEtSecteurs = lazy(() => import("./pages/NosServicesEtSecteurs.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const PolitiqueDeConfidentialite = lazy(() => import("./pages/PolitiqueDeConfidentialite.tsx"));
const ModalitesDutilisation = lazy(() => import("./pages/ModalitesDutilisation.tsx"));
const ServiceConduitsPage = lazy(
  () => import("./pages/services/NettoyageConduitsFournaisePage.tsx"),
);
const ServiceSecheusePage = lazy(
  () => import("./pages/services/NettoyageConduitSecheusePage.tsx"),
);
const ServiceEchangeurPage = lazy(
  () => import("./pages/services/NettoyageEchangeurAirPage.tsx"),
);
const ServiceClimatiseurPage = lazy(
  () => import("./pages/services/NettoyageClimatiseurMuralPage.tsx"),
);
const ServiceCommerciauxPage = lazy(
  () => import("./pages/services/NettoyageConduitsCommerciauxPage.tsx"),
);
const MontrealPage = lazy(() => import("./pages/locations/MontrealPage.tsx"));
const LavalPage = lazy(() => import("./pages/locations/LavalPage.tsx"));
const LongueuilPage = lazy(() => import("./pages/locations/LongueuilPage.tsx"));
const RepentignyPage = lazy(() => import("./pages/locations/RepentignyPage.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MotionConfig reducedMotion="user">
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <SeoManager />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<Index />} />
            <Route path={ROUTE_PATHS.SERVICES} element={<Services />} />
            <Route path={ROUTE_PATHS.SERVICES_CONDUITS} element={<ServiceConduitsPage />} />
            <Route path={ROUTE_PATHS.SERVICES_SECHEUSE} element={<ServiceSecheusePage />} />
            <Route path={ROUTE_PATHS.SERVICES_ECHANGEUR} element={<ServiceEchangeurPage />} />
            <Route path={ROUTE_PATHS.SERVICES_CLIMATISEUR} element={<ServiceClimatiseurPage />} />
            <Route path={ROUTE_PATHS.SERVICES_COMMERCIAUX} element={<ServiceCommerciauxPage />} />
            <Route path={ROUTE_PATHS.TARIFS} element={<Tarifs />} />
            <Route path={ROUTE_PATHS.EQUIPEMENT} element={<Equipement />} />
            <Route path={ROUTE_PATHS.SECTEURS} element={<NosServicesEtSecteurs />} />
            <Route path={ROUTE_PATHS.MONTREAL} element={<MontrealPage />} />
            <Route path={ROUTE_PATHS.LAVAL} element={<LavalPage />} />
            <Route path={ROUTE_PATHS.LONGUEUIL} element={<LongueuilPage />} />
            <Route path={ROUTE_PATHS.REPENTIGNY} element={<RepentignyPage />} />
            <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
            <Route
              path={ROUTE_PATHS.POLITIQUE_CONFIDENTIALITE}
              element={<PolitiqueDeConfidentialite />}
            />
            <Route
              path={ROUTE_PATHS.MODALITES_UTILISATION}
              element={<ModalitesDutilisation />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MotionConfig>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
