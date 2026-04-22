import { useMemo, useState } from "react";
import type { ContactFormData } from "@/lib/contactDraftStorage";
import type { AddressSuggestion, FormErrors } from "@/components/contact/useContactForm";

const EMAIL_PROVIDER_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
];

const INPUT_CLASS =
  "w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200";

type ContactFormFieldsBlockProps = {
  formData: ContactFormData;
  formErrors: FormErrors;
  addressSuggestions: AddressSuggestion[];
  isAddressLoading: boolean;
  addressLookupFailed: boolean;
  isAddressDropdownOpen: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAddressFocus: () => void;
  onAddressBlur: () => void;
  onAddressSuggestionSelect: (value: string) => void;
};

export function ContactFormFieldsBlock({
  formData,
  formErrors,
  addressSuggestions,
  isAddressLoading,
  addressLookupFailed,
  isAddressDropdownOpen,
  onNameChange,
  onEmailChange,
  onAddressChange,
  onPhoneChange,
  onAddressFocus,
  onAddressBlur,
  onAddressSuggestionSelect,
}: ContactFormFieldsBlockProps) {
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const emailSuggestionDomains = useMemo(() => {
    const value = formData.email.trim().toLowerCase();
    const atIndex = value.indexOf("@");

    if (atIndex <= 0) return [];
    if (value.indexOf("@", atIndex + 1) !== -1) return [];

    const domainPart = value.slice(atIndex + 1);
    if (domainPart.includes(".")) return [];

    return EMAIL_PROVIDER_DOMAINS
      .filter((domain) => !domainPart || domain.startsWith(domainPart))
      .slice(0, 5);
  }, [formData.email]);

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Nom complet
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(event) => onNameChange(event.target.value)}
            className={`${INPUT_CLASS} ${formErrors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
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
            onChange={(event) => onEmailChange(event.target.value)}
            className={`${INPUT_CLASS} ${formErrors.contact ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
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
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={() => {
                        const [localPart] = formData.email.split("@");
                        if (!localPart) return;
                        onEmailChange(`${localPart}@${domain}`);
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

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="relative">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Adresse
          </label>
          <input
            type="text"
            value={formData.address}
            onFocus={onAddressFocus}
            onBlur={onAddressBlur}
            onChange={(event) => onAddressChange(event.target.value)}
            className={`${INPUT_CLASS} ${formErrors.address ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
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
                        onPointerDown={(event) => event.preventDefault()}
                        onClick={() => onAddressSuggestionSelect(suggestion.label)}
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
            onChange={(event) => onPhoneChange(event.target.value)}
            className={`${INPUT_CLASS} ${formErrors.contact ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
            placeholder="438-000-0000"
          />
        </div>
      </div>
    </>
  );
}
