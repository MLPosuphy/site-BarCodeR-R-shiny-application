# BarCodeR journey workbook

Website version: Lot 5
Displayed BarCodeR version: 2.12.8

This workbook summarises the six published journeys on the **Tutorials** page. It is an offline checklist; detailed methodological explanations remain in the embedded documentation.

## 1. Discover BarCodeR with GlobalPatterns — 15 min

1. Create a demonstration project and import `GlobalPatterns`.
2. Check dimensions, depth, taxonomy and metadata in **Description**.
3. Produce a relative-abundance bar plot at **Phylum** level.
4. Compute **Observed** and **Shannon**.
5. Build a **Bray–Curtis PCoA** coloured by environment.
6. Save the figures and combine them in **MultiView**.

Expected outputs: rapid diagnosis, bar plot, PCoA and MultiView composition.

## 2. Audit a phyloseq object before analysis — 20 min

1. Check component presence and orientation.
2. Check identifier consistency.
3. Inspect depth, richness, dominance and sparsity.
4. Assess taxonomic completeness.
5. Identify missing or unusable metadata.
6. Inspect rarefaction and atypical samples without automatic exclusion.

Expected outputs: structure checklist, quality assessment and list of issues to inspect.

## 3. Filter without losing provenance — 25 min

1. Duplicate the original dataset.
2. Create a light filtering branch.
3. Create a standard branch.
4. Create a strict branch for sensitivity analysis.
5. Compare retained taxa, reads and depths.
6. Retain and justify the selected analytical branch.

Expected outputs: three derived datasets and a decision history.

## 4. Compare composition and alpha diversity — 25 min

1. Choose a taxonomic rank and assess unassigned taxa.
2. Define top N and grouping of remaining taxa.
3. Compare samples and then groups.
4. Compute Observed, Shannon and Simpson.
5. Check distributions and group sizes.
6. Interpret composition, richness and evenness separately.

Expected outputs: bar plot, composition table, indices and statistical comparison.

## 5. Build a complete beta-diversity analysis — 35 min

1. Define the explanatory variable.
2. Choose a coherent transformation and distance.
3. Build the distance matrix and PCoA.
4. Inspect explained variance and atypical points.
5. Run PERMANOVA.
6. Check PERMDISP.
7. Report plot, effect size, p-value and dispersion together.

Expected outputs: PCoA, diagnosis, PERMANOVA and dispersion test.

## 6. Build a panel with MultiView — 20 min

1. Save at least three figures.
2. Filter the library.
3. Add favourites and tags.
4. Choose a layout and place the figures.
5. Check readability and narrative order.
6. Export the composition and save its configuration.

Expected outputs: filtered library, MultiView grid and composite image.

## Shared rule

For every journey, retain the dataset, version, parameters, result, diagnostics, limitations and rationale for choices.
