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
      <aside className="marketplace-invest-sidebar">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl font-bold text-white">
              {property.sharePrice}
              <span className="text-base font-normal marketplace-invest-sidebar__muted"> /share</span>
            </p>
          </div>
          <div className="marketplace-invest-sidebar__badge">
            <i className="fas fa-users text-[10px]" aria-hidden="true" />
            {property.investors}
          </div>
        </div>

        <dl className="marketplace-invest-sidebar__divider space-y-3 pb-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="marketplace-invest-sidebar__muted">Avg Rental Yield</dt>
            <dd className="font-semibold">{property.avgRentalYield}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="marketplace-invest-sidebar__muted">Current Rental Yield</dt>
            <dd className="font-semibold">{property.currentRentalYield}</dd>
          </div>
          <div>
            <div className="flex items-center justify-between gap-4">
              <dt className="marketplace-invest-sidebar__muted">Valuation</dt>
              <dd className="font-semibold text-[#c4b8ff]">{property.valuationLabel}</dd>
            </div>
            <p className="mt-1 text-xs marketplace-invest-sidebar__muted">
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
            className="rounded-xl border-2 border-[#c4b8ff] px-4 py-3 text-sm font-semibold text-[#c4b8ff] transition-colors hover:bg-white/5"
          >
            Sell
          </button>
        </div>
      </aside>

      <Toast message={notice} onDismiss={() => setNotice(null)} />
    </>
  );
}
