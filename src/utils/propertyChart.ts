export type ChartRange = '1D' | '7D' | '30D' | '90D' | '1Y' | 'All';
export type ChartTab = 'Price' | 'Yield';

function hashSeed(slug: string, tab: ChartTab, range: ChartRange) {
  const key = `${slug}:${tab}:${range}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return hash;
}

function pseudoRandom(seed: number, index: number) {
  const x = Math.sin(seed + index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function barCountForRange(range: ChartRange) {
  switch (range) {
    case '1D':
      return 24;
    case '7D':
      return 7;
    case '30D':
      return 30;
    case '90D':
      return 18;
    case '1Y':
      return 12;
    case 'All':
      return 36;
  }
}

function rangeVolatility(range: ChartRange) {
  switch (range) {
    case '1D':
      return 0.35;
    case '7D':
      return 0.28;
    case '30D':
      return 0.22;
    case '90D':
      return 0.18;
    case '1Y':
      return 0.14;
    case 'All':
      return 0.12;
  }
}

function rangeTrend(range: ChartRange, tab: ChartTab) {
  if (tab === 'Yield') {
    switch (range) {
      case '1D':
        return 0;
      case '7D':
        return 0.02;
      case '30D':
        return 0.04;
      case '90D':
        return 0.06;
      case '1Y':
        return 0.08;
      case 'All':
        return 0.12;
    }
  }

  switch (range) {
    case '1D':
      return 0.01;
    case '7D':
      return 0.03;
    case '30D':
      return 0.05;
    case '90D':
      return 0.08;
    case '1Y':
      return 0.12;
    case 'All':
      return 0.18;
  }
}

export function generateChartSeries(slug: string, tab: ChartTab, range: ChartRange) {
  const seed = hashSeed(slug, tab, range);
  const count = barCountForRange(range);
  const volatility = rangeVolatility(range);
  const trend = rangeTrend(range, tab);
  const baseLevel = tab === 'Price' ? 0.42 + (seed % 100) / 500 : 0.35 + (seed % 80) / 400;

  const values: number[] = [];
  let current = baseLevel;

  for (let i = 0; i < count; i++) {
    const noise = (pseudoRandom(seed, i) - 0.5) * volatility;
    const wave =
      tab === 'Price'
        ? Math.sin((i / count) * Math.PI * (range === '1D' ? 6 : range === '7D' ? 3 : 2)) * 0.08
        : Math.cos((i / count) * Math.PI * 2) * 0.06;

    current = current + noise + trend / count + wave * 0.15;
    current = Math.max(0.12, Math.min(0.92, current));
    values.push(current);
  }

  return values;
}

export function chartSummary(tab: ChartTab, range: ChartRange, values: number[]) {
  if (!values.length) return '';
  const first = values[0];
  const last = values[values.length - 1];
  const change = ((last - first) / first) * 100;
  const sign = change >= 0 ? '+' : '';

  if (tab === 'Price') {
    return `${sign}${change.toFixed(2)}% over ${range}`;
  }

  return `${sign}${change.toFixed(2)}% yield change over ${range}`;
}

export function seriesToSvgPath(values: number[], width: number, height: number) {
  if (!values.length) return '';

  const step = width / Math.max(values.length - 1, 1);
  const points = values.map((value, index) => {
    const x = index * step;
    const y = height - value * height;
    return `${x},${y}`;
  });

  return `M ${points.join(' L ')}`;
}
