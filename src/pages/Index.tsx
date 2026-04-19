import { useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";

import { GallerySection } from "@/components/home/GallerySection";
import { BestSellerCombo } from "@/components/home/BestSellerCombo";
import { EquipmentShowcase } from "@/components/home/EquipmentShowcase";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactMapSection } from "@/components/home/ContactMapSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const Index = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main>
          <HeroSection />
          <ServicesSection />
          <BestSellerCombo />
          <GallerySection />
          <EquipmentShowcase />
          <FAQSection />
          <ContactMapSection />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
