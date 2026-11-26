import { HAND_MOCKUP_IMAGE, type ModalContext } from '../data/simplygoData';
import { ResilientImage } from './ResilientImage';

interface AppDownloadSectionProps {
  onOpenModal: (modal: ModalContext) => void;
}

export function AppDownloadSection({ onOpenModal }: AppDownloadSectionProps) {
  return (
    <section id="download-app" className="w-full bg-light-surface-container-low py-14 lg:py-section">
      <div className="max-w-[1200px] mx-auto px-gutter-md lg:px-page-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl items-center">
          {/* Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <ResilientImage
              src={HAND_MOCKUP_IMAGE}
              alt="Hand holding smartphone displaying the SimplyGo mobile app"
              className="w-72 md:w-80 rounded-xl object-cover"
              fallbackIcon="smartphone"
              fallbackLabel="SimplyGo Mobile App"
            />
          </div>

          {/* App Description & Store Badges */}
          <div className="lg:col-span-7 flex flex-col gap-5 max-w-prose">
            <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface text-balance">
              Download the SimplyGo App for a smoother journey
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
              With a registered SimplyGo account, add your bank cards and SimplyGo EZ-Link cards
              onto the app to track your travel expenditure and history easily. You can also
              perform card-related services, earn reward points, plan your transport journey and
              more - all on a single, user-friendly mobile platform.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'app-download', source: 'google-play' })}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded bg-footer-bg text-on-footer-bg hover:bg-light-secondary transition-colors duration-150 cursor-pointer"
              >
                <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
                  play_arrow
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-label text-label-sm opacity-80">GET IT ON</span>
                  <span className="font-label text-label-lg">Google Play</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'app-download', source: 'app-store' })}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded bg-footer-bg text-on-footer-bg hover:bg-light-secondary transition-colors duration-150 cursor-pointer"
              >
                <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
                  phone_iphone
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-label text-label-sm opacity-80">Download on the</span>
                  <span className="font-label text-label-lg">App Store</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
