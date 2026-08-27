import es from "./locales/es.json";
import zh from "./locales/zh.json";
import hi from "./locales/hi.json";
import type { Language } from "./content";

type TranslationLanguage = Exclude<Language, "en" | "fr">;
type Dictionary = Record<string, string>;

export const languageOptions: Array<{ code: Language; label: string; short: string }> = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
  { code: "zh", label: "中文", short: "中文" },
  { code: "hi", label: "हिन्दी", short: "हि" },
];

const dictionaries: Record<TranslationLanguage, Dictionary> = {
  es: es as Dictionary,
  zh: zh as Dictionary,
  hi: hi as Dictionary,
};

const attributes = ["aria-label", "title", "alt", "placeholder"] as const;

function translateComposite(value: string, dictionary: Dictionary): string {
  const direct = dictionary[value];
  if (direct) return direct;

  const prefixed = value.match(/^(\s*(?:\d+\s*·\s*|[✓→←↗↓!]\s*))(.*)$/);
  if (prefixed) {
    const translated = dictionary[prefixed[2]];
    if (translated) return `${prefixed[1]}${translated}`;
  }

  for (const separator of [" — ", " · "]) {
    if (!value.includes(separator)) continue;
    const parts = value.split(separator);
    const translated = parts.map((part) => dictionary[part] ?? part);
    if (translated.some((part, index) => part !== parts[index])) return translated.join(separator);
  }

  const labelled = value.match(/^([^:]{2,80}:)\s+(.+)$/);
  if (labelled) {
    const label = dictionary[labelled[1]] ?? dictionary[labelled[1].slice(0, -1)];
    const detail = dictionary[labelled[2]];
    if (label || detail) return `${label ?? labelled[1].slice(0, -1)}: ${detail ?? labelled[2]}`;
  }

  return value;
}

function translateTextNode(node: Text, dictionary: Dictionary) {
  const raw = node.nodeValue ?? "";
  const value = raw.trim();
  if (!value) return;
  const translated = translateComposite(value, dictionary);
  if (translated === value) return;
  const leading = raw.match(/^\s*/)?.[0] ?? "";
  const trailing = raw.match(/\s*$/)?.[0] ?? "";
  node.nodeValue = `${leading}${translated}${trailing}`;
}

function translateElement(element: Element, dictionary: Dictionary) {
  if (element.closest("[data-i18n-skip]")) return;
  for (const attribute of attributes) {
    const value = element.getAttribute(attribute)?.trim();
    if (!value) continue;
    const translated = translateComposite(value, dictionary);
    if (translated !== value) element.setAttribute(attribute, translated);
  }
}

export function translateTree(root: Element, language: Language) {
  if (language === "en" || language === "fr") return;
  const dictionary = dictionaries[language];
  translateElement(root, dictionary);

  const elementWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  while (elementWalker.nextNode()) translateElement(elementWalker.currentNode as Element, dictionary);

  const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("[data-i18n-skip]") || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while (textWalker.nextNode()) translateTextNode(textWalker.currentNode as Text, dictionary);
}

export function observeTranslations(root: Element, language: Language): MutationObserver | null {
  if (language === "en" || language === "fr") return null;
  translateTree(root, language);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        translateTree(mutation.target.parentElement ?? root, language);
        continue;
      }
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) translateTree(node as Element, language);
        else if (node.nodeType === Node.TEXT_NODE && node.parentElement) translateTree(node.parentElement, language);
      });
    }
  });
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  return observer;
}

const titleByLanguage: Record<Language, Record<string, string>> = {
  en: {
    home: "Reproducible metabarcoding analysis", functioning: "How BarCodeR works", analyses: "Scientific analyses",
    tutorials: "Tutorials and test datasets", citation: "Cite BarCodeR", download: "Download and cite", faq: "Frequently asked questions",
  },
  fr: {
    home: "Analyse reproductible du métabarcoding", functioning: "Fonctionnement de BarCodeR", analyses: "Analyses scientifiques",
    tutorials: "Tutoriels et datasets tests", citation: "Citer BarCodeR", download: "Télécharger et citer", faq: "Questions fréquentes",
  },
  es: {
    home: "Análisis reproducible de metabarcoding", functioning: "Cómo funciona BarCodeR", analyses: "Análisis científicos",
    tutorials: "Tutoriales y datasets de prueba", citation: "Citar BarCodeR", download: "Descargar y citar", faq: "Preguntas frecuentes",
  },
  zh: {
    home: "可重复的宏条形码分析", functioning: "BarCodeR 的工作原理", analyses: "科学分析",
    tutorials: "教程和测试数据集", citation: "引用 BarCodeR", download: "下载和引用", faq: "常见问题",
  },
  hi: {
    home: "पुनरुत्पाद्य मेटाबारकोडिंग विश्लेषण", functioning: "BarCodeR कैसे काम करता है", analyses: "वैज्ञानिक विश्लेषण",
    tutorials: "ट्यूटोरियल और परीक्षण डेटासेट", citation: "BarCodeR का उद्धरण", download: "डाउनलोड और उद्धरण", faq: "अक्सर पूछे जाने वाले प्रश्न",
  },
};

const descriptionByLanguage: Record<Language, string> = {
  en: "Prepare, explore and analyse metabarcoding data interactively and reproducibly from a phyloseq object or FASTQ files.",
  fr: "Préparez, explorez et analysez des données de métabarcoding de manière interactive et reproductible à partir d’un objet phyloseq ou de fichiers FASTQ.",
  es: "Prepare, explore y analice datos de metabarcoding de forma interactiva y reproducible a partir de un objeto phyloseq o de archivos FASTQ.",
  zh: "从 phyloseq 对象或 FASTQ 文件出发，以交互且可重复的方式准备、探索和分析宏条形码数据。",
  hi: "phyloseq ऑब्जेक्ट या FASTQ फ़ाइलों से मेटाबारकोडिंग डेटा को इंटरैक्टिव और पुनरुत्पाद्य तरीके से तैयार, अन्वेषित और विश्लेषित करें।",
};

export function getPageTitle(route: string, language: Language): string {
  const key = route === "/analyses" || route === "/showcase" || route === "/reproducibility" ? "analyses"
    : route === "/functioning" || route.startsWith("/application") ? "functioning"
    : route === "/tutorials" || route === "/evidence" || route === "/documentation" ? "tutorials"
    : route === "/citation" ? "citation"
    : route === "/download" || route === "/availability" ? "download"
    : route === "/faq" ? "faq"
    : "home";
  return `${titleByLanguage[language][key]} | BarCodeR`;
}

export function updateDocumentMetadata(route: string, language: Language) {
  const title = getPageTitle(route, language);
  const description = descriptionByLanguage[language];
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
}
