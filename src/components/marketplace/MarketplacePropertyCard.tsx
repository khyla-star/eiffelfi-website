import { useCallback, useMemo, useState } from 'react';
import type { MarketplaceProperty } from '../../types/marketplace';
import { getTagStyle } from '../../data/marketplace';
import LocalLink from '../common/LocalLink';

const MIN_SLIDES = 3;

type MarketplacePropertyCardProps = {
  property: MarketplaceProperty;
};

function normalizeSlides(property: MarketplaceProperty) {
  const unique = [...new Set([...property.images, property.image].filter(Boolean))];
  return unique.slice(0, Math.max(MIN_SLIDES, Math.min(unique.length, 5)));
}

function CarouselArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      title={direction === 'prev' ? 'View previous image' : 'View next image'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="pointer-events-auto flex h-9 w-9 cursor-pointer select-none items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-150 hover:scale-105 hover:bg-white"
    >
      <svg
        className="h-4 w-4 flex-shrink-0 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {direction === 'prev' ? (
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </button>
  );
}

export default function MarketplacePropertyCard({ property }: MarketplacePropertyCardProps) {
  const slides = useMemo(() => normalizeSlides(property), [property]);
  const [activeSlide, setActiveSlide] = useState(0);
  const showCarousel = slides.length >= MIN_SLIDES;
  const detailPath = `/marketplace/${property.slug}`;

  const goPrev = useCallback(() => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => {
    setActiveSlide((current) => (current + 1) % slides.length);
  }, [slides.length]);

  return (
    <div className="group/card transition-transform duration-200 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute left-2 top-2 z-20 flex max-w-[calc(100%-3rem)] flex-wrap gap-1 md:left-2.5 md:top-2.5 md:gap-1.5">
          {property.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded px-1.5 py-0.5 text-[8px] font-medium tracking-wide backdrop-blur-sm sm:px-2 sm:py-[3px] sm:text-[9px] lg:text-[10px] ${getTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute right-0.5 top-0.5 z-20 flex md:right-1 md:top-1">
          <button
            type="button"
            className="cursor-pointer p-2.5 focus:outline-none"
            aria-label="Save property"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <i className="far fa-heart text-lg text-white/80 transition-colors duration-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.4)] hover:text-lofty-purple-50" />
          </button>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="relative h-full w-full" style={{ paddingTop: '66%' }}>
            <div className="property-card-carousel group/carousel absolute left-0 top-0 h-full w-full overflow-hidden">
              <LocalLink to={detailPath} className="block h-full w-full" aria-label={`View ${property.title}`}>
                <img
                  src={slides[activeSlide]}
                  alt={`${property.title} view ${activeSlide + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={350}
                  height={233}
                />
              </LocalLink>

              {showCarousel && (
                <>
                  <div className="property-card-carousel-arrow pointer-events-none absolute bottom-0 left-1.5 top-0 z-20 items-center opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100">
                    <CarouselArrow direction="prev" onClick={goPrev} />
                  </div>
                  <div className="property-card-carousel-arrow pointer-events-none absolute bottom-0 right-1.5 top-0 z-20 items-center opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100">
                    <CarouselArrow direction="next" onClick={goNext} />
                  </div>
                  <div className="custom-carousel-dots-container" role="tablist" aria-label="Carousel pagination">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        role="tab"
                        aria-label={`Go to slide ${index + 1}`}
                        aria-selected={index === activeSlide}
                        tabIndex={index === activeSlide ? 0 : -1}
                        className={`custom-dot ${index === activeSlide ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveSlide(index);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <LocalLink to={detailPath} className="block pt-3 no-underline">
        <h3 className="truncate text-sm font-semibold text-lofty-purple-600 dark:text-white">{property.title}</h3>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-white/50">{property.location}</p>
        <p className="mt-2 text-xs leading-5">
          <span className="text-sm font-bold text-lofty-purple-600 dark:text-white">{property.tokenPrice}</span>
          <span className="text-gray-500 dark:text-white/50">/share</span>
          <span className="text-lofty-gray-500 dark:text-white/40">
            {' '}
            · <span className="font-semibold text-lofty">{property.yield}</span> avg yield
          </span>
          {property.undervalued ? (
            <span className="cursor-default text-lofty-purple"> · {property.undervalued}</span>
          ) : null}
        </p>
        <p className="mt-1.5 flex items-center gap-1 text-xs text-gray-500 dark:text-white/50">
          <i className="fas fa-users text-[10px] text-lofty/70" aria-hidden="true" />
          <span>
            <span className="font-semibold text-lofty-purple-600 dark:text-white/70">{property.investors}</span>{' '}
            investors
          </span>
        </p>
      </LocalLink>
    </div>
  );
}
