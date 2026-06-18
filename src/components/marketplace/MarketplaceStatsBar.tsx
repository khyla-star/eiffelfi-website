import { MARKETPLACE_STATS } from '../../data/marketplace';

export default function MarketplaceStatsBar() {
  return (
    <div className="hidden items-center justify-center gap-6 bg-white px-6 py-2 dark:bg-lofty-purple-800 sm:flex lg:gap-10 sm:px-12 lg:px-16">
      {MARKETPLACE_STATS.map((stat) => {
        const match = stat.match(/^(.+?)\s+(.+)$/);
        const value = match?.[1] ?? stat;
        const label = match?.[2] ?? '';

        return (
          <span
            key={stat}
            className="whitespace-nowrap py-0.5 text-center text-[11px] text-gray-400 dark:text-white/40"
          >
            <span className="font-semibold text-gray-500 dark:text-white/60">{value}</span>
            {label ? ` ${label}` : ''}
          </span>
        );
      })}
    </div>
  );
}
