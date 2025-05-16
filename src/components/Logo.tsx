
import React from 'react'; // Ensure React is imported if JSX is used

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ size = 'medium', className, iconOnly = false, ...props }: LogoProps) {
  const imageSizes = {
    small: { width: 28, height: 28 },
    medium: { width: 36, height: 36 },
    large: { width: 48, height: 48 },
    xlarge: { width: 72, height: 72 },
  };
  
  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xlarge: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2 text-primary ${className}`} {...props}>
      <svg
        width={imageSizes[size].width}
        height={imageSizes[size].height}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="kariGaar logo icon"
      >
        <path d="M6 3 L6 21 L9 21 L9 13.5 L15 21 L18 21 L10.5 12 L18 3 L15 3 L9 10.5 L9 3 Z" />
      </svg>
      {!iconOnly && <span className={`font-bold ${textSizeClasses[size]}`}>kariGaar</span>}
    </div>
  );
}
