import { useEffect, useRef, useState } from "react";

/**
 * True when we should skip the reveal entirely and render the content visible
 * from the start -- either the visitor asked for reduced motion, or the browser
 * has no IntersectionObserver to drive the reveal with.
 */
function shouldSkipReveal() {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Reveals an element once, the first time it scrolls into view.
 *
 * Returns [ref, isInView]. When the reveal is skipped, isInView starts true, so
 * content is never left stranded invisible.
 */
/**
 * threshold stays at 0 ("any part visible") on purpose. A fractional threshold
 * is unsafe here: an element taller than the viewport can never expose that
 * fraction of itself, so it would stay hidden forever. The certificate gallery
 * is ~7000px tall on a phone, which is exactly that case.
 * rootMargin instead delays the trigger slightly past the bottom edge.
 */
export default function useInView({ threshold = 0, rootMargin = "0px 0px -60px 0px" } = {}) {
  const ref = useRef(null);
  // Resolved during the initial render rather than in the effect, so the element
  // never renders hidden for a frame before being corrected.
  const [isInView, setIsInView] = useState(shouldSkipReveal);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Reveal is one-way -- stop observing so scrolling back up doesn't
            // re-trigger the animation.
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, isInView]);

  return [ref, isInView];
}
