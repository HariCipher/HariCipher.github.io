/**
 * Paper Instrument visual system: a continuous marquee of the tools the work
 * is actually built with, sitting between the hero and the first record.
 *
 * React Bits "Logo Loop", used unmodified — the component is colour-agnostic
 * (marks inherit `currentColor`), which is why it survives this light ground
 * when most of the library's animation set does not. Only two things are tuned:
 *
 *   speed 38    the library default of 120 is a product-page crawl; this is a
 *               background texture, not something to read at pace
 *   fadeOut     masks the edges into the paper. The stylesheet's automatic
 *               fade colour is white, with a dark-mode media query — neither is
 *               this page, so the colour is passed explicitly.
 */
import {
  SiDocker,
  SiGithub,
  SiGnubash,
  SiGo,
  SiLinux,
  SiPython,
  SiSplunk,
  SiSqlite,
  SiVirustotal,
  SiWireshark,
} from "react-icons/si";
import LogoLoop from "./reactbits/LogoLoop";

/** Tools that appear in the project records — nothing aspirational. */
const tools = [
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiGo />, title: "Go", href: "https://go.dev" },
  { node: <SiLinux />, title: "Linux", href: "https://kernel.org" },
  { node: <SiGnubash />, title: "Bash", href: "https://www.gnu.org/software/bash/" },
  { node: <SiWireshark />, title: "Wireshark", href: "https://www.wireshark.org" },
  { node: <SiSplunk />, title: "Splunk", href: "https://www.splunk.com" },
  { node: <SiSqlite />, title: "SQLite", href: "https://sqlite.org" },
  { node: <SiVirustotal />, title: "VirusTotal", href: "https://www.virustotal.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com/HariCipher" },
];

export function ToolBand() {
  return (
    <section className="tool-band" aria-label="Tools and technologies">
      <span className="tool-band-label" aria-hidden="true">INSTRUMENTS</span>
      <LogoLoop
        logos={tools}
        speed={38}
        direction="left"
        logoHeight={26}
        gap={64}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#e9e6e0"
        ariaLabel="Tools and technologies"
      />
    </section>
  );
}
