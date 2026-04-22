import { useEffect, useState } from "react";

const SM_PX = 640;

/**
 * `true` when viewport is at least Tailwind `sm` (640px). Used to hide
 * list/cards choice on phones — cards are always list-like at that width.
 */
export function useMinWidthSm(): boolean {
  const [match, setMatch] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(min-width: ${SM_PX}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SM_PX}px)`);
    const onChange = () => setMatch(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return match;
}
