import { useState } from 'react';
import type { ModalContext } from '../data/simplygoData';

interface HeaderProps {
  fontScale: number;
  onFontDecrease: () => void;
  onFontIncrease: () => void;
  onOpenModal: (modal: ModalContext) => void;
  onScrollToSection: (sectionId: string) => void;
}

export function Header({
  fontScale,
  onFontDecrease,
  onFontIncrease,
  onOpenModal,
  onScrollToSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 bg-light-surface border-b border-light-outline-variant">
      <div className="max-w-[1200px] mx-auto px-gutter-md lg:px-page-margin h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-light-primary rounded"
          aria-label="SimplyGo Home"
        >
          <span className="font-headline text-headline-md tracking-tight text-light-on-surface flex items-baseline whitespace-nowrap">
            <span className="text-light-secondary">Simply</span>
            <span className="text-brand-purple">Go</span>
            <span className="text-brand-magenta">.</span>
          </span>
        </a>

        {/* Primary Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal({ type: 'info', section: 'about' });
            }}
            className="font-label text-label-md text-light-on-surface hover:text-light-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            About Us
          </a>
          <a
            href="#locations"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('locations');
            }}
            className="font-label text-label-md text-light-on-surface hover:text-light-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Locations
          </a>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('products');
            }}
            className="font-label text-label-md text-light-on-surface hover:text-light-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Products &amp; Services
          </a>
          <a
            href="#travel-info"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal({ type: 'product', productId: 'concession' });
            }}
            className="font-label text-label-md text-light-on-surface hover:text-light-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Travel Information
          </a>
          <a
            href="#online-services"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal({ type: 'product', productId: 'online-services' });
            }}
            className="font-label text-label-md text-light-on-surface hover:text-light-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Online Services
          </a>
          <a
            href="#campaigns"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('top');
            }}
            className="font-label text-label-md text-light-on-surface hover:text-light-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Campaigns
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal({ type: 'locations', category: 'contact-centre' });
            }}
            className="font-label text-label-md text-light-on-surface hover:text-light-primary transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Contact Us
          </a>
        </nav>

        {/* Utility Controls: Font Size & Search */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="font-decrease"
            type="button"
            onClick={onFontDecrease}
            disabled={fontScale <= 85}
            aria-label="Decrease text size"
            title={`Text size: ${fontScale}%`}
            className="px-2 py-1 rounded font-label text-label-md text-light-on-surface hover:bg-light-surface-container-low disabled:opacity-40 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            A-
          </button>
          <button
            id="font-increase"
            type="button"
            onClick={onFontIncrease}
            disabled={fontScale >= 120}
            aria-label="Increase text size"
            title={`Text size: ${fontScale}%`}
            className="px-2 py-1 rounded font-label text-label-md text-light-on-surface hover:bg-light-surface-container-low disabled:opacity-40 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'search' })}
            aria-label="Search site"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-light-on-surface hover:bg-light-surface-container-low transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-light-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              search
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full text-light-on-surface hover:bg-light-surface-container-low transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-light-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-light-outline-variant bg-light-surface px-gutter-md py-4 flex flex-col gap-3"
        >
          <button
            type="button"
            onClick={() => handleNavClick(() => onOpenModal({ type: 'info', section: 'about' }))}
            className="text-left font-label text-label-lg text-light-on-surface hover:text-light-primary py-1.5"
          >
            About Us
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(() => onScrollToSection('locations'))}
            className="text-left font-label text-label-lg text-light-on-surface hover:text-light-primary py-1.5"
          >
            Locations
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(() => onScrollToSection('products'))}
            className="text-left font-label text-label-lg text-light-on-surface hover:text-light-primary py-1.5"
          >
            Products &amp; Services
          </button>
          <button
            type="button"
            onClick={() =>
              handleNavClick(() => onOpenModal({ type: 'product', productId: 'concession' }))
            }
            className="text-left font-label text-label-lg text-light-on-surface hover:text-light-primary py-1.5"
          >
            Travel Information
          </button>
          <button
            type="button"
            onClick={() =>
              handleNavClick(() => onOpenModal({ type: 'product', productId: 'online-services' }))
            }
            className="text-left font-label text-label-lg text-light-on-surface hover:text-light-primary py-1.5"
          >
            Online Services
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(() => onScrollToSection('top'))}
            className="text-left font-label text-label-lg text-light-on-surface hover:text-light-primary py-1.5"
          >
            Campaigns
          </button>
          <button
            type="button"
            onClick={() =>
              handleNavClick(() => onOpenModal({ type: 'locations', category: 'contact-centre' }))
            }
            className="text-left font-label text-label-lg text-light-on-surface hover:text-light-primary py-1.5"
          >
            Contact Us
          </button>
        </nav>
      )}
    </header>
  );
}
