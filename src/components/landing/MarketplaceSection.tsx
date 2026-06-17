import PropertyTickerItem from '../ui/PropertyTickerItem';
import { tickerItems } from '../../data/landing';

const TICKER_DURATION = '330.65s';
const items = [...tickerItems, ...tickerItems];

export default function MarketplaceSection() {
  return (
    <section
      aria-label="EiffelFi marketplace ticker"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-y border-lofty-gray-300/60 bg-white"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex min-w-max animate-[landingTicker_60s_linear_infinite] items-center gap-8 py-3 motion-reduce:[animation:none] sm:gap-10"
        style={{ animationDuration: TICKER_DURATION }}
      >
        {items.map((item, index) => (
          <PropertyTickerItem key={`${item.address}-${index}`} {...item} />
        ))}
      </div>
    </section>
  );
}
