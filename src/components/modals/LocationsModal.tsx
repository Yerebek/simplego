import { useState, type FormEvent } from 'react';
import { TRANSIT_LOCATIONS, type AssistanceType } from '../../data/simplygoData';

interface LocationsModalProps {
  initialCategory: AssistanceType;
  onClose: () => void;
}

export function LocationsModal({ initialCategory, onClose }: LocationsModalProps) {
  const [category, setCategory] = useState<'all' | AssistanceType>(initialCategory);
  const [query, setQuery] = useState('');

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Card Balance & Transactions');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const filteredLocations = TRANSIT_LOCATIONS.filter((loc) => {
    const matchesCat = category === 'all' || loc.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      loc.station.toLowerCase().includes(q) ||
      loc.mrtLine.toLowerCase().includes(q) ||
      loc.services.some((s) => s.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) return;
    setSubmittedRef(`ENQ-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="locations-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-light-surface rounded-xl shadow-xl border border-light-outline-variant w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-light-outline-variant flex items-center justify-between gap-4">
          <div>
            <h2
              id="locations-modal-title"
              className="font-headline text-headline-md text-light-on-surface"
            >
              Locations &amp; Customer Assistance
            </h2>
            <p className="font-body text-body-sm text-light-on-surface-variant">
              Find SimplyGo Ticket Offices, Service Centres, Self-Help Kiosks, or reach our team
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

        {/* Category Filter Bar */}
        <div className="px-6 py-3 bg-light-surface-container border-b border-light-outline-variant flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: 'All Locations' },
              { id: 'ticket-offices', label: 'Ticket Offices' },
              { id: 'ticketing-service-centres', label: 'Service Centres' },
              { id: 'self-help-machines', label: 'Self-Help Machines' },
              { id: 'contact-centre', label: 'Contact Centre' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              className={`px-3.5 py-2 rounded font-label text-label-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                category === tab.id
                  ? 'bg-light-primary text-light-on-primary'
                  : 'bg-light-surface text-light-on-surface border border-light-outline-variant hover:bg-light-surface-container-low'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {category === 'contact-centre' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="p-5 rounded-lg bg-light-surface-container border border-light-outline-variant flex flex-col gap-2">
                  <h3 className="font-title text-title-lg text-light-on-surface">
                    SimplyGo Hotline
                  </h3>
                  <p className="font-display text-headline-md text-light-primary tabular-nums">
                    6883 5048
                  </p>
                  <p className="font-body text-body-sm text-light-on-surface-variant">
                    8:00 AM – 6:00 PM daily (Closed on Public Holidays)
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-light-surface-container border border-light-outline-variant flex flex-col gap-2">
                  <h4 className="font-title text-title-md text-light-on-surface">
                    Before You Write In
                  </h4>
                  <p className="font-body text-body-sm text-light-on-surface-variant">
                    Have your 16-digit Card Account Number (CAN) or bank card last 4 digits ready
                    for faster fare and refund assistance.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleContactSubmit}
                className="md:col-span-7 bg-light-surface-container rounded-lg p-5 border border-light-outline-variant flex flex-col gap-4"
              >
                <h3 className="font-title text-title-lg text-light-on-surface">
                  Send an Online Enquiry
                </h3>
                {submittedRef ? (
                  <div className="p-4 rounded bg-light-primary-container text-light-on-primary-container flex flex-col gap-2">
                    <p className="font-label text-label-lg">
                      Enquiry Received (Ref: {submittedRef})
                    </p>
                    <p className="font-body text-body-sm">
                      Thank you, {name}. Our Contact Centre team will reply to {email} within 2
                      business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRef(null);
                        setMessage('');
                      }}
                      className="self-start font-label text-label-md underline cursor-pointer mt-1"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1">
                        <span className="font-label text-label-md text-light-on-surface">
                          Full Name
                        </span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="font-label text-label-md text-light-on-surface">
                          Email Address
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md"
                        />
                      </label>
                    </div>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-label-md text-light-on-surface">Topic</span>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md"
                      >
                        <option>Card Balance &amp; Transactions</option>
                        <option>Concession Card Application / Replacement</option>
                        <option>Lost Card Blocking &amp; Refund</option>
                        <option>EZ-Link Motoring / ERP</option>
                        <option>SimplyGo App Support</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-label-md text-light-on-surface">
                        Message
                      </span>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe how we can assist you..."
                        className="px-3 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md"
                      />
                    </label>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded bg-light-primary text-light-on-primary font-label text-label-md hover:bg-light-secondary transition-colors cursor-pointer self-start"
                    >
                      Submit Enquiry
                    </button>
                  </>
                )}
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <span
                  className="material-symbols-outlined text-title-lg text-light-on-surface-variant absolute left-3 top-2.5"
                  aria-hidden="true"
                >
                  search
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by MRT station, MRT line, or service (e.g. Tampines, Concession)..."
                  className="w-full pl-10 pr-4 py-2 rounded border border-light-outline bg-light-surface font-body text-body-md text-light-on-surface focus:outline-2 focus:outline-light-primary"
                />
              </div>

              {filteredLocations.length === 0 ? (
                <div className="p-8 text-center rounded-lg bg-light-surface-container border border-light-outline-variant">
                  <p className="font-title text-title-md text-light-on-surface">
                    No matching ticketing locations found
                  </p>
                  <p className="font-body text-body-sm text-light-on-surface-variant mt-1">
                    Try searching another MRT station or switch to All Locations.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLocations.map((loc) => (
                    <article
                      key={loc.id}
                      className="p-4 rounded-lg bg-light-surface-container border border-light-outline-variant flex flex-col gap-2"
                    >
                      <p className="font-label text-label-sm text-light-primary">
                        {loc.categoryLabel} · {loc.mrtLine}
                      </p>
                      <h3 className="font-title text-title-md text-light-on-surface">{loc.name}</h3>
                      <p className="font-body text-body-sm text-light-on-surface-variant">
                        {loc.address}
                      </p>
                      <p className="font-body text-body-sm text-light-on-surface tabular-nums">
                        Hours: {loc.hours}
                      </p>
                      <p className="font-body text-body-sm text-light-on-surface-variant pt-1 border-t border-light-outline-variant">
                        Services: {loc.services.join(' · ')}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
