import { ASSISTANCE_CARDS, type ModalContext } from '../data/simplygoData';
import { ResilientImage } from './ResilientImage';

interface AssistanceSectionProps {
  onOpenModal: (modal: ModalContext) => void;
}

export function AssistanceSection({ onOpenModal }: AssistanceSectionProps) {
  return (
    <section id="locations" className="w-full bg-light-surface-container-low py-14 lg:py-section">
      <div className="max-w-[1200px] mx-auto px-gutter-md lg:px-page-margin">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface text-balance">
            Looking For Assistance?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg items-stretch">
          {ASSISTANCE_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onOpenModal({ type: 'locations', category: card.id })}
              className="group flex flex-col items-center text-center gap-4 p-4 rounded-md h-full transition-transform duration-150 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-light-primary cursor-pointer"
            >
              <div className="w-full h-40 rounded-md overflow-hidden flex items-center justify-center">
                <ResilientImage
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  className="w-full h-full object-contain"
                  fallbackIcon={card.fallbackIcon}
                  fallbackLabel={card.title}
                />
              </div>
              <h3 className="font-title text-title-md text-light-on-surface group-hover:text-light-primary transition-colors duration-150 text-balance">
                {card.title}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
