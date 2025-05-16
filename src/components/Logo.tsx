
import React from 'react';
import { Construction } from 'lucide-react'; // Import the Construction icon

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ size = 'medium', className, iconOnly = false, ...props }: LogoProps) {
  const iconSizes = {
    small: 28,
    medium: 36,
    large: 48,
    xlarge: 72,
  };
  
  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xlarge: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2 text-primary ${className}`} {...props}>
      <Construction
        size={iconSizes[size]}
        aria-label="kariGaar logo icon"
      />
      {!iconOnly && <span className={`font-bold ${textSizeClasses[size]}`}>kariGaar</span>}
    </div>
  );
}
