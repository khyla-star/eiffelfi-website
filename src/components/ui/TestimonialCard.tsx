import type { Testimonial } from '../../types/content';

export default function TestimonialCard({ quote, name, source, initials }: Testimonial) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-lofty-gray-300/60 bg-white p-8 shadow-subtle">
      <div className="flex gap-1 text-lofty" role="img" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <i key={index} className="fas fa-star text-sm" aria-hidden="true" />
        ))}
      </div>
      <p className="mt-4 text-base leading-7 text-lofty-purple-700">{quote}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-lofty-gray-300/70 pt-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lofty-purple-100 text-sm font-bold text-lofty-purple-700"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-lofty-purple-700">{name}</p>
          <p className="text-xs text-lofty-gray-700">{source}</p>
        </div>
      </div>
    </div>
  );
}
