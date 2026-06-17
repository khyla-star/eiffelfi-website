import LocalLink from '../common/LocalLink';
import FadeIn from '../ui/FadeIn';
import { howItWorks } from '../../data/landing';

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-lofty-purple-700 sm:text-4xl">
            {howItWorks.title}
          </h2>
        </FadeIn>
        <ol className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-6">
          {howItWorks.steps.map((step, index) => (
            <li key={step.number} className="h-full">
              <FadeIn className="h-full" delay={index * 60}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-lofty-gray-300/70 bg-lofty-purple-50/45 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-lofty shadow-subtle">
                    {step.number}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-snug text-lofty-purple-700">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-lofty-gray-700">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
        <FadeIn className="mt-10 flex justify-center" delay={120}>
          <LocalLink
            className="inline-flex items-center gap-2 rounded-full bg-lofty px-7 py-3.5 text-sm font-semibold !text-white no-underline shadow-sm transition-all hover:bg-lofty-purple-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lofty focus-visible:ring-offset-2"
            to={howItWorks.cta.to}
          >
            {howItWorks.cta.label}
            <span aria-hidden="true">→</span>
          </LocalLink>
        </FadeIn>
      </div>
    </section>
  );
}
