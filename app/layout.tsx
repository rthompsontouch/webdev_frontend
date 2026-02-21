import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HomeScrollWrapper from "@/components/HomeScrollWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thewebprism.com"),
  title: "TheWebPrism | Premium Design & Development Studio",
  description:
    "Premium web design and development for Raleigh, Cary, Durham, and the Triangle. We create websites, apps, and digital experiences for ambitious brands in North Carolina.",
  keywords: [
    "web design",
    "web development",
    "web design Raleigh NC",
    "web design Cary NC",
    "web design Durham NC",
    "Triangle web design",
    "digital design",
    "design agency",
    "app development",
    "branding",
    "digital consulting",
  ],
  openGraph: {
    title: "TheWebPrism | Premium Digital Design & Development",
    description:
      "We build premium digital experiences for brands that want to stand out and scale.",
    type: "website",
    url: "https://www.thewebprism.com",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism digital design and development studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheWebPrism | Premium Digital Design & Development",
    description:
      "Premium design and development for ambitious brands in Raleigh and beyond.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "TheWebPrism",
        url: "https://www.thewebprism.com",
        telephone: "+1-910-403-9019",
        areaServed: [
          { "@type": "City", name: "Raleigh", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Durham", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Cary", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Apex", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Holly Springs", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Fuquay-Varina", containedInPlace: { "@type": "State", name: "North Carolina" } },
        ],
      },
      {
        "@type": "LocalBusiness",
        name: "TheWebPrism",
        description: "Premium web design, web development, and SEO optimization for Triangle-area businesses in Raleigh, Durham, Cary, Apex, Holly Springs, and Fuquay-Varina, NC.",
        url: "https://www.thewebprism.com",
        telephone: "+1-910-403-9019",
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Raleigh",
          addressRegion: "NC",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 35.7796,
          longitude: -78.6382,
        },
        areaServed: [
          { "@type": "City", name: "Raleigh", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Durham", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Cary", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Apex", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Holly Springs", containedInPlace: { "@type": "State", name: "North Carolina" } },
          { "@type": "City", name: "Fuquay-Varina", containedInPlace: { "@type": "State", name: "North Carolina" } },
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 35.7796, longitude: -78.6382 },
          geoRadius: "50000",
        },
      },
    ],
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-black overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Parallax background - solid dark */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-black">
          {/* Very subtle grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>


        {/* Content layer - HomeScrollWrapper handles scroll snap on homepage */}
        <HomeScrollWrapper>{children}</HomeScrollWrapper>
      </body>
    </html>
  );
}
