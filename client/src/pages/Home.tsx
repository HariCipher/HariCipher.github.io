/**
 * Paper Instrument visual system: a continuous specimen sheet for security, systems, and software work.
 * Sections share a paper ground, editorial rail, thin rules, and one restrained operational lime accent.
 */
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { SectionReveal } from "@/components/SectionReveal";
import { SelectedWork } from "@/components/SelectedWork";
import { ToolBand } from "@/components/ToolBand";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <div className="paper-shell">
      <main>
        <Hero />
        <SectionReveal><ToolBand /></SectionReveal>
        <SectionReveal><SelectedWork /></SectionReveal>
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Writing /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
      </main>
      <SectionReveal><Contact /></SectionReveal>
    </div>
  );
}
