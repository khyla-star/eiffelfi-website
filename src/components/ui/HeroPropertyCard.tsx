import type { OrderBookRow } from '../../types/content';

type HeroPropertyCardProps = {
  image: string;
  investors: string;
  lastPrice: string;
  change: string;
  orderBook: OrderBookRow[];
};

export default function HeroPropertyCard({
  image,
  investors,
  lastPrice,
  change,
  orderBook,
}: HeroPropertyCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:mx-0 lg:max-w-none">
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-lofty/15 blur-3xl" />
      <div className="absolute -right-10 bottom-8 h-40 w-40 rounded-full bg-lofty-purple/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-3xl border border-lofty-gray-300/70 bg-white shadow-cardLight">
        <div className="relative h-56 overflow-hidden sm:h-80">
          <img
            src={image}
            alt="EiffelFi featured property"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={720}
            height={500}
          />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-lofty-purple-700/35 to-transparent" />
          <div className="absolute right-5 top-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-lofty-purple-700 shadow-subtle">
              <i className="fas fa-users text-[10px] text-lofty/80" aria-hidden="true" />
              {investors}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-lofty-gray-700">
                Last price
              </p>
              <p className="mt-1 text-2xl font-bold text-lofty-purple-700">
                {lastPrice}
                <span className="ml-1.5 text-xs font-medium text-lofty-gray-700">/ share</span>
              </p>
            </div>
            <span className="text-sm font-bold text-lofty-green">{change}</span>
          </div>
          <div className="mt-4 space-y-1">
            {orderBook.map((row, index) => (
              <div key={`${row.price}-${index}`}>
                {index === 2 && <div className="my-2 h-px bg-lofty-gray-300/70" />}
                <div className="relative h-7 overflow-hidden rounded-md">
                  <div
                    className={`absolute inset-y-0 right-0 ${row.side === 'ask' ? 'bg-lofty-red/15' : 'bg-lofty-green/15'}`}
                    style={{ width: row.width }}
                  />
                  <div className="relative flex h-full items-center justify-between px-3 text-xs font-semibold">
                    <span className={row.side === 'ask' ? 'text-lofty-red' : 'text-lofty-green'}>
                      {row.price}
                    </span>
                    <span className="text-lofty-gray-700">{row.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
