import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  text,
  href,
  onClick,
  backgroundColor,
  textColor = 'text-white',
  icon,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = `inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg font-normal text-base transition-all duration-300 hover:scale-105 hover:shadow-lg ${textColor}`;

  const backgroundClasses = backgroundColor
    ? ''
    : 'bg-primary hover:bg-primary-hover';

  const combinedClasses = `${baseClasses} ${backgroundClasses} ${className}`;

  const buttonStyle = backgroundColor ? { backgroundColor } : {};

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={combinedClasses} style={buttonStyle}>
        {text}
        {icon && icon}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      style={buttonStyle}
      disabled={disabled}
      type={type}
    >
      {text}
      {icon && icon}
    </button>
  );
};

export default Button;
