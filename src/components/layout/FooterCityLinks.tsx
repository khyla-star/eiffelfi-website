import LocalLink from '../common/LocalLink';
import { footerCities } from '../../data/footerCities';

export default function FooterCityLinks() {
  return (
    <section className="py-12 md:py-14" aria-label="Investment Properties by City">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-lofty-purple-700">
          <span>Investment Properties by City</span>
          <i className="fas fa-chevron-down text-[10px] transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ul className="mt-6 columns-1 gap-x-8 sm:columns-2 lg:columns-3" data-nosnippet="true">
          {footerCities.map((city) => (
            <li key={city.to} className="break-inside-avoid">
              <LocalLink
                className="block rounded-sm py-1 text-sm leading-6 text-white/65 no-underline transition-colors duration-150 hover:text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-lofty-purple-700"
                to={city.to}
              >
                {city.label}
              </LocalLink>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
