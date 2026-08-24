/**
 * Paper Instrument visual system: a fanned specimen shelf of project cards.
 *
 * Adapted from React Bits "Bounce Cards". Four deliberate departures from the
 * original, each for a reason:
 *
 *  1. `images: string[]` became `items: BounceItem[]`. The original renders an
 *     <img> and nothing else, so it cannot carry a title, a category or a link.
 *     Every project here is text with an href, and the last card has to be able
 *     to navigate to GitHub.
 *  2. A card with an href renders as an <a>. The original's <div> is not
 *     focusable, so the whole shelf was unreachable by keyboard.
 *  3. `elastic.out(1, 0.8)` and `back.out(1.4)` became `expo.out`. The page runs
 *     cubic-bezier(0.23, 1, 0.32, 1) everywhere — expo-out with no overshoot.
 *     Elastic and back both overshoot, which would make this the one bouncy
 *     thing on an editorial page.
 *  4. `.card` became `.bounce-card`, because `.card` is already claimed by
 *     components/ui/card.tsx.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export type BounceItem = {
  node: ReactNode;
  href?: string;
  className?: string;
  label?: string;
};

export interface BounceCardsProps {
  className?: string;
  items?: BounceItem[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  hoverPush?: number;
  enableHover?: boolean;
}

export default function BounceCards({
  className = "",
  items = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.3,
  animationStagger = 0.06,
  easeType = "expo.out",
  transformStyles = [],
  hoverPush = 110,
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bounce-card",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (t: string): string => {
    if (/rotate\([\s\S]*?\)/.test(t)) return t.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    return t === "none" ? "rotate(0deg)" : `${t} rotate(0deg)`;
  };

  const getPushedTransform = (base: string, offsetX: number): string => {
    const re = /translate\(([-0-9.]+)px\)/;
    const match = base.match(re);
    if (match) return base.replace(re, `translate(${parseFloat(match[1]) + offsetX}px)`);
    return base === "none" ? `translate(${offsetX}px)` : `${base} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    items.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      const base = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: getNoRotationTransform(base),
          duration: 0.4,
          ease: "expo.out",
          overwrite: "auto",
        });
      } else {
        const offsetX = i < hoveredIdx ? -hoverPush : hoverPush;
        gsap.to(target, {
          transform: getPushedTransform(base, offsetX),
          duration: 0.4,
          ease: "expo.out",
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    items.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        transform: transformStyles[i] || "none",
        duration: 0.4,
        ease: "expo.out",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`bounce-cards ${className}`.trim()}
      ref={containerRef}
      style={{ position: "relative", width: containerWidth, height: containerHeight }}
    >
      {items.map((item, idx) => {
        const cls = `bounce-card bounce-card-${idx} ${item.className ?? ""}`.trim();
        const style = { transform: transformStyles[idx] ?? "none" };
        const handlers = {
          onMouseEnter: () => pushSiblings(idx),
          onMouseLeave: resetSiblings,
          onFocus: () => pushSiblings(idx),
          onBlur: resetSiblings,
        };

        return item.href ? (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={cls}
            style={style}
            {...handlers}
          >
            {item.node}
          </a>
        ) : (
          <div key={idx} className={cls} style={style} {...handlers}>
            {item.node}
          </div>
        );
      })}
    </div>
  );
}
