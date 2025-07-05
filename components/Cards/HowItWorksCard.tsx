import React from 'react';
import { Home, Users, Key } from 'lucide-react';

const HowItWorksCard: React.FC = () => {
  const steps = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Find Real Estate',
      description:
        'Browse our wide selection of verified properties using smart search tools to find the perfect match for your budget and lifestyle.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Meet Realtor',
      description:
        'Connect with our trusted, knowledgeable agents who will guide you through viewings, negotiations, and every step of the process.',
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'Take The Keys',
      description:
        'Finalize the deal, sign the paperwork, and move into your new home with confidence and peace of mind.',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Steps */}
          <div className="flex-col space-y-12 border-l-red-100 border-l-3 pl-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-1 items-start justify-items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-start text-medium">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-medium text-sm leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dzd51q99i/image/upload/v1749914325/oci/properties/property1/Property1-mainImage_qzf2ch.jpg"
                alt="Luxury beachfront property with pool and ocean view"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksCard;
