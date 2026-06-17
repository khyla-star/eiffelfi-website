import LocalLink from '../common/LocalLink';
import { getArticleBySlug } from '../../data/learn/helpers';
import type { LearnCollectionSection } from '../../types/learn';

type ArticleListProps = {
  articleSlugs: string[];
};

function ArticleLinks({ articleSlugs }: ArticleListProps) {
  return (
    <ul className="m-0 list-none divide-y divide-body-border p-0">
      {articleSlugs.map((slug) => {
        const article = getArticleBySlug(slug);
        if (!article) {
          return null;
        }

        return (
          <li key={slug}>
            <LocalLink
              to={`/help/articles/${slug}`}
              className="flex items-center justify-between gap-4 py-4 text-md text-body-primary-color no-underline transition-colors hover:text-primary"
            >
              <span>{article.title}</span>
              <span aria-hidden="true" className="text-body-secondary-color">
                →
              </span>
            </LocalLink>
          </li>
        );
      })}
    </ul>
  );
}

type CollectionArticleListProps = {
  articleSlugs?: string[];
  sections?: LearnCollectionSection[];
};

export default function CollectionArticleList({ articleSlugs, sections }: CollectionArticleListProps) {
  return (
    <div className="flex flex-col gap-10">
      {articleSlugs && articleSlugs.length > 0 ? <ArticleLinks articleSlugs={articleSlugs} /> : null}
      {sections?.map((section) => (
        <section key={section.title}>
          <h2 className="mb-4 text-lg font-semibold text-body-primary-color">{section.title}</h2>
          <ArticleLinks articleSlugs={section.articleSlugs} />
        </section>
      ))}
    </div>
  );
}
