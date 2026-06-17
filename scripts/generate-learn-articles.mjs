import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const BRAND = 'EiffelFi';

function brand(text) {
  return text
    .replaceAll('Lofty AI', BRAND)
    .replaceAll('Lofty Marketplace', `${BRAND} Marketplace`)
    .replaceAll('Lofty Wallet', `${BRAND} Wallet`)
    .replaceAll('Lofty Governance', `${BRAND} Governance`)
    .replaceAll('Lofty Referral Program', `${BRAND} Referral Program`)
    .replaceAll('Lofty properties', `${BRAND} properties`)
    .replaceAll('Lofty property', `${BRAND} property`)
    .replaceAll('Lofty shares', 'property tokens')
    .replaceAll('Lofty', BRAND);
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function articleParagraphs(title, collectionId, kind = 'guide') {
  if (kind === 'glossary') {
    const glossary = {
      IRR: `${title} (Internal Rate of Return) measures the annualized return of an investment over time, accounting for cash flows such as rental income and eventual sale proceeds. On ${BRAND}, you can compare projected IRR across tokenized properties before you invest.`,
      'Cash on Cash return (CoC)': `${title} compares annual pre-tax cash flow to the total cash invested. It helps ${BRAND} investors understand how much rental income a property generates relative to the amount they put in.`,
      'Cap rate': `${title} is net operating income divided by property value. ${BRAND} displays cap rate data so investors can evaluate yield independent of financing decisions.`,
      Appreciation: `${title} is the increase in a property's market value over time. ${BRAND} investors may benefit from appreciation when property tokens trade at higher prices or when a property is sold.`,
      'Net Operating Income (NOI)': `${title} is rental income minus operating expenses before debt service and taxes. ${BRAND} uses NOI to communicate property performance to token holders.`,
      Diversification: `${title} means spreading investments across multiple assets to reduce risk. ${BRAND} enables diversification by letting you buy fractional shares in many properties with a connected wallet.`,
      'Operating Expenses': `${title} include costs such as maintenance, insurance, property taxes, and management fees. These are deducted from gross rent before income is distributed on ${BRAND}.`,
      CapEx: `${title} (capital expenditures) covers major improvements or replacements, such as roofs or HVAC systems. ${BRAND} properties maintain reserves for these expenses.`,
      'Single Family': `${title} homes are detached residences designed for one household. Many ${BRAND} listings are single-family rentals in markets across the United States.`,
      Duplex: `${title} buildings contain two separate living units. They can offer multiple income streams while remaining accessible to fractional investors on ${BRAND}.`,
      Triplex: `${title} properties include three rental units in one building, combining residential stability with diversified rent rolls.`,
      'Quadplex/Fourplex': `${title} buildings contain four units. They are popular with investors seeking scale while staying in residential real estate.`,
      'Residential real estate': `${title} includes homes and small multi-family buildings used as dwellings. ${BRAND} focuses primarily on income-producing residential assets.`,
      'Commercial real estate': `${title} includes office, retail, and other non-residential buildings. Some ${BRAND} educational materials reference commercial concepts for comparison.`,
      'Industrial real estate': `${title} covers warehouses, manufacturing, and logistics facilities. It is a distinct asset class from the residential tokens on ${BRAND}.`,
      Land: `${title} is undeveloped or agricultural property without structures. ${BRAND} currently tokenizes income-producing improved real estate rather than raw land.`,
      'Special purpose': `${title} real estate is built for a specific use, such as churches or self-storage. These assets require specialized underwriting.`,
      'Capital Gains Tax': `${title} may apply when you sell property tokens for more than your cost basis. Consult a tax professional about your ${BRAND} activity.`,
      'Closing costs': `${title} are fees paid when a property is purchased or sold, including title, escrow, and recording fees. ${BRAND} handles acquisition at the entity level.`,
      MLS: `${title} (Multiple Listing Service) is a database real estate agents use to list properties for sale. ${BRAND} sources some investment opportunities from traditional markets.`,
      HVAC: `${title} systems provide heating, ventilation, and air conditioning. Property managers maintain HVAC equipment for ${BRAND} rentals.`,
      'Earnest money deposit': `${title} is a good-faith deposit submitted with a purchase offer. It is part of traditional acquisitions that may later be tokenized on ${BRAND}.`,
      Inspection: `${title} is a professional evaluation of a property's condition before purchase. ${BRAND} performs diligence before listing tokens.`,
      'Inspection contingency': `${title} allows a buyer to cancel a purchase if inspections reveal material issues. It protects buyers in off-market acquisitions.`,
      'Purchase and sale agreement (PSA)': `${title} is the contract between buyer and seller outlining terms of a real estate transaction.`,
      'Rent-to-own': `${title} arrangements let tenants rent with an option to buy later. ${BRAND} offers direct fractional ownership rather than rent-to-own programs.`,
    };
    return [glossary[title] ?? `${title} is a real estate term relevant to investors using ${BRAND}. Research the concept in context of your portfolio goals and consult professionals when needed.`];
  }

  if (kind === 'faq') {
    return [
      `${title} is a common question from ${BRAND} investors. The platform is designed for global access to tokenized real estate through a connected wallet, with transparent property data and professional management.`,
      `Policies may vary by property and jurisdiction. Review the specific listing documents on the ${BRAND} Marketplace and contact support if you need clarification about "${title.toLowerCase()}."`,
    ];
  }

  return [
    `${brand(title)} is covered in the ${BRAND} Learning Center to help you invest with confidence. ${BRAND} connects your wallet to a marketplace of tokenized rental properties so you can earn income and build a global portfolio.`,
    `To get started, connect your wallet on ${BRAND}, browse available properties, and review financial details before purchasing fractional ownership. Rental income is distributed on a regular schedule directly to your wallet.`,
    `If you need additional help with "${brand(title).toLowerCase()}", visit related articles in this collection or reach out through ${BRAND} support channels.`,
  ];
}

const collections = [
  {
    collectionId: 'what-is-eiffelfi',
    articleSlugs: [
      'what-is-eiffelfi',
      'how-the-eiffelfi-marketplace-works',
      'tokens-can-be-listed-for-sale-anytime',
      'how-eiffelfi-makes-money',
      'eiffelfi-referral-program',
    ],
    titles: [
      'What is EiffelFi?',
      'How the EiffelFi Marketplace Works',
      'Tokens Can be Listed for Sale Anytime on the EiffelFi Marketplace',
      'How EiffelFi Makes Money',
      'EiffelFi Referral Program',
    ],
    kind: 'guide',
  },
  {
    collectionId: 'get-started',
    sections: [
      {
        title: 'Quickstart Guide',
        titles: [
          'Create Your EiffelFi Account',
          'Learn about the mechanics and security of trading real estate with other investors on EiffelFi',
          'Join the EiffelFi Investor Discord Group',
          'How to withdraw your EiffelFi USDC balance into Coinbase',
        ],
      },
      {
        title: "Buy Property Tokens in EiffelFi's Marketplace",
        titles: [
          'How to Invest in Properties on the Marketplace',
          'Conduct Due Diligence on Properties',
          'Review Property Documents for Due Diligence',
          'Recurring Investments',
        ],
      },
      {
        title: 'Configure Your Wallet and Payment Settings',
        titles: [
          'Wallet and Payment Method Management',
          'Learn about EiffelFi Wallet',
          'Payment Methods Available For Purchasing Tokens',
          'How to get USDC to easily buy property tokens',
          'How to Send and Receive Assets with EiffelFi Wallet',
          'Guide to Investing Using Crypto Payment',
          'How to transfer shares from an external wallet into your EiffelFi Wallet',
          'How to add an external crypto wallet',
        ],
      },
      {
        title: "Sell Property Tokens in EiffelFi's Marketplace",
        titles: ['How to Sell Property Tokens on the EiffelFi Marketplace'],
      },
    ],
    titles: [
      'How do I turn off the rental reinvestment feature?',
    ],
    kind: 'guide',
  },
  {
    collectionId: 'faq',
    sections: [
      {
        title: 'General',
        titles: [
          'Who is allowed to invest?',
          'Can I propose my own governance vote?',
          'Learn how estimated property value is calculated',
          'What is a crypto wallet? Why do I need one?',
          'What is the maximum number of shares I can purchase in each property?',
          'How are repairs handled?',
          'Can I invest under an Entity like an LLC?',
          'What happens if a property does not sell out?',
          'Which blockchain does EiffelFi use to fractionalize properties?',
          'How long after I pay will I receive tokens in my wallet?',
          'Does my hardware wallet work with EiffelFi?',
          'How can I track the performance of my property?',
          'What is the Property Manager\'s process and tenant selection criteria?',
          'How long are properties held before they\'re sold?',
          'Can I do a 1031 Exchange with EiffelFi properties?',
        ],
      },
      {
        title: 'Legal',
        titles: [
          'Who legally has ownership of these properties?',
          'How do we ensure each entity owns the deed on its property?',
          'Am I liable if any lawsuits or accidents occur at the property?',
          'What Happens If EiffelFi Goes Out Of Business?',
        ],
      },
      {
        title: 'Security',
        titles: [
          'What happens if I lose access to my property tokens?',
          'How to set up your EiffelFi Two-Factor Authentication (2FA)?',
          'Does EiffelFi have account recovery features?',
          'Do I have to submit my ID before I can participate?',
          'Why is my ID verification taking so long?',
          'Why do I need to fill in personal information, and is it encrypted?',
        ],
      },
    ],
    kind: 'faq',
  },
  {
    collectionId: 'earning-rental-income',
    titles: [
      'Rental Income is Sent to Your Account Daily',
      'Tokens Update in Value on a Monthly Basis',
      'Donate Your Rental Income to Charity',
    ],
    kind: 'guide',
  },
  {
    collectionId: 'property-management',
    titles: ['Property Management', 'Properties have an Operating Reserve to handle repairs'],
    kind: 'guide',
  },
  {
    collectionId: 'taxes',
    titles: [
      'How Taxes Work With EiffelFi',
      'Token Holders Benefit From Depreciation',
      'Tax Forms Prepared by EiffelFi: 1099 Form and Form 1065',
      'More Information on 1099 Tax Forms',
    ],
    kind: 'guide',
  },
  {
    collectionId: 'pmm-liquidity',
    titles: [
      "How does EiffelFi's PMM (Proactive Market Maker) and Liquidity Pools work?",
      'How to Buy Property Instantly Using Market Orders',
      'How to Sell Property Instantly Using Market Orders',
      'How to Stake (Lend) Property Tokens for Additional Return',
      'How to Stake (Lend) USDC for Additional Return',
      'What are Liquidity Pool Tokens (LP Tokens)?',
      'Claiming Rewards from Lending Out Your Assets',
      'How to Un-Stake (Withdraw) Your Assets from the Liquidity Pool',
      'How is APY Generated by the PMM?',
      "How EiffelFi's AMM is Different From Other AMM's",
    ],
    sections: [
      {
        title: 'PMM & Liquidity Pool FAQ',
        titles: [
          'Will I continue to receive daily rent if I stake my tokens?',
          "Why can't I withdraw 100% of my tokens staked in a liquidity pool?",
          "Why do the liquidity pool APY's update so often?",
          'Why am I not able to stake tokens into a liquidity pool for a property I own?',
          'Can I use the funds in my existing rent balance to stake?',
          'Will I receive property tokens as yield if i stake USDC or property tokens?',
          "Why cant I place a Market (instant) order in a certain property?",
          "If there isn't a liquidity pool for my property, can I help launch one?",
          'Which payment methods can I use for Market orders?',
          'Will I receive a tax document for my staking transactions?',
        ],
      },
    ],
    kind: 'guide',
  },
  {
    collectionId: 'governance',
    titles: [
      'Token holders make all property decisions via our Governance system',
      'Each Investor Can Own Up to 15% of the Total Shares in a Property',
    ],
    kind: 'guide',
  },
  {
    collectionId: 'glossary',
    titles: [
      'IRR',
      'Cash on Cash return (CoC)',
      'Cap rate',
      'Appreciation',
      'Net Operating Income (NOI)',
      'Diversification',
      'Operating Expenses',
      'CapEx',
      'Single Family',
      'Duplex',
      'Triplex',
      'Quadplex/Fourplex',
      'Residential real estate',
      'Commercial real estate',
      'Industrial real estate',
      'Land',
      'Special purpose',
      'Capital Gains Tax',
      'Closing costs',
      'MLS',
      'HVAC',
      'Earnest money deposit',
      'Inspection',
      'Inspection contingency',
      'Purchase and sale agreement (PSA)',
      'Rent-to-own',
    ],
    kind: 'glossary',
  },
];

const articles = {};
const collectionDetails = [];

for (const collection of collections) {
  const detail = {
    collectionId: collection.collectionId,
    articleSlugs: [],
    sections: [],
  };

  const addArticle = (title, kind) => {
    const slug = slugify(title);
    if (!articles[slug]) {
      articles[slug] = {
        slug,
        title: brand(title),
        collectionId: collection.collectionId,
        body: articleParagraphs(title, collection.collectionId, kind).map(brand),
      };
    }
    return slug;
  };

  if (collection.titles) {
    for (const title of collection.titles) {
      detail.articleSlugs.push(addArticle(title, collection.kind));
    }
  }

  if (collection.sections) {
    for (const section of collection.sections) {
      const sectionSlugs = section.titles.map((title) => addArticle(title, collection.kind));
      detail.sections.push({ title: brand(section.title), articleSlugs: sectionSlugs });
    }
  }

  collectionDetails.push(detail);
}

const outDir = path.join(root, 'src', 'data', 'learn');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'articles.generated.ts'),
  `import type { LearnArticle } from '../../types/learn';\n\nexport const learnArticles: Record<string, LearnArticle> = ${JSON.stringify(articles, null, 2)};\n`,
  'utf8',
);

fs.writeFileSync(
  path.join(outDir, 'collectionDetails.generated.ts'),
  `import type { LearnCollectionDetail } from '../../types/learn';\n\nexport const learnCollectionDetails: LearnCollectionDetail[] = ${JSON.stringify(collectionDetails, null, 2)};\n`,
  'utf8',
);

console.log(`Generated ${Object.keys(articles).length} articles across ${collectionDetails.length} collections.`);
