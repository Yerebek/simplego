import { useState } from 'react';
import {
  KEY_APP_FEATURES,
  SAMPLE_TRANSACTIONS,
  type AppFeatureId,
  type ModalContext,
} from '../data/simplygoData';

interface KeyFeaturesSectionProps {
  onOpenModal: (modal: ModalContext) => void;
}

export function KeyFeaturesSection({ onOpenModal }: KeyFeaturesSectionProps) {
  const [activeFeature, setActiveFeature] = useState<AppFeatureId>('transactions');
  const [cardBalance, setCardBalance] = useState(24.0);
  const [showAllTx, setShowAllTx] = useState(false);
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState(true);
  const [autoTopUpAmount, setAutoTopUpAmount] = useState(30);
  const [topUpNotice, setTopUpNotice] = useState<string | null>(null);

  const handleQuickTopUp = (amount: number) => {
    setCardBalance((prev) => Number((prev + amount).toFixed(2)));
    setTopUpNotice(`+$${amount.toFixed(2)} added to card`);
    window.setTimeout(() => setTopUpNotice(null), 2500);
  };

  return (
    <section id="app-features" className="w-full bg-light-surface py-14 lg:py-section">
      <div className="max-w-[1200px] mx-auto px-gutter-md lg:px-page-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl items-start">
          {/* Left Column: Interactive Accordion */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface">
              Key App Features
            </h2>

            <div className="divide-y divide-light-outline-variant border-b border-light-outline-variant">
              {KEY_APP_FEATURES.map((feature) => {
                const isOpen = activeFeature === feature.id;
                return (
                  <div key={feature.id} className="py-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setActiveFeature(feature.id)}
                      className={`w-full flex items-center justify-between gap-3 text-left font-title text-title-md transition-colors duration-150 cursor-pointer ${
                        isOpen
                          ? 'text-light-primary'
                          : 'text-light-on-surface hover:text-light-primary'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined text-title-lg ${
                            isOpen ? 'text-light-primary' : 'text-light-secondary'
                          }`}
                          aria-hidden="true"
                        >
                          {feature.icon}
                        </span>
                        <span>{feature.title}</span>
                      </span>
                      <span
                        className={`material-symbols-outlined text-title-lg ${
                          isOpen ? 'text-light-primary' : 'text-light-on-surface-variant'
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? 'remove' : 'add'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pt-3 pl-8">
                        <p className="font-body text-body-md text-light-on-surface-variant">
                          {feature.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive App Screen Preview */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl bg-gradient-to-br from-light-primary via-light-secondary to-brand-purple p-6 md:p-8 flex flex-col items-center justify-center overflow-hidden">
              {/* Phone Card Frame */}
              <div className="w-full max-w-sm bg-light-surface rounded-xl p-6 shadow-xl flex flex-col items-center gap-4">
                <div className="w-16 h-10 rounded bg-light-primary-container border border-light-outline-variant flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-title-lg text-light-primary"
                    aria-hidden="true"
                  >
                    {activeFeature === 'motoring'
                      ? 'directions_car'
                      : activeFeature === 'myinfo'
                        ? 'verified_user'
                        : 'credit_card'}
                  </span>
                </div>

                {activeFeature === 'auto-topup' ? (
                  <div className="w-full flex flex-col items-center gap-3 text-center">
                    <div>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Auto Top-up Status
                      </p>
                      <p className="font-display text-headline-md text-light-on-surface">
                        {autoTopUpEnabled ? 'Active' : 'Paused'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {[20, 30, 50].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAutoTopUpAmount(amt)}
                          className={`px-3 py-1 rounded text-label-md font-label transition-colors cursor-pointer ${
                            autoTopUpAmount === amt
                              ? 'bg-light-primary text-light-on-primary'
                              : 'bg-light-surface-container text-light-on-surface hover:bg-light-surface-container-high'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoTopUpEnabled((prev) => !prev)}
                      className="px-4 py-1.5 rounded-full bg-light-secondary text-light-on-secondary font-label text-label-md hover:bg-light-primary transition-colors cursor-pointer"
                    >
                      {autoTopUpEnabled ? 'Pause Auto Top-up' : 'Enable Auto Top-up'}
                    </button>
                  </div>
                ) : activeFeature === 'motoring' ? (
                  <div className="w-full flex flex-col items-center gap-3 text-center">
                    <div>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        IU / OBU Linked Balance
                      </p>
                      <p className="font-display text-display-lg text-light-on-surface tabular-nums">
                        $ 48.50
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenModal({ type: 'product', productId: 'motoring' })}
                      className="px-4 py-1.5 rounded-full bg-light-secondary text-light-on-secondary font-label text-label-md hover:bg-light-primary transition-colors cursor-pointer"
                    >
                      Manage Vehicle IU ›
                    </button>
                  </div>
                ) : activeFeature === 'concession' ? (
                  <div className="w-full flex flex-col items-center gap-3 text-center">
                    <div>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Adult Monthly Travel Card
                      </p>
                      <p className="font-display text-headline-md text-light-on-surface tabular-nums">
                        Valid till 30 Nov 2026
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenModal({ type: 'product', productId: 'concession' })}
                      className="px-4 py-1.5 rounded-full bg-light-secondary text-light-on-secondary font-label text-label-md hover:bg-light-primary transition-colors cursor-pointer"
                    >
                      Compare Concession Passes ›
                    </button>
                  </div>
                ) : activeFeature === 'claims' ? (
                  <div className="w-full flex flex-col items-center gap-3 text-center">
                    <div>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Open Travel Claims
                      </p>
                      <p className="font-display text-headline-md text-light-on-surface tabular-nums">
                        1 Claim In Review
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenModal({ type: 'product', productId: 'online-services' })
                      }
                      className="px-4 py-1.5 rounded-full bg-light-secondary text-light-on-secondary font-label text-label-md hover:bg-light-primary transition-colors cursor-pointer"
                    >
                      Submit Fare Claim ›
                    </button>
                  </div>
                ) : activeFeature === 'myinfo' ? (
                  <div className="w-full flex flex-col items-center gap-3 text-center">
                    <div>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Singpass MyInfo
                      </p>
                      <p className="font-display text-headline-md text-light-on-surface">
                        Verified Profile Ready
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenModal({ type: 'product', productId: 'concession' })}
                      className="px-4 py-1.5 rounded-full bg-light-secondary text-light-on-secondary font-label text-label-md hover:bg-light-primary transition-colors cursor-pointer"
                    >
                      Start Card Application ›
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Available Balance
                      </p>
                      <p className="font-display text-display-lg text-light-on-surface tabular-nums">
                        $ {cardBalance.toFixed(2)}
                      </p>
                      {topUpNotice && (
                        <p className="font-label text-label-sm text-light-primary mt-1">
                          {topUpNotice}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenModal({ type: 'product', productId: 'concession' })}
                      className="px-4 py-1.5 rounded-full bg-light-secondary text-light-on-secondary font-label text-label-md hover:bg-light-primary transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Buy Concession Pass ›
                    </button>
                    <div className="grid grid-cols-2 gap-6 pt-2 w-full max-w-[220px]">
                      <button
                        type="button"
                        onClick={() => handleQuickTopUp(10)}
                        className="flex flex-col items-center gap-1 group cursor-pointer"
                      >
                        <span className="w-10 h-10 rounded-full bg-light-surface-container group-hover:bg-light-primary-container flex items-center justify-center text-light-on-surface group-hover:text-light-primary transition-colors">
                          <span
                            className="material-symbols-outlined text-title-lg"
                            aria-hidden="true"
                          >
                            account_balance_wallet
                          </span>
                        </span>
                        <span className="font-body text-body-sm text-light-on-surface-variant group-hover:text-light-primary">
                          Top-up +$10
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFeature('auto-topup')}
                        className="flex flex-col items-center gap-1 group cursor-pointer"
                      >
                        <span className="w-10 h-10 rounded-full bg-light-surface-container group-hover:bg-light-primary-container flex items-center justify-center text-light-on-surface group-hover:text-light-primary transition-colors">
                          <span
                            className="material-symbols-outlined text-title-lg"
                            aria-hidden="true"
                          >
                            autorenew
                          </span>
                        </span>
                        <span className="font-body text-body-sm text-light-on-surface-variant group-hover:text-light-primary">
                          Auto Top-up
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Elevated Transactions Overlay Card */}
              <article className="bg-light-surface rounded-lg p-5 shadow-lg border border-light-outline-variant w-full max-w-md -mt-6 relative z-10">
                <header className="flex items-center justify-between mb-2">
                  <h3 className="font-title text-title-md text-light-on-surface">
                    {activeFeature === 'motoring'
                      ? 'Recent Motoring Charges'
                      : activeFeature === 'auto-topup'
                        ? 'Auto Top-up Schedule'
                        : 'Transactions'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAllTx((prev) => !prev)}
                    className="font-label text-label-md text-brand-purple hover:underline cursor-pointer"
                  >
                    {showAllTx ? 'Show less' : 'View all'}
                  </button>
                </header>

                {activeFeature === 'motoring' ? (
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-light-outline-variant">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-light-surface-container-high flex items-center justify-center text-light-on-surface shrink-0">
                        <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                          directions_car
                        </span>
                      </span>
                      <div>
                        <p className="font-body text-body-sm text-light-on-surface-variant">
                          ERP &amp; Carpark
                        </p>
                        <p className="font-title text-title-md text-light-on-surface">
                          CTE Southbound Gantry
                        </p>
                        <p className="font-body text-body-sm text-light-on-surface-variant tabular-nums">
                          8:42 AM · Vehicle SBA8842X
                        </p>
                      </div>
                    </div>
                    <div className="text-right tabular-nums shrink-0">
                      <p className="font-title text-title-md text-light-on-surface">- $ 2.00</p>
                      <p className="font-body text-body-sm text-light-on-surface-variant">Posted</p>
                    </div>
                  </div>
                ) : activeFeature === 'auto-topup' ? (
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-light-outline-variant">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-light-surface-container-high flex items-center justify-center text-light-on-surface shrink-0">
                        <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                          autorenew
                        </span>
                      </span>
                      <div>
                        <p className="font-body text-body-sm text-light-on-surface-variant">
                          Trigger: Balance below $10.00
                        </p>
                        <p className="font-title text-title-md text-light-on-surface">
                          Visa •••• 4821
                        </p>
                        <p className="font-body text-body-sm text-light-on-surface-variant">
                          {autoTopUpEnabled ? 'Instant Top-Up Active' : 'Currently Paused'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right tabular-nums shrink-0">
                      <p className="font-title text-title-md text-light-primary">
                        + $ {autoTopUpAmount.toFixed(2)}
                      </p>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Auto Reload
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {(showAllTx ? SAMPLE_TRANSACTIONS : SAMPLE_TRANSACTIONS.slice(0, 1)).map(
                      (tx, idx) => (
                        <div key={tx.id}>
                          {idx === 0 && (
                            <p className="font-body text-body-sm text-light-on-surface-variant mb-2 tabular-nums">
                              {tx.date}
                            </p>
                          )}
                          <div className="flex items-center justify-between gap-3 pt-2 border-t border-light-outline-variant">
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 rounded-full bg-light-surface-container-high flex items-center justify-center text-light-on-surface shrink-0">
                                <span
                                  className="material-symbols-outlined text-title-md"
                                  aria-hidden="true"
                                >
                                  {tx.icon}
                                </span>
                              </span>
                              <div>
                                <p className="font-body text-body-sm text-light-on-surface-variant">
                                  {tx.category}
                                </p>
                                <p className="font-title text-title-md text-light-on-surface">
                                  {tx.service}
                                </p>
                                <p className="font-body text-body-sm text-light-on-surface-variant tabular-nums">
                                  {tx.timeRange}
                                </p>
                                <p className="font-body text-body-sm text-light-on-surface-variant">
                                  {tx.route}
                                </p>
                              </div>
                            </div>
                            <div className="text-right tabular-nums shrink-0">
                              <p className="font-title text-title-md text-light-on-surface">
                                {tx.amount < 0
                                  ? `- $ ${Math.abs(tx.amount).toFixed(2)}`
                                  : `+ $ ${tx.amount.toFixed(2)}`}
                              </p>
                              <p className="font-body text-body-sm text-light-on-surface-variant">
                                {tx.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>

        {/* Centered CTA Button */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'app-download', source: 'features' })}
            className="inline-flex items-center justify-center px-6 py-3 rounded bg-light-primary text-light-on-primary font-label text-label-lg transition-colors duration-150 ease-out hover:bg-light-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary cursor-pointer"
          >
            <span>View More App Features</span>
          </button>
        </div>
      </div>
    </section>
  );
}
