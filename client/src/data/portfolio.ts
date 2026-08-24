/**
 * Paper Instrument visual system: content is intentionally light and editable.
 * Keep every portfolio object evidence-led, editorial, and free of invented achievements.
 */
export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  shade: "ink" | "paper" | "mist" | "signal";
};

export const projects: Project[] = [
  {
    id: "tracex",
    index: "01",
    title: "TRACEX",
    category: "Python / Windows / Detection",
    description: "A standalone EVTX analyzer with correlated detections, MITRE mapping, and local evidence retention.",
    tags: ["Python", "EVTX", "SQLite"],
    href: "https://github.com/HariCipher/tracex",
    shade: "ink",
  },
  {
    id: "home-soc-lab",
    index: "02",
    title: "Home Security Lab",
    category: "Splunk / Wazuh / VMware",
    description: "A segmented SOC lab for Incident Response, log analysis, and malware traffic investigation.",
    tags: ["Splunk", "Wazuh", "OpenCanary"],
    href: "https://github.com/HariCipher/Home-Soc-Lab",
    shade: "paper",
  },
  {
    id: "bandook-c2",
    index: "03",
    title: "Bandook RAT C2",
    category: "PCAP / Malware / Threat Intel",
    description: "A packet investigation that surfaced dual C2 infrastructure beyond DNS-only monitoring.",
    tags: ["PCAP", "Wireshark", "MITRE"],
    href: "https://github.com/HariCipher/bandook-c2-traffic-analysis",
    shade: "mist",
  },
  {
    id: "jitaccess",
    index: "04",
    title: "JITAccess",
    category: "Go / Linux / Privileged Access",
    description: "A CLI system for time-bounded Linux group access, approval workflows, and automatic expiry.",
    tags: ["Go", "Linux", "Audit"],
    href: "https://github.com/HariCipher/JitAccess",
    shade: "signal",
  },
];

