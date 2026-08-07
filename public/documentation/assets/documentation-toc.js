(function () {
  if (window.__barcoderDocumentationTocBound) return;
  window.__barcoderDocumentationTocBound = true;

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();
  }

  function applyFilter(root, rawTerm) {
    const term = normalize(rawTerm).trim();
    const cards = Array.from(root.querySelectorAll("[data-doc-card]"));
    const categories = Array.from(root.querySelectorAll("[data-doc-category]"));
    const noResults = root.querySelector("[data-bcr-doc-no-results]");
    const clearButton = root.querySelector("[data-bcr-doc-clear]");
    let visibleCards = 0;

    cards.forEach(function (card) {
      const haystack = normalize(
        (card.getAttribute("data-search") || "") + " " + card.textContent
      );
      const visible = !term || haystack.includes(term);
      card.hidden = !visible;
      if (visible) visibleCards += 1;
    });

    categories.forEach(function (category) {
      const hasVisibleCard = Array.from(
        category.querySelectorAll("[data-doc-card]")
      ).some(function (card) {
        return !card.hidden;
      });

      category.hidden = !hasVisibleCard;
      if (term && hasVisibleCard) category.open = true;
    });

    if (noResults) noResults.hidden = visibleCards !== 0;
    if (clearButton) clearButton.hidden = !term;
  }

  document.addEventListener("input", function (event) {
    const input = event.target.closest("[data-bcr-doc-search]");
    if (!input) return;
    const root = input.closest("[data-bcr-doc-toc]");
    if (root) applyFilter(root, input.value);
  });

  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-bcr-doc-clear]");
    if (!button) return;

    const root = button.closest("[data-bcr-doc-toc]");
    const input = root && root.querySelector("[data-bcr-doc-search]");
    if (!root || !input) return;

    input.value = "";
    applyFilter(root, "");
    input.focus();
  });
})();
