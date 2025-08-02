import React from 'react';
import Image from 'next/image';

interface AboutUsProps {
  className?: string;
}

const AboutUs: React.FC<AboutUsProps> = ({ className = '' }) => {
  const features = [
    {
      title: 'Trusted Experts',
      description: 'guidance at every step.',
    },
    {
      title: 'Verified',
      description: 'Vetted properties',
    },
    {
      title: 'Personalized',
      description: 'Tailored service',
    },
    {
      title: 'Insights',
      description: 'Smart decisions',
    },
  ];

  return (
    <section className={`py-24 pb-54 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Image Section - 65% Width on Desktop */}
          <div className="w-full sm:w-[80%] lg:w-[60%]">
            <Image
              src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
              alt="Real estate professional holding house model and keys"
              width={800}
              height={600}
              className="rounded-4xl shadow-lg object-cover w-full h-[400px] sm:h-[450px] lg:h-[500px]"
              priority
            />
          </div>

          {/* Content Section - Overlapping Box with negative margin to extend beyond image */}
          <div className="absolute top-5/12 left-8 md:left-4/12 lg:left-5/12 transform -translate-y-1/2 translate-y-8 sm:translate-y-8 lg:translate-y-8 w-[85%] sm:w-[70%] lg:w-[55%]">
            <div className="bg-white rounded-2xl p-8 sm:p-6 lg:p-10 py-12 sm:py-14 lg:py-16 shadow-xl">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dark mb-3 sm:mb-4">
                About Us
              </h2>

              <p className="text-medium text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6">
                We make finding your perfect home simple, transparent, and
                rewarding. With local expertise and a passion for connecting
                people to the right property, we guide you every step of the
                way.
              </p>

              {/* Features List */}
              <div className="space-y-2 sm:space-y-3">
                {features.map((feature, index) => (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border-2 border-red-600 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-medium text-xs sm:text-sm lg:text-base">
                        <span className="font-semibold text-dark">
                          {feature.title}:
                        </span>{' '}
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
