import type { ReactNode } from 'react';
import LearnHeader from './LearnHeader';
import LearnFooter from './LearnFooter';
import '../../styles/learn-theme.css';
import '../../styles/learn.css';

type LearnLayoutProps = {
  children: ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  paddedContent?: boolean;
};

export default function LearnLayout({
  children,
  searchQuery = '',
  onSearchChange,
  paddedContent = true,
}: LearnLayoutProps) {
  return (
    <div className="learn-page animate-routeFadeIn">
      <div dir="ltr" className="h-full w-full">
        <a
          href="#main-content"
          className="sr-only font-bold text-header-color focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to main content
        </a>
        <main>
          <LearnHeader searchQuery={searchQuery} onSearchChange={onSearchChange} />
          <div className="z-1 flex shrink-0 grow basis-auto justify-center px-5 sm:px-10">
            <section
              data-testid="main-content"
              id="main-content"
              className={`w-240 max-w-full${paddedContent ? ' py-10' : ''}`}
            >
              {children}
            </section>
          </div>
          <LearnFooter />
        </main>
      </div>
    </div>
  );
}
