# Résumé Content Update Checklist

## Full-Stack File Storage

- [ ] Upgrade the portfolio to the full-stack project capability and review the generated storage guidance.
- [ ] Add a protected project-evidence upload workflow using managed file storage.
- [ ] Connect uploaded image and document URLs to the portfolio’s project record interface.
- [ ] Validate the authenticated upload and display flow before delivery.

## Local Asset Portability

- [x] Identify every hosted visual asset reference and its role in the interface.
- [x] Copy generated artwork into the project’s local public asset folder and switch all visual references to local paths.
- [x] Verify the project build runs without hosted visual asset dependencies and document the local asset map.

- [x] Extract verified name, headline, contact links, education, experience, skills, and projects from the supplied résumé.
- [x] Map verified facts to the existing hero, work, profile, writing, and contact sections without changing the Paper Instrument design.
- [x] Replace neutral placeholder identity and portfolio copy with résumé-backed content only.
- [x] Run TypeScript and production-build checks, then review the updated page before delivery.

## Mapped Resume Content

| Existing area | Verified content to use |
| --- | --- |
| Identity and hero | Harilal P; 3rd-year Computer Science student; SOC operations, Incident Response, and malware analysis. |
| Selected work | TRACEX, Home Security Lab, Bandook RAT C2 PCAP Analysis, and JITAccess. |
| Feature record | TRACEX: Python EVTX analyzer, five correlated rules, 28,000+ events, SQLite, dashboard, and resolved service-account false positive. |
| Profile | Remote SOC Analyst Intern at Gardiyan System Security Technologies, Sep 2025–Jan 2026; B.Tech CSE at Poornima University, expected 2028. |
| Writing | PCAP analysis, Windows Event Log detections, and home SOC lab operations. |
| Contact | `thisisharilal@gmail.com`, `github.com/HariCipher`, and `linkedin.com/in/thisisharilal`. |
