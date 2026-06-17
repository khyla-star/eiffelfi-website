import FadeIn from '../ui/FadeIn';
import { legacyMarket } from '../../data/landing';

export default function LegacyMarketSection() {
  return (
    <section className="bg-lofty-purple-700 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {legacyMarket.title}
          </h2>
          <p className="mt-6 text-base leading-7 text-white/80 sm:text-lg">{legacyMarket.description}</p>
        </FadeIn>
        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {legacyMarket.steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 70}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${step.reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}
              >
                <div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lofty-purple-50 text-sm font-bold text-lofty">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-white/80">{step.description}</p>
                </div>
                <div className="overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={1040}
                    height={780}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
