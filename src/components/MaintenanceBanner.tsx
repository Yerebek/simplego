interface MaintenanceBannerProps {
  visible: boolean;
  onDismiss: () => void;
}

export function MaintenanceBanner({ visible, onDismiss }: MaintenanceBannerProps) {
  if (!visible) return null;

  return (
    <div
      id="maintenance-banner"
      role="region"
      aria-label="Scheduled Maintenance Notice"
      className="relative w-full bg-light-primary text-light-on-primary px-12 py-2.5 text-center"
    >
      <div className="max-w-[1140px] mx-auto flex flex-col gap-1">
        <p className="font-body text-body-sm">
          Scheduled Maintenance: 27 Nov, 12AM - 6AM - To serve you better we will be conducting
          scheduled maintenance on 27 Nov, 12AM to 6AM. During this period, access to various
          e-services on the SimplyGo app, as well as Top-Up Kiosks and SimplyGo Kiosks, may be
          intermittent. Customers are advised to complete their transactions before the maintenance
          period begins. We apologise for any inconvenience caused.
        </p>
        <p className="font-body text-body-sm opacity-90">
          Due to DBS’s scheduled maintenance from 5 Nov, EZ-Link and Concession cardholders will be
          temporarily unable to top up their cards at DBS ATMs until further notice. We apologise
          for any inconvenience caused.
        </p>
      </div>
      <button
        id="dismiss-banner-btn"
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss banner"
        className="absolute right-4 top-3 text-light-on-primary hover:opacity-80 transition-opacity duration-150 cursor-pointer"
      >
        <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
          close
        </span>
      </button>
    </div>
  );
}
