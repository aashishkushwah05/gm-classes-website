"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (options: Record<string, unknown>, elementId: string) => unknown;
      };
    };
  }
}

/** Google Website Translator powers full-page English/Hindi translation across routes. */
export function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    const saved = window.localStorage.getItem("gm-classes-language");
    const lang = saved === "hi" ? "hi" : "en";
    const hasTranslateCookie = document.cookie.split("; ").some((c) => c.startsWith("googtrans="));
    if (lang === "hi" && !hasTranslateCookie) document.cookie = "googtrans=/en/hi; path=/";
    if (lang === "en" && hasTranslateCookie) {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,hi", autoDisplay: false, layout: 0 },
        "gm-google-translate",
      );
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        const target = lang === "hi" ? "hi" : "";
        if (select.value !== target) {
          select.value = target;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    };

    if (!document.querySelector('script[data-gm-google-translate="true"]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.gmGoogleTranslate = "true";
      document.head.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Keep the global callback available while the external script finishes loading.
    };
  }, []);

  // Google Translate rewrites the DOM. Re-apply the selected target after every
  // Next.js client-side route change so newly rendered page content is translated too.
  useEffect(() => {
    const saved = window.localStorage.getItem("gm-classes-language");
    const target = saved === "hi" ? "hi" : "";
    const timers = [180, 650, 1200].map((delay) => window.setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select && select.value !== target) {
        select.value = target;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, delay));
    document.documentElement.lang = saved === "hi" ? "hi" : "en";
    return () => timers.forEach(window.clearTimeout);
  }, [pathname]);

  return <div id="gm-google-translate" className="gm-google-translate-hidden" aria-hidden="true" />;
}
