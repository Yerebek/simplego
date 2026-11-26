import { useState, useEffect } from 'react';
import { CAMPAIGN_SLIDES, type ModalContext } from '../data/simplygoData';
import { ResilientImage } from './ResilientImage';

interface HeroCarouselProps {
  onOpenModal: (modal: ModalContext) => void;
}

export function HeroCarousel({ onOpenModal }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = CAMPAIGN_SLIDES.length;
  const activeSlide = CAMPAIGN_SLIDES[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [isPaused, slideCount]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  return (
    <section
      id="top"
      aria-label="Featured Campaign"
      className="w-full bg-light-surface"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full overflow-hidden bg-light-surface-container-low">
        <div className="max-w-[1440px] mx-auto relative">
          <ResilientImage
            src={activeSlide.imageUrl}
            alt={activeSlide.imageAlt}
            className="w-full h-[410px] md:h-[460px] object-cover object-left"
            fallbackIcon={activeSlide.badgeIcon}
          />

          {/* Promotional Callout Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-light-surface/20 via-light-surface/75 to-light-surface/95 flex items-center justify-end">
            <div className="max-w-lg w-full px-gutter-lg lg:px-gutter-xl py-6 flex flex-col items-center text-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-primary text-light-on-primary">
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  {activeSlide.badgeIcon}
                </span>
                <span className="font-label text-label-md whitespace-nowrap">
                  {activeSlide.badgeText}
                </span>
              </div>

              <h1 className="font-display text-display-lg-mobile md:text-display-lg text-light-primary text-balance">
                {activeSlide.headline}
              </h1>

              <div className="w-full bg-light-surface border border-light-outline-variant rounded-md p-3 shadow-sm flex flex-col gap-1">
                <p className="font-label text-label-lg text-light-primary">
                  {activeSlide.calloutTitle}
                </p>
                <p className="font-body text-body-sm text-light-on-surface">
                  {activeSlide.calloutBody}
                </p>
              </div>

              <p className="font-body text-body-sm text-light-on-surface-variant">
                {activeSlide.footnote}
              </p>

              {activeSlide.ctaType === 'stores' ? (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'app-download', source: 'google-play' })}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-footer-bg text-on-footer-bg font-label text-label-md hover:bg-light-secondary transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                      play_arrow
                    </span>
                    <span>Google Play</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'app-download', source: 'app-store' })}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-footer-bg text-on-footer-bg font-label text-label-md hover:bg-light-secondary transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                      phone_iphone
                    </span>
                    <span>App Store</span>
                  </button>
                </div>
              ) : (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeSlide.targetModal) {
                        onOpenModal(activeSlide.targetModal);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-light-primary text-light-on-primary font-label text-label-md hover:bg-light-secondary transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{activeSlide.actionLabel}</span>
                    <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                      arrow_forward
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Pagination & Floating Assistant Row */}
      <div className="max-w-[1200px] mx-auto px-gutter-md lg:px-page-margin py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Campaign slides">
          {CAMPAIGN_SLIDES.map((slide, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-label={`Slide ${index + 1}: ${slide.headline}`}
                aria-selected={isSelected}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-light-on-surface'
                    : 'bg-light-surface-container-high hover:bg-light-outline'
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-light-on-surface hover:bg-light-surface-container-low transition-colors duration-150 cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              arrow_back
            </span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-light-on-surface hover:bg-light-surface-container-low transition-colors duration-150 cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
              arrow_forward
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'assistant' })}
            aria-label="Open SimplyGo Virtual Assistant"
            title="SimplyGo Help & Service Guide"
            className="w-11 h-11 rounded-full bg-light-surface border-2 border-brand-purple shadow-md flex items-center justify-center text-light-primary hover:scale-105 transition-transform duration-150 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-headline-md text-brand-purple"
              aria-hidden="true"
            >
              smart_toy
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
