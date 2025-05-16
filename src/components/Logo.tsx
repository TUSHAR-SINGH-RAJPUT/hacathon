
import type { SVGProps } from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ size = 'medium', className, iconOnly = false, ...props }: LogoProps) {
  const imageSizes = {
    small: { width: 28, height: 28 }, // Adjusted for potentially non-square custom logo
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
    <div className={`flex items-center gap-2 text-primary ${className}`}>
      <Image
        src="/logo.png" // Assumes your logo is at public/logo.png
        alt="kariGaar Logo"
        width={imageSizes[size].width}
        height={imageSizes[size].height}
        className="object-contain" // Ensures the logo fits well
      />
      {!iconOnly && <span className={`font-bold ${textSizeClasses[size]}`}>kariGaar</span>}
    </div>
  );
}
