/**
 * Paper Instrument visual system: experience is filed as records, not as a CV table.
 *
 * Each record is a full-bleed pair — a square plate on one side, the account on
 * the other — and the pair alternates sides down the page so the eye zig-zags
 * instead of running down a single column. The plate is the same framed image
 * box the rest of the sheet uses; a record with no image yet keeps the frame and
 * says so, rather than collapsing the layout and changing the rhythm.
 *
 * Skills close the section as a flat index. They are a lookup, not a rating, so
 * there are no bars, percentages, or invented proficiency levels — only the tools
 * the projects, the writing, and the internship record already evidence.
 */
import { ArrowUpRight, ImagePlus } from "lucide-react";
import { experiences, skillGroups } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { SectionField } from "./SectionField";

export function Experience() {
  return (
    <section className="section section-experience" id="experience" aria-labelledby="experience-title">
      <SectionField variant="ticks" parallax={120} />
      <SectionHeading
        index="04"
        label="Experience / skills"
        title="Where the work has actually been done."
      >
        <p>
          Roles, dates, and what each one produced — kept to what can be shown. The skills index
          below lists only the tools already carried by a project, a published note, or the
          operating record.
        </p>
      </SectionHeading>

      <div className="xp-records">
        {experiences.map((xp, index) => (
          <article
            className={`xp-record ${index % 2 === 1 ? "xp-record-reverse" : ""}`.trim()}
            key={xp.id}
            aria-labelledby={`xp-${xp.id}`}
          >
            <div className="xp-plate">
              {xp.image ? (
                <div
                  className="xp-image"
                  /* Handed to CSS as custom properties rather than as
                     `backgroundImage` directly: an inline background-image wins
                     outright and would drop the paper wash the plate composites
                     on top of the photograph. */
                  style={{
                    "--xp-image": `url("${xp.image}")`,
                    "--xp-focus": xp.imageFocus ?? "center",
                  } as React.CSSProperties}
                  role="img"
                  aria-label={`${xp.organisation} working environment`}
                />
              ) : (
                <div className="xp-image xp-image-empty" aria-hidden="true">
                  <ImagePlus size={26} strokeWidth={1.4} />
                  <span>IMAGE SLOT</span>
                </div>
              )}
              <span className="xp-plate-stamp">{xp.stamp}</span>
            </div>

            <div className="xp-body">
              <div className="xp-meta">
                <span>{xp.period}</span>
                <span>{xp.location} / {xp.mode}</span>
              </div>
              <h3 id={`xp-${xp.id}`}>{xp.role}</h3>
              <p className="xp-org">{xp.organisation}</p>
              <p className="xp-summary">{xp.summary}</p>
              {xp.points.length > 0 && (
                <ul className="xp-points">
                  {xp.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
              {xp.stack.length > 0 && (
                <ul className="xp-stack" aria-label="Tools used">
                  {xp.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="skill-sheet" aria-label="Skills index">
        <div className="skill-sheet-head">
          <span>SKILLS INDEX</span>
          <span>GROUPS / {String(skillGroups.length).padStart(2, "0")}</span>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <a className="inline-link" href="#contact">
        Ask about the working record <ArrowUpRight size={17} strokeWidth={1.65} />
      </a>
    </section>
  );
}
