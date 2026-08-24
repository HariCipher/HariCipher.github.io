/**
 * Paper Instrument visual system: selected work is a curated physical collection.
 *
 * The shelf has two layouts and they carry the same cards:
 *
 *   ≥1120px  a fanned specimen spread (React Bits "Bounce Cards", retoned)
 *   below    the original grid, untouched
 *
 * The fan is absolutely positioned at fixed pixel offsets, so it cannot reflow —
 * shrinking it just overlaps the cards into an unreadable pile. Rather than
 * fight that, the narrow layout keeps the grid that already worked. Both render
 * the same `projects` array plus the same closing card, so neither can drift out
 * of sync with the data.
 */
import { ArrowUpRight, Box, Orbit } from "lucide-react";
import { projects } from "@/data/portfolio";
import { useMinWidth } from "@/hooks/useMinWidth";
import { ExploreMoreCard, ProjectCard } from "./ProjectCard";
import BounceCards from "./reactbits/BounceCards.tsx";
import { SectionHeading } from "./SectionHeading";
import { SectionField } from "./SectionField";

/** Below this the fan overlaps itself; the grid takes over. */
const FAN_BREAKPOINT = 1120;
const CARD_WIDTH = 250;
const FAN_SPACING = 196;
const FAN_ROTATION = 3.2;

/**
 * Fans `count` cards symmetrically around centre. Derived rather than written
 * out, because the shelf grows by one card the moment a project is added to
 * `portfolio.ts` and a hand-written list would silently stop covering it.
 */
function fanTransforms(count: number): string[] {
  const mid = (count - 1) / 2;
  return Array.from({ length: count }, (_, i) => {
    const step = i - mid;
    return `rotate(${(step * FAN_ROTATION).toFixed(2)}deg) translate(${Math.round(step * FAN_SPACING)}px)`;
  });
}

export function ProjectShelf() {
  const fanned = useMinWidth(FAN_BREAKPOINT);
  const tilts = ["-1.6deg", "1.4deg", "-0.7deg", "1.7deg", "-1.2deg", "0.9deg"];

  /* One list, rendered by either layout. */
  const cards = [
    ...projects.map((project, index) => (
      <ProjectCard key={project.id} project={project} tilt={fanned ? "0deg" : tilts[index]} />
    )),
    <ExploreMoreCard key="explore-more" />,
  ];

  const transforms = fanTransforms(cards.length);
  const fanWidth = (cards.length - 1) * FAN_SPACING + CARD_WIDTH + 80;

  return (
    <div className="project-shelf" aria-label="Selected work collection">
      <div className="shelf-toolbar">
        <span>
          <Box size={15} strokeWidth={1.5} />
          CURATED OBJECTS / {String(projects.length).padStart(2, "0")}
        </span>
        <span>
          <Orbit size={15} strokeWidth={1.5} />
          SHELF MODE / {fanned ? "FANNED" : "GRID"}
        </span>
      </div>

      <div className={`shelf-stage ${fanned ? "shelf-stage-fanned" : ""}`.trim()}>
        <div className="shelf-image" aria-hidden="true" />

        {fanned ? (
          <BounceCards
            className="shelf-fan"
            containerWidth={fanWidth}
            containerHeight={340}
            animationDelay={0.4}
            animationStagger={0.06}
            easeType="expo.out"
            hoverPush={100}
            transformStyles={transforms}
            items={cards.map((node) => ({ node }))}
          />
        ) : (
          <div className="project-card-collection">{cards}</div>
        )}
      </div>
    </div>
  );
}

export function SelectedWork() {
  return (
    <section className="section section-work" id="work" aria-labelledby="work-title">
      <SectionField variant="grid" />
      <SectionHeading
        index="01"
        label="Selected work"
        title="Detection systems, investigations, and controlled access."
      >
        <p>
          Records spanning event evidence, home-lab operations, malware traffic analysis, and
          just-in-time Linux access. Each card carries the technical context needed for a fuller
          case study.
        </p>
      </SectionHeading>
      <ProjectShelf />
      <a className="inline-link" href="https://github.com/HariCipher" target="_blank" rel="noreferrer">
        Every repository on GitHub <ArrowUpRight size={17} strokeWidth={1.65} />
      </a>
    </section>
  );
}
