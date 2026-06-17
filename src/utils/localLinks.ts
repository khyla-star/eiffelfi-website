const LOFTY_HOSTS = new Set(['www.lofty.ai', 'lofty.ai']);
const SUBDOMAIN_MAP: Record<string, string> = {
  'amm.lofty.ai': '/amm',
  'merch.lofty.ai': '/merch',
};

const SOCIAL_MAP: Record<string, string> = {
  'www.facebook.com': '/social/facebook',
  'www.linkedin.com': '/social/linkedin',
  'x.com': '/social/x',
};

export function toLocalPath(url: string): string {
  if (!url || url.startsWith('#') || url.startsWith('/')) {
    return url || '/';
  }

  if (url.startsWith('mailto:')) {
    return '/support';
  }

  try {
    const parsed = new URL(url);

    if (LOFTY_HOSTS.has(parsed.hostname)) {
      return parsed.pathname || '/';
    }

    const subdomainBase = SUBDOMAIN_MAP[parsed.hostname];
    if (subdomainBase) {
      const path = parsed.pathname === '/' ? '' : parsed.pathname;
      return `${subdomainBase}${path}`;
    }

    const socialPath = SOCIAL_MAP[parsed.hostname];
    if (socialPath) {
      return socialPath;
    }
  } catch {
    return url;
  }

  return url;
}

export function isInternalLink(url: string): boolean {
  if (!url || url.startsWith('#')) {
    return false;
  }

  const local = toLocalPath(url);
  return local.startsWith('/') && !local.startsWith('//');
}

export function localizeHtmlLinks(html: string): string {
  return html.replace(/href="([^"]+)"/g, (match, url: string) => {
    if (url.startsWith('#')) {
      return match;
    }

    const local = toLocalPath(url);
    return local.startsWith('/') ? `href="${local}"` : match;
  });
}
