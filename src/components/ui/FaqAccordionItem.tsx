import type { FaqItem } from '../../types/content';

export default function FaqAccordionItem({ question, answer }: FaqItem) {
  return (
    <details className="group rounded-2xl border border-lofty-gray-300/70 bg-lofty-purple-50/45 p-6 open:bg-white open:shadow-subtle">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-bold text-lofty-purple-700">
        {question}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-lofty transition-transform group-open:rotate-45">
          <i className="fas fa-plus text-xs" aria-hidden="true" />
        </span>
      </summary>
      <p className="mt-4 text-sm leading-6 text-lofty-gray-700">{answer}</p>
    </details>
  );
}
