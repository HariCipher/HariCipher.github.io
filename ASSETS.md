# Local Visual Assets

All generated portfolio artwork is now included in the project under `client/public/portfolio-assets/optimized/`. The Vite dev server exposes that folder at `/portfolio-assets/optimized/`, so the same files load when the project is run locally with `pnpm dev`.

| Local file | Used in | What it is |
| --- | --- | --- |
| `optimized/hero-field.webp` | Hero background | Warm paper field with a technical coordinate disc; it supports the opening editorial composition. |
| `optimized/work-archive.webp` | Selected work shelf | Curated physical cards and research artifacts used behind the project collection. |
| `optimized/research-field.webp` | Writing / field notes | Abstract layered paper texture supporting the writing index. |
| `optimized/components-schematic.webp` | Components / experiments | Modular paper schematic supporting the reserved React experiments shelf. |
| `optimized/s-mark.webp` | Navigation, footer, and favicon | The custom S/° identity mark. |

These are decorative generated images, not evidence from the résumé or project screenshots. When real project visuals are available, replace the relevant file in this folder while keeping the filename, or update the corresponding path in the component or stylesheet. The images are compressed WebP files so the complete project can be saved and run locally without relying on a hosted asset URL.
