import type { AboutFeature, AboutFounder, AboutStat, AboutTeamMember } from '../types/about';
import { aboutBackerLogos, aboutPressLogos } from './aboutLogos.generated';

const asset = (file: string) => `/assets/about/${file}`;

export const aboutHero = {
  eyebrow: 'About EiffelFi',
  title: 'Opening global real estate to',
  titleHighlight: 'every investor.',
  image: asset('yc-team.png'),
  imageAlt: 'The EiffelFi team building the future of tokenized real estate',
  features: [
    { icon: 'fa-wallet', label: 'Connect your wallet to access the global marketplace' },
    { icon: 'fa-globe-americas', label: 'Invest in tokenized properties across world markets' },
    { icon: 'fa-coins', label: 'Earn rental income deposited directly to your wallet' },
  ] satisfies AboutFeature[],
};

export const aboutStats = {
  title: 'Global reach,',
  titleHighlight: 'real results.',
  items: [
    { value: '$100M+', label: 'invested in tokenized real estate' },
    { value: '$5.2M+', label: 'distributed to investors worldwide' },
    { value: '40K+', label: 'investors on EiffelFi' },
    { value: '4.7★', label: 'average Google rating' },
  ] satisfies AboutStat[],
};

export const aboutBackers = {
  title: 'Backed by',
  titleHighlight: 'industry leaders.',
  logos: aboutBackerLogos,
};

export const aboutPress = {
  title: 'Featured',
  titleHighlight: 'in the press.',
  logos: aboutPressLogos,
};

export const aboutStory = {
  title: 'Why we built',
  titleHighlight: 'EiffelFi.',
  founder: {
    name: 'Neil Bailey',
    role: 'CEO, EiffelFi',
    image: asset('ceo.png'),
  } as AboutFounder,
  quote: [
    'Real estate has always been one of the strongest ways to build wealth — but for most people, high entry costs, geographic barriers, and opaque processes make global ownership out of reach.',
    'EiffelFi was built to change that. We tokenize income-producing properties so anyone with a connected wallet can buy fractional shares, earn rental income, and trade on a transparent marketplace — without borders, brokers, or months of paperwork.',
    'Our vision is borderless access to real-world assets: fractional ownership, global opportunity, blockchain transparency, and the liquidity investors expect from modern markets.',
  ],
};

export const aboutTeam = {
  title: 'Meet the',
  titleHighlight: 'EiffelFi team.',
  members: [
    {
      name: 'Neil Bailey',
      role: 'CEO',
      bio: 'Leads EiffelFi’s mission to make global real estate ownership accessible through tokenization, transparent data, and a liquid investor marketplace.',
      image: asset('ceo.png'),
    },
    {
      name: 'Max Ball',
      role: 'Chief Operating Officer',
      bio: 'Oversees EiffelFi marketplace operations, investor support, and property workflows so owners can connect, invest, earn, and exit with confidence.',
      image: asset('max.87d9bb37fb7f1561cd8c.jpeg'),
      linkedin: 'https://www.linkedin.com/in/maxball/',
    },
    {
      name: 'Mark Keane',
      role: 'Founding Engineer',
      bio: 'Builds the core platform and blockchain infrastructure that powers every EiffelFi trade, wallet payout, and property workflow.',
      image: asset('mark.5370931c14d25d089fc7.png'),
    },
  ] satisfies AboutTeamMember[],
};

export const aboutContact = {
  title: 'Ready to',
  titleHighlight: 'get started?',
  description: 'Questions about investing, your wallet, or partnership opportunities? Email us at',
  email: 'support@eiffelfi.com',
  cta: { label: 'Browse Properties', to: '/marketplace' },
};
