import { renderToString } from "react-dom/server";
import App from "./App";
import type { Language } from "./content";
import type { Route } from "./routes";

export * from "./routes";
export { translatePhrase, translatedAttributes } from "./siteI18n";

export function renderPage(route: Route | null, language: Language) {
  return renderToString(<App route={route} language={language} setLanguage={() => {}} />);
}