export type WritingItem = {
  stamp: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

/**
 * Published on Medium at @thisisharilal. Titles, dates, and links are taken from
 * the feed; each description is drawn from the piece's own opening rather than
 * written as marketing copy.
 */
export const writingItems: WritingItem[] = [
  {
    stamp: "2026 / 06",
    title: "Building a Cybersecurity Honeypot Monitoring Lab with OpenCanary and Splunk",
    description:
      "A home lab built on OpenCanary, Splunk, Kali, and Ubuntu Server — deploying a honeypot, getting logs flowing, and seeing what working with a SIEM actually looks like.",
    tags: ["OpenCanary", "Splunk", "Home lab"],
    href: "https://medium.com/@thisisharilal/building-a-cybersecurity-honeypot-monitoring-lab-with-opencanary-and-splunk-0e57390d721f",
  },
  {
    stamp: "2026 / 06",
    title: "How I Found a Malware Executable Hiding Inside a PNG File",
    description:
      "The server said it was sending an image. The extension said .png. The TCP stream said something completely different — a TrickBot PCAP walkthrough.",
    tags: ["TrickBot", "PCAP", "Wireshark"],
    href: "https://medium.com/@thisisharilal/how-i-found-a-malware-executable-hiding-inside-a-png-file-trickbot-network-analysis-00267f54937d",
  },
  {
    stamp: "2026 / 05",
    title: "Detecting Bandook RAT C2 Traffic with Wireshark",
    description:
      "Zero context to full IOC extraction across 2,038 packets. No labels, no hints — which is exactly how real SOC work starts.",
    tags: ["Bandook RAT", "C2", "IOC"],
    href: "https://medium.com/@thisisharilal/detecting-bandook-rat-c2-traffic-with-wireshark-a-step-by-step-analysis-cab3d48fefb2",
  },
  {
    stamp: "2026 / 04",
    title: "Building an Advanced File Upload Vulnerability Scanner",
    description:
      "From concept to 13 successful bypasses: 20+ bypass techniques, WAF evasion, and multi-threaded scanning for a class of bug that is tedious to test by hand.",
    tags: ["OWASP", "Tooling", "Python"],
    href: "https://medium.com/@thisisharilal/building-an-advanced-file-upload-vulnerability-scanner-from-concept-to-13-successful-bypasses-cdb4ea148f83",
  },
];

export const writingProfileHref = "https://medium.com/@thisisharilal";

export type Experience = {
  id: string;
  stamp: string;
  role: string;
  organisation: string;
  /** Where the work happened. Shown next to the period. */
  location: string;
  mode: string;
  period: string;
  summary: string;
  points: string[];
  /** Tooling actually used on this engagement, not aspirational. */
  stack: string[];
  /** Empty string renders the placeholder frame instead of a photograph. */
  image: string;
  /**
   * Where to anchor the image inside its plate, as a `background-position`.
   * The plates are tall and the images are not, so every one gets cropped —
   * this decides *what survives the crop*. Defaults to "center" when omitted,
   * which is only right for an image whose subject is actually centred.
   */
  imageFocus?: string;
  /** Optional positioning overrides for image crops. */
  imagePosition?: string;
  /** Optional scaling overrides for image crops. */
  imageScale?: number;
};

export const experiences: Experience[] = [
  {
    id: "gardiyan",
    stamp: "01",
    role: "SOC Analyst Intern",
    organisation: "Gardiyan System Security Technologies",
    location: "Turkey",
    mode: "Remote",
    period: "Sep 2025 — Jan 2026",
    summary:
      "Four months inside an operating SOC: live malware traffic investigation, SIEM Incident Response, and the automation design behind Tier-1 triage.",
    points: [
      "Analysed live Bandook RAT and TA551/TrickBot PCAP traffic in Splunk and Wazuh — identified dual C2 infrastructure and extracted IOCs including hardcoded IPs, C2 domains, and custom TCP beaconing on port 6591.",
      "Mapped the WannaCry ransomware lifecycle, from initial access through impact, to MITRE ATT&CK and the Cyber Kill Chain.",
      "Built five Splunk correlation rules covering brute force, PowerShell execution (4104), privilege escalation (4728), and service disablement (7036) — reducing the false positive rate on test datasets.",
      "Designed a SOAR playbook architecture on Shuffle, integrated with SIEM and EDR, for automated Tier-1 triage.",
    ],
    stack: ["Splunk", "Wazuh", "Wireshark", "Shuffle SOAR", "MITRE ATT&CK"],
    image: "/portfolio-assets/optimized/components-schematic.webp",
    imageFocus: "50% 50%",
    imagePosition: "90%, center",
    imageScale: 2,
  },
  {
    id: "fellowship",
    stamp: "02",
    role: "Open-Source Security Contributor",
    organisation: "FellowShell",
    location: "Norway",
    mode: "Remote",
    period: "2026 - present",
    summary: "Contributing to a mentored open-source security apprenticeship, producing practical identity, cloud security, and blue-team artifacts with technical review and feedback.",
    points: [
    "Developed an Entra ID hardening guide covering identity security configuration and defensive recommendations.",
    "Contributing to practical blue-team work including detection rules, KQL queries, incident-response playbooks, and security hardening documentation.",
    "Collaborating through GitHub-based workflows with mentor feedback and review."
  ],
    stack: [
      "Microsoft Entra ID", "IAM", "Cloud Security", "Blue Team", "KQL", "GitHub"],
    image: "/portfolio-assets/optimized/fellowshell-desk.webp",
    imageFocus: "50% 38%",
    
  },
];

export type SkillGroup = { label: string; items: string[] };

/** Tools already evidenced by the projects, the writing, and the internship record. */
export const skillGroups: SkillGroup[] = [
  { label: "Detection & SIEM", items: ["Splunk", "Wazuh", "OpenCanary", "MITRE ATT&CK", "Correlation rules"] },
  { label: "Analysis", items: ["Wireshark", "PCAP", "EVTX", "Malware traffic", "IOC extraction"] },
  { label: "Engineering", items: ["Python", "Go", "Bash", "SQLite", "TypeScript"] },
  { label: "Systems", items: ["Linux", "Windows", "VMware", "Docker", "Git"] },
];

export const focusItems = [
  "SOC operations",
  "Incident Response",
  "Malware analysis",
  "Linux systems",
  "Security automation",
];
