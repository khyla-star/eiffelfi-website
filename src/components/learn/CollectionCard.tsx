import LocalLink from '../common/LocalLink';
import type { LearnCollection } from '../../types/learn';

type CollectionCardProps = {
  collection: LearnCollection;
};

function ArticleMeta({ collection }: CollectionCardProps) {
  return (
    <span className="line-clamp-1 flex flex-wrap items-center text-base text-body-secondary-color">
      <span className="hidden sm:inline">{collection.authors}</span>
      <span className="inline sm:hidden">{collection.authorsShort}</span>
      <svg
        width="4"
        height="4"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="m-2"
        aria-hidden="true"
      >
        <path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8Z" />
      </svg>
      {collection.articleCount} articles
    </span>
  );
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <LocalLink
      to={collection.to}
      data-testid="collection-card-classic"
      className="collection-link group/collection-summary flex grow flex-col overflow-hidden rounded-card border border-solid border-card-border bg-card-bg no-underline shadow-card transition ease-linear hover:border-primary-alpha-60"
    >
      <div className="flex grow flex-col gap-4 p-5 sm:flex-row sm:gap-5 sm:p-5" id={collection.id}>
        <div
          className="flex h-10 w-10 items-center justify-start rounded-card-inner bg-cover bg-center sm:h-[86px] sm:w-[86px] sm:justify-center"
          data-test-collection-photo="true"
        >
          <div className="h-7 w-7 sm:h-10 sm:w-10">
            <img src={collection.icon} alt="" width="100%" height="100%" loading="lazy" />
          </div>
        </div>
        <div className="intercom-force-break flex w-full max-w-oneColWidth flex-1 flex-col justify-center text-body-primary-color">
          <div>
            <div
              className="-mt-1 mb-0.5 line-clamp-2 text-md font-semibold leading-normal text-body-primary-color transition ease-linear group-hover/collection-summary:text-primary sm:line-clamp-1"
              data-testid="collection-name"
            >
              {collection.title}
            </div>
            <p className="mb-0 mt-0 line-clamp-3 text-md sm:line-clamp-1">{collection.description}</p>
          </div>
          <div className="mt-3">
            <div className="flex gap-2">
              <ArticleMeta collection={collection} />
            </div>
          </div>
        </div>
      </div>
    </LocalLink>
  );
}
