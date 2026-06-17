import LocalLink from '../common/LocalLink';
import FadeIn from '../ui/FadeIn';
import { jerryQuote } from '../../data/landing';

export default function JerryQuoteSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-lofty-gray-300/70 shadow-cardLight [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0">
              <button
                type="button"
                aria-label={jerryQuote.videoLabel}
                className="group absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-lofty-purple-700 p-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lofty/40"
              >
                <img
                  src={jerryQuote.videoImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* <span
                  aria-hidden="true"
                  className="relative z-[1] flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-lofty-purple-700 shadow-lg transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20"
                >
                  <svg viewBox="0 0 24 24" width="28" height="28" className="ml-1" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span> */}
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lofty">{jerryQuote.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-lofty-purple-700 sm:text-4xl lg:text-5xl">
              {jerryQuote.title}
            </h2>
            <p className="mt-6 text-base leading-7 text-lofty-gray-700 sm:text-lg">{jerryQuote.description}</p>
            <LocalLink
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lofty no-underline transition-all hover:gap-3"
              to={jerryQuote.cta.to}
            >
              {jerryQuote.cta.label}
              <span aria-hidden="true">→</span>
            </LocalLink>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
