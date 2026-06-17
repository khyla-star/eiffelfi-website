import type { PropertyCard as PropertyCardData } from '../../types/content';
import LocalLink from '../common/LocalLink';

type PropertyCardProps = PropertyCardData;

export default function PropertyCard({ to, image, title, location, yield: yieldValue, investors }: PropertyCardProps) {
  return (
    <LocalLink
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-lofty-gray-300/60 bg-white no-underline shadow-subtle transition-all hover:-translate-y-1 hover:shadow-cardLight"
      to={to}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-lofty-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          width={640}
          height={480}
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-lofty-purple-700 shadow-subtle">
          <i className="fas fa-users text-[10px] text-lofty/80" aria-hidden="true" />
          {investors}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-6 py-5">
        <h3 className="text-lg font-semibold text-lofty-purple-700">{title}</h3>
        <p className="text-sm text-lofty-gray-700">{location}</p>
        <div className="mt-4 flex items-end justify-between border-t border-lofty-gray-300/70 pt-4">
          <div>
            <p className="text-2xl font-bold text-lofty">{yieldValue}</p>
            <p className="text-xs text-lofty-gray-700">Average Rental Yield</p>
          </div>
          <span className="text-sm font-semibold text-lofty-purple-700 transition-all group-hover:gap-3">
            View →
          </span>
        </div>
      </div>
    </LocalLink>
  );
}
