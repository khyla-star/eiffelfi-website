import { brandLogo } from '../../data/brand';

type LogoProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export default function Logo({ variant = 'light', className = 'h-8 w-auto' }: LogoProps) {
  const src = variant === 'dark' ? brandLogo.dark : brandLogo.light;

  return <img src={src} alt={brandLogo.alt} className={className} decoding="async" />;
}
