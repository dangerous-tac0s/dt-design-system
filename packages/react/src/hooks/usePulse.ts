/**
 * Hook: toggles dt-animate-pulse CSS class based on enabled flag.
 */
import { useEffect } from 'react';

export function usePulse(
  ref: React.RefObject<HTMLElement | null>,
  enabled = false,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (enabled) {
      el.classList.add('dt-animate-pulse');
    } else {
      el.classList.remove('dt-animate-pulse');
    }

    return () => {
      el.classList.remove('dt-animate-pulse');
    };
  }, [ref, enabled]);
}
