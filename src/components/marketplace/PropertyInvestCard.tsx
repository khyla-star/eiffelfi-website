import { useState } from 'react';
import type { MarketplacePropertyDetail } from '../../types/marketplace';
import Toast from '../ui/Toast';

type PropertyInvestCardProps = {
  property: MarketplacePropertyDetail;
};

const WALLET_NOTICE = 'Please Connect Wallet first.';

export default function PropertyInvestCard({ property }: PropertyInvestCardProps) {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <>
      <aside className="rounded-2xl bg-white p-5 text-lofty-purple-700 shadow-cardLight sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl font-bold text-lofty">
              {property.sharePrice}
              <span className="text-base font-normal text-gray-500"> /share</span>
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-lofty-purple-50 px-2.5 py-1 text-xs font-semibold text-lofty">
            <i className="fas fa-users text-[10px]" aria-hidden="true" />
            {property.investors}
          </div>
        </div>

        <dl className="space-y-3 border-b border-lofty-gray-300/60 pb-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">Avg Rental Yield</dt>
            <dd className="font-semibold">{property.avgRentalYield}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">Current Rental Yield</dt>
            <dd className="font-semibold">{property.currentRentalYield}</dd>
          </div>
          <div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-gray-500">Valuation</dt>
              <dd className="font-semibold text-lofty">{property.valuationLabel}</dd>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Market {property.marketValue} vs fair value {property.fairValue}
            </p>
          </div>
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setNotice(WALLET_NOTICE)}
            className="rounded-xl bg-lofty px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lofty-purple-300"
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setNotice(WALLET_NOTICE)}
            className="rounded-xl border-2 border-lofty px-4 py-3 text-sm font-semibold text-lofty transition-colors hover:bg-lofty/5"
          >
            Sell
          </button>
        </div>
      </aside>

      <Toast message={notice} onDismiss={() => setNotice(null)} />
    </>
  );
}
