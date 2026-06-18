import { brandLogo } from '../../data/brand';

type LogoProps = {
  variant?: 'light' | 'dark';
  iconOnly?: boolean;
  className?: string;
};

export default function Logo({
  variant = 'light',
  iconOnly = false,
  className = 'h-8 w-auto',
}: LogoProps) {
  const src = iconOnly ? brandLogo.icon : variant === 'dark' ? brandLogo.dark : brandLogo.light;

  return <img src={src} alt={brandLogo.alt} className={className} decoding="async" />;
}
