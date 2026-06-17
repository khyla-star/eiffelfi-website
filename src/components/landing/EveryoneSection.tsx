import { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonials } from '../../data/landing';

const INITIAL_VISIBLE = 2;
const LOAD_MORE_STEP = 2;

export default function EveryoneSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const allVisible = visibleCount >= testimonials.items.length;
  const visibleItems = testimonials.items.slice(0, visibleCount);

  function handleToggle() {
    if (allVisible) {
      setVisibleCount(INITIAL_VISIBLE);
      return;
    }

    setVisibleCount((count) => Math.min(count + LOAD_MORE_STEP, testimonials.items.length));
  }

  return (
    <section className="bg-lofty-purple-50/60 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-lofty-purple-700 sm:text-4xl lg:text-5xl">
            {testimonials.title}
          </h2>
          <p className="mt-6 text-base leading-7 text-lofty-gray-700 sm:text-lg">{testimonials.description}</p>
        </FadeIn>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {visibleItems.map((item, index) => (
            <li key={item.name}>
              <FadeIn className="h-full" delay={index * 70}>
                <TestimonialCard {...item} />
              </FadeIn>
            </li>
          ))}
        </ul>
        {testimonials.items.length > INITIAL_VISIBLE ? (
          <FadeIn className="mt-12 flex justify-center" delay={90}>
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center rounded-full border border-lofty-purple-700/15 bg-white px-7 py-3.5 text-sm font-semibold text-lofty-purple-700 transition-colors hover:border-lofty-purple-700/30 hover:bg-lofty-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lofty focus-visible:ring-offset-2"
            >
              {allVisible ? 'Show Less' : 'Show More'}
            </button>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
