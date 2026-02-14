import type { MetadataRoute } from "next";

const baseUrl = "https://www.thewebprism.com";

const routes = [
  "/",
  "/about",
  "/services/branding",
  "/services/digital-consulting",
  "/services/mobile-development",
  "/services/ui-ux-design",
  "/services/web-design",
  "/services/web-development",
  "/work/ge",
  "/work/mcbrier-properties",
  "/work/pppacerie",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
