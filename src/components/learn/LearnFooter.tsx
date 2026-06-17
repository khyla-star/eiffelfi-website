import LocalLink from '../common/LocalLink';
import { learnPage, learnSocialLinks } from '../../data/learn';

export default function LearnFooter() {
  return (
    <footer id="footer" className="mt-24 shrink-0 bg-footer-bg px-0 py-12 text-left text-base text-footer-color">
      <div className="shrink-0 grow basis-auto px-5 sm:px-10">
        <div className="mx-auto max-w-240 sm:w-auto">
          <div className="text-center" data-testid="simple-footer-layout">
            <div className="align-middle text-lg text-footer-color">
              <LocalLink className="no-underline" to="/help">
                <img
                  data-testid="logo-img"
                  src={learnPage.logo}
                  alt={learnPage.siteName}
                  className="inline max-h-8 contrast-80"
                />
              </LocalLink>
            </div>
            <div className="mt-10" data-testid="simple-footer-links">
              <ul
                data-testid="social-links"
                className="flex flex-wrap items-center justify-center gap-4 p-0"
                id="social-links"
              >
                {learnSocialLinks.map((link) => (
                  <li key={link.to} className="list-none align-middle">
                    <LocalLink
                      to={link.to}
                      target="_blank"
                      rel="nofollow noreferrer noopener"
                      aria-label={link.label}
                      className="no-underline"
                    >
                      <img src={link.icon} alt="" width={16} height={16} loading="lazy" />
                    </LocalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
