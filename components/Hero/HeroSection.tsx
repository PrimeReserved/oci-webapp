// components/HeroSection.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  textColor?: string;
  overlayOpacity?: number;
  height?: string;
  borderRadius?: string;
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
    backgroundColor?: string;
    textColor?: string;
    icon?: React.ReactNode;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  textColor = 'text-white',
  overlayOpacity = 0.5,
  height = 'h-screen',
  borderRadius = '',
  button,
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (button?.href) {
      router.push(button.href);
    } else if (button?.onClick) {
      button.onClick();
    }
  };
  return (
    <div
      className={`relative ${height} w-full overflow-hidden ${borderRadius}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1
            className={`text-2xl md:text-3xl max-w-md lg:text-4xl font-bold mb-6 ${textColor}`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`text-md max-w-md md:text-lg ${textColor} opacity-90 mb-8`}
            >
              {subtitle}
            </p>
          )}
          {button && (
            <button
              onClick={handleButtonClick}
              className={`inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg font-normal text-base transition-all duration-300 hover:scale-105 hover:shadow-lg ${button.textColor || 'text-white'}`}
              style={{ backgroundColor: button.backgroundColor || '#dc2626' }}
            >
              {button.text}
              {button.icon && button.icon}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
