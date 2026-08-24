import { useEffect, useState } from "react";

/**
 * True when the viewport is at least `px` wide.
 *
 * Starts false so the server-less first paint renders the fallback layout
 * rather than a fanned shelf that has not been measured yet.
 */
export function useMinWidth(px: number): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${px}px)`);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [px]);

  return matches;
}
