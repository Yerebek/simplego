import type { ModalContext } from '../data/simplygoData';

interface FooterProps {
  onOpenModal: (modal: ModalContext) => void;
  onScrollToSection: (sectionId: string) => void;
}

export function Footer({ onOpenModal, onScrollToSection }: FooterProps) {
  return (
    <footer id="contact" className="w-full bg-footer-bg text-on-footer-bg pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto px-gutter-md lg:px-page-margin">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-gutter-xl pb-10">
          {/* Column 1 */}
          <div className="lg:col-span-2 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'about' })}
              className="font-label text-label-lg text-on-footer-bg hover:underline cursor-pointer"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'faqs' })}
              className="font-label text-label-lg text-on-footer-bg hover:underline cursor-pointer"
            >
              FAQs
            </button>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'newsroom' })}
              className="font-label text-label-lg text-on-footer-bg hover:underline cursor-pointer"
            >
              Newsroom
            </button>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'sitemap' })}
              className="font-label text-label-lg text-on-footer-bg hover:underline cursor-pointer"
            >
              Site Map
            </button>
          </div>

          {/* Column 2 */}
          <div className="lg:col-span-2 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => onScrollToSection('products')}
              className="font-label text-label-lg text-on-footer-bg hover:underline cursor-pointer text-left"
            >
              Products &amp; Services
            </button>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'careers' })}
              className="font-label text-label-lg text-on-footer-bg hover:underline cursor-pointer"
            >
              Careers
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('top')}
              className="font-label text-label-lg text-on-footer-bg hover:underline cursor-pointer"
            >
              Campaigns
            </button>
          </div>

          {/* Column 3: Hotline & Social */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-label text-label-lg text-on-footer-bg tabular-nums">
                Hotline:{' '}
                <a href="tel:+6568835048" className="underline hover:text-on-footer-muted">
                  6883 5048
                </a>
              </p>
              <p className="font-body text-body-sm italic text-on-footer-muted">
                (8 am - 6 pm daily, closed on public holidays)
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-label text-label-md text-on-footer-bg">Connect With Us</p>
              <div className="flex items-center gap-3">
                {[
                  { label: 'Facebook', icon: 'public' },
                  { label: 'Instagram', icon: 'photo_camera' },
                  { label: 'TikTok', icon: 'music_note' },
                  { label: 'WhatsApp', icon: 'chat' },
                  { label: 'WeChat', icon: 'forum' },
                ].map((social) => (
                  <button
                    key={social.label}
                    type="button"
                    onClick={() =>
                      onOpenModal({ type: 'locations', category: 'contact-centre' })
                    }
                    aria-label={social.label}
                    title={`Connect via ${social.label}`}
                    className="w-8 h-8 rounded-full border border-on-footer-muted flex items-center justify-center text-on-footer-bg hover:border-on-footer-bg transition-colors duration-150 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                      {social.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: App Download */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <p className="font-label text-label-lg text-on-footer-bg">
              Download SimplyGo app today
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'app-download', source: 'google-play' })}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-on-footer-muted text-on-footer-bg hover:border-on-footer-bg transition-colors duration-150 cursor-pointer"
              >
                <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
                  play_arrow
                </span>
                <span className="font-label text-label-md">Google Play</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'app-download', source: 'app-store' })}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-on-footer-muted text-on-footer-bg hover:border-on-footer-bg transition-colors duration-150 cursor-pointer"
              >
                <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
                  phone_iphone
                </span>
                <span className="font-label text-label-md">App Store</span>
              </button>
            </div>
            <p className="font-body text-body-sm text-on-footer-muted">
              Manage your travel cards and discover our card services at your fingertips!
            </p>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-6 border-t border-light-secondary flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-body-sm text-on-footer-muted">
            © Copyright 2026 SimplyGo Pte. Ltd. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'terms' })}
              className="font-body text-body-sm text-on-footer-bg underline hover:text-on-footer-muted cursor-pointer"
            >
              Terms and Conditions
            </button>
            <span className="text-on-footer-muted" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'privacy' })}
              className="font-body text-body-sm text-on-footer-bg underline hover:text-on-footer-muted cursor-pointer"
            >
              Data Privacy Policy
            </button>
            <span className="text-on-footer-muted" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'info', section: 'whistleblowing' })}
              className="font-body text-body-sm text-on-footer-bg underline hover:text-on-footer-muted cursor-pointer"
            >
              Whistleblowing Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
