import React from 'react';

interface WhyChooseUsProps {
  className?: string;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ className = '' }) => {
  const features = [
    {
      title: 'EXPERTISE',
      description:
        'Our team comprises industry experts with in-depth knowledge of local markets. We leverage this expertise to provide you with an advantage in your real estate endeavours.',
    },
    {
      title: 'CLIENT-CENTRIC APPROACH',
      description:
        "Your needs are our top priority. We listen, understand, and tailor our services to align with your unique goals, whether you're buying, selling, or investing.",
    },
    {
      title: 'TRANSPARENCY',
      description:
        'We believe that transparency is key to building trust. We provide honest, straightforward advice and keep you informed throughout your real estate journey.',
    },
    {
      title: 'INNOVATION',
      description:
        'We embrace technology and modern tools to enhance your experience. Our online platform offers seamless access to property listings, market insights, and resources.',
    },
    {
      title: 'COMMUNITY',
      description:
        'We are more than just a real estate agency; we are proud contributors to the communities we serve. Our commitment extends to supporting the growth and well-being of these areas.',
    },
    {
      title: 'TRUSTED ADVISORS',
      description:
        'Our team is composed of trusted advisors who are dedicated to your success. We go beyond being mere agents; we serve as your partners in making informed real estate decisions.',
    },
  ];

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-dark mb-8 sm:mb-12 lg:mb-16">
          Why Choose Us
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 sm:p-8 border-t-4 border-gray-200 hover:border-primary transition-colors duration-300"
            >
              {/* Feature Title */}
              <h3 className="text-primary font-bold text-sm sm:text-base lg:text-lg mb-4 tracking-wide">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-light text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
