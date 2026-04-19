import { useState, useEffect, useMemo, useRef } from "react"; // useMemo kept for initialServices
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SERVICES, COMBO_PRESETS, COMBO_DISCOUNT, COMBO_SERVICES } from "@/config/services";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/config/contact";
import { useQuote } from "@/hooks/useQuote";
import {
  EMPTY_CONTACT_FORM_DATA,
  clearContactDraft,
  loadContactDraft,
  saveContactDraft,
  type ContactFormData,
} from "@/lib/contactDraftStorage";
import { toast } from "@/components/ui/use-toast";

const serviceOptions = SERVICES;
const emailProviderDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com"];

type NominatimAddress = {
  house_number?: string;
  road?: string;
  pedestrian?: string;
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  hamlet?: string;
  county?: string;
  state?: string;
  postcode?: string;
};

type NominatimResult = {
  place_id: number;
  display_name: string;
  address?: NominatimAddress;
};

type AddressSuggestion = {
  id: number;
  label: string;
};

type FormErrors = {
  name: boolean;
  address: boolean;
  services: boolean;
  contact: boolean;
};

const resolveCity = (address?: NominatimAddress) =>
  address?.city ||
  address?.town ||
  address?.village ||
  address?.municipality ||
  address?.hamlet ||
  address?.county ||
  "";

const formatCompactAddress = (item: NominatimResult) => {
  const city = resolveCity(item.address);
  const line1 = [item.address?.house_number, item.address?.road || item.address?.pedestrian]
    .filter(Boolean)
    .join(" ");
  const line2 = [city, item.address?.state, item.address?.postcode].filter(Boolean).join(", ");
  const compact = [line1, line2].filter(Boolean).join(", ");
  return compact || item.display_name;
};

