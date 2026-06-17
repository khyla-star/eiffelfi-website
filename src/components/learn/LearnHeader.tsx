import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocalLink from '../common/LocalLink';
import PrimaryNav from '../layout/PrimaryNav';
import { navigation } from '../../data/landing';
import { learnPage } from '../../data/learn';

type LearnHeaderProps = {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
};

export default function LearnHeader({ searchQuery = '', onSearchChange }: LearnHeaderProps) {
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
    <header id="header" data-testid="header" className="flex flex-col text-header-color">
      <div className="relative mb-9 flex grow flex-col bg-header-bg bg-header-image bg-cover bg-center pb-9 sm:min-h-header">
        <div className="flex h-full flex-col items-center">
          <section className="relative mb-6 flex w-full flex-col pb-6">
            <div className="header__meta_wrapper flex justify-center px-5 pt-6 leading-none sm:px-10">
              <div className="flex w-240 items-center gap-6 sm:gap-8" data-testid="subheader-container">
                <div className="header__site_name">
                  <div className="header__logo">
                    <LocalLink to="/help">
                      <img src={learnPage.logo} height={181} alt={learnPage.siteName} />
                    </LocalLink>
                  </div>
                </div>
                <PrimaryNav
                  links={navigation.primary}
                  className="-ml-1 flex items-center gap-4 sm:gap-6 lg:-ml-2"
                  linkClassName="text-sm font-semibold text-header-color no-underline transition-opacity hover:opacity-80"
                />
              </div>
            </div>
          </section>
          <section className="relative mx-5 flex h-full w-full flex-col items-center px-5 sm:px-10">
            <div className="flex h-full w-240 max-w-full flex-col justify-end" data-testid="main-header-container">
              <h1 className="text-7 mb-6 text-start font-bold text-header-color">{learnPage.title}</h1>
              <div id="search-bar" className="relative w-full">
                <form action="/help" autoComplete="off" onSubmit={handleSubmit}>
                  <div className="flex w-full flex-col items-start">
                    <div className="relative flex w-full sm:w-search-bar">
                      <label htmlFor="search-input" className="sr-only">
                        {learnPage.searchPlaceholder}
                      </label>
                      <input
                        id="search-input"
                        type="text"
                        autoComplete="off"
                        className="w-full rounded-search-bar border border-black-alpha-8 bg-white-alpha-20 p-4 font-secondary text-lg text-header-color shadow-search-bar outline-none transition ease-linear placeholder:text-header-color hover:bg-white-alpha-27 hover:shadow-search-bar-hover focus:border-transparent focus:bg-white focus:text-black-10 focus:shadow-search-bar-focused placeholder:focus:text-black-45"
                        placeholder={learnPage.searchPlaceholder}
                        name="q"
                        aria-label={learnPage.searchPlaceholder}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </header>
  );
}
