import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "./content";
import { SiteLanguage } from "./SiteLink";

type Release = { released: true; version: string } | { released: false };
const ReleaseContext = createContext<Release>({ released: false });
const statusPath = "/api/release/status";
const downloadPath = "/api/download/barcoder";

const releaseText = {
  en: {
    upcoming: "BarCodeR – Coming soon",
    explanation: "The Windows application will be available for download soon.",
    download: "Download BarCodeR for Windows (.zip)",
  },
  fr: {
    upcoming: "BarCodeR – Bientôt disponible",
    explanation: "L’application Windows sera prochainement disponible au téléchargement.",
    download: "Télécharger BarCodeR pour Windows (.zip)",
  },
  es: {
    upcoming: "BarCodeR – Próximamente",
    explanation: "La aplicación para Windows estará disponible para descargar próximamente.",
    download: "Descargar BarCodeR para Windows (.zip)",
  },
  zh: {
    upcoming: "BarCodeR – 即将推出",
    explanation: "Windows 版应用即将开放下载。",
    download: "下载 Windows 版 BarCodeR（.zip）",
  },
  hi: {
    upcoming: "BarCodeR – जल्द उपलब्ध",
    explanation: "Windows के लिए ऐप जल्द ही डाउनलोड के लिए उपलब्ध होगा।",
    download: "Windows के लिए BarCodeR डाउनलोड करें (.zip)",
  },
} satisfies Record<Language, Record<string, string>>;

export function ReleaseProvider({ children }: { children: ReactNode }) {
  const [release, setRelease] = useState<Release>({ released: false });
  useEffect(() => {
    const controller = new AbortController();
    fetch(statusPath, { cache: "no-store", signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(status => {
        if (!controller.signal.aborted && status?.released === true && typeof status.version === "string") {
          setRelease({ released: true, version: status.version });
        }
      })
      .catch(() => { /* The default state remains in effect. */ });
    return () => controller.abort();
  }, []);
  return <ReleaseContext.Provider value={release}>{children}</ReleaseContext.Provider>;
}

export function useRelease() {
  const language = useContext(SiteLanguage);
  return { release: useContext(ReleaseContext), text: releaseText[language] };
}

export function ReleaseButton({ className }: { className: string }) {
  const { release, text } = useRelease();
  return release.released
    ? <a className={className} href={downloadPath} data-i18n-skip>{text.download}<span aria-hidden="true">↓</span></a>
    : <button className={`${className} release-unavailable`} type="button" disabled data-i18n-skip>{text.upcoming}</button>;
}

export function ReleaseNotice({ className }: { className?: string }) {
  const { release, text } = useRelease();
  return <p className={className} aria-live="polite" data-i18n-skip>{release.released ? `BarCodeR v${release.version} · Windows` : text.explanation}</p>;
}
