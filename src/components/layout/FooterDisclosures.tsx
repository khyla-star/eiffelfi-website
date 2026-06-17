import { footerDisclosures } from '../../data/footerDisclosures';

export default function FooterDisclosures() {
  return (
    <section className="py-12 md:py-14">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Disclosures</p>
      <div className="space-y-4 text-[12.5px] leading-6 text-white/55" data-nosnippet="true">
        {footerDisclosures.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
