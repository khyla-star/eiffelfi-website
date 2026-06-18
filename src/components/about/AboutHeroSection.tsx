import { aboutHero } from '../../data/about';

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-x-hidden border-b border-lofty-gray-300/60 bg-gradient-to-b from-[#f2f2fc] via-white to-white">
      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-8 pt-12 lg:px-12 lg:pb-16 lg:pt-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,400px)] lg:items-center lg:gap-x-14 lg:gap-y-10">
          <div className="max-w-xl lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-end lg:pt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-lofty/20 bg-lofty/10 px-3 py-1.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lofty" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lofty">
                {aboutHero.eyebrow}
              </span>
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-lofty-purple-700 sm:text-6xl lg:text-7xl">
              {aboutHero.title}{' '}
              <em className="not-italic text-transparent bg-clip-text bg-[linear-gradient(90deg,#4D3FED_0%,#7461FF_55%,#9383FF_100%)]">
                {aboutHero.titleHighlight}
              </em>
            </h1>
          </div>

          <div className="flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:items-center">
            <div className="overflow-hidden rounded-[1.65rem] border border-lofty-gray-300/60 bg-white p-3 shadow-sm">
              <img
                src={aboutHero.image}
                alt={aboutHero.imageAlt}
                className="w-full max-w-xs rounded-2xl object-cover sm:max-w-sm md:max-w-md lg:w-80 lg:max-w-full xl:w-96"
              />
            </div>
          </div>

          <ul className="flex flex-col divide-y divide-lofty-gray-300/60 sm:flex-row sm:divide-x sm:divide-y-0 lg:col-start-1 lg:row-start-2 lg:self-start">
            {aboutHero.features.map((feature) => (
              <li
                key={feature.label}
                className="flex items-center gap-3.5 py-4 first:pt-0 last:pb-0 sm:flex-1 sm:flex-col sm:items-start sm:gap-3 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lofty/10 ring-1 ring-lofty/15">
                  <i className={`fas ${feature.icon} text-base text-lofty`} aria-hidden="true" />
                </div>
                <p className="text-sm leading-6 text-lofty-purple-700">{feature.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
