export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "X",
      href: "https://twitter.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.835 6.694H2.306l7.644-8.753L2.456 2.25h6.678l4.596 6.06 5.514-6.06zm-1.161 17.52h1.833L7.084 4.126H5.117l12.926 15.644z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm3.5-10c0-1.933-1.567-3.5-3.5-3.5S8.5 10.067 8.5 12s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5zm3.5-3c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5zM12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.725-2.004 1.425-.103.249-.129.597-.129.946v5.434h-3.554s.05-8.814 0-9.737h3.554v1.378c-.427-.662-1.191-1.602-2.896-1.602-2.108 0-3.688 1.376-3.688 4.336v5.625H2.907V2.542h3.554v9.731h.025c.595-1.007 2.305-2.451 4.745-2.451 3.552 0 6.216 2.335 6.216 7.35v3.28zM5.337 2.107c-1.137 0-1.885.738-1.885 1.704 0 .968.748 1.704 1.844 1.704h.021c1.138 0 1.886-.736 1.886-1.704 0-.966-.748-1.704-1.866-1.704zm1.945 17.386h-3.554V9.316h3.554v10.177zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Tagline and Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Web design Raleigh, Cary, Durham & the Triangle
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} TheWebPrism. Serving Raleigh, Cary, Durham, Apex, Holly Springs & Fuquay-Varina, NC.
            </p>
          </div>

          {/* Local SEO Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a href="/triangle-web-design" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Web Design Cary NC
            </a>
            <a href="/triangle-web-design" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Web Design Raleigh NC
            </a>
            <a href="/services/web-design" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Web Design Services
            </a>
            <a href="/portal/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Client Portal
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
