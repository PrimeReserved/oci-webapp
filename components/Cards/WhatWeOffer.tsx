import React from 'react';
import Image from 'next/image';
import Button from '../Buttons/Button';
import { ArrowRight } from 'lucide-react';
interface ServiceItem {
  title: string;
  description: string;
}

const WhatWeOffer: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: 'Residential Developments:',
      description:
        'From affordable housing to luxury estates, we create homes that suit various lifestyles and budgets.',
    },
    {
      title: 'International Property Solutions:',
      description:
        'Facilitating property investments in Nigeria for Nigerians in the diaspora and foreigners interested in the Nigerian real estate market.',
    },
    {
      title: 'Partnerships:',
      description:
        'Collaborating with reputable developers and agencies to offer a diverse range of properties and investment opportunities.',
    },
  ];

  return (
    <section className="py-16 px-8 md:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914330/oci/properties/property1/Property1-image2_kwo7pm.jpg"
                alt="Luxury beachfront property with pool and ocean view"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-dark mb-8">
              What we offer
            </h2>

            <div className="space-y-2">
              <p className="text-lg text-medium leading-relaxed">
                We specialize in:
              </p>

              <div className="space-y-2">
                {services.map((service, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="text-lg font-semibold text-dark">
                      {service.title}
                    </h3>
                    <p className="text-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              text="Learn More"
              href="/about"
              icon={<ArrowRight className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
