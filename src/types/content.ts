export type NavLink = {
  label: string;
  to: string;
  external?: boolean;
};

export type Stat = {
  label: string;
  value: string;
};

export type OrderBookRow = {
  price: string;
  quantity: string;
  side: 'ask' | 'bid';
  width: string;
};

export type HeroCard = {
  image: string;
  investors: string;
  lastPrice: string;
  change: string;
  orderBook: OrderBookRow[];
};

export type TickerItem = {
  image: string;
  address: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
};

export type PressLogo = {
  src: string;
  alt: string;
  className?: string;
};

export type Step = {
  number: number;
  title: string;
  description: string;
};

export type FeatureStep = {
  number: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export type PropertyCard = {
  to: string;
  image: string;
  title: string;
  location: string;
  yield: string;
  investors: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  source: string;
  initials: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FooterLink = {
  label: string;
  to: string;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};
