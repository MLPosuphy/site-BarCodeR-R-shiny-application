import type { Language } from "./content";

export const siteOrigin = "https://site-barcoder-r-shiny-application.pages.dev";
export const languages = ["en", "fr", "es", "zh", "hi"] as const satisfies readonly Language[];
export const routes = ["/", "/functioning", "/analyses", "/tutorials", "/download", "/citation", "/faq"] as const;
export type Route = (typeof routes)[number];

export const routeAliases: Record<string, Route> = {
  "/availability": "/download",
  "/evidence": "/tutorials",
  "/showcase": "/analyses",
  "/reproducibility": "/analyses",
  "/application": "/functioning",
  "/application/openmetabar": "/functioning",
  "/application/input-data": "/functioning",
  "/application/datasets": "/functioning",
  "/application/description": "/functioning",
  "/application/data-edition": "/functioning",
  "/application/filtration": "/functioning",
  "/application/exploration": "/functioning",
  "/application/analyse": "/functioning",
  "/application/multiview": "/functioning",
  "/application/documentation": "/functioning",
};

export function isLanguage(value: string | null): value is Language {
  return languages.some(language => language === value);
}

export function sitePath(route: Route, language: Language): string {
  if (language === "en") return route;
  return route === "/" ? `/${language}` : `/${language}${route}`;
}

export function readRoute(pathname: string) {
  const [, prefix] = pathname.split("/");
  const language = isLanguage(prefix) ? prefix : "en";
  const path = (isLanguage(prefix) ? pathname.slice(prefix.length + 1) : pathname).replace(/\/+$/, "") || "/";
  const route = routes.find(route => route === path);
  return { language, route: route ?? null };
}

export function legacyPath(hash: string, search: string, language: Language) {
  if (!hash.startsWith("#/") || hash.startsWith("#//")) return null;
  const oldUrl = new URL(hash.slice(1), siteOrigin);
  const path = oldUrl.pathname.replace(/\/+$/, "") || "/";
  const route = routes.find(route => route === path)
    ?? (path === "/documentation" ? "/tutorials" : undefined)
    ?? (Object.hasOwn(routeAliases, path) ? routeAliases[path] : undefined);
  if (!route) return null;
  return sitePath(route, language) + (oldUrl.search || search) + oldUrl.hash;
}
