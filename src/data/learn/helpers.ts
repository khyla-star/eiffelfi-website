import { learnCollections } from '../learn';
import { learnArticles } from './articles.generated';
import { learnCollectionDetails } from './collectionDetails.generated';
import type { LearnArticle, LearnCollection, LearnCollectionDetail } from '../../types/learn';

export { learnArticles, learnCollectionDetails };

export function getCollectionSlug(collection: LearnCollection): string {
  return collection.slug;
}

export function getCollectionBySlug(slug: string): LearnCollection | undefined {
  return learnCollections.find((collection) => collection.slug === slug);
}

export function getCollectionDetail(collectionId: string): LearnCollectionDetail | undefined {
  return learnCollectionDetails.find((detail) => detail.collectionId === collectionId);
}

export function getArticleBySlug(slug: string): LearnArticle | undefined {
  return learnArticles[slug];
}

export function getCollectionForArticle(article: LearnArticle): LearnCollection | undefined {
  return learnCollections.find((collection) => collection.id === article.collectionId);
}

export function getAllArticleSlugsForCollection(collectionId: string): string[] {
  const detail = getCollectionDetail(collectionId);
  if (!detail) {
    return [];
  }

  const slugs = [...(detail.articleSlugs ?? [])];
  for (const section of detail.sections ?? []) {
    slugs.push(...section.articleSlugs);
  }
  return slugs;
}
