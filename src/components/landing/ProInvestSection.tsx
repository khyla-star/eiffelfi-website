import LocalLink from '../common/LocalLink';
import FadeIn from '../ui/FadeIn';
import BenefitCard from '../ui/BenefitCard';
import { proInvest } from '../../data/landing';

export default function ProInvestSection() {
  return (
    <section className="bg-gradient-to-b from-lofty-purple-50/90 via-white to-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-lofty-purple-700 sm:text-4xl lg:text-5xl">
            {proInvest.title}
          </h2>
          <p className="mt-6 text-base leading-7 text-lofty-gray-700 sm:text-lg">{proInvest.description}</p>
        </FadeIn>
        <ul className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {proInvest.benefits.map((benefit, index) => (
            <li key={benefit.title}>
              <FadeIn className="h-full" delay={index * 55}>
                <BenefitCard {...benefit} />
              </FadeIn>
            </li>
          ))}
        </ul>
        <FadeIn className="mt-12 flex justify-center" delay={90}>
          <LocalLink
            className="inline-flex items-center gap-2 rounded-full bg-lofty px-7 py-3.5 text-sm font-semibold !text-white no-underline shadow-sm transition-all hover:bg-lofty-purple-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lofty focus-visible:ring-offset-2"
            to={proInvest.cta.to}
          >
            {proInvest.cta.label}
            <span aria-hidden="true">→</span>
          </LocalLink>
        </FadeIn>
      </div>
    </section>
  );
}
