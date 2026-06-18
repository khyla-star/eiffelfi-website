import type { ReactNode } from 'react';
import LearnHeroBreadcrumbs from './LearnHeroBreadcrumbs';

type LearnSubpageHeroProps = {
  title: string;
  breadcrumbs: Array<{ label: string; to?: string }>;
  subtitle?: string;
  children?: ReactNode;
};

export default function LearnSubpageHero({ title, breadcrumbs, subtitle, children }: LearnSubpageHeroProps) {
  return (
    <section className="learn-hero">
      <div aria-hidden="true" className="learn-hero__glow learn-hero__glow--top" />
      <div aria-hidden="true" className="learn-hero__glow learn-hero__glow--bottom" />
      <div className="learn-hero__inner learn-hero__inner--subpage">
        <LearnHeroBreadcrumbs items={breadcrumbs} />
        {subtitle ? <p className="learn-hero__subtitle">{subtitle}</p> : null}
        <h1 className="learn-hero__title learn-hero__title--subpage">{title}</h1>
        {children}
      </div>
    </section>
  );
}
