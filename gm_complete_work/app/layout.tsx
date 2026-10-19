import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig as s } from "@/config/site";

const title = "GM Classes, Jetapur Khargone — MP Board & CBSE Coaching";
const description =
  "GM Classes (Guru Mantra Classes), Nahar Marg, Jetapur, Khargone. Class 1–12 MP Board & CBSE, NEET/JEE foundation, Navodaya, PNST, ADDET, PVFT. Hindi + English medium.";

export const metadata: Metadata = {
  title,
  verification: { google: "TMysVoTxei6BouFsESIgzvMixhP9RosK3aLQv0t7DiA" },
  description,
  metadataBase: new URL("https://example.com"),
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: {
    title: "GM Classes",
    description: "Class 1–12 coaching in Jetapur, Khargone.",
    type: "website",
    locale: "en_IN",
    images: ["/gm-logo-full.jpg"],
  },
  twitter: {
    card: "summary",
    title: "GM Classes",
    description: "Class 1–12 coaching in Jetapur, Khargone.",
    images: ["/gm-logo-full.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
  "@type": "EducationalOrganization",
  name: s.fullName,
  alternateName: s.name,
  foundingDate: String(s.establishedYear),
  description: s.about,
  email: s.email,
  telephone: s.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nahar Marg, Sanawad Road, Jetapur",
    addressLocality: s.city,
    addressRegion: s.state,
    postalCode: s.pin,
    addressCountry: "IN",
  },
  url: "https://example.com",
  logo: "https://example.com/gm-logo.png",
  areaServed: { "@type": "City", name: s.city },
  knowsAbout: [
    "School education",
    "MP Board",
    "CBSE",
    "Navodaya entrance preparation",
    "PNST preparation",
    "ADDET preparation",
    "PVFT preparation",
    "JEE foundation",
    "NEET foundation"
  ],
  contactPoint: [{
    "@type": "ContactPoint",
    telephone: s.phones[0],
    contactType: "admissions",
    areaServed: "IN",
    availableLanguage: ["en", "hi"]
  }],
  sameAs: [s.instagram].filter(Boolean),
    },
    {
      "@type": "WebSite",
      name: s.name,
      url: "https://example.com",
      inLanguage: "en-IN",
      publisher: { "@type": "EducationalOrganization", name: s.fullName }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
