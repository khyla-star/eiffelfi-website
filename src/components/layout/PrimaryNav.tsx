import LocalLink from '../common/LocalLink';
import type { NavLink } from '../../types/content';

type PrimaryNavProps = {
  links: NavLink[];
  className?: string;
  linkClassName?: string;
};

export default function PrimaryNav({ links, className, linkClassName }: PrimaryNavProps) {
  return (
    <nav className={className} aria-label="Primary">
      {links.map((link) => (
        <LocalLink
          key={link.label}
          to={link.to}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noreferrer' : undefined}
          className={linkClassName}
        >
          {link.label}
        </LocalLink>
      ))}
    </nav>
  );
}
