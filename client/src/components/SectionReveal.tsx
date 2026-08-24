/**
 * Paper Instrument visual system: the one scroll transition, used by every
 * section and by route changes (see App.tsx).
 *
 * A section starts oversized and tipped back, as though the page is still lifted
 * off the surface and closer to you, then settles to exactly 1:1 as you scroll it
 * into place — the moment a turning page lies flat. Three things move together:
 *
 *   scale     1.06 → 1     the "zoomed" start resolving to true size
 *   rotateX   7deg → 0     hinged at the top edge, which is what makes it read
 *                          as a page laying down rather than a slab sliding
 *   y         44px → 0     so the settle has somewhere to travel from
 *
 * `transformOrigin: 50% 0%` is the hinge, and it is the whole effect. Rotating
 * about the centre reads as a card flipping in space; rotating about the top edge
 * reads as paper. The perspective is per-element, so each section has its own
 * vanishing point and the tilt looks the same wherever it is on screen.
 *
 * The tween is scrubbed rather than fired once: it is tied to scroll position, so
 * scrolling back up plays it backwards and the page always agrees with where you
 * are. `ease: "none"` is required for that — an eased scrub fights the scroll.
 *
 * Every value lands on an exact identity transform (scale 1, 0deg, 0px), so text
 * is only ever resampled during the motion and is pixel-crisp at rest.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    /* Nothing is hidden by CSS, so skipping this leaves the section correct and
       already in place rather than blank. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        {
          transformPerspective: 1500,
          transformOrigin: "50% 0%",
          scale: 1.06,
          rotateX: 7,
          y: 44,
          opacity: 0.28,
        },
        {
          scale: 1,
          rotateX: 0,
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 96%",
            end: "top 44%",
            scrub: 0.7,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`section-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
