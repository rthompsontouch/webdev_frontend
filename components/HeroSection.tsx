import ContactForm from "./ContactForm";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Subtle accent lines background - static overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern - subtle white */}
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
        {/* Diagonal accent lines for mathematical feel */}
        <div
          className="absolute inset-0 opacity-4"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #ffffff 1px, transparent 1px),
              linear-gradient(-45deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial circles for topology/depth effect */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Red reticle accent lines - subtle brand color */}
        <div
          className="absolute inset-0 opacity-4"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ef4444 1px, transparent 1px, transparent 48px, #ef4444 48px),
              linear-gradient(to bottom, #ef4444 1px, transparent 1px, transparent 48px, #ef4444 48px)
            `,
            backgroundSize: "140px 140px",
            backgroundPosition: "0 0",
          }}
        />
        {/* Red circular reticle accents */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              radial-gradient(circle, transparent 35%, #ef4444 40%, #ef4444 42%, transparent 47%),
              radial-gradient(circle, transparent 70%, #ef4444 75%, transparent 80%)
            `,
            backgroundSize: "200px 200px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      {/* Content layer - scrolls over background */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and Subtitle */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                We Build Your Digital Future
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Transform your vision into reality with cutting-edge web solutions. 
                We specialize in creating beautiful, fast, and scalable digital experiences 
                that drive results for your business.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
                  Get Started
                </button>
                <button className="px-8 py-3 rounded-lg border border-gray-600 text-white font-medium hover:bg-gray-900 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">
                Let's Connect
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
