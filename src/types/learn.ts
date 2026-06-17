export type LearnCollection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  to: string;
  icon: string;
  authors: string;
  authorsShort: string;
  articleCount: number;
};

export type LearnSocialLink = {
  label: string;
  to: string;
  icon: string;
};

export type LearnArticle = {
  slug: string;
  title: string;
  collectionId: string;
  body: string[];
};

export type LearnCollectionSection = {
  title: string;
  articleSlugs: string[];
};

export type LearnCollectionDetail = {
  collectionId: string;
  articleSlugs?: string[];
  sections?: LearnCollectionSection[];
};
