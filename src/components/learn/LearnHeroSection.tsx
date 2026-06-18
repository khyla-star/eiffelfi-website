import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { learnPage } from '../../data/learn';

type LearnHeroSectionProps = {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
};

export default function LearnHeroSection({ searchQuery = '', onSearchChange }: LearnHeroSectionProps) {
  const [query, setQuery] = useState(searchQuery);
  const navigate = useNavigate();
  const location = useLocation();
  const isLearnHome = location.pathname === '/help';

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();

    if (isLearnHome && onSearchChange) {
      onSearchChange(trimmed);
      return;
    }

    navigate(trimmed ? `/help?q=${encodeURIComponent(trimmed)}` : '/help');
  }

  return (
    <section className="learn-hero">
      <div aria-hidden="true" className="learn-hero__glow learn-hero__glow--top" />
      <div aria-hidden="true" className="learn-hero__glow learn-hero__glow--bottom" />
      <div className="learn-hero__inner">
        <h1 className="learn-hero__title">{learnPage.title}</h1>
        <form action="/help" autoComplete="off" onSubmit={handleSubmit} className="learn-hero__search-form">
          <label htmlFor="search-input" className="sr-only">
            {learnPage.searchPlaceholder}
          </label>
          <input
            id="search-input"
            type="search"
            autoComplete="off"
            className="learn-hero__search-input"
            placeholder={learnPage.searchPlaceholder}
            name="q"
            aria-label={learnPage.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </div>
    </section>
  );
}
