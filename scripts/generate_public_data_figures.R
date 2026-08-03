#!/usr/bin/env Rscript

# Reproducible figure generation for the BarCodeR academic website.
#
# DATA SOURCE
#   phyloseq::GlobalPatterns, derived from the public dataset described in:
#   Caporaso et al. (2011), PNAS, doi:10.1073/pnas.1000080107.
#
# The synthetic ps_marine_exotic.rds test object is intentionally not used.

suppressPackageStartupMessages({
  library(phyloseq)
  library(ggplot2)
})

data("GlobalPatterns", package = "phyloseq")
ps <- prune_samples(sample_sums(GlobalPatterns) > 0, GlobalPatterns)
ps <- prune_taxa(taxa_sums(ps) > 0, ps)

out_dir <- file.path("public", "figures")
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

palette <- c(
  "Feces" = "#315F78",
  "Freshwater" = "#4D8C91",
  "Freshwater (creek)" = "#6BAF92",
  "Mock" = "#AAA49B",
  "Ocean" = "#3F6CA8",
  "Sediment (estuary)" = "#8A6D4D",
  "Skin" = "#C07B6E",
  "Soil" = "#8C7AA9",
  "Tongue" = "#D19A3F"
)

theme_academic <- function() {
  theme_minimal(base_size = 12, base_family = "sans") +
    theme(
      plot.background = element_rect(fill = "#FAF9F5", colour = NA),
      panel.background = element_rect(fill = "#FAF9F5", colour = NA),
      panel.grid.minor = element_blank(),
      panel.grid.major = element_line(colour = "#DDDCD6", linewidth = 0.35),
      plot.title = element_text(face = "bold", colour = "#17212B", size = 15),
      plot.subtitle = element_text(colour = "#59636D", size = 10, margin = margin(b = 15)),
      axis.title = element_text(colour = "#303A44", size = 10),
      axis.text = element_text(colour = "#4A555F", size = 8),
      legend.title = element_text(face = "bold", size = 9),
      legend.text = element_text(size = 8),
      legend.position = "bottom",
      plot.margin = margin(18, 22, 15, 18)
    )
}

# 1. Mean phylum-level composition by environment type -----------------------
ps_rel <- transform_sample_counts(ps, function(x) x / sum(x))
ps_phylum <- tax_glom(ps_rel, taxrank = "Phylum", NArm = FALSE)
composition <- psmelt(ps_phylum)
composition$Phylum <- as.character(composition$Phylum)
composition$Phylum[is.na(composition$Phylum) | composition$Phylum == ""] <- "Unclassified"

per_sample <- aggregate(
  Abundance ~ Sample + SampleType + Phylum,
  data = composition,
  FUN = sum
)
phylum_weight <- aggregate(Abundance ~ Phylum, data = per_sample, FUN = mean)
top_phyla <- head(phylum_weight$Phylum[order(phylum_weight$Abundance, decreasing = TRUE)], 8)
per_sample$DisplayPhylum <- ifelse(per_sample$Phylum %in% top_phyla, per_sample$Phylum, "Other")
collapsed_per_sample <- aggregate(
  Abundance ~ Sample + SampleType + DisplayPhylum,
  data = per_sample,
  FUN = sum
)
composition_summary <- aggregate(
  Abundance ~ SampleType + DisplayPhylum,
  data = collapsed_per_sample,
  FUN = mean
)
composition_totals <- aggregate(Abundance ~ SampleType, data = composition_summary, FUN = sum)
stopifnot(all(abs(composition_totals$Abundance - 1) < 1e-8))

display_phyla <- sort(setdiff(unique(composition_summary$DisplayPhylum), "Other"))
phylum_colours <- c("#344F6D", "#4A7594", "#7399A8", "#78A574", "#B06F66",
                    "#8C79A5", "#D2A454", "#9A7652", "#A7A49B")
phylum_palette <- setNames(phylum_colours[seq_along(display_phyla)], display_phyla)
phylum_palette <- c(phylum_palette, "Other" = "#D8D6CD")

p_composition <- ggplot(
  composition_summary,
  aes(x = SampleType, y = Abundance * 100, fill = DisplayPhylum)
) +
  geom_col(width = 0.78, colour = "#FAF9F5", linewidth = 0.2) +
  scale_fill_manual(values = phylum_palette, name = "Phylum") +
  scale_y_continuous(expand = expansion(mult = c(0, 0.04))) +
  labs(
    title = "Mean taxonomic composition across public environment types",
    subtitle = "GlobalPatterns; relative abundance aggregated at phylum level; eight most abundant phyla retained",
    x = NULL,
    y = "Mean relative abundance (%)"
  ) +
  theme_academic() +
  theme(axis.text.x = element_text(angle = 32, hjust = 1))

