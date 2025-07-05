import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  titleMaxWidth?: string;
  subtitleMaxWidth?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  marginBottom?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  titleMaxWidth = 'max-w-sm md:max-w-xl',
  subtitleMaxWidth = 'max-w-xl',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  marginBottom = 'mb-16',
}) => {
  return (
    <div className={`text-center ${marginBottom} ${className}`}>
      <h2
        className={`text-2xl md:text-3xl font-semibold text-dark mb-4 ${titleMaxWidth} mx-auto ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-medium max-w-xs sm:max-w-md md:max-w-xl text-md ${subtitleMaxWidth} mx-auto ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
