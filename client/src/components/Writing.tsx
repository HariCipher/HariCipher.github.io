/**
 * Paper Instrument visual system: writing appears as a compact field-note index.
 *
 * Deliberately not a project card. The cards on the shelf are objects — boxed,
 * tilted, fanned, each one a thing you pick up. Published writing is a ledger:
 * full-width ruled entries in date order, stamp on the left, nothing boxed. The
 * two sections should never be mistaken for each other at a glance.
 *
 * Entries come from the Medium feed; the closing row is the standing link to the
 * profile, so the ledger always ends with somewhere to go rather than a dead stop.
 */
import { ArrowUpRight, Plus } from "lucide-react";
import { writingItems, writingProfileHref } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { SectionField } from "./SectionField";

export function Writing() {
  return (
    <section className="section section-writing" id="writing" aria-labelledby="writing-title">
      <SectionField variant="rules" />
      <SectionHeading index="03" label="Writing / field notes" title="Analysis notes with an audit trail.">
        <p>Published walkthroughs of investigations, lab builds, and tooling. The record values methods, assumptions, and evidence as much as conclusions.</p>
      </SectionHeading>

      <div className="writing-layout">
        <div className="writing-image" role="img" aria-label="Abstract layered paper research texture" />

        <div className="blog-ledger">
          <div className="blog-ledger-head">
            <span>PUBLISHED / MEDIUM</span>
            <span>ENTRIES / {String(writingItems.length).padStart(2, "0")}</span>
          </div>

          {writingItems.map((item) => (
            <a
              className="blog-row"
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read "${item.title}" on Medium`}
            >
              <span className="blog-stamp">{item.stamp}</span>
              <div className="blog-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="blog-tags">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <ArrowUpRight className="blog-arrow" size={18} strokeWidth={1.55} />
              <i className="blog-rule" aria-hidden="true" />
            </a>
          ))}

          <a
            className="blog-row blog-row-more"
            href={writingProfileHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the full writing archive on Medium"
          >
            <span className="blog-stamp">/ MORE</span>
            <div className="blog-body">
              <h3>More to come</h3>
              <p>New field notes land on Medium first.</p>
            </div>
            <Plus className="blog-arrow" size={18} strokeWidth={1.55} />
            <i className="blog-rule" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
