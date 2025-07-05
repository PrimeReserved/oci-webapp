import React from 'react';
import SectionHeader from './SectionHeader';

const OurMission: React.FC = () => {
  const stats = [
    {
      number: '5.2M',
      title: 'Owned Properties',
      description:
        'A track record that reflects trust, growth, and real results.',
    },
    {
      number: '10+',
      title: 'Years of Experience',
      description: 'A decade of delivering value, and client satisfaction.',
    },
    {
      number: '4K+',
      title: 'Properties to Buy',
      description:
        'A diverse selection to match every need, style, and budget.',
    },
    {
      number: '2k+',
      title: 'Happy Customers',
      description:
        'Real stories, real trust—clients who found their perfect fit.',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Mission Header */}
        <SectionHeader
          title="Our mission is to redefine real estate in the customer's favor."
          subtitle="Empowering smarter choices with trust, ease, and transparency"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-left bg-light p-8 py-12 rounded-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-6">
                {stat.number}
              </div>
              <h3 className="text-2xl font-semibold text-dark mb-4 leading-tight">
                {stat.title}
              </h3>
              <p className="text-medium text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
