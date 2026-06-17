import FadeIn from '../ui/FadeIn';
import PropertyCard from '../ui/PropertyCard';
import { featuredProperties } from '../../data/landing';

export default function PropertyFractionsSection() {
  return (
    <section className="bg-lofty-purple-50/60 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-lofty-purple-700 sm:text-4xl lg:text-5xl">
            {featuredProperties.title}
          </h2>
          <p className="mt-6 text-base leading-7 text-lofty-gray-700 sm:text-lg">{featuredProperties.description}</p>
        </FadeIn>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredProperties.properties.map((property, index) => (
            <li key={property.to}>
              <FadeIn className="h-full" delay={index * 60}>
                <PropertyCard {...property} />
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
