import { aboutStory } from '../../data/about';

export default function AboutStorySection() {
  const { founder, quote } = aboutStory;

  return (
    <section className="bg-lofty-gray py-14 dark:bg-lofty-purple-700 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <h2 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-lofty-purple-600 dark:text-lofty-gray md:text-6xl">
          {aboutStory.title} <span className="text-lofty-purple">{aboutStory.titleHighlight}</span>
        </h2>
        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-center lg:gap-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lofty-purple-700 via-lofty-purple-800 to-lofty-purple-600 p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-lofty-purple/30 blur-3xl" />
            <div className="relative flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-lofty-purple">
                Leadership
              </span>
              <img
                src={founder.image}
                alt={founder.name}
                className="mt-6 h-32 w-32 rounded-full object-cover ring-4 ring-white/20 sm:h-40 sm:w-40"
              />
              <p className="mt-6 text-xl font-bold text-white">{founder.name}</p>
              <p className="text-sm text-lofty-gray/65">{founder.role}</p>
              {founder.linkedin ? (
                <a href={founder.linkedin} target="_blank" rel="noreferrer" className="mt-4">
                  <img
                    src="/assets/about/linkedin.7defd339fd92d3e5fa034b24a5f10ed6.svg"
                    alt="LinkedIn"
                    className="h-5 w-5 invert opacity-60 transition-opacity hover:opacity-100"
                  />
                </a>
              ) : null}
            </div>
          </div>
          <blockquote className="space-y-5 text-lg leading-8 text-lofty-purple-600/85 dark:text-lofty-gray/85">
            <p>&ldquo;{quote[0]}</p>
            {quote.slice(1, -1).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p>{quote[quote.length - 1]}&rdquo;</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
