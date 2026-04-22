import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactFormFieldsBlock } from "@/components/contact/ContactFormFieldsBlock";
import { ContactServicesQuoteBlock } from "@/components/contact/ContactServicesQuoteBlock";
import { ContactBottomDetails } from "@/components/contact/ContactBottomDetails";
import { useContactForm } from "@/components/contact/useContactForm";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ROUTE_PATHS } from "@/consts/navigation";

const Contact = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    formData,
    formErrors,
    selectedServices,
    isSubmitting,
    quote,
    hasFormErrors,
    addressSuggestions,
    isAddressLoading,
    addressLookupFailed,
    isAddressDropdownOpen,
    handleNameChange,
    handleEmailChange,
    handleAddressChange,
    handlePhoneChange,
    handleMessageChange,
    handleAddressFocus,
    handleAddressBlur,
    handleAddressSuggestionSelect,
    toggleService,
    handleSubmit,
  } = useContactForm({ searchParams });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="vp-container max-w-2xl">
            <Breadcrumb
              className="mb-6"
              items={[
                { label: "Accueil", to: ROUTE_PATHS.HOME },
                { label: "Contact" },
              ]}
            />
            <ContactHeroSection />

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <ContactFormFieldsBlock
                formData={formData}
                formErrors={formErrors}
                addressSuggestions={addressSuggestions}
                isAddressLoading={isAddressLoading}
                addressLookupFailed={addressLookupFailed}
                isAddressDropdownOpen={isAddressDropdownOpen}
                onNameChange={handleNameChange}
                onEmailChange={handleEmailChange}
                onAddressChange={handleAddressChange}
                onPhoneChange={handlePhoneChange}
                onAddressFocus={handleAddressFocus}
                onAddressBlur={handleAddressBlur}
                onAddressSuggestionSelect={handleAddressSuggestionSelect}
              />

              <AnimatePresence>
                {hasFormErrors && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-destructive font-medium"
                  >
                    Veuillez remplir les champs obligatoires: nom, adresse, service souhaité, et
                    au moins un moyen de contact (courriel ou téléphone).
                  </motion.p>
                )}
              </AnimatePresence>

              <ContactServicesQuoteBlock
                selectedServices={selectedServices}
                hasServicesError={formErrors.services}
                quote={quote}
                onToggleService={toggleService}
              />

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  Message{" "}
                  <span className="text-muted-foreground/60 normal-case tracking-normal">
                    (optionnel)
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(event) => handleMessageChange(event.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Décrivez vos besoins (nombre de sorties, type de domicile, etc.)"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi..." : "Envoyer la demande"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.form>

            <ContactBottomDetails />
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
