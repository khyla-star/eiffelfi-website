import { pressLogos } from '../../data/pressLogos';
import { press } from '../../data/landing';

const logoClassName =
  'h-auto max-h-9 w-auto max-w-[112px] object-contain opacity-60 [filter:grayscale(1)] sm:max-h-10 sm:max-w-[130px]';

export default function PressLogosSection() {
  return (
    <section className="border-y border-lofty-gray-300/60 bg-lofty-gray py-14">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <figure className="mx-auto block max-w-3xl text-center">
          <blockquote className="text-lg font-medium leading-snug tracking-tight text-lofty-purple-700 sm:text-xl">
            {press.quote}
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold tracking-wide text-lofty-purple-700 sm:text-base">
            {press.attribution}
          </figcaption>
        </figure>
        <p className="mt-10 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-lofty-gray-700">
          {press.label}
        </p>
        <ul className="mt-7 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-7">
          {pressLogos.map((logo, index) => (
            <li
              key={logo.alt}
              className={`flex h-14 w-full items-center justify-center ${index === pressLogos.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <img src={logo.src} alt={logo.alt} className={logoClassName} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
