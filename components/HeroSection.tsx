import ContactForm from "./ContactForm";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Title and Subtitle */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            We Build Your Digital Future
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Transform your vision into reality with cutting-edge web solutions. 
            We specialize in creating beautiful, fast, and scalable digital experiences 
            that drive results for your business.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Tell us about your project
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
