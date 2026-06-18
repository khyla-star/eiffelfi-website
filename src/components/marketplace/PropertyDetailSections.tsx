import { useMemo, useState } from 'react';
import type { MarketplacePropertyDetail } from '../../types/marketplace';
import { getTagStyle } from '../../data/marketplace';
import {
  type ChartRange,
  chartSummary,
  generateChartSeries,
  seriesToSvgPath,
} from '../../utils/propertyChart';

type PropertyHeaderSectionProps = {
  property: MarketplacePropertyDetail;
};

function averageRating(reviews: MarketplacePropertyDetail['reviews']) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export default function PropertyHeaderSection({ property }: PropertyHeaderSectionProps) {
  const avg = averageRating(property.reviews);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {property.badges.map((badge) => (
          <span
            key={badge}
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium ${getTagStyle(badge)}`}
          >
            {badge === 'Airbnb Listing' && (
              <i className="fab fa-airbnb text-sm" aria-hidden="true" />
            )}
            {badge}
          </span>
        ))}
      </div>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{property.title}</h1>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="p-2 text-white/70 hover:text-white" aria-label="Save property">
            <i className="far fa-heart text-lg" />
          </button>
          <button type="button" className="p-2 text-white/70 hover:text-white" aria-label="Get alerts">
            <i className="far fa-bell text-lg" />
          </button>
        </div>
      </div>

      <p className="text-sm text-white/50">{property.location}</p>

      <div className="flex flex-wrap items-center gap-5 text-sm text-white/80">
        <span className="inline-flex items-center gap-2">
          <i className="fas fa-bed text-lofty/80" aria-hidden="true" />
          {property.beds} Beds
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="fas fa-bath text-lofty/80" aria-hidden="true" />
          {property.baths} Baths
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="fas fa-ruler-combined text-lofty/80" aria-hidden="true" />
          {property.sqft.toLocaleString()} Sqft
        </span>
      </div>

      <p className="text-sm">
        <span className="font-semibold text-lofty underline">Investor Reviews:</span>{' '}
        <span className="text-white/60">
          {Array.from({ length: 5 }, (_, i) => (
            <i
              key={i}
              className={`${i < Math.round(avg) ? 'fas fa-star text-lofty' : 'far fa-star text-white/30'} text-xs`}
              aria-hidden="true"
            />
          ))}{' '}
          {avg.toFixed(1)}/5 ({property.reviews.length} reviews)
        </span>
      </p>
    </section>
  );
}

type PropertyAboutSectionProps = {
  property: MarketplacePropertyDetail;
};

export function PropertyAboutSection({ property }: PropertyAboutSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const preview = property.about.slice(0, 220);

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
        Property managed by <span className="font-semibold text-white">{property.manager}</span>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <i className="fas fa-building text-lofty" aria-hidden="true" />
          About
        </h2>
        <p className="text-sm leading-relaxed text-white/70">
          {expanded ? property.about : `${preview}${property.about.length > 220 ? '...' : ''}`}
        </p>
        {property.about.length > 220 && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 text-sm font-semibold text-lofty hover:underline"
          >
            {expanded ? 'See less' : 'See more'}
          </button>
        )}
      </div>
    </section>
  );
}

type PropertyReviewsSectionProps = {
  property: MarketplacePropertyDetail;
};

export function PropertyReviewsSection({ property }: PropertyReviewsSectionProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">Investor Reviews</h2>
      <ul className="space-y-4">
        {property.reviews.map((review) => (
          <li key={`${review.author}-${review.date}`} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
            <div className="mb-1 flex items-center justify-between gap-3">
              <span className="font-semibold text-white">{review.author}</span>
              <span className="text-xs text-white/40">{review.date}</span>
            </div>
            <div className="mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={`${i < review.rating ? 'fas fa-star text-lofty' : 'far fa-star text-white/30'} text-xs`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-white/70">{review.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

type PropertyChartSectionProps = {
  property: MarketplacePropertyDetail;
};

const RANGES: ChartRange[] = ['1D', '7D', '30D', '90D', '1Y', 'All'];

export function PropertyChartSection({ property }: PropertyChartSectionProps) {
  const [tab, setTab] = useState<'Price' | 'Yield'>('Price');
  const [range, setRange] = useState<ChartRange>('30D');

  const series = useMemo(
    () => generateChartSeries(property.slug, tab, range),
    [property.slug, tab, range],
  );

  const summary = useMemo(() => chartSummary(tab, range, series), [tab, range, series]);
  const linePath = useMemo(() => seriesToSvgPath(series, 600, 160), [series]);
  const areaPath = `${linePath} L 600,160 L 0,160 Z`;

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center gap-6 border-b border-white/10 pb-3">
        {(['Price', 'Yield'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`pb-1 text-sm font-semibold transition-colors ${
              tab === item ? 'border-b-2 border-lofty text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {RANGES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRange(item)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              range === item
                ? 'bg-lofty text-white'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="relative h-48 overflow-hidden rounded-lg bg-lofty-purple-900/40 p-4">
        <svg
          viewBox="0 0 600 160"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`chart-fill-${property.slug}-${tab}-${range}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(123, 97, 255)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="rgb(123, 97, 255)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#chart-fill-${property.slug}-${tab}-${range})`} />
          <path
            d={linePath}
            fill="none"
            stroke="rgb(167, 139, 250)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <p className="mt-3 text-xs text-white/40">
        {tab} trend for {property.title} · {range} · {summary}
      </p>
    </section>
  );
}
