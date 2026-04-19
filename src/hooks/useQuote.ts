import { useMemo } from "react";
import {
  SERVICES,
  COMBO_DISCOUNT,
  COMBO_SERVICES,
  type ServiceItem,
} from "@/config/services";

export type Quote = {
  selected: ServiceItem[];
  numericItems: ServiceItem[];
  subtotal: number;
  discount: number;
  total: number;
  /** True when both Furnace + Dryer are selected (combo unlocks $20 off). */
  hasCombo: boolean;
  /** True when at least one selected service has no fixed price. */
  needsEstimate: boolean;
};

/**
 * Computes a live quote from a list of selected service IDs.
 * Combo rule: if BOTH "conduits" (furnace) AND "secheuse" (dryer) are
 * selected, apply a flat $20 discount on the subtotal.
 */
export function useQuote(selectedIds: string[]): Quote {
  return useMemo(() => {
    const selected = SERVICES.filter((s) => selectedIds.includes(s.id));
    const numericItems = selected.filter((s) => s.price !== null);
    const subtotal = numericItems.reduce((sum, s) => sum + (s.price ?? 0), 0);

    // Combo rule — only the furnace + dryer duo unlocks the discount.
    const hasCombo = COMBO_SERVICES.every((id) => selectedIds.includes(id));
    const discount = hasCombo ? COMBO_DISCOUNT : 0;

    const total = Math.max(0, subtotal - discount);
    const needsEstimate = selected.some((s) => s.price === null);

    return { selected, numericItems, subtotal, discount, total, hasCombo, needsEstimate };
  }, [selectedIds]);
}
