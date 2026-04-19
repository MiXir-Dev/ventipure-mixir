export type ContactFormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
  message: string;
};

export type ContactDraft = {
  formData: ContactFormData;
  selectedServices: string[];
};

const CONTACT_DRAFT_STORAGE_KEY = "ventipure_contact_draft_v1";

export const EMPTY_CONTACT_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  address: "",
  phone: "",
  message: "",
};

const isBrowser = () => typeof window !== "undefined";

const asString = (value: unknown, max = 1000) =>
  typeof value === "string" ? value.slice(0, max) : "";

const sanitizeFormData = (value: unknown): ContactFormData => {
  if (!value || typeof value !== "object") {
    return EMPTY_CONTACT_FORM_DATA;
  }

  const data = value as Partial<ContactFormData>;
  return {
    name: asString(data.name, 200),
    email: asString(data.email, 200),
    address: asString(data.address, 500),
    phone: asString(data.phone, 120),
    message: asString(data.message, 2000),
  };
};

const sanitizeSelectedServices = (value: unknown, allowedServiceIds: string[]) => {
  if (!Array.isArray(value)) return [];

  const allowedSet = new Set(allowedServiceIds);
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => allowedSet.has(entry))
    .filter((entry, index, arr) => arr.indexOf(entry) === index);
};

const isDraftEmpty = (draft: ContactDraft) => {
  const { formData, selectedServices } = draft;
  return (
    !formData.name.trim() &&
    !formData.email.trim() &&
    !formData.address.trim() &&
    !formData.phone.trim() &&
    !formData.message.trim() &&
    selectedServices.length === 0
  );
};

export const loadContactDraft = (allowedServiceIds: string[]): ContactDraft => {
  if (!isBrowser()) {
    return { formData: EMPTY_CONTACT_FORM_DATA, selectedServices: [] };
  }

  try {
    const raw = window.localStorage.getItem(CONTACT_DRAFT_STORAGE_KEY);
    if (!raw) {
      return { formData: EMPTY_CONTACT_FORM_DATA, selectedServices: [] };
    }

    const parsed = JSON.parse(raw) as {
      formData?: unknown;
      selectedServices?: unknown;
    };

    return {
      formData: sanitizeFormData(parsed.formData),
      selectedServices: sanitizeSelectedServices(parsed.selectedServices, allowedServiceIds),
    };
  } catch {
    return { formData: EMPTY_CONTACT_FORM_DATA, selectedServices: [] };
  }
};

export const saveContactDraft = (draft: ContactDraft) => {
  if (!isBrowser()) return;

  try {
    if (isDraftEmpty(draft)) {
      window.localStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(CONTACT_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore localStorage write errors (privacy mode/quota).
  }
};

export const clearContactDraft = () => {
  if (!isBrowser()) return;

  try {
    window.localStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY);
  } catch {
    // Ignore localStorage removal errors.
  }
};