const Contact = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const initialServices = useMemo(() => {
    const combo = searchParams.get("combo");
    if (combo && COMBO_PRESETS[combo]) return COMBO_PRESETS[combo];
    const single = searchParams.get("service");
    return single ? [single] : [];
  }, [searchParams]);
  const hasServicePresetFromQuery = useMemo(
    () => searchParams.has("combo") || searchParams.has("service"),
    [searchParams],
  );
  const persistedDraft = useMemo(
    () => loadContactDraft(serviceOptions.map((service) => service.id)),
    [],
  );

  const [formData, setFormData] = useState<ContactFormData>(persistedDraft.formData);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    hasServicePresetFromQuery ? initialServices : persistedDraft.selectedServices,
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: false,
    address: false,
    services: false,
    contact: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressLookupFailed, setAddressLookupFailed] = useState(false);
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const closeAddressDropdownTimeoutRef = useRef<number | null>(null);
  const skipAddressLookupRef = useRef(false);

  useEffect(() => {
    if (hasServicePresetFromQuery) {
      setSelectedServices(initialServices);
    }
  }, [hasServicePresetFromQuery, initialServices]);

  useEffect(() => {
    saveContactDraft({
      formData,
      selectedServices,
    });
  }, [formData, selectedServices]);

  useEffect(() => {
    const query = formData.address.trim();

    if (skipAddressLookupRef.current) {
      skipAddressLookupRef.current = false;
      return;
    }

    if (!isAddressFocused || query.length < 3) {
      setAddressSuggestions([]);
      setAddressLookupFailed(false);
      setIsAddressLoading(false);
      if (query.length < 3) setIsAddressDropdownOpen(false);
      return;
    }

    setIsAddressLoading(true);
    setAddressLookupFailed(false);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          format: "jsonv2",
          addressdetails: "1",
          limit: "5",
          countrycodes: "ca",
          q: query,
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
              "Accept-Language": "fr-CA,fr;q=0.9,en;q=0.7",
            },
          },
        );

        if (!response.ok) throw new Error("Address lookup failed");

        const data = (await response.json()) as NominatimResult[];
        const nextSuggestions = data.slice(0, 5).map((item) => ({
          id: item.place_id,
          label: formatCompactAddress(item),
        }));

        setAddressSuggestions(nextSuggestions);
        setIsAddressDropdownOpen(true);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Address lookup failed", error);
        setAddressSuggestions([]);
        setAddressLookupFailed(true);
        setIsAddressDropdownOpen(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsAddressLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [formData.address, isAddressFocused]);

  useEffect(
    () => () => {
      if (closeAddressDropdownTimeoutRef.current !== null) {
        window.clearTimeout(closeAddressDropdownTimeoutRef.current);
      }
    },
    [],
  );

  const toggleService = (value: string) => {
    setSelectedServices((prev) => {
      const next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      if (formErrors.services && next.length > 0) {
        setFormErrors((current) => ({ ...current, services: false }));
      }
      return next;
    });
  };

  const quote = useQuote(selectedServices);
  const prefersReducedMotion = useReducedMotion();
  const selectedComboCount = COMBO_SERVICES.filter((id) => selectedServices.includes(id)).length;
  const missingComboService =
    selectedComboCount === 1
      ? serviceOptions.find((service) => COMBO_SERVICES.includes(service.id) && !selectedServices.includes(service.id))
      : null;
  const emailSuggestionDomains = useMemo(() => {
    const value = formData.email.trim().toLowerCase();
    const atIndex = value.indexOf("@");

    if (atIndex <= 0) return [];
    if (value.indexOf("@", atIndex + 1) !== -1) return [];

    const domainPart = value.slice(atIndex + 1);
    if (domainPart.includes(".")) return [];

    return emailProviderDomains
      .filter((domain) => !domainPart || domain.startsWith(domainPart))
      .slice(0, 5);
  }, [formData.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {
      name: !formData.name.trim(),
      address: !formData.address.trim(),
      services: selectedServices.length === 0,
      contact: !formData.email.trim() && !formData.phone.trim(),
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setFormErrors(nextErrors);
      return;
    }

    setFormErrors({
      name: false,
      address: false,
      services: false,
      contact: false,
    });
    setIsSubmitting(true);

    const serviceWanted =
      quote.selected.length > 0
        ? quote.selected.map((service) => service.label).join(", ")
        : "";
    const estimatedTotal = !quote.needsEstimate && quote.numericItems.length > 0 ? quote.total : null;

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          serviceWanted,
          estimatedTotal,
          message: formData.message,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Submission failed");
      }

      toast({
        title: "Demande envoyée",
        description: "Nous vous répondrons rapidement.",
        className: "border-sky-200 bg-sky-50 text-sky-900",
      });

      setFormData(EMPTY_CONTACT_FORM_DATA);
      setSelectedServices([]);
      clearContactDraft();
    } catch (error) {
      console.error("Contact submission failed", error);
      toast({
        title: "Service temporairement indisponible",
        description: `Le service n'est pas disponible pour le moment. Veuillez nous appeler au ${CONTACT_PHONE_DISPLAY}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="vp-container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                Contact
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                Demandez votre soumission
              </h1>
              <p className="text-muted-foreground text-[15px] max-w-md">
                Remplissez le formulaire et nous vous répondons rapidement. Service résidentiel et commercial à Montréal, Laval, Longueuil, Sainte-Julie et la Rive-Sud.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Row 1: Nom + Courriel */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name && e.target.value.trim()) {
                        setFormErrors((current) => ({ ...current, name: false }));
                      }
                    }}
                    className={`${inputClass} ${formErrors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="Jean Tremblay"
                  />
                </div>
                <div className="relative">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Courriel
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formErrors.contact && (e.target.value.trim() || formData.phone.trim())) {
                        setFormErrors((current) => ({ ...current, contact: false }));
                      }
                    }}
                    className={`${inputClass} ${formErrors.contact ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="votre@courriel.com"
                    autoComplete="email"
                  />
                  {isEmailFocused && emailSuggestionDomains.length > 0 && (
                    <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-background shadow-[var(--vp-shadow-card)] overflow-hidden">
                      <ul className="py-1">
                        {emailSuggestionDomains.map((domain) => (
                          <li key={domain}>
                            <button
                              type="button"
                              onPointerDown={(e) => e.preventDefault()}
                              onClick={() => {
                                const [localPart] = formData.email.split("@");
                                if (!localPart) return;
                                const nextEmail = `${localPart}@${domain}`;
                                setFormData((prev) => ({ ...prev, email: nextEmail }));
                                if (formErrors.contact && (nextEmail.trim() || formData.phone.trim())) {
                                  setFormErrors((current) => ({ ...current, contact: false }));
                                }
                              }}
                              className="w-full text-left px-3 py-2.5 text-sm text-foreground/85 hover:bg-muted/40 transition-colors"
                              aria-label={`Completer avec ${domain}`}
                            >
                              @{domain}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Adresse + Téléphone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onFocus={() => {
                      if (closeAddressDropdownTimeoutRef.current !== null) {
                        window.clearTimeout(closeAddressDropdownTimeoutRef.current);
                      }
                      setIsAddressFocused(true);
                      if (
                        formData.address.trim().length >= 3 &&
                        (addressSuggestions.length > 0 || isAddressLoading || addressLookupFailed)
                      ) {
                        setIsAddressDropdownOpen(true);
                      }
                    }}
                    onBlur={() => {
                      setIsAddressFocused(false);
                      closeAddressDropdownTimeoutRef.current = window.setTimeout(() => {
                        setIsAddressDropdownOpen(false);
                      }, 140);
                    }}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      if (formErrors.address && e.target.value.trim()) {
                        setFormErrors((current) => ({ ...current, address: false }));
                      }
                      setAddressLookupFailed(false);
                      if (e.target.value.trim().length >= 3) {
                        setIsAddressDropdownOpen(true);
                      } else {
                        setAddressSuggestions([]);
                        setIsAddressDropdownOpen(false);
                      }
                    }}
                    className={`${inputClass} ${formErrors.address ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="123 rue Exemple, Montréal"
                    autoComplete="street-address"
                  />
                  {isAddressDropdownOpen && formData.address.trim().length >= 3 && (
                    <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-background shadow-[var(--vp-shadow-card)] overflow-hidden">
                      {isAddressLoading ? (
                        <p className="px-3 py-2.5 text-xs text-muted-foreground">Recherche d'adresse...</p>
                      ) : addressLookupFailed ? (
                        <p className="px-3 py-2.5 text-xs text-muted-foreground">
                          Suggestions temporairement indisponibles.
                        </p>
                      ) : addressSuggestions.length > 0 ? (
                        <ul className="max-h-56 overflow-auto py-1">
                          {addressSuggestions.map((suggestion) => (
                            <li key={suggestion.id}>
                              <button
                                type="button"
                                onPointerDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  skipAddressLookupRef.current = true;
                                  setFormData((prev) => ({ ...prev, address: suggestion.label }));
                                  setAddressSuggestions([]);
                                  setAddressLookupFailed(false);
                                  setIsAddressDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm text-foreground/85 hover:bg-muted/40 transition-colors"
                              >
                                {suggestion.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="px-3 py-2.5 text-xs text-muted-foreground">
                          Aucune adresse trouvée.
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (formErrors.contact && (e.target.value.trim() || formData.email.trim())) {
                        setFormErrors((current) => ({ ...current, contact: false }));
                      }
                    }}
                    className={`${inputClass} ${formErrors.contact ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="438-000-0000"
                  />
                </div>
              </div>

              <AnimatePresence>
                {Object.values(formErrors).some(Boolean) && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-destructive font-medium"
                  >
                    Veuillez remplir les champs obligatoires: nom, adresse, service souhaité, et au moins un moyen de contact (courriel ou téléphone).
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Multi-select services */}
              <div className="pt-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                  Services souhaités
                </label>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${formErrors.services ? "rounded-xl border border-destructive/60 p-2" : ""}`}>
                  {serviceOptions.map((opt) => {
                    const active = selectedServices.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleService(opt.id)}
                        className={`group flex w-full items-center gap-2 h-11 pl-4 pr-4 rounded-full text-sm font-medium border transition-all duration-200 ${
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-[var(--vp-shadow-soft)]"
                            : "bg-background text-foreground border-border hover:border-primary/50 hover:text-primary"
                        }`}
                        aria-pressed={active}
                      >
                        <span
                          className={`flex items-center justify-center h-4 w-4 rounded-full border transition-colors ${
                            active
                              ? "bg-primary-foreground border-primary-foreground text-primary"
                              : "border-border group-hover:border-primary/60"
                          }`}
                        >
                          {active && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {selectedComboCount === 1 && missingComboService && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-primary/35 bg-primary/5 px-3 py-2 text-xs sm:text-sm">
                        {!prefersReducedMotion && (
                          <motion.span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--primary)/0.22),transparent_70%)]"
                            animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.04, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        <div className="relative z-10 flex flex-wrap items-center gap-2">
                          <p className="text-foreground/85">
                            Économisez <span className="font-semibold text-primary">{COMBO_DISCOUNT} $</span> en ajoutant{" "}
                            <span className="font-semibold">{missingComboService.label}</span>.
                          </p>
                          <button
                            type="button"
                            onClick={() => toggleService(missingComboService.id)}
                            className="rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-primary hover:border-primary/60 hover:bg-background transition-colors"
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Live quote */}
              <AnimatePresence>
                {quote.selected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-border bg-muted/30 p-5 md:p-6">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-4">
                        Estimation
                      </p>

                      <ul className="space-y-2.5 mb-4">
                        {quote.selected.map((s) => (
                          <li
                            key={s.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-foreground/85">{s.label}</span>
                            <span className="font-semibold text-foreground tabular-nums">
                              {s.price !== null ? `${s.price} $` : "Sur estimation"}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {quote.hasCombo && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-between text-sm pt-3 border-t border-border/60 mb-3"
                        >
                          <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 64 64"
                              xmlSpace="preserve"
                              className="h-4 w-4 shrink-0"
                              aria-hidden="true"
                            >
                              <g>
                                <path
                                  d="M57.274 6.725c-1.356-1.356-3.366-1.556-5.228-1.09-1.862.465-3.742 1.575-5.378 3.212s-2.747 3.515-3.213 5.378c-.465 1.862-.265 3.872 1.091 5.228a1.5 1.5 0 1 0 2.122-2.121c-.401-.401-.605-1.17-.303-2.38.019-.073.057-.155.079-.23l1.345.072c.777.042 1.375.64 1.417 1.417l.841 15.422c.023.426-.136.84-.438 1.142L27.222 55.162a1.478 1.478 0 0 1-2.121 0L8.838 38.9a1.478 1.478 0 0 1 0-2.122L31.225 14.39a1.498 1.498 0 0 1 1.142-.438l7.945.436a1.5 1.5 0 1 0 .163-2.997l-7.944-.434a4.505 4.505 0 0 0-3.428 1.312L6.716 34.656c-1.745 1.745-1.745 4.62 0 6.364L22.98 57.284c1.744 1.744 4.619 1.744 6.364 0L51.73 34.896a4.505 4.505 0 0 0 1.312-3.427l-.841-15.423a4.49 4.49 0 0 0-1.316-2.932 4.49 4.49 0 0 0-2.841-1.302c.23-.286.47-.57.744-.844 1.293-1.292 2.775-2.122 3.984-2.424 1.21-.302 1.979-.098 2.38.303.351.351.548.956.39 1.946-.157.989-.706 2.245-1.637 3.433a1.5 1.5 0 1 0 2.36 1.852c1.198-1.529 1.98-3.185 2.24-4.814.26-1.63-.043-3.35-1.232-4.539z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth={0.65}
                                />
                              </g>
                            </svg>
                            Rabais
                          </span>
                          <span className="font-semibold text-primary tabular-nums">
                            −{COMBO_DISCOUNT} $
                          </span>
                        </motion.div>
                      )}

                      {quote.numericItems.length > 0 && (
                        <div className="flex items-baseline justify-between pt-3 border-t border-border/60">
                          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            Total estimé
                          </span>
                          <div className="flex items-baseline gap-2">
                            {quote.hasCombo && (
                              <span className="text-sm text-muted-foreground line-through tabular-nums">
                                {quote.subtotal} $
                              </span>
                            )}
                            <span className="text-2xl font-extrabold text-foreground tabular-nums">
                              {quote.total} $
                            </span>
                          </div>
                        </div>
                      )}
{/* 
                      {quote.hasCombo && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 text-xs font-medium text-primary"
                        >
                          Félicitations, vous économisez {COMBO_DISCOUNT} $ avec le combo favori.
                        </motion.p>
                      )} */}

                      {quote.needsEstimate && (
                        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                          Estimation personnalisée requise pour les services commerciaux ou personnalisés. Nous vous contacterons rapidement.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  Message <span className="text-muted-foreground/60 normal-case tracking-normal">(optionnel)</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Décrivez vos besoins (nombre de sorties, type de domicile, etc.)"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi..." : "Envoyer la demande"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 pt-10 border-t border-border/60"
            >
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="hover:text-foreground transition-colors">
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground transition-colors">
                  {CONTACT_EMAIL}
                </a>
                <span>Sainte-Julie, Québec</span>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
