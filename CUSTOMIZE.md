# Portfolio Customization Notes

This project is an **initial portfolio system** now populated with résumé-verified information for **Harilal P**. The identity, experience, selected work, and contact channels should remain factual as the portfolio grows.

| What to update | Location | Guidance |
| --- | --- | --- |
| Personal name and wordmark | `client/src/components/Navigation.tsx`, `client/src/components/Contact.tsx` | Harilal P is now wired into the identity system; keep the S/° mark if desired. |
| Contact destinations | `client/src/components/Contact.tsx` | Confirm the email and social URLs remain current before publishing. |
| Project catalogue | `client/src/data/portfolio.ts` | Keep descriptions factual and concise; add a project only when there is work to document. |
| Project case studies | `client/src/components/ProjectShowcase.tsx` | Add verified architecture diagrams, decisions, test traces, screenshots, and outcomes. |
| Field notes and experiments | `client/src/data/portfolio.ts`, `client/src/components/ComponentsShowcase.tsx` | Link only published writing and runnable components. |

The visual direction is documented in [`ideas.md`](./ideas.md). It uses **Instrument Lime (`#C7F052`)** only as an operational signal—avoid expanding it into a broad page background or decorative gradient.
