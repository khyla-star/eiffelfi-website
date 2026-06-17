import LocalLink from '../common/LocalLink';
import FadeIn from '../ui/FadeIn';
import { finalCta } from '../../data/landing';

export default function FinalCtaSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 lg:gap-14 lg:px-12">
        <FadeIn>
          <div className="rounded-[32px] bg-lofty-purple-700 px-8 py-16 text-center text-white shadow-cardDark sm:px-14 lg:px-20 lg:py-20">
            <h2 className="mx-auto max-w-3xl pb-[0.15em] text-3xl font-bold leading-snug tracking-tight text-transparent bg-clip-text bg-[linear-gradient(90deg,#A5A6F6_0%,#d8d9fc_55%,#E0E0FF_100%)] sm:text-4xl lg:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              {finalCta.description}
            </p>
            <div className="mt-9 flex justify-center">
              <LocalLink
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold !text-lofty-purple-700 no-underline shadow-sm transition-all hover:bg-lofty-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-lofty-purple-700"
                to={finalCta.cta.to}
              >
                {finalCta.cta.label}
                <span aria-hidden="true">→</span>
              </LocalLink>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
