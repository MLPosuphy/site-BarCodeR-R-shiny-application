# BarCodeR + OpenMetaBar scientific website

This repository contains the public academic website for the BarCodeR R/Shiny
application and its integration with the OpenMetaBar Nextflow pipeline.

The site combines an accessible, visual introduction with an evidence-backed
scientific software presentation. Its workflow, module names and feature claims
were checked directly against `BarCodeR_app/app.R` and the current application
modules (version reported by the source: `BarCodeR_v2.12.8`).

Interface-preview images in `public/app-previews/` are copied from
`BarCodeR_app/www/home_previews/` and are labelled as illustrative application
outputs. They are kept separate from the scientific demonstration below.

## Public demonstration data

The three website figures use `phyloseq::GlobalPatterns`:

- 26 samples;
- 19,216 taxa in the source object;
- 18,988 nonzero taxa retained for the website calculations;
- 9 environment types;
- primary reference: Caporaso et al. (2011),
  <https://doi.org/10.1073/pnas.1000080107>.

The supplied `ps_marine_exotic.rds` object is synthetic and is deliberately not
used as scientific evidence on the site.

## Rebuild the figures

The script `scripts/generate_public_data_figures.R` loads GlobalPatterns from
the installed phyloseq package, performs the documented transformations and
writes the figures plus `public/figures/data-provenance.tsv`.

```powershell
Rscript scripts/generate_public_data_figures.R
```

Required R packages: `phyloseq` and `ggplot2`.

## Update the embedded BarCodeR documentation

The website publishes the generated BarCodeR documentation from
`public/documentation/`. Synchronize it after regenerating the documentation in
the Shiny application:

```powershell
python scripts/sync_barcoder_documentation.py ../BarCodeR_app/www/documentation
```

The script validates the bundle, replaces the previous copy and adapts the
embedded navigation without modifying the source documentation.

## Run the website locally

```powershell
npm install
npm run dev
npm run build
```

## GitHub Pages

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which builds
the static Vite site and deploys `dist/` with the official GitHub Pages actions.

## References

- Caporaso JG et al. (2011). *Global patterns of 16S rRNA diversity at a depth
  of millions of sequences per sample.* PNAS.
  <https://doi.org/10.1073/pnas.1000080107>
- McMurdie PJ, Holmes S (2013). *phyloseq: An R Package for Reproducible
  Interactive Analysis and Graphics of Microbiome Census Data.* PLOS ONE.
  <https://doi.org/10.1371/journal.pone.0061217>

No reuse license has yet been declared for this website repository. Add one
explicitly before external redistribution or journal submission.
