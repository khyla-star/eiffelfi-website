import type {
  FaqItem,
  FeatureStep,
  HeroCard,
  NavLink,
  PropertyCard,
  Stat,
  Step,
  Testimonial,
  TickerItem,
} from '../types/content';
import { marketplaceTicker } from './marketplaceTicker';

import { brandLogo } from './brand';

export const navigation = {
  logo: {
    light: brandLogo.light,
    dark: brandLogo.dark,
    icon: brandLogo.icon,
  },
  primary: [
    { label: 'Invest', to: '/marketplace' },
    { label: 'About', to: '/about' },
    { label: 'Learn', to: '/help' },
  ] satisfies NavLink[],
  connectWallet: { label: 'Connect Wallet' },
};

export const hero = {
  title: 'Own Global Real Estate Without Borders',
  description:
    "Invest in tokenized properties worldwide. Earn real-world income, access fractional ownership, and participate in a transparent, blockchain-powered real estate ecosystem.",
  stats: [
    { label: 'Total Invested', value: '$100M+' },
    { label: 'Distributed to Investors', value: '$5.2M+' },
    { label: 'Google Reviews', value: '4.7★' },
  ] satisfies Stat[],
  cta: { label: 'Connect Wallet' },
  card: {
    image: '/assets/hero-hearn.webp',
    investors: '354 investors',
    lastPrice: '$35.59',
    change: '+-18.39%',
    orderBook: [
      { price: '$37.33', quantity: '47', side: 'ask', width: '34%' },
      { price: '$37.27', quantity: '28', side: 'ask', width: '22%' },
      { price: '$37.53', quantity: '84', side: 'bid', width: '68%' },
      { price: '$37.49', quantity: '131', side: 'bid', width: '88%' },
    ],
  } satisfies HeroCard,
};

export const tickerItems = marketplaceTicker as TickerItem[];

export const press = {
  quote:
    '“EiffelFi is backed by Y Combinator, the Silicon Valley start-up incubator that spawned companies including Airbnb and the crypto exchange Coinbase.”',
  attribution: '— Financial Times',
  label: 'As seen on:',
};

export const howItWorks = {
  title: 'Get your first rent payment in minutes, not months',
  steps: [
    {
      number: 1,
      title: 'Connect your wallet',
      description: 'Securely connect your wallet to access the Eiffelfi real estate marketplace.',
    },
    {
      number: 2,
      title: 'Explore global properties',
      description: 'Browse tokenized real estate opportunities with transparent financial data.',
    },
    {
      number: 3,
      title: 'Invest and earn',
      description: 'Purchase fractional ownership and receive rental income directly to your wallet.',
    },
  ] satisfies Step[],
  cta: { label: 'Browse Available Properties', to: '/marketplace' },
};

export const jerryQuote = {
  eyebrow: 'EiffelFi Value',
  title: "Why Eiffelfi",
  description: "Fractional Ownership, Global Access, Blockchain Transparency, Enhanced Liquidity",
  cta: { label: 'Meet the team', to: '/about' },
  videoImage: '/assets/maxresdefault.jpg',
  videoLabel: 'Play video: Building the NASDAQ for real estate with EiffelFi co-founder Jerry Chu',
};

export const legacyMarket = {
  title: "Don’t get left behind by traditional real estate",
  description:
    "Real estate has always been one of the strongest ways to build wealth — but high entry costs, complex processes, and limited access make it difficult for most people to participate. Eiffelfi makes it simple to invest in real estate through fractional ownership, so anyone can start building a portfolio.",
  steps: [
    {
      number: 1,
      title: 'Connect and start investing',
      description: 'Connect your wallet and explore tokenized real estate opportunities from around the world. A simple marketplace showing global property listings available for investment.',
      image: '/assets/feature-step1.f6bcc57881356593e40f.webp',
      imageAlt: 'A grid of EiffelFi rental properties available for fractional investing.',
    },
    {
      number: 2,
      title: 'Earn rental income automatically',
      description:
        'Once you invest, you start receiving rental income from real-world properties directly to your wallet. Your earnings grow as the property performs over time. A dashboard showing daily income and portfolio growth.',
      image: '/assets/feature-step2.af6c8a92ac29862be487.webp',
      imageAlt: 'A dashboard showing daily rental income payouts.',
      reverse: true,
    },
    {
      number: 3,
      title: 'Grow your real estate portfolio',
      description:
        'Reinvest your earnings or diversify into more properties — building a global real estate portfolio over time.',
      image: '/assets/feature-step3.1ca93ba790b4bb7469b6.webp',
      imageAlt: 'A chart showing portfolio growth over time.',
    },
  ] satisfies FeatureStep[],
};

