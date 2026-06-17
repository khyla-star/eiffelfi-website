import { Navigate, useParams } from 'react-router-dom';
import LearnLayout from '../components/learn/LearnLayout';
import LearnBreadcrumbs from '../components/learn/LearnBreadcrumbs';
import CollectionArticleList from '../components/learn/CollectionArticleList';
import { getCollectionBySlug, getCollectionDetail } from '../data/learn/helpers';

export default function LearnCollectionPage() {
  const { slug = '' } = useParams();
  const collection = getCollectionBySlug(slug);
  const detail = collection ? getCollectionDetail(collection.id) : undefined;

  if (!collection || !detail) {
    return <Navigate to="/help" replace />;
  }

  return (
    <LearnLayout>
      <LearnBreadcrumbs
        items={[
          { label: 'All Collections', to: '/help' },
          { label: collection.title },
        ]}
      />
      <div className="mb-10 flex items-start gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card-inner bg-primary-alpha-10">
          <img src={collection.icon} alt="" className="h-10 w-10" />
        </div>
        <div>
          <h1 className="mb-3 text-3xl font-bold text-body-primary-color">{collection.title}</h1>
          <p className="m-0 text-md text-body-secondary-color">{collection.description}</p>
          <p className="mt-4 text-sm text-body-secondary-color">
            {collection.authors} · {collection.articleCount} articles
          </p>
        </div>
      </div>
      <CollectionArticleList articleSlugs={detail.articleSlugs} sections={detail.sections} />
    </LearnLayout>
  );
}
