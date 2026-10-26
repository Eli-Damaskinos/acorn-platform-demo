# Acorn Insight — static reporting platform demo

An HTML, CSS and JavaScript demo for a multi-site biomethane reporting dashboard. It includes performance reports, a plant schematic, sample forecasts and fault alerts, and a KPI report form. Change the site and reporting period to explore the pages. There is no framework, backend or build step.

**Data note:** All figures and alerts are demo values. The dashboard is not connected to plant systems or sensors, and the values are not operating limits or site performance. Site names are examples only. The report form does not save settings or send email.

## Files

- `index.html` — layout, sidebar, dashboard cards, sections
- `styles.css` — colours, grids, typography, responsive layout
- `script.js` — page navigation, chart SVG, site and period selector, mock metrics

## Run locally

Just double-click `index.html` in a browser. There is no `npm install` or build process. An internet connection is optional; Google Fonts may fall back to system fonts when offline.

## Deploy to Render (free static site)

1. Push this folder to a GitHub repository.
2. Render → **New** → **Static Site** → connect the repository.
3. If these files are at the repo root: **Publish Directory** = `.`. No build command is necessary (leave empty if allowed, or use `echo "No build needed"`).
4. If these files are in an `acorn-reporting-demo/` subfolder: **Publish Directory** = `acorn-reporting-demo`.
5. Deploy, then share the `*.onrender.com` link.

If you use the root files directly in a repo, a private GitHub repo can still deploy to a public static site.

## If you develop this further

- Replace values produced by `getMetrics()` with validated backend/API responses.
- Add real site permissions, authentication, and access control before displaying internal operational data.
- Introduce a shared data contract, loading/error/empty states, and component structure.
- Consider React/TypeScript if the interface grows enough to need it.

Do not use this demo for operational decisions.
