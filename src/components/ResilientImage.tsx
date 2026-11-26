import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackIcon = 'directions_transit',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-light-surface-container-low via-light-surface-container to-light-primary-container/50 text-light-primary p-4 ${className}`}
      >
        <span className="material-symbols-outlined text-4xl" aria-hidden="true">
          {fallbackIcon}
        </span>
        {fallbackLabel && (
          <span className="font-label text-label-sm text-light-secondary text-center">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
