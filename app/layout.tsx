import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    "Premium digital design and development for ambitious brands. We create websites, apps, and digital experiences that feel premium and drive results.",
  keywords: [
    "web design",
    "web development",
    "digital design",
    "design agency",
    "app development",
    "branding",
    "digital consulting",
    "Raleigh",
  ],
  openGraph: {
    title: "TheWebPrism | Premium Digital Design & Development",
    description:
      "We build premium digital experiences for brands that want to stand out and scale.",
    type: "website",
    url: "https://www.thewebprism.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheWebPrism | Premium Digital Design & Development",
    description:
      "Premium design and development for ambitious brands in Raleigh and beyond.",
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
        areaServed: "United States",
      },
      {
        "@type": "LocalBusiness",
        name: "TheWebPrism",
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
        areaServed: "United States",
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-black`}
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


        {/* Content layer */}
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
