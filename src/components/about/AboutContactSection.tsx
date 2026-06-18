import LocalLink from '../common/LocalLink';
import { aboutContact } from '../../data/about';

export default function AboutContactSection() {
  return (
    <section className="bg-lofty-gray py-14 dark:bg-lofty-purple-700 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-bold leading-tight tracking-tight text-lofty-purple-600 dark:text-lofty-gray md:text-6xl">
            {aboutContact.title} <span className="text-lofty-purple">{aboutContact.titleHighlight}</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-lofty-purple-600/75 dark:text-lofty-gray/75 sm:text-xl">
            {aboutContact.description}{' '}
            <a
              href={`mailto:${aboutContact.email}`}
              className="font-semibold text-lofty-purple hover:text-lofty-purple-600 dark:hover:text-white"
            >
              {aboutContact.email}
            </a>
            .
          </p>
          <div className="mt-10 flex justify-center">
            <LocalLink
              to={aboutContact.cta.to}
              className="lofty-link-button whitespace-nowrap text-sm sm:text-lg md:px-10 md:py-5 2xl:text-2xl"
            >
              {aboutContact.cta.label}
            </LocalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
