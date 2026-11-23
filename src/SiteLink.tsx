import { createContext, useContext, type ComponentPropsWithoutRef } from "react";
import type { Language } from "./content";
import { sitePath, type Route } from "./routes";

export const SiteLanguage = createContext<Language>("en");

export function SiteLink({ to, ...props }: Omit<ComponentPropsWithoutRef<"a">, "href"> & { to: Route }) {
  return <a {...props} href={sitePath(to, useContext(SiteLanguage))} />;
}
