import { aboutBackers } from '../../data/about';

export default function AboutBackersSection() {
  return (
    <section className="bg-lofty-gray py-14 dark:bg-lofty-purple-700 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-lofty-purple-600 dark:text-lofty-gray md:text-6xl">
          {aboutBackers.title} <span className="text-lofty-purple">{aboutBackers.titleHighlight}</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:mt-12 sm:grid-cols-5 sm:gap-x-10 sm:gap-y-10">
          {aboutBackers.logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="max-h-12 w-full object-contain grayscale opacity-70 dark:invert sm:max-h-14"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
