import FadeIn from '../ui/FadeIn';
import FaqAccordionItem from '../ui/FaqAccordionItem';
import { faq } from '../../data/landing';

export default function FaqSection() {
  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 lg:grid-cols-12 lg:px-12">
        <FadeIn className="lg:col-span-4">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-lofty-purple-700 sm:text-4xl">
            {faq.title}
          </h2>
        </FadeIn>
        <div className="grid gap-4 lg:col-span-8">
          {faq.items.map((item, index) => (
            <FadeIn key={item.question} delay={index * 35}>
              <FaqAccordionItem {...item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
