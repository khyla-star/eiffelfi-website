import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { isInternalLink, toLocalPath } from '../../utils/localLinks';

type LocalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  children?: ReactNode;
};

export default function LocalLink({ to, children, ...props }: LocalLinkProps) {
  const path = isInternalLink(to) ? toLocalPath(to) : to;

  if (path.startsWith('/') && !path.startsWith('//')) {
    return (
      <Link to={path} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={path} {...props}>
      {children}
    </a>
  );
}
