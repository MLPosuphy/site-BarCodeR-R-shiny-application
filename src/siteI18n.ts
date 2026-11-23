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

export const translatedAttributes = ["aria-label", "title", "alt", "placeholder"] as const;

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

export function translatePhrase(value: string, language: Language) {
  if (language === "en" || language === "fr") return value;
  return translateComposite(value, dictionaries[language]);
}

function translateElement(element: Element, dictionary: Dictionary) {
  if (element.closest("[data-i18n-skip]")) return;
  for (const attribute of translatedAttributes) {
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
