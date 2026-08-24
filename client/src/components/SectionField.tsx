/**
 * Paper Instrument visual system: every section gets an ambient field, the way
 * the hero has one. Not an entrance — this never resolves and never finishes.
 *
 * Two independent motions, on two nested elements so they cannot fight over the
 * `transform` property:
 *
 *   outer  scroll-linked parallax. GSAP scrubs it against the section's own
 *          scroll range, so the field slides at a different rate to the content.
 *   inner  a continuous CSS drift, translating or rotating by exactly one tile
 *          of the repeating pattern so the loop is seamless (see index.css).
 *
 * Both are transform-only, so they stay on the compositor and never trigger
 * layout. The pattern itself is a CSS background — no canvas, no per-frame JS,
 * nothing to tear down but the ScrollTrigger.
 *
 * Six variants, one per section, chosen to suit what each section is about:
 *
 *   grid     engineering paper            → Selected work
 *   orbit    a turning instrument dial    → the TRACEX case study (dark ground)
 *   contour  survey contour rings         → About
 *   rules    ruled ledger paper           → Writing
 *   ticks    a measurement scale          → Experience
 *   hatch    drafting hatch               → Contact
 *
 * Every variant is drawn in near-transparent ink, because the type is still the
 * signal. If a field is legible as a pattern at a glance, it is too strong.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

export type FieldVariant = "grid" | "orbit" | "contour" | "rules" | "ticks" | "hatch";

type SectionFieldProps = {
  variant: FieldVariant;
  /** Total parallax travel in px across the section. 0 disables the scroll link. */
  parallax?: number;
};

export function SectionField({ variant, parallax = 90 }: SectionFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section || parallax === 0) return;
    /* The CSS drift is already disabled under reduced motion (see index.css);
       this disables the scroll-linked half to match. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0, y: -parallax / 2 },
        {
          y: parallax / 2,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={ref} className={`section-field section-field-${variant}`} aria-hidden="true">
      <i className="section-field-layer" />
    </div>
  );
}
