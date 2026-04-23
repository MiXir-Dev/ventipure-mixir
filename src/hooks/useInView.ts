import { useEffect, useRef, useState } from "react";

export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
};