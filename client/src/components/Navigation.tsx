/**
 * Paper Instrument visual system: tactile paper, precise rules, and an operational lime signal.
 * The navigation is a compact index rail, never a generic app header.
 */
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";

const navItems = [
  ["Work", "work"],
  ["About ", "about"],
  ["Writing", "writing"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;

/* gsap.from writes the start state synchronously, so it has to run before the
   browser paints or the bar flashes in place first. Falls back on the server,
   where React warns about useLayoutEffect and nothing is painted anyway. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lit, setLit] = useState(-1);
  const headerRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const closeNavigation = () => setIsOpen(false);

  /*
   * Scroll the section into view by hand instead of letting the browser follow
   * the anchor. preventDefault is the point: a plain hash jump would append
   * "#work" to the address bar, and the URL is meant to stay clean.
   */
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    closeNavigation();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /*
   * Landing: the bar drops in as one object, then its contents drop in behind it
   * one at a time — brand mark, name, slash, role, then each link left to right.
   * The pieces are quicker than the bar (0.44s vs 0.8s) and overlap it, so the
   * header reads as one gesture rather than two, and is settled by ~1.1s — before
   * the hero headline lands at 1.2s.
   */
  useIsomorphicLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bar = header.querySelector(".site-nav");
    const pieces = header.querySelectorAll(
      ".brand-lockup > *, .nav-links-desktop .nav-link, .mobile-menu-toggle"
    );

    const tl = gsap.timeline();
    tl.from(bar, { y: -84, opacity: 0, duration: 0.8, ease: "expo.out" })
      .from(pieces, { y: -20, opacity: 0, duration: 0.44, stagger: 0.055, ease: "expo.out" }, 0.22);

    return () => {
      tl.kill();
    };
  }, []);

  /*
   * Slide the single ink block to whichever link is hovered, instead of giving
   * every link its own background. Measured from the DOM rather than tracked in
   * state because the widths depend on the rendered font, and read on demand so
   * a resize or a font swap cannot leave a stale number behind.
   */
  useEffect(() => {
    const rail = railRef.current;
    const bar = indicatorRef.current;
    if (!rail || !bar) return;

    if (lit < 0) {
      gsap.to(bar, { opacity: 0, duration: 0.28, ease: "expo.out" });
      return;
    }

    const link = rail.children[lit + 1] as HTMLElement | undefined;
    if (!link) return;

    const isFirstShow = gsap.getProperty(bar, "opacity") === 0;
    gsap.to(bar, {
      x: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1,
      /* Appearing is quick; travelling between links is the part worth watching. */
      duration: isFirstShow ? 0.26 : 0.46,
      ease: "expo.out",
    });
  }, [lit]);

  return (
    <header className="site-header" ref={headerRef}>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand-lockup" href="#top" onClick={(event) => scrollToSection(event, "top")} aria-label="Back to the top">
          <span className="brand-mark-frame"><img className="brand-mark" src="/portfolio-assets/optimized/s-mark.webp" alt="" /></span>
          <span className="brand-name">HARILAL P</span>
          <span className="brand-slash">/</span>
          <span className="brand-role">Blue Teamer </span>
        </a>

        <div className="nav-links nav-links-desktop" ref={railRef} onMouseLeave={() => setLit(-1)}>
          <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          {navItems.map(([label, href], index) => (
            <a
              key={href}
              className={`nav-link ${lit === index ? "is-lit" : ""}`.trim()}
              href={`#${href}`}
              onClick={(event) => scrollToSection(event, href)}
              onMouseEnter={() => setLit(index)}
            >
              <span className="nav-index">0{index + 1}</span>
              {label}
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
          {isOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={21} strokeWidth={1.8} />}
        </button>
      </nav>

      <div id="mobile-navigation" className={`nav-links-mobile ${isOpen ? "is-open" : ""}`}>
        {navItems.map(([label, href], index) => (
          <a key={href} className="mobile-nav-link" href={`#${href}`} onClick={(event) => scrollToSection(event, href)}>
            <span className="nav-index">0{index + 1}</span>
            {label}
          </a>
        ))}
        <p className="mobile-nav-note">Based wherever the work needs to happen.</p>
      </div>
    </header>
  );
}
