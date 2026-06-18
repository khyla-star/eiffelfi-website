import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import LearnHeroSection from '../components/learn/LearnHeroSection';
import LearnLayout from '../components/learn/LearnLayout';
import CollectionGrid from '../components/learn/CollectionGrid';
import { learnCollections } from '../data/learn';
import { learnArticles } from '../data/learn/articles.generated';

function filterCollections(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return learnCollections;
  }

  const matchingArticleCollectionIds = new Set(
    Object.values(learnArticles)
      .filter((article) => {
        const haystack = `${article.title} ${article.body.join(' ')}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .map((article) => article.collectionId),
  );

  return learnCollections.filter((collection) => {
    const haystack = `${collection.title} ${collection.description}`.toLowerCase();
    return haystack.includes(normalized) || matchingArticleCollectionIds.has(collection.id);
  });
}

export default function LearnPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const collections = useMemo(() => filterCollections(searchQuery), [searchQuery]);

  function handleSearchChange(value: string) {
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <LearnLayout
      hero={<LearnHeroSection searchQuery={searchQuery} onSearchChange={handleSearchChange} />}
      paddedContent={false}
    >
      <CollectionGrid collections={collections} />
    </LearnLayout>
  );
}
