import LocalLink from '../common/LocalLink';
import SocialLinks from '../ui/SocialLinks';
import FooterCityLinks from './FooterCityLinks';
import FooterDisclosures from './FooterDisclosures';
import { footer } from '../../data/landing';

const linkClassName =
  'inline-block py-1.5 text-sm leading-6 text-white/70 no-underline hover:text-white hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-lofty-purple-700 rounded-sm';

export default function Footer() {
  return (
    <footer className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-x-hidden border-t border-white/10 bg-lofty-purple-700">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 pb-12 pt-20 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-24">
          <div className="lg:col-span-4">
            <img
              src="/assets/logo-bottom.24e659c8d6a2183b3bb6de0c812a775f.svg"
              width={120}
              alt="EiffelFi"
              className="h-8 w-auto"
            />
            <p className="mt-6 max-w-[320px] text-base leading-7 text-white/70">{footer.tagline}</p>
            <div className="mt-10">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                {footer.socialLabel}
              </p>
              <SocialLinks />
            </div>
          </div>
          <nav aria-label="Footer" className="lg:col-span-8 lg:flex lg:justify-end">
            <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <LocalLink className={linkClassName} to={link.to}>
                    {link.label}
                  </LocalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-white/10" />
        <FooterCityLinks />
        <div className="border-t border-white/10" />
        <FooterDisclosures />
        <div className="border-t border-white/10" />
        <div
          className="flex flex-col gap-4 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between"
          data-nosnippet="true"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>© 2026 EiffelFi</span>
            <span aria-hidden="true">·</span>
            <LocalLink
              className="rounded-sm no-underline transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-lofty-purple-700"
              to="/privacy"
            >
              Privacy
            </LocalLink>
            <span aria-hidden="true">·</span>
            <LocalLink
              className="rounded-sm no-underline transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-lofty-purple-700"
              to="/terms"
            >
              Terms
            </LocalLink>
          </div>
          <p className="text-white/40">Version: 1.39.27-1788530523-prod</p>
        </div>
        <div aria-hidden="true" className="pb-10 pt-2">
          <svg
            viewBox="0 0 1280 180"
            preserveAspectRatio="xMidYMid meet"
            className="w-full text-white/[0.06]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              fontSize="180"
              fontWeight="800"
              letterSpacing="-6"
            >
              EIFFELFI
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