export const featuredProperties = {
  title: 'Invest in fractions of real estate across global markets',
  description:
    'All without leaving your living room. No experience, connections, or large down payments required.',
  properties: [
    {
      to: '/property_deal/14018-Arcadia-Road-NE_Albuquerque-NM-87123',
      image: '/assets/01HZJNXHYCEM8D9W7WV0GSVN5J.webp',
      title: '14018 Arcadia Road NE',
      location: 'Albuquerque, NM, 87123',
      yield: '13.29%',
      investors: '305 investors',
    },
    {
      to: '/property_deal/9-Country-Club-Ln-N_Briarcliff-Manor-NY-10510',
      image: '/assets/01KPCJ6JCZX2VXZ51T8FFQ34X6.webp',
      title: '9 Country Club Ln N',
      location: 'Briarcliff Manor, NY, 10510',
      yield: '4.89%',
      investors: '199 investors',
    },
    {
      to: '/property_deal/6601-E-Hearn-Rd_Scottsdale-AZ-85254',
      image: '/assets/01JK78G5F00ZVVBANM5ZTM3Q6M.webp',
      title: '6601 E Hearn Rd',
      location: 'Scottsdale, AZ, 85254',
      yield: '8.42%',
      investors: '354 investors',
    },
  ] satisfies PropertyCard[],
};

export const proInvest = {
  title: "You don’t need to be a pro to invest like one",
  description:
    'Get instant access to curated real estate opportunities, transparent financial data, and a global community of investors building wealth through real-world assets.',
  benefits: [
    {
      title: 'Skip the high down payments',
      description: 'Acquire fractional ownership of global real estate starting with small investments — no large capital required.',
      image: '/assets/why-lofty-1.1b81c82f5ae06c447b2e.webp',
      imageAlt: 'Illustration: skip the down payment on rental property shares',
    },
    {
      title: 'Earn income and long-term value',
      description:
        'Receive rental income directly to your wallet and benefit from property value growth when you choose to exit.',
      image: '/assets/why-lofty-2.d2007565aef4e1038292.webp',
      imageAlt: 'Illustration: earn rent and appreciation on your holdings',
    },
    {
      title: 'Own real estate without the operational burden',
      description:
        'Diversify across multiple properties while professional property managers handle day-to-day operations.',
      image: '/assets/why-lofty-3.75c4d2069ddd12b71cff.webp',
      imageAlt: 'Illustration: diversified properties with professional management',
    },
    {
      title: 'Stay fully in control',
      description:
        'Buy, sell, or reinvest your holdings anytime through a liquid, transparent marketplace — no traditional brokers or lock-in restrictions.',
      image: '/assets/why-lofty-4.3b945e392f1369585c6b.webp',
      imageAlt: 'Illustration: stay in control of buying, selling, and reinvesting',
    },
  ],
  cta: { label: 'Browse Available Properties', to: '/marketplace' },
};

export const testimonials = {
  title: 'Everyone deserves to own something real',
  description: 'Join a growing community of investors building wealth through global real estate ownership — for themselves and their families.',
  items: [
    {
      quote:
        '“I started with a small amount and already seeing consistent rental income flowing in. Reinvesting is where the real growth happens.”',
      name: '@wackymadness',
      source: 'X (formerly Twitter)',
      initials: 'W',
    },
    {
      quote:
        '“I’ve been exploring Eiffelfi since the early properties. The idea of owning global real estate through fractional shares just makes sense.”',
      name: 'Mark McDowell',
      source: 'Product Hunt',
      initials: 'MM',
    },
    {
      quote: '“The experience is surprisingly simple. You invest, and you start seeing real rental income without dealing with property management.”',
      name: 'Jonathan Brickman',
      source: 'Trustpilot',
      initials: 'JB',
    },
    {
      quote: '“Love love love EiffelFi, this is the best real estate investment idea.”',
      name: 'Kelli Mitchell',
      source: 'Trustpilot',
      initials: 'KM',
    },
  ] satisfies Testimonial[],
  cta: { label: 'Reviews & Press', to: '/reviews' },
};

export const faq = {
  title: 'Know how EiffelFi works before you buy',
  items: [
    {
      question: 'How quickly can I start investing?',
      answer:
        'You can start investing within minutes after connecting your wallet and completing a simple onboarding process. Once set up, you immediately gain access to available real estate opportunities.',
    },
    {
      question: 'When do investors receive rent?',
      answer:
        'Rental income is distributed directly to your wallet on a regular schedule, giving you transparent and real-time visibility of your earnings. Timing may vary by property, but payouts are designed to be frequent and predictable.',
    },
    {
      question: 'Can I sell my ownership?',
      answer:
        'Yes, you can list your fractional ownership on the Eiffelfi marketplace at any time. Sales depend on market demand, allowing flexibility while maintaining a transparent trading system.',
    },
    {
      question: 'Does EiffelFi manage the properties?',
      answer:
        'Yes, all properties are managed by professional property management teams. They handle tenants, maintenance, and operations to ensure the assets remain income-generating.',
    },
    {
      question: 'What is the minimum investment?',
      answer:
        'Minimum investment is designed to be accessible, allowing you to start with a small amount depending on the property listing.',
    },
  ] satisfies FaqItem[],
};

export const finalCta = {
  title: 'Start building wealth for wherever your journey takes you',
  description: "Don't get left behind. Start investing in fractional real estate.",
  cta: { label: 'View Properties', to: '/marketplace' },
};

export const footer = {
  tagline: 'Buy and own real estate shares. Earn daily rent. Sell anytime.',
  socialLabel: 'Follow us',
  links: [
    { label: 'Invest', to: '/marketplace' },
    { label: 'About us', to: '/about' },
    { label: 'Learn', to: '/help' },
  ] satisfies NavLink[],
};
