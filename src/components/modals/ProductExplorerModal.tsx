import { useState, type FormEvent } from 'react';
import {
  CONCESSION_PASSES,
  PLATFORM_CARDS,
  SAMPLE_TRANSACTIONS,
  type PlatformCardId,
} from '../../data/simplygoData';

interface ProductExplorerModalProps {
  initialProductId: PlatformCardId;
  onClose: () => void;
}

export function ProductExplorerModal({
  initialProductId,
  onClose,
}: ProductExplorerModalProps) {
  const [activeTab, setActiveTab] = useState<PlatformCardId>(initialProductId);

  // EZ-Link card check state
  const [canInput, setCanInput] = useState('1004 8291 0492 3108');
  const [cardCheckResult, setCardCheckResult] = useState<string | null>(null);

  // Concession calculator state
  const [selectedPassId, setSelectedPassId] = useState(CONCESSION_PASSES[0].id);
  const [tripsPerWeek, setTripsPerWeek] = useState(14);
  const [avgFare, setAvgFare] = useState(1.85);

  // Motoring form state
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [iuNumber, setIuNumber] = useState('');
  const [motoringSubmitted, setMotoringSubmitted] = useState(false);

  // Online Services state
  const [onlineBalance, setOnlineBalance] = useState(24.0);
  const [claimRoute, setClaimRoute] = useState('Kranji - Marina Bay (01-Jul-2024)');
  const [claimReason, setClaimReason] = useState('Duplicate Fare Deduction');
  const [claimSubmittedId, setClaimSubmittedId] = useState<string | null>(null);

  const selectedPass =
    CONCESSION_PASSES.find((p) => p.id === selectedPassId) ?? CONCESSION_PASSES[0];
  const estimatedMonthlySpend = Number((tripsPerWeek * 4.33 * avgFare).toFixed(2));
  const monthlySavings = Number((estimatedMonthlySpend - selectedPass.monthlyPrice).toFixed(2));

  const handleCardCheck = (e: FormEvent) => {
    e.preventDefault();
    const digits = canInput.replace(/\s+/g, '');
    if (digits.length < 16) {
      setCardCheckResult('Please enter a valid 16-digit Card Account Number (CAN).');
      return;
    }
    setCardCheckResult(
      `Card ${digits.slice(0, 4)} •••• •••• ${digits.slice(-4)} is active on SimplyGo. Balance protection and instant mobile top-ups are enabled.`
    );
  };

  const handleMotoringSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!vehiclePlate.trim() || iuNumber.trim().length < 10) return;
    setMotoringSubmitted(true);
  };

  const handleClaimSubmit = (e: FormEvent) => {
    e.preventDefault();
    const refId = `SG-${Math.floor(100000 + Math.random() * 900000)}`;
    setClaimSubmittedId(refId);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-light-surface rounded-xl shadow-xl border border-light-outline-variant w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-light-outline-variant flex items-center justify-between gap-4">
          <div>
            <h2
              id="product-modal-title"
              className="font-headline text-headline-md text-light-on-surface"
            >
              Products &amp; Services
            </h2>
            <p className="font-body text-body-sm text-light-on-surface-variant">
              Manage cards, calculate concession passes, and submit travel claims
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full flex items-center justify-center text-light-on-surface hover:bg-light-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 bg-light-surface-container border-b border-light-outline-variant flex flex-wrap gap-2">
          {PLATFORM_CARDS.map((card) => {
            const active = activeTab === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveTab(card.id)}
                className={`px-3.5 py-2 rounded font-label text-label-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-light-primary text-light-on-primary'
                    : 'bg-light-surface text-light-on-surface border border-light-outline-variant hover:bg-light-surface-container-low'
                }`}
              >
                {card.title}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'ezlink' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-headline text-title-lg text-light-on-surface">
                  EZ-Link &amp; SimplyGo EZ-Link Cards
                </h3>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  Upgrade your CEPAS EZ-Link card to SimplyGo at any Self-Help Ticketing Machine
                  or check your registered card status below.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {PLATFORM_CARDS[0].highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-body-md text-light-on-surface"
                    >
                      <span
                        className="material-symbols-outlined text-title-lg text-light-primary shrink-0"
                        aria-hidden="true"
                      >
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={handleCardCheck}
                className="bg-light-surface-container rounded-lg p-5 border border-light-outline-variant flex flex-col gap-4"
              >
                <h4 className="font-title text-title-md text-light-on-surface">
                  Verify SimplyGo Card Status
                </h4>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="can-input"
                    className="font-label text-label-md text-light-on-surface"
                  >
                    16-Digit Card Number (CAN)
                  </label>
                  <input
                    id="can-input"
                    type="text"
                    value={canInput}
                    onChange={(e) => setCanInput(e.target.value)}
                    placeholder="e.g. 1004 8291 0492 3108"
                    className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md text-light-on-surface tabular-nums focus:outline-2 focus:outline-light-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded bg-light-primary text-light-on-primary font-label text-label-md hover:bg-light-secondary transition-colors cursor-pointer"
                >
                  Check Card Eligibility
                </button>
                {cardCheckResult && (
                  <p className="p-3 rounded bg-light-primary-container text-light-on-primary-container font-body text-body-sm">
                    {cardCheckResult}
                  </p>
                )}
              </form>
            </div>
          )}

          {activeTab === 'concession' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <h3 className="font-headline text-title-lg text-light-on-surface">
                    Monthly Concession Pass Calculator
                  </h3>
                  <p className="font-body text-body-md text-light-on-surface-variant">
                    Select your commuter tier and estimate your weekly rides to see whether a
                    Monthly Travel Pass saves you money.
                  </p>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-label text-label-md text-light-on-surface">
                      Concession Tier
                    </span>
                    <select
                      value={selectedPassId}
                      onChange={(e) => setSelectedPassId(e.target.value)}
                      className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md text-light-on-surface"
                    >
                      {CONCESSION_PASSES.map((pass) => (
                        <option key={pass.id} value={pass.id}>
                          {pass.group} — ${pass.monthlyPrice.toFixed(2)}/month
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-label text-label-md text-light-on-surface flex justify-between">
                      <span>Trips per week</span>
                      <span className="tabular-nums text-light-primary">{tripsPerWeek} trips</span>
                    </span>
                    <input
                      type="range"
                      min={2}
                      max={30}
                      value={tripsPerWeek}
                      onChange={(e) => setTripsPerWeek(Number(e.target.value))}
                      className="accent-light-primary"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-label text-label-md text-light-on-surface flex justify-between">
                      <span>Average fare per trip</span>
                      <span className="tabular-nums text-light-primary">
                        ${avgFare.toFixed(2)}
                      </span>
                    </span>
                    <input
                      type="range"
                      min={0.7}
                      max={2.6}
                      step={0.05}
                      value={avgFare}
                      onChange={(e) => setAvgFare(Number(e.target.value))}
                      className="accent-light-primary"
                    />
                  </label>
                </div>

                <div className="bg-light-surface-container rounded-lg p-5 border border-light-outline-variant flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-label text-label-md text-light-primary">
                      {selectedPass.passName}
                    </p>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {selectedPass.coverage}
                    </p>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      Eligibility: {selectedPass.eligibility}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-light-outline-variant tabular-nums">
                    <div>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Pay-Per-Ride Estimate
                      </p>
                      <p className="font-headline text-headline-md text-light-on-surface">
                        ${estimatedMonthlySpend.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        Monthly Pass Price
                      </p>
                      <p className="font-headline text-headline-md text-light-primary">
                        ${selectedPass.monthlyPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-light-primary-container text-light-on-primary-container font-label text-label-md tabular-nums">
                    {monthlySavings > 0
                      ? `Recommended: You save ~$${monthlySavings.toFixed(2)}/month with this pass.`
                      : `Pay-per-ride is ~$${Math.abs(monthlySavings).toFixed(2)}/month cheaper for your trip volume.`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'motoring' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-headline text-title-lg text-light-on-surface">
                  EZ-Link Motoring Service
                </h3>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  Link your vehicle In-Vehicle Unit (IU) or On-Board Unit (OBU) with an EZ-Link
                  Motoring card for automatic ERP and carpark billing.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {PLATFORM_CARDS[2].highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-body-md text-light-on-surface"
                    >
                      <span
                        className="material-symbols-outlined text-title-lg text-light-primary shrink-0"
                        aria-hidden="true"
                      >
                        directions_car
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={handleMotoringSubmit}
                className="bg-light-surface-container rounded-lg p-5 border border-light-outline-variant flex flex-col gap-4"
              >
                <h4 className="font-title text-title-md text-light-on-surface">
                  Pre-Register Vehicle IU / OBU
                </h4>
                {motoringSubmitted ? (
                  <div className="p-4 rounded bg-light-primary-container text-light-on-primary-container flex flex-col gap-2">
                    <p className="font-label text-label-lg">Registration Saved</p>
                    <p className="font-body text-body-sm">
                      Vehicle {vehiclePlate.toUpperCase()} (IU {iuNumber}) is ready to complete
                      activation in the SimplyGo App.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMotoringSubmitted(false)}
                      className="self-start text-label-md font-label underline cursor-pointer mt-1"
                    >
                      Register another vehicle
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-label-md text-light-on-surface">
                        Vehicle Registration Number
                      </span>
                      <input
                        type="text"
                        required
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        placeholder="e.g. SBA8842X"
                        className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md uppercase"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-label-md text-light-on-surface">
                        10-Digit IU / OBU Number
                      </span>
                      <input
                        type="text"
                        required
                        minLength={10}
                        maxLength={10}
                        value={iuNumber}
                        onChange={(e) => setIuNumber(e.target.value)}
                        placeholder="e.g. 1234567890"
                        className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md tabular-nums"
                      />
                    </label>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded bg-light-primary text-light-on-primary font-label text-label-md hover:bg-light-secondary transition-colors cursor-pointer"
                    >
                      Check Motoring Compatibility
                    </button>
                  </>
                )}
              </form>
            </div>
          )}

          {activeTab === 'online-services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-light-surface-container rounded-lg p-5 border border-light-outline-variant flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      Demo Card •••• 3108
                    </p>
                    <p className="font-headline text-headline-md text-light-on-surface tabular-nums">
                      Balance: ${onlineBalance.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOnlineBalance((prev) => Number((prev + 10).toFixed(2)))}
                    className="px-3 py-1.5 rounded bg-light-primary text-light-on-primary font-label text-label-md hover:bg-light-secondary cursor-pointer"
                  >
                    + Top-Up $10
                  </button>
                </div>

                <div className="divide-y divide-light-outline-variant border-t border-light-outline-variant">
                  {SAMPLE_TRANSACTIONS.map((tx) => (
                    <div
                      key={tx.id}
                      className="py-2.5 flex items-center justify-between gap-2 text-body-sm"
                    >
                      <div>
                        <p className="font-title text-title-md text-light-on-surface">
                          {tx.service}
                        </p>
                        <p className="text-light-on-surface-variant">
                          {tx.date} · {tx.route}
                        </p>
                      </div>
                      <span className="font-title text-title-md tabular-nums text-light-on-surface">
                        {tx.amount < 0
                          ? `-$${Math.abs(tx.amount).toFixed(2)}`
                          : `+$${tx.amount.toFixed(2)}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleClaimSubmit}
                className="bg-light-surface-container rounded-lg p-5 border border-light-outline-variant flex flex-col gap-4"
              >
                <h4 className="font-title text-title-md text-light-on-surface">
                  Submit Fare Adjustment Claim
                </h4>
                {claimSubmittedId ? (
                  <div className="p-4 rounded bg-light-primary-container text-light-on-primary-container flex flex-col gap-2">
                    <p className="font-label text-label-lg">Claim Submitted ({claimSubmittedId})</p>
                    <p className="font-body text-body-sm">
                      Your fare claim for {claimRoute} ({claimReason}) has been logged and will be
                      reviewed within 5 working days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setClaimSubmittedId(null)}
                      className="self-start font-label text-label-md underline cursor-pointer mt-1"
                    >
                      Submit another claim
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-label-md text-light-on-surface">
                        Select Trip
                      </span>
                      <select
                        value={claimRoute}
                        onChange={(e) => setClaimRoute(e.target.value)}
                        className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md"
                      >
                        <option>Kranji - Marina Bay (01-Jul-2024)</option>
                        <option>Choa Chu Kang Int - Orchard Rd (01-Jul-2024)</option>
                        <option>Bugis - Tampines (29-Jun-2024)</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-label-md text-light-on-surface">
                        Claim Reason
                      </span>
                      <select
                        value={claimReason}
                        onChange={(e) => setClaimReason(e.target.value)}
                        className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md"
                      >
                        <option>Duplicate Fare Deduction</option>
                        <option>Missed Tap-Out at Station Gate</option>
                        <option>Incorrect Transfer Rebate</option>
                        <option>Bus Stop Mismatch</option>
                      </select>
                    </label>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded bg-light-primary text-light-on-primary font-label text-label-md hover:bg-light-secondary transition-colors cursor-pointer"
                    >
                      Submit Travel Claim
                    </button>
                  </>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
