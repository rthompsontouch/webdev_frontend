import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: "Services",
      links: [
        { label: "Web Design Raleigh NC", href: "/services/web-design" },
        { label: "Web Development", href: "/services/web-development" },
        { label: "SEO Optimization", href: "/services/seo-optimization" },
        { label: "Triangle Web Design", href: "/triangle-web-design" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Work", href: "/#work" },
        { label: "Process", href: "/#process" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Client Portal", href: "/portal/login" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
  ];

  const socialLinks = [
    { name: "X", href: "https://twitter.com", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.835 6.694H2.306l7.644-8.753L2.456 2.25h6.678l4.596 6.06 5.514-6.06zm-1.161 17.52h1.833L7.084 4.126H5.117l12.926 15.644z" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.725-2.004 1.425-.103.249-.129.597-.129.946v5.434h-3.554s.05-8.814 0-9.737h3.554v1.378c-.427-.662-1.191-1.602-2.896-1.602-2.108 0-3.688 1.376-3.688 4.336v5.625H2.907V2.542h3.554v9.731h.025c.595-1.007 2.305-2.451 4.745-2.451 3.552 0 6.216 2.335 6.216 7.35v3.28zM5.337 2.107c-1.137 0-1.885.738-1.885 1.704 0 .968.748 1.704 1.844 1.704h.021c1.138 0 1.886-.736 1.886-1.704 0-.966-.748-1.704-1.866-1.704zm1.945 17.386h-3.554V9.316h3.554v10.177z" },
    { name: "Instagram", href: "https://instagram.com", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black">
      {/* Subtle gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo/Logo_white.png"
                  alt="TheWebPrism"
                  width={140}
                  height={36}
                  className="h-9 w-auto"
                />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
                Premium web design and development for Raleigh, Cary, Durham, and the Triangle. We build websites that convert.
              </p>
              <div className="mt-6 flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-rose-300"
                    aria-label={link.name}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={link.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-200">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-sm text-zinc-500">
              © {currentYear} TheWebPrism. Raleigh, Cary, Durham, Apex, Holly Springs & Fuquay-Varina, NC.
            </p>
            <a
              href="tel:+19193466039"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-rose-300"
            >
              (919) 346-6039
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
