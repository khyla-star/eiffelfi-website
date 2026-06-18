import { Navigate, useParams } from 'react-router-dom';
import LearnLayout from '../components/learn/LearnLayout';
import LearnSubpageHero from '../components/learn/LearnSubpageHero';
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
    <LearnLayout
      hero={
        <LearnSubpageHero
          title={collection.title}
          breadcrumbs={[
            { label: 'All Collections', to: '/help' },
            { label: collection.title },
          ]}
        />
      }
    >
      <div className="mb-10">
        <p className="m-0 text-md text-body-secondary-color">{collection.description}</p>
        <p className="mt-4 text-sm text-body-secondary-color">
          {collection.authors} · {collection.articleCount} articles
        </p>
      </div>
      <CollectionArticleList articleSlugs={detail.articleSlugs} sections={detail.sections} />
    </LearnLayout>
  );
}
