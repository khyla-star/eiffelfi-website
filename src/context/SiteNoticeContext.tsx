import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import Toast from '../components/ui/Toast';

export const SITE_MODIFICATION_NOTICE = 'The site is currently being modified.';

type SiteNoticeContextValue = {
  showSiteModificationNotice: () => void;
};

const SiteNoticeContext = createContext<SiteNoticeContextValue | null>(null);

export function SiteNoticeProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<string | null>(null);

  const showSiteModificationNotice = useCallback(() => {
    setNotice(SITE_MODIFICATION_NOTICE);
  }, []);

  return (
    <SiteNoticeContext.Provider value={{ showSiteModificationNotice }}>
      {children}
      <Toast
        message={notice}
        onDismiss={() => setNotice(null)}
        placement="top-right"
        title="Notice"
        iconClassName="fas fa-screwdriver-wrench"
      />
    </SiteNoticeContext.Provider>
  );
}

export function useSiteNotice() {
  const context = useContext(SiteNoticeContext);
  if (!context) {
    throw new Error('useSiteNotice must be used within SiteNoticeProvider');
  }
  return context;
}
