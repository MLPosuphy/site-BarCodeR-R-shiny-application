import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import type { Language } from "./content";
import { isLanguage, legacyPath, readRoute, sitePath } from "./routes";
import "./styles.css";

const preferenceKey = "barcoder-site-language";

function savedLanguage() {
  try {
    const stored = localStorage.getItem(preferenceKey);
    if (isLanguage(stored)) return stored;
  } catch { /* Language URLs also work without storage. */ }
  return "en";
}

function goToLegacyPage() {
  const { pathname, search, hash } = window.location;
  const language = pathname === "/" ? savedLanguage() : readRoute(pathname).language;
  const target = legacyPath(hash, search, language);
  if (!target) return false;
  const url = new URL(target, window.location.origin);
  if (url.pathname !== pathname || url.search !== search) {
    window.location.replace(url);
    return true;
  }
  window.history.replaceState(null, "", target);
  if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
  return false;
}

function start() {
  if (goToLegacyPage()) return;
  const { route, language } = readRoute(window.location.pathname);
  const { hash, search, pathname, origin } = window.location;
  const preferred = savedLanguage();
  const sameSite = document.referrer.startsWith(`${origin}/`);
  if (pathname === "/" && !hash && !search && !sameSite && preferred !== "en") {
    window.location.replace(sitePath("/", preferred));
    return;
  }

  window.addEventListener("hashchange", goToLegacyPage);
  const setLanguage = (next: Language) => {
    try {
      localStorage.setItem(preferenceKey, next);
    } catch { /* Navigation still works without storage. */ }
    window.location.assign(sitePath(route ?? "/", next) + search + hash);
  };
  const root = document.getElementById("root")!;
  const app = <App route={route} language={language} setLanguage={setLanguage} />;
  if (root.dataset.prerendered === language && (language === "en" || language === "fr")) {
    hydrateRoot(root, app);
  } else {
    // The existing dictionaries translate DOM nodes for es/zh/hi.
    // Mount in the source language before applying the same translations.
    createRoot(root).render(app);
    // Replaced DOM targets may have been visited before React mounted.
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  }
}

start();
