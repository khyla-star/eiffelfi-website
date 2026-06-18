import type { ReactNode } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../styles/learn-theme.css';
import '../../styles/learn.css';

type LearnLayoutProps = {
  children: ReactNode;
  hero?: ReactNode;
  paddedContent?: boolean;
};

export default function LearnLayout({ children, hero, paddedContent = true }: LearnLayoutProps) {
  return (
    <div className="learn-page animate-routeFadeIn">
      <div className="app-container overflow-x-hidden bg-white text-lofty-purple-700">
        <Header />
        <main>
          {hero}
          <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
            <section
              data-testid="main-content"
              id="main-content"
              className={paddedContent ? 'py-10' : 'pb-10 pt-6'}
            >
              {children}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
