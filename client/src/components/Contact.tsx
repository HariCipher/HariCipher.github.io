/**
 * Paper Instrument visual system: the closing section is a clear, high-intent sign-off.
 * Contact methods remain editable and use direct accessible link affordances.
 */
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SectionField } from "./SectionField";

const links = [
  ["Email", "thisisharilal@gmail.com", "mailto:thisisharilal@gmail.com", Mail],
  ["GitHub", "github.com/HariCipher", "https://github.com/HariCipher", Github],
  ["LinkedIn", "linkedin.com/in/thisisharilal", "https://www.linkedin.com/in/thisisharilal", Linkedin],
] as const;

export function Contact() {
  return (
    <footer className="contact-section" id="contact" aria-labelledby="contact-title">
      <SectionField variant="hatch" parallax={60} />
      <div className="contact-rule" />
      <div className="contact-heading-row"><span>05 / CONTACT</span><span>OPEN CHANNEL</span></div>
      <div className="contact-main">
        <div><p className="contact-pretitle">A collaboration, security question, or engineering conversation?</p><h2 id="contact-title">Let’s make<br /><em>contact.</em></h2></div>
        <a className="contact-cta" href="mailto:thisisharilal@gmail.com">Write to Harilal <ArrowUpRight size={24} strokeWidth={1.55} /></a>
      </div>
      <div className="contact-links">
        {links.map(([label, value, href, Icon]) => (
          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} key={label}>
            <span><Icon size={16} strokeWidth={1.5} />{label}</span><strong>{value}</strong><ArrowUpRight size={17} strokeWidth={1.55} />
          </a>
        ))}
      </div>
      <div className="site-footer"><span className="footer-identity"><img src="/portfolio-assets/optimized/s-mark.webp" alt="" />S/° HARILAL P</span><span>SOC · DETECTION · MALWARE ANALYSIS</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  );
}
