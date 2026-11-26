import { useState } from 'react';
import {
  ASSISTANCE_CARDS,
  FAQ_ENTRIES,
  KEY_APP_FEATURES,
  NEWSROOM_ITEMS,
  PLATFORM_CARDS,
  TRANSIT_LOCATIONS,
  type ModalContext,
} from '../../data/simplygoData';

interface SiteModalRouterProps {
  modal: ModalContext;
  onClose: () => void;
  onOpenModal: (modal: ModalContext) => void;
}

export function SearchModal({
  onClose,
  onOpenModal,
}: {
  onClose: () => void;
  onOpenModal: (modal: ModalContext) => void;
}) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const productMatches = PLATFORM_CARDS.filter(
    (c) => !q || c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
  );
  const locationMatches = TRANSIT_LOCATIONS.filter(
    (l) => !q || l.name.toLowerCase().includes(q) || l.station.toLowerCase().includes(q)
  );
  const faqMatches = FAQ_ENTRIES.filter(
    (f) => !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-16 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-light-surface rounded-xl shadow-xl border border-light-outline-variant w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-light-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-title-lg text-light-primary">
            search
          </span>
          <input
            id="search-modal-title"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search SimplyGo cards, concession passes, MRT stations, or FAQs..."
            className="flex-1 bg-transparent font-body text-body-lg text-light-on-surface focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-light-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex flex-col gap-5">
          {productMatches.length > 0 && (
            <div>
              <p className="font-label text-label-md text-light-on-surface-variant mb-2">
                Products &amp; Services
              </p>
              <div className="flex flex-col gap-1.5">
                {productMatches.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenModal({ type: 'product', productId: item.id })}
                    className="text-left p-3 rounded hover:bg-light-surface-container-low transition-colors cursor-pointer"
                  >
                    <p className="font-title text-title-md text-light-primary">{item.title}</p>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {item.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {locationMatches.length > 0 && (
            <div>
              <p className="font-label text-label-md text-light-on-surface-variant mb-2">
                Ticketing Locations
              </p>
              <div className="flex flex-col gap-1.5">
                {locationMatches.slice(0, 4).map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => onOpenModal({ type: 'locations', category: loc.category })}
                    className="text-left p-3 rounded hover:bg-light-surface-container-low transition-colors cursor-pointer"
                  >
                    <p className="font-title text-title-md text-light-on-surface">{loc.name}</p>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {loc.station} · {loc.hours}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {faqMatches.length > 0 && (
            <div>
              <p className="font-label text-label-md text-light-on-surface-variant mb-2">
                Frequently Asked Questions
              </p>
              <div className="flex flex-col gap-1.5">
                {faqMatches.slice(0, 3).map((faq) => (
                  <button
                    key={faq.id}
                    type="button"
                    onClick={() => onOpenModal({ type: 'info', section: 'faqs' })}
                    className="text-left p-3 rounded hover:bg-light-surface-container-low transition-colors cursor-pointer"
                  >
                    <p className="font-title text-title-md text-light-on-surface">{faq.question}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {productMatches.length === 0 &&
            locationMatches.length === 0 &&
            faqMatches.length === 0 && (
              <p className="text-center font-body text-body-md text-light-on-surface-variant py-6">
                No results found for “{query}”. Try searching “concession”, “top-up”, or
                “Tampines”.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}

export function AppDownloadModal({
  source,
  onClose,
}: {
  source?: 'google-play' | 'app-store' | 'features';
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-light-surface rounded-xl shadow-xl border border-light-outline-variant w-full max-w-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-light-outline-variant flex items-center justify-between">
          <h2 id="app-modal-title" className="font-headline text-headline-md text-light-on-surface">
            {source === 'features'
              ? 'All SimplyGo App Features'
              : 'Get the SimplyGo Mobile App'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-light-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEY_APP_FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="p-4 rounded-lg bg-light-surface-container border border-light-outline-variant flex items-start gap-3"
              >
                <span
                  className="material-symbols-outlined text-title-lg text-light-primary shrink-0"
                  aria-hidden="true"
                >
                  {feat.icon}
                </span>
                <div>
                  <h3 className="font-title text-title-md text-light-on-surface">{feat.title}</h3>
                  <p className="font-body text-body-sm text-light-on-surface-variant mt-1">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-light-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-title text-title-md text-light-on-surface">
                Available on Android &amp; iOS
              </p>
              <p className="font-body text-body-sm text-light-on-surface-variant">
                Requires iOS 14.0+ or Android 9.0+. Register with your mobile number or Singpass.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-footer-bg text-on-footer-bg font-label text-label-md hover:bg-light-secondary transition-colors"
              >
                Google Play
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-footer-bg text-on-footer-bg font-label text-label-md hover:bg-light-secondary transition-colors"
              >
                App Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ASSISTANT_GUIDES = [
  {
    id: 'lost-card',
    label: 'Lost Concession Card',
    answer:
      'Block your lost registered card immediately in the SimplyGo App under Card Details > Report Lost Card, or call Hotline 6883 5048 (8 am – 6 pm daily). Remaining balance is protected and transferable.',
  },
  {
    id: 'topup-issue',
    label: 'Top-Up & DBS ATM Notice',
    answer:
      'Due to DBS ATM maintenance from 5 Nov, please top up via the SimplyGo App (PayNow, Visa, Mastercard), Self-Help Ticketing Machines at MRT stations, or SimplyGo Ticket Offices.',
  },
  {
    id: 'concession-pass',
    label: 'Buy Monthly Travel Pass',
    answer:
      'SimplyGo Concession cardholders can purchase and activate Monthly Travel Passes straight from the SimplyGo App—no kiosk visit needed.',
  },
  {
    id: 'fare-claim',
    label: 'Dispute a Bus / MRT Fare',
    answer:
      'Open Online Services or View Transactions in the app, select the journey in question, and submit a Fare Adjustment Claim. Claims are reviewed within 5 working days.',
  },
];

export function AssistantDrawer({
  onClose,
  onOpenModal,
}: {
  onClose: () => void;
  onOpenModal: (modal: ModalContext) => void;
}) {
  const [selectedGuideId, setSelectedGuideId] = useState(ASSISTANT_GUIDES[0].id);
  const selectedGuide =
    ASSISTANT_GUIDES.find((g) => g.id === selectedGuideId) ?? ASSISTANT_GUIDES[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-end p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-title"
      onClick={onClose}
    >
      <div
        className="bg-light-surface rounded-xl shadow-xl border border-light-outline-variant w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-light-primary text-light-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
              smart_toy
            </span>
            <div>
              <h2 id="assistant-title" className="font-title text-title-md">
                SimplyGo Service Guide
              </h2>
              <p className="font-body text-body-sm opacity-90">Quick answers &amp; self-help</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service guide"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <p className="font-label text-label-md text-light-on-surface-variant">
            Select a topic for instant guidance:
          </p>
          <div className="flex flex-wrap gap-2">
            {ASSISTANT_GUIDES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGuideId(g.id)}
                className={`px-3 py-1.5 rounded font-label text-label-md transition-colors cursor-pointer ${
                  selectedGuideId === g.id
                    ? 'bg-brand-purple text-white'
                    : 'bg-light-surface-container text-light-on-surface hover:bg-light-surface-container-high'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-light-surface-container border border-light-outline-variant">
            <h3 className="font-title text-title-md text-light-on-surface mb-1">
              {selectedGuide.label}
            </h3>
            <p className="font-body text-body-md text-light-on-surface-variant">
              {selectedGuide.answer}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-light-outline-variant">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'locations', category: 'contact-centre' })}
              className="font-label text-label-md text-light-primary hover:underline cursor-pointer"
            >
              Contact Support Team →
            </button>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'faqs' })}
              className="font-label text-label-md text-light-secondary hover:underline cursor-pointer"
            >
              View All FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InfoModal({
  section,
  onClose,
  onOpenModal,
}: {
  section:
    | 'about'
    | 'faqs'
    | 'newsroom'
    | 'sitemap'
    | 'careers'
    | 'terms'
    | 'privacy'
    | 'whistleblowing';
  onClose: () => void;
  onOpenModal: (modal: ModalContext) => void;
}) {
  const titles: Record<typeof section, string> = {
    about: 'About SimplyGo',
    faqs: 'Frequently Asked Questions',
    newsroom: 'SimplyGo Newsroom',
    sitemap: 'Site Map',
    careers: 'Careers at SimplyGo',
    terms: 'Terms and Conditions',
    privacy: 'Data Privacy Policy',
    whistleblowing: 'Whistleblowing Policy',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-light-surface rounded-xl shadow-xl border border-light-outline-variant w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-light-outline-variant flex items-center justify-between">
          <h2 id="info-modal-title" className="font-headline text-headline-md text-light-on-surface">
            {titles[section]}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-light-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          {section === 'about' && (
            <>
              <p className="font-body text-body-md text-light-on-surface">
                SimplyGo Pte. Ltd. is Singapore’s unified transit ticketing and travel card
                platform, formed to simplify public transport journeys across MRT, LRT, and bus
                networks.
              </p>
              <p className="font-body text-body-md text-light-on-surface-variant">
                Through the SimplyGo App, Self-Help Ticketing Machines, and islandwide SimplyGo
                Ticketing Service Centres, commuters enjoy seamless contactless payments, concession
                pass management, EZ-Link Motoring services, and digital fare transparency.
              </p>
            </>
          )}

          {section === 'faqs' && (
            <div className="divide-y divide-light-outline-variant">
              {FAQ_ENTRIES.map((faq) => (
                <div key={faq.id} className="py-4">
                  <p className="font-label text-label-sm text-light-primary">{faq.category}</p>
                  <h3 className="font-title text-title-md text-light-on-surface mt-1">
                    {faq.question}
                  </h3>
                  <p className="font-body text-body-md text-light-on-surface-variant mt-2">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {section === 'newsroom' && (
            <div className="flex flex-col gap-4">
              {NEWSROOM_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className="p-4 rounded-lg bg-light-surface-container border border-light-outline-variant"
                >
                  <p className="font-label text-label-sm text-light-primary">
                    {item.category} · {item.date}
                  </p>
                  <h3 className="font-title text-title-md text-light-on-surface mt-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-md text-light-on-surface-variant mt-2">
                    {item.summary}
                  </p>
                </article>
              ))}
            </div>
          )}

          {section === 'sitemap' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-title text-title-md text-light-on-surface mb-2">
                  Products &amp; Services
                </h3>
                <div className="flex flex-col items-start gap-2">
                  {PLATFORM_CARDS.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => onOpenModal({ type: 'product', productId: card.id })}
                      className="font-body text-body-md text-light-primary hover:underline cursor-pointer"
                    >
                      {card.title}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-title text-title-md text-light-on-surface mb-2">
                  Assistance &amp; Locations
                </h3>
                <div className="flex flex-col items-start gap-2">
                  {ASSISTANCE_CARDS.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => onOpenModal({ type: 'locations', category: card.id })}
                      className="font-body text-body-md text-light-primary hover:underline cursor-pointer"
                    >
                      {card.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'careers' && (
            <>
              <p className="font-body text-body-md text-light-on-surface">
                Join our engineering, product, transit operations, and customer experience teams
                building the future of urban mobility payments in Singapore.
              </p>
              <div className="p-4 rounded-lg bg-light-surface-container border border-light-outline-variant flex flex-col gap-2">
                <p className="font-title text-title-md text-light-on-surface">Open Areas</p>
                <p className="font-body text-body-sm text-light-on-surface-variant">
                  Mobile Payments Engineering · Transit Ticketing Operations · Digital Product
                  Design · Customer Experience
                </p>
              </div>
            </>
          )}

          {(section === 'terms' || section === 'privacy' || section === 'whistleblowing') && (
            <div className="flex flex-col gap-3 font-body text-body-md text-light-on-surface-variant">
              <p>
                SimplyGo Pte. Ltd. maintains strict governance, transit fare transparency, and
                personal data protection standards in accordance with Singapore’s Personal Data
                Protection Act (PDPA) and Public Transport Council guidelines.
              </p>
              <p>
                For full legal enquiries or formal disclosures, please contact our Hotline at 6883
                5048 (8 am – 6 pm daily, closed on public holidays) or reach out via the Contact
                Centre form.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SiteModalRouter({ modal, onClose, onOpenModal }: SiteModalRouterProps) {
  if (modal.type === 'none') return null;

  if (modal.type === 'search') {
    return <SearchModal onClose={onClose} onOpenModal={onOpenModal} />;
  }

  if (modal.type === 'app-download') {
    return <AppDownloadModal source={modal.source} onClose={onClose} />;
  }

  if (modal.type === 'assistant') {
    return <AssistantDrawer onClose={onClose} onOpenModal={onOpenModal} />;
  }

  if (modal.type === 'info') {
    return <InfoModal section={modal.section} onClose={onClose} onOpenModal={onOpenModal} />;
  }

  return null;
}
