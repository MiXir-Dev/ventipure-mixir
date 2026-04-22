import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { COMBO_PRESETS, SERVICES } from "@/consts/services";
import { useQuote, type Quote } from "@/hooks/useQuote";
import {
  EMPTY_CONTACT_FORM_DATA,
  clearContactDraft,
  loadContactDraft,
  saveContactDraft,
  type ContactFormData,
} from "@/lib/contactDraftStorage";
import {
  useAddressAutocomplete,
  type AddressSuggestion,
} from "@/components/contact/useAddressAutocomplete";
import { useContactSubmit } from "@/components/contact/useContactSubmit";

const SERVICE_OPTIONS = SERVICES;

type FormErrors = {
  name: boolean;
  address: boolean;
  services: boolean;
  contact: boolean;
};

type UseContactFormParams = {
  searchParams: URLSearchParams;
};

type UseContactFormResult = {
  formData: ContactFormData;
  formErrors: FormErrors;
  selectedServices: string[];
  isSubmitting: boolean;
  quote: Quote;
  hasFormErrors: boolean;
  addressSuggestions: AddressSuggestion[];
  isAddressLoading: boolean;
  addressLookupFailed: boolean;
  isAddressDropdownOpen: boolean;
  handleNameChange: (value: string) => void;
  handleEmailChange: (value: string) => void;
  handleAddressChange: (value: string) => void;
  handlePhoneChange: (value: string) => void;
  handleMessageChange: (value: string) => void;
  handleAddressFocus: () => void;
  handleAddressBlur: () => void;
  handleAddressSuggestionSelect: (label: string) => void;
  toggleService: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

const INITIAL_FORM_ERRORS: FormErrors = {
  name: false,
  address: false,
  services: false,
  contact: false,
};

const validateForm = (formData: ContactFormData, selectedServices: string[]): FormErrors => ({
  name: !formData.name.trim(),
  address: !formData.address.trim(),
  services: selectedServices.length === 0,
  contact: !formData.email.trim() && !formData.phone.trim(),
});

export const useContactForm = ({ searchParams }: UseContactFormParams): UseContactFormResult => {
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
    () => loadContactDraft(SERVICE_OPTIONS.map((service) => service.id)),
    [],
  );

  const [formData, setFormData] = useState<ContactFormData>(persistedDraft.formData);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    hasServicePresetFromQuery ? initialServices : persistedDraft.selectedServices,
  );
  const [formErrors, setFormErrors] = useState<FormErrors>(INITIAL_FORM_ERRORS);

  const quote = useQuote(selectedServices);

  useEffect(() => {
    if (hasServicePresetFromQuery) {
      setSelectedServices(initialServices);
    }
  }, [hasServicePresetFromQuery, initialServices]);

  useEffect(() => {
    saveContactDraft({ formData, selectedServices });
  }, [formData, selectedServices]);

  const resetForm = useCallback(() => {
    setFormData(EMPTY_CONTACT_FORM_DATA);
    setSelectedServices([]);
    clearContactDraft();
  }, []);

  const { isSubmitting, submitContact } = useContactSubmit({ onSuccess: resetForm });

  const setAddressFromSuggestion = useCallback((value: string) => {
    setFormData((previous) => ({ ...previous, address: value }));
  }, []);

  const {
    addressSuggestions,
    isAddressLoading,
    addressLookupFailed,
    isAddressDropdownOpen,
    handleAddressFocus,
    handleAddressBlur,
    handleAddressInputChange,
    handleAddressSuggestionSelect,
  } = useAddressAutocomplete({
    address: formData.address,
    onSuggestionSelect: setAddressFromSuggestion,
  });

  const handleNameChange = (value: string) => {
    setFormData((previous) => ({ ...previous, name: value }));
    if (formErrors.name && value.trim()) {
      setFormErrors((current) => ({ ...current, name: false }));
    }
  };

  const handleEmailChange = (value: string) => {
    setFormData((previous) => ({ ...previous, email: value }));
    if (formErrors.contact && (value.trim() || formData.phone.trim())) {
      setFormErrors((current) => ({ ...current, contact: false }));
    }
  };

  const handleAddressChange = (value: string) => {
    setFormData((previous) => ({ ...previous, address: value }));
    handleAddressInputChange(value);

    if (formErrors.address && value.trim()) {
      setFormErrors((current) => ({ ...current, address: false }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((previous) => ({ ...previous, phone: value }));
    if (formErrors.contact && (value.trim() || formData.email.trim())) {
      setFormErrors((current) => ({ ...current, contact: false }));
    }
  };

  const handleMessageChange = (value: string) => {
    setFormData((previous) => ({ ...previous, message: value }));
  };

  const toggleService = (value: string) => {
    setSelectedServices((previous) => {
      const next = previous.includes(value)
        ? previous.filter((selectedValue) => selectedValue !== value)
        : [...previous, value];

      if (formErrors.services && next.length > 0) {
        setFormErrors((current) => ({ ...current, services: false }));
      }

      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formData, selectedServices);
    if (Object.values(nextErrors).some(Boolean)) {
      setFormErrors(nextErrors);
      return;
    }

    setFormErrors(INITIAL_FORM_ERRORS);
    await submitContact({ formData, quote });
  };

  return {
    formData,
    formErrors,
    selectedServices,
    isSubmitting,
    quote,
    hasFormErrors: Object.values(formErrors).some(Boolean),
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
  };
};

export type { AddressSuggestion, FormErrors };
