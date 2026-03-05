/**
 * Hook: applies dt-animate-scale-in CSS class on mount.
 */
import { useEffect } from 'react';

export function useScaleIn(
  ref: React.RefObject<HTMLElement | null>,
  options?: { duration?: number; delay?: number },
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (options?.duration) {
      el.style.animationDuration = `${options.duration}ms`;
    }
    if (options?.delay) {
      el.style.animationDelay = `${options.delay}ms`;
    }

    el.classList.add('dt-animate-scale-in');

    return () => {
      el.classList.remove('dt-animate-scale-in');
      el.style.animationDuration = '';
      el.style.animationDelay = '';
    };
  }, [ref, options?.duration, options?.delay]);
}