ggsave(file.path(out_dir, "globalpatterns-composition.png"), p_composition,
       width = 11, height = 7, dpi = 180, bg = "#FAF9F5")

# 2. Bray-Curtis PCoA ---------------------------------------------------------
ord <- ordinate(ps_rel, method = "PCoA", distance = "bray")
ordination_data <- plot_ordination(ps_rel, ord, type = "samples", justDF = TRUE)
relative_eig <- ord$values$Relative_eig

p_ordination <- ggplot(
  ordination_data,
  aes(x = Axis.1, y = Axis.2, colour = SampleType)
) +
  geom_hline(yintercept = 0, colour = "#C9C8C1", linewidth = 0.35) +
  geom_vline(xintercept = 0, colour = "#C9C8C1", linewidth = 0.35) +
  geom_point(size = 3.2, alpha = 0.9) +
  scale_colour_manual(values = palette, name = "Environment") +
  labs(
    title = "Between-sample structure using Bray-Curtis dissimilarity",
    subtitle = "Principal coordinates analysis of sample-wise relative abundances in GlobalPatterns",
    x = sprintf("PCoA 1 (%.1f%%)", 100 * relative_eig[[1]]),
    y = sprintf("PCoA 2 (%.1f%%)", 100 * relative_eig[[2]])
  ) +
  coord_equal() +
  theme_academic()

ggsave(file.path(out_dir, "globalpatterns-ordination.png"), p_ordination,
       width = 10, height = 7, dpi = 180, bg = "#FAF9F5")

# 3. Alpha-diversity summaries -----------------------------------------------
richness <- estimate_richness(ps, measures = c("Observed", "Shannon"))
richness$Sample <- rownames(richness)
metadata <- data.frame(sample_data(ps))
metadata$Sample <- rownames(metadata)
richness <- merge(richness, metadata[, c("Sample", "SampleType")], by = "Sample")
richness_long <- rbind(
  data.frame(Sample = richness$Sample, SampleType = richness$SampleType,
             Metric = "Observed taxa", Value = richness$Observed),
  data.frame(Sample = richness$Sample, SampleType = richness$SampleType,
             Metric = "Shannon diversity", Value = richness$Shannon)
)

set.seed(20260803)
p_alpha <- ggplot(richness_long, aes(x = SampleType, y = Value, colour = SampleType)) +
  geom_boxplot(width = 0.58, outlier.shape = NA, colour = "#7D858B", fill = "#EFEEE8", linewidth = 0.45) +
  geom_jitter(width = 0.11, height = 0, size = 2.5, alpha = 0.9) +
  facet_wrap(~ Metric, scales = "free_y", nrow = 1) +
  scale_colour_manual(values = palette, guide = "none") +
  labs(
    title = "Within-sample diversity in the public GlobalPatterns dataset",
    subtitle = "Raw observed richness and Shannon diversity; every point represents one sample",
    x = NULL,
    y = NULL
  ) +
  theme_academic() +
  theme(axis.text.x = element_text(angle = 40, hjust = 1), strip.text = element_text(face = "bold"))

ggsave(file.path(out_dir, "globalpatterns-alpha-diversity.png"), p_alpha,
       width = 12, height = 6.8, dpi = 180, bg = "#FAF9F5")

# Machine-readable provenance -------------------------------------------------
manifest <- data.frame(
  field = c("dataset", "source_object", "primary_reference", "samples", "source_taxa", "analyzed_nonzero_taxa", "environment_types", "generated_with"),
  value = c(
    "GlobalPatterns",
    "phyloseq::GlobalPatterns",
    "Caporaso et al. 2011; doi:10.1073/pnas.1000080107",
    nsamples(ps),
    ntaxa(GlobalPatterns),
    ntaxa(ps),
    length(unique(data.frame(sample_data(ps))$SampleType)),
    paste0("R ", getRversion(), "; phyloseq ", as.character(packageVersion("phyloseq")), "; ggplot2 ", as.character(packageVersion("ggplot2")))
  )
)
write.table(manifest, file.path(out_dir, "data-provenance.tsv"), sep = "\t", row.names = FALSE, quote = FALSE)

message("Generated three figures from phyloseq::GlobalPatterns in ", out_dir)
