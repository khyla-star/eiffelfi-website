import HeroPropertyCard from '../ui/HeroPropertyCard';
import StatCard from '../ui/StatCard';
import { hero } from '../../data/landing';

export default function HeroSection() {
  return (
    <section className="relative overflow-x-hidden bg-gradient-to-b from-lofty-purple-50 via-white to-white">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 pb-8 pt-9 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-16 lg:pt-20">
        <div className="lg:col-span-6 lg:pt-6">
          <h1 className="text-4xl font-bold leading-[1.04] tracking-tight text-transparent bg-clip-text bg-[linear-gradient(90deg,#9a96cb_0%,#8581bf_20%,#726ebb_40%,#5f5da8_60%,#4d4e92_80%,#3e457e_90%,#323d6e_100%)] sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-6 text-lofty-gray-700 sm:mt-6 sm:text-lg sm:leading-7">
            {hero.description}
          </p>
          <dl className="mt-6 grid max-w-xl grid-cols-3 gap-2 sm:mt-7 sm:gap-3">
            {hero.stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-lofty px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lofty-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lofty focus-visible:ring-offset-2"
            >
              {hero.cta.label}
            </button>
          </div>
        </div>
        <div className="relative min-h-0 lg:col-span-6">
          <HeroPropertyCard {...hero.card} />
        </div>
      </div>
    </section>
  );
}
