import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LocalLink from '../common/LocalLink';
import Logo from '../common/Logo';
import PrimaryNav from './PrimaryNav';
import { useSiteNotice } from '../../context/SiteNoticeContext';
import { navigation } from '../../data/landing';

export const HEADER_HEIGHT_CLASS = 'h-16';

export default function Header() {
  const { primary, connectWallet } = navigation;
  const { showSiteModificationNotice } = useSiteNotice();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const mobileMenu =
    menuOpen &&
    createPortal(
      <div className="site-mobile-nav" role="presentation">
        <button
          type="button"
          className="site-mobile-nav__backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <nav className="site-mobile-nav__panel" id="site-mobile-nav" aria-label="Mobile">
          <ul className="site-mobile-nav__list">
            {primary.map((link) => (
              <li key={link.label}>
                <LocalLink
                  className="site-mobile-nav__link"
                  to={link.to}
                  onClick={closeMenu}
                >
                  {link.label}
                </LocalLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>,
      document.body,
    );

  return (
    <>
      <header className="site-header">
        <div className={`site-header__inner ${HEADER_HEIGHT_CLASS}`}>
          <LocalLink className="site-header__logo-link" aria-label="EiffelFi home" to="/">
            <Logo variant="light" iconOnly className="site-header__logo site-header__logo--icon" />
            <Logo variant="light" className="site-header__logo site-header__logo--full" />
          </LocalLink>

          <PrimaryNav
            links={primary}
            className="site-header__nav"
            linkClassName="site-header__nav-link"
          />

          <div className="site-header__actions">
            <button type="button" className="site-header__cta" onClick={showSiteModificationNotice}>
              {connectWallet.label}
            </button>
            <button
              type="button"
              className="site-header__menu-btn"
              aria-expanded={menuOpen}
              aria-controls="site-mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i className={`fal ${menuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className={HEADER_HEIGHT_CLASS} aria-hidden="true" />
      {mobileMenu}
    </>
  );
}
