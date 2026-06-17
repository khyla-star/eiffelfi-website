import { Navigate, useParams } from 'react-router-dom';
import LearnLayout from '../components/learn/LearnLayout';
import LearnBreadcrumbs from '../components/learn/LearnBreadcrumbs';
import { getArticleBySlug, getCollectionForArticle } from '../data/learn/helpers';

export default function LearnArticlePage() {
  const { slug = '' } = useParams();
  const article = getArticleBySlug(slug);
  const collection = article ? getCollectionForArticle(article) : undefined;

  if (!article || !collection) {
    return <Navigate to="/help" replace />;
  }

  return (
    <LearnLayout>
      <LearnBreadcrumbs
        items={[
          { label: 'All Collections', to: '/help' },
          { label: collection.title, to: collection.to },
          { label: article.title },
        ]}
      />
      <article>
        <h1 className="mb-8 text-3xl font-bold leading-tight text-body-primary-color sm:text-4xl">
          {article.title}
        </h1>
        <div className="space-y-5 text-base leading-7 text-body-primary-color">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="m-0">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </LearnLayout>
  );
}
