import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { FloatingActions } from "./floating-actions";
import { UiMotionEnhancer } from "../ui-motion-enhancer";
import { GoogleTranslate } from "./google-translate";
import { BrandIntro } from "./brand-intro";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <BrandIntro />
      <GoogleTranslate />
      <Navbar />
      <UiMotionEnhancer />
      {children}
      <Footer />
      <FloatingActions />
    </>
  );
}
