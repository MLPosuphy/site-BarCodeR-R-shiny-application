# BarCodeR scientific website

Public React/Vite website for the BarCodeR R/Shiny metabarcoding application.

## Local development

Requirements:

- Node.js 22.16.0;
- npm;
- optional: R with `phyloseq` and `ggplot2` to regenerate demonstration figures.

```bash
npm ci
npm run dev
```

Validate and build the production site:

```bash
npm run check
npm run build
npm run preview
```

The production output is written to `dist/`.

## Cloudflare Pages deployment

This repository is configured for deployment from GitHub to Cloudflare Pages.
Use the following build settings:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
Node.js version: 22.16.0 (read from .node-version)
```

Cloudflare Pages performs the production deployment. The GitHub Actions workflow
only verifies that the site still builds; it does not deploy to GitHub Pages.

Detailed setup instructions are available in
[`DEPLOIEMENT_CLOUDFLARE.md`](DEPLOIEMENT_CLOUDFLARE.md).

## Embedded documentation

The generated BarCodeR documentation is published from `public/documentation/`.
Synchronize it after regenerating the documentation in the Shiny application:

```bash
python scripts/sync_barcoder_documentation.py ../BarCodeR_app/www/documentation
```

## Rebuild demonstration figures

```bash
Rscript scripts/generate_public_data_figures.R
```

Required R packages: `phyloseq` and `ggplot2`.

## Public demonstration data

The public figures use `phyloseq::GlobalPatterns`:

- 26 samples;
- 19,216 taxa in the source object;
- 18,988 nonzero taxa retained for the website calculations;
- 9 environment types.

## Publication status

No reuse license has yet been declared for this website repository. Add an
explicit license before external redistribution or journal submission.
