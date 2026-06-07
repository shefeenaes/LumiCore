import type { Metadata, Viewport } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, CONTACT_EMAIL, CONTACT_PHONE_2 } from "@/constants";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#57B7C0",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Villa Interior Design & Manufacturing in UAE`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "villa interior design UAE",
    "kitchen manufacturing Dubai",
    "wardrobe closet UAE",
    "wooden doors Dubai",
    "uPVC windows UAE",
    "modular kitchen",
    "interior fit out Dubai",
    "Emirati factory",
    "3D interior design",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/brand/logo-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Villa Interior Design & Manufacturing in UAE`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/interior/villa-reveal.jpg",
        width: 1200,
        height: 630,
        alt: "Ideal Factory – Villa Interior Design & Manufacturing in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Villa Interior Design & Manufacturing in UAE`,
    description: SITE_DESCRIPTION,
    images: ["/images/interior/villa-reveal.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/logo.png`,
      },
      image: `${SITE_URL}/images/interior/villa-reveal.jpg`,
      telephone: CONTACT_PHONE_2,
      email: CONTACT_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
        addressRegion: "Dubai",
      },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Villa Interior Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Kitchen Design & Manufacturing" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Wardrobe & Closet Manufacturing" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Wooden Door Manufacturing" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "uPVC Window Systems" },
          },
        ],
      },
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${inter.variable}`}>
      <body className="font-lexend antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
