/**
 * Paper Instrument visual system: editorial labels operate as a measurement rail.
 * Use this heading to keep content sections disciplined and related.
 */
import { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeading({ index, label, title, children }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-stamp">
        <span className="section-index">{index}</span>
        <span className="section-label">{label}</span>
      </div>
      <div className="section-heading-content">
        <h2>{title}</h2>
        {children ? <div className="section-description">{children}</div> : null}
      </div>
    </div>
  );
}
