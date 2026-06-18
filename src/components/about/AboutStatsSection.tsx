import { aboutStats } from '../../data/about';

export default function AboutStatsSection() {
  return (
    <section className="border-b border-gray-100 bg-white py-14 dark:border-white/10 dark:bg-lofty-purple-800 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-lofty-purple-600 dark:text-lofty-gray md:text-6xl">
          {aboutStats.title} <span className="text-lofty-purple">{aboutStats.titleHighlight}</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-6">
          {aboutStats.items.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl bg-lofty-gray px-4 py-5 dark:bg-lofty-purple-700 sm:px-6 sm:py-7"
            >
              <p className="text-2xl font-bold leading-none text-lofty-purple-600 dark:text-lofty-gray sm:text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-lofty-purple-600/60 dark:text-lofty-gray/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
