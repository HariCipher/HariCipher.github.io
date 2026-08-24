/**
 * Paper Instrument visual system: profile information is compact provenance, not a skills dashboard.
 * Structured facts and priorities create hierarchy without fictional career claims.
 */
import { ArrowDownRight } from "lucide-react";
import { focusItems } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { SectionField } from "./SectionField";

export function About() {
  return (
    <section className="section section-about" id="about" aria-labelledby="about-title">
      <SectionField variant="contour" />
      <SectionHeading index="02" label="About / profile" title="Learning through signals, systems, and operating evidence.">
        <p>Harilal focuses on the practical work of SOC operations, Incident Response, and malware analysis—connecting the evidence in packet traces and logs to dependable tooling.</p>
      </SectionHeading>
      <div className="profile-layout">
        <div className="profile-intro">
          <p className="profile-large">I’m <strong>Harilal P</strong>, a Computer Science student building dependable tools around systems, investigations, and security operations.</p>
          <p>My work spans event-log analysis, malware traffic investigation, SOC lab operations, and automation for privileged access. I approach each project as a working record: define the signal, validate the process, and document the decision.</p>
          <a className="inline-link" href="#contact">Contact Harilal <ArrowDownRight size={17} strokeWidth={1.65} /></a>
        </div>
        <div className="profile-facts">
          <div><span>CURRENT FOCUS</span><p>SOC operations, Incident Response, and malware analysis.</p></div>
          <div><span>EDUCATION</span><p>B.Tech in Computer Science Engineering, Poornima University — expected 2028.</p></div>
          <div><span>EXPERIENCE</span><p>SOC Analyst Intern, Gardiyan System Security Technologies — remote, Sep 2025 to Jan 2026. Investigated live malware traffic, built five Splunk correlation rules, and designed a SOAR triage architecture.</p></div>
          <div><span>WORKING MODE</span><p>Splunk, Wazuh, Wireshark, Python, Bash, Go, Linux, and Windows—applied to packet traces, event logs, detection rules, and documented engineering decisions.</p></div>
        </div>
      </div>
      <div className="interest-row">
        <span>AREAS OF INTEREST</span>
        <div>{focusItems.map((item, index) => <em key={item}>{item}<b>{index === focusItems.length - 1 ? "" : " / "}</b></em>)}</div>
      </div>
    </section>
  );
}
