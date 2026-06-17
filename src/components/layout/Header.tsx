import LocalLink from '../common/LocalLink';
import PrimaryNav from './PrimaryNav';
import { navigation } from '../../data/landing';

export default function Header() {
  const { primary, connectWallet } = navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-lofty-gray-300/60 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-6 px-6 lg:gap-10 lg:px-12">
        <LocalLink className="flex shrink-0 items-center" aria-label="EiffelFi home" to="/">
          EiffelFi
        </LocalLink>
        <PrimaryNav
          links={primary}
          className="-ml-1 flex items-center gap-4 sm:gap-7 lg:-ml-2"
          linkClassName="text-sm text-lofty-purple-700 no-underline transition-colors hover:text-lofty"
        />
        <button
          type="button"
          className="ml-auto inline-flex shrink-0 items-center rounded-full bg-lofty px-4 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition-colors hover:bg-lofty-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lofty focus-visible:ring-offset-2 sm:px-5"
        >
          {connectWallet.label}
        </button>
      </div>
    </header>
  );
}
