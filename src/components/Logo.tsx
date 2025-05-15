import type { SVGProps } from 'react';
import { Construction } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ size = 'medium', className, iconOnly = false, ...props }: LogoProps) {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-10 w-10',
    xlarge: 'h-16 w-16',
  };
  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xlarge: 'text-4xl',
  }

  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
      <Construction className={`${sizeClasses[size]}`} strokeWidth={2.5} />
      {!iconOnly && <span className={`font-bold ${textSizeClasses[size]}`}>kariGaar</span>}
    </div>
  );
}
