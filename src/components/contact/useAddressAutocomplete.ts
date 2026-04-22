import { useEffect, useRef, useState } from "react";

const ADDRESS_LOOKUP_MIN_LENGTH = 3;

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

export type AddressSuggestion = {
  id: number;
  label: string;
};

type UseAddressAutocompleteParams = {
  address: string;
  onSuggestionSelect: (value: string) => void;
};

type UseAddressAutocompleteResult = {
  addressSuggestions: AddressSuggestion[];
  isAddressLoading: boolean;
  addressLookupFailed: boolean;
  isAddressDropdownOpen: boolean;
  handleAddressFocus: () => void;
  handleAddressBlur: () => void;
  handleAddressInputChange: (nextValue: string) => void;
  handleAddressSuggestionSelect: (value: string) => void;
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

export const useAddressAutocomplete = ({
  address,
  onSuggestionSelect,
}: UseAddressAutocompleteParams): UseAddressAutocompleteResult => {
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressLookupFailed, setAddressLookupFailed] = useState(false);
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);

  const closeAddressDropdownTimeoutRef = useRef<number | null>(null);
  const skipAddressLookupRef = useRef(false);

  useEffect(() => {
    const query = address.trim();

    if (skipAddressLookupRef.current) {
      skipAddressLookupRef.current = false;
      return;
    }

    if (!isAddressFocused || query.length < ADDRESS_LOOKUP_MIN_LENGTH) {
      setAddressSuggestions([]);
      setAddressLookupFailed(false);
      setIsAddressLoading(false);
      if (query.length < ADDRESS_LOOKUP_MIN_LENGTH) {
        setIsAddressDropdownOpen(false);
      }
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

        if (!response.ok) {
          throw new Error("Address lookup failed");
        }

        const data = (await response.json()) as NominatimResult[];
        const nextSuggestions = data.slice(0, 5).map((item) => ({
          id: item.place_id,
          label: formatCompactAddress(item),
        }));

        setAddressSuggestions(nextSuggestions);
        setIsAddressDropdownOpen(true);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

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
  }, [address, isAddressFocused]);

  useEffect(
    () => () => {
      if (closeAddressDropdownTimeoutRef.current !== null) {
        window.clearTimeout(closeAddressDropdownTimeoutRef.current);
      }
    },
    [],
  );

  const handleAddressFocus = () => {
    if (closeAddressDropdownTimeoutRef.current !== null) {
      window.clearTimeout(closeAddressDropdownTimeoutRef.current);
    }

    setIsAddressFocused(true);

    if (
      address.trim().length >= ADDRESS_LOOKUP_MIN_LENGTH &&
      (addressSuggestions.length > 0 || isAddressLoading || addressLookupFailed)
    ) {
      setIsAddressDropdownOpen(true);
    }
  };

  const handleAddressBlur = () => {
    setIsAddressFocused(false);
    closeAddressDropdownTimeoutRef.current = window.setTimeout(() => {
      setIsAddressDropdownOpen(false);
    }, 140);
  };

  const handleAddressInputChange = (nextValue: string) => {
    setAddressLookupFailed(false);

    if (nextValue.trim().length >= ADDRESS_LOOKUP_MIN_LENGTH) {
      setIsAddressDropdownOpen(true);
      return;
    }

    setAddressSuggestions([]);
    setIsAddressDropdownOpen(false);
  };

  const handleAddressSuggestionSelect = (value: string) => {
    skipAddressLookupRef.current = true;
    onSuggestionSelect(value);
    setAddressSuggestions([]);
    setAddressLookupFailed(false);
    setIsAddressDropdownOpen(false);
  };

  return {
    addressSuggestions,
    isAddressLoading,
    addressLookupFailed,
    isAddressDropdownOpen,
    handleAddressFocus,
    handleAddressBlur,
    handleAddressInputChange,
    handleAddressSuggestionSelect,
  };
};
