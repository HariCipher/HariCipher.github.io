# menace.h4ck.me — Harilal P. Portfolio

Minimal, premium static portfolio. No framework, no build step — drop into GitHub Pages and it serves as-is.

## Structure

```
.
├── index.html          # single-page portfolio
├── favicon.svg
├── CNAME               # custom domain (menace.h4ck.me)
├── .nojekyll           # tell Pages to skip Jekyll
└── assets/
    ├── style.css
    └── script.js
```

## Deploy to GitHub Pages

1. Create a new public repo, e.g. `HariCipher/menace` (or `HariCipher.github.io` if you want it at the root).
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "init: portfolio"
   git branch -M main
   git remote add origin git@github.com:HariCipher/menace.git
   git push -u origin main
   ```
3. On GitHub → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / root → Save.
4. Wait ~1 minute. Pages will publish to `https://haricipher.github.io/menace/` (or `https://haricipher.github.io/` for the user-site repo).

## Custom domain — `menace.h4ck.me`

`CNAME` already points to `menace.h4ck.me`. At your DNS provider for `h4ck.me`, add:

| Type  | Name     | Value                       | TTL  |
|-------|----------|-----------------------------|------|
| CNAME | menace   | haricipher.github.io.       | 3600 |

(If `h4ck.me` is a service that only lets you set a single record, point `menace` → `haricipher.github.io` via CNAME.)

Then on GitHub → **Settings → Pages → Custom domain** → enter `menace.h4ck.me` → Save → tick **Enforce HTTPS** once the cert provisions (a few minutes).

### Why `menace.h4ck.me` over `menace.undo.it`

`h4ck.me` reads as a security-domain TLD — it signals SOC / red-blue work the moment a recruiter sees the URL in your résumé header. `undo.it` is great but feels closer to productivity / dev-tools branding.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```
