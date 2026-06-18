import { useState } from 'react';
import type { MarketplacePropertyDetail } from '../../types/marketplace';

type PropertyGalleryProps = {
  property: MarketplacePropertyDetail;
};

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const photos = property.allPhotos;
  const [showAll, setShowAll] = useState(false);
  const visiblePhotos = showAll ? photos : photos.slice(0, 4);

  return (
    <section aria-label="Property photos" className="relative">
      <div className="marketplace-filter-scroll flex gap-1 overflow-x-auto">
        {visiblePhotos.map((photo, index) => (
          <div
            key={`${photo}-${index}`}
            className={`h-44 shrink-0 overflow-hidden md:h-52 lg:h-56 ${
              showAll ? 'w-64' : 'w-[calc(50%-2px)] flex-none sm:w-[calc(33.333%-3px)] lg:w-auto lg:min-w-0 lg:flex-1'
            }`}
          >
            <img
              src={photo}
              alt={`${property.title} photo ${index + 1}`}
              className="h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {photos.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAll((open) => !open)}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-lofty-purple-700 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
        >
          <i className="far fa-images" aria-hidden="true" />
          {showAll ? 'Show fewer photos' : 'View all photos'}
        </button>
      )}
    </section>
  );
}
