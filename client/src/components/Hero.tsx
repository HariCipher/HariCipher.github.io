/**
 * Paper Instrument visual system: generous editorial whitespace meets a subtle instrument field.
 * Hero art is low-key so near-black type remains the dominant signal.
 *
 * Two kinds of motion live here and they must not be confused:
 *
 *   Entrance  one GSAP timeline, runs once on mount, then is done. Type arrives
 *             from the left, the instrument art from the right, and the footer
 *             rows settle up from below — staggered so the eye is led down the
 *             page in reading order rather than everything popping at once.
 *   Ambient   never resolves: Waves drifting behind the type and bending away
 *             from the cursor, the ring mark turning, and the MagnetLines tick
 *             array over the radar disc pointing wherever the pointer is.
 *
 * The timeline starts at 0.18s so it reads as a continuation of the nav bar
 * dropping in (see Navigation.tsx), not a competing second animation. Start
 * states are written in a layout effect, so nothing is ever painted in its
 * final position first and then yanked back.
 *
 * Everything below the hero reveals on scroll instead (see SectionReveal).
 */
import gsap from "gsap";
import { ArrowDownRight, ArrowUpRight, Github } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import MagnetLines from "./reactbits/MagnetLines";
import Waves from "./reactbits/Waves";

/** House curve. Decelerates hard, never overshoots — paper does not bounce. */
const EASE = "expo.out";

/*
 * Same in-page jump the nav bar uses (see Navigation.tsx): the href is a real
 * "#id" so it still works without JS, and preventDefault keeps the fragment out
 * of the address bar. These two links previously pointed at bare "work" and
 * "about", which resolve *relative to the current URL* — a full navigation to
 * /work, which no route serves.
 */
function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    /* Reduced motion: no entrance at all. Nothing is hidden by CSS, so the
       hero is simply already in its final state. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        delay: 0.18,
        onComplete: () => gsap.set("[data-hero-anim]", { clearProps: "willChange,transform,opacity" }),
      });

      /* Instrument field first, behind the type, so the words land on a surface. */
      tl.from(".hero-waves", { opacity: 0, duration: 1.1 }, 0)
        .from(".hero-art", { opacity: 0, x: 64, duration: 1.05 }, 0.05)
        .from(".hero-scope", { opacity: 0, x: 44, scale: 0.94, duration: 0.95 }, 0.16)
        /* Then the type, in reading order. */
        .from(".hero-topline > *", { opacity: 0, y: -18, duration: 0.6, stagger: 0.07 }, 0.1)
        .from(".hero-kicker", { opacity: 0, x: -26, duration: 0.7 }, 0.2)
        .from(".hero-line", { opacity: 0, x: -48, duration: 0.85, stagger: 0.09 }, 0.28)
        /* Then everything that supports it. */
        .from(".hero-intro", { opacity: 0, y: 22, duration: 0.7 }, 0.58)
        .from(".hero-actions > *", { opacity: 0, y: 18, duration: 0.6, stagger: 0.08 }, 0.66)
        .from(".hero-meta > *", { opacity: 0, y: 16, duration: 0.6, stagger: 0.06 }, 0.74);

      gsap.set("[data-hero-anim]", { willChange: "transform, opacity" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title" ref={rootRef}>
      <div className="hero-waves" data-hero-anim aria-hidden="true">
        <Waves
          lineColor="rgba(17, 17, 17, 0.085)"
          backgroundColor="transparent"
          waveSpeedX={0.008}
          waveSpeedY={0.004}
          waveAmpX={26}
          waveAmpY={13}
          xGap={22}
          yGap={44}
          friction={0.94}
          tension={0.006}
          maxCursorMove={70}
        />
      </div>

      <img
        className="hero-art" data-hero-anim
        src="/portfolio-assets/optimized/hero-field.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="hero-scope" data-hero-anim aria-hidden="true">
        <div className="hero-grid-mark" aria-hidden="true" />
        <MagnetLines
          rows={7}
          columns={7}
          containerSize="150px"
          lineColor="rgba(17, 17, 17, 0.5)"
          lineWidth="1px"
          lineHeight="13px"
          baseAngle={0}
        />
      </div>

      <div className="hero-content">
        <div className="hero-topline" data-hero-anim>
          <span className="eyebrow"><i className="signal-dot" />OPERATING / 3RD-YEAR CSE STUDENT</span>
          <span className="hero-location">WORKING RECORD / SOC · DETECTION</span>
        </div>

        <div className="hero-headline-wrap">
          <p className="hero-kicker" data-hero-anim>SOC operations · Incident Response · Malware analysis</p>
          <h1 id="hero-title">
            <span className="hero-line">SOC<span>×</span></span>
            <span className="hero-line">ANALYSIS</span>
          </h1>
        </div>

        <div className="hero-bottom-grid">
          <p className="hero-intro" data-hero-anim>
            Harilal P is a Computer Science student building and documenting detection systems,
            malware investigations, and security-focused software tools.
          </p>
          <div className="hero-actions" data-hero-anim>
            <a className="button button-primary" href="#work" onClick={(event) => scrollToSection(event, "work")}>
              View work <ArrowDownRight size={17} strokeWidth={1.7} />
            </a>
            <a className="button button-secondary" href="https://github.com/HariCipher" target="_blank" rel="noreferrer">
              GitHub <Github size={16} strokeWidth={1.7} />
            </a>
          </div>
        </div>

        <dl className="hero-meta" data-hero-anim>
          <div><dt>DISCIPLINE</dt><dd>SOC / Incident Response</dd></div>
          <div><dt>MODE</dt><dd>Investigate / Detect / Respond</dd></div>
          <div><dt>RECORD</dt><dd>Projects + field notes</dd></div>
          <a href="#about" onClick={(event) => scrollToSection(event, "about")} aria-label="Read the profile section"><ArrowUpRight size={18} strokeWidth={1.6} /></a>
        </dl>
      </div>
    </section>
  );
}
