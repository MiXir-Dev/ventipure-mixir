import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Ensure route changes always reset scroll position, including query-string navigations.
    window.scrollTo(0, 0);
    const rafId = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname, search]);

  return null;
}
