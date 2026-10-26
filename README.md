# Acorn Insight — static reporting platform demo

An HTML/CSS/vanilla JavaScript concept for a multi-site biomethane reporting platform. It contains nine interactive views, including performance reports, biomethane and CO₂ forecasting concepts, anomaly-detection examples, and a KPI report builder, plus a site switcher, reporting-period controls, responsive navigation, and SVG trend charts — all without a frontend framework, backend, or build step.

**Important:** Every metric, chart, status, percentage, and comparison shown is **synthetic and illustrative**. This prototype does not connect to SCADA, Azure SQL, Azure Functions, or a production API. Real site names are used as navigation examples only; figures do **not** describe those sites. The report builder validates a request in the browser only; it does not store the configuration or send email.

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

## Next steps to turn it into a product

- Replace values produced by `getMetrics()` with validated backend/API responses.
- Add real site permissions, authentication, and access control before displaying internal operational data.
- Introduce a shared data contract, loading/error/empty states, and component structure.
- Move to React/TypeScript only when UI complexity justifies the migration.

This is a design prototype, not a source of operational truth.
