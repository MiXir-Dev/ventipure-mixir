import { useState } from "react";
import { CONTACT_PHONE_DISPLAY } from "@/consts/contact";
import { toast } from "@/components/ui/use-toast";
import type { ContactFormData } from "@/lib/contactDraftStorage";
import type { Quote } from "@/hooks/useQuote";

type SubmitContactParams = {
  formData: ContactFormData;
  quote: Quote;
};

type UseContactSubmitParams = {
  onSuccess: () => void;
};

type UseContactSubmitResult = {
  isSubmitting: boolean;
  submitContact: (params: SubmitContactParams) => Promise<void>;
};

export const useContactSubmit = ({ onSuccess }: UseContactSubmitParams): UseContactSubmitResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContact = async ({ formData, quote }: SubmitContactParams) => {
    setIsSubmitting(true);

    const serviceWanted =
      quote.selected.length > 0
        ? quote.selected.map((service) => service.label).join(", ")
        : "";
    const estimatedTotal =
      !quote.needsEstimate && quote.numericItems.length > 0 ? quote.total : null;

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

      if (!response.ok || !result?.success) throw new Error(result?.error || "Submission failed");

      toast({
        title: "Demande envoyée",
        description: "Nous vous répondrons rapidement.",
        className: "border-sky-200 bg-sky-50 text-sky-900",
      });

      onSuccess();
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

  return {
    isSubmitting,
    submitContact,
  };
};
