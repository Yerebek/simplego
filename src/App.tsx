import { useEffect, useState } from 'react';
import { AppDownloadSection } from './components/AppDownloadSection';
import { AssistanceSection } from './components/AssistanceSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { KeyFeaturesSection } from './components/KeyFeaturesSection';
import { MaintenanceBanner } from './components/MaintenanceBanner';
import { PlatformSection } from './components/PlatformSection';
import { LocationsModal } from './components/modals/LocationsModal';
import { ProductExplorerModal } from './components/modals/ProductExplorerModal';
import { SiteModalRouter } from './components/modals/SiteModals';
import type { ModalContext } from './data/simplygoData';

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [fontScale, setFontScale] = useState(100);
  const [modal, setModal] = useState<ModalContext>({ type: 'none' });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.type !== 'none') {
        setModal({ type: 'none' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal.type]);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-surface text-light-on-surface font-body">
      <Header
        fontScale={fontScale}
        onFontDecrease={() => setFontScale((prev) => Math.max(85, prev - 5))}
        onFontIncrease={() => setFontScale((prev) => Math.min(120, prev + 5))}
        onOpenModal={setModal}
        onScrollToSection={handleScrollToSection}
      />

      <MaintenanceBanner visible={bannerVisible} onDismiss={() => setBannerVisible(false)} />

      <main className="flex-1">
        <HeroCarousel onOpenModal={setModal} />
        <PlatformSection onOpenModal={setModal} />
        <AppDownloadSection onOpenModal={setModal} />
        <KeyFeaturesSection onOpenModal={setModal} />
        <AssistanceSection onOpenModal={setModal} />
      </main>

      <Footer onOpenModal={setModal} onScrollToSection={handleScrollToSection} />

      {modal.type === 'product' && (
        <ProductExplorerModal
          initialProductId={modal.productId}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'locations' && (
        <LocationsModal
          initialCategory={modal.category}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      <SiteModalRouter
        modal={modal}
        onClose={() => setModal({ type: 'none' })}
        onOpenModal={setModal}
      />
    </div>
  );
}
