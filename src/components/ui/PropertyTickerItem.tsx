import type { TickerItem } from '../../types/content';

type PropertyTickerItemProps = TickerItem;

export default function PropertyTickerItem({
  image,
  address,
  price,
  change,
  direction,
}: PropertyTickerItemProps) {
  const changeClass = direction === 'up' ? 'text-lofty-green' : 'text-lofty-red';
  const arrow = direction === 'up' ? '▲' : '▼';

  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="h-7 w-7 shrink-0 rounded-md object-cover ring-1 ring-lofty-gray-300/60"
        loading="lazy"
        decoding="async"
        width={28}
        height={28}
      />
      <span className="text-xs font-semibold text-lofty-purple-700 sm:text-sm">{address}</span>
      <span className="text-xs font-medium text-lofty-gray-700 sm:text-sm">{price}</span>
      <span className={`flex items-center gap-1 text-xs font-semibold sm:text-sm ${changeClass}`}>
        <span aria-hidden="true">{arrow}</span>
        {change}
      </span>
    </div>
  );
}
