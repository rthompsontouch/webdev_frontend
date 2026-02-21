import type { MetadataRoute } from "next";

const baseUrl = "https://www.thewebprism.com";

const routes = [
  "/",
  "/about",
  "/services/branding",
  "/services/digital-consulting",
  "/services/marketing",
  "/services/mobile-development",
  "/services/seo-optimization",
  "/services/ui-ux-design",
  "/services/web-design",
  "/services/web-development",
  "/triangle-web-design",
  "/work/builders-hardware",
  "/work/ge",
  "/work/mcbrier-properties",
  "/work/pppacerie",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path === "/triangle-web-design" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/triangle-web-design" ? 0.9 : 0.7,
  }));
}
