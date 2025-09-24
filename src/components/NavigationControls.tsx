import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onToggleAutoplay: () => void;
  isAutoplay: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onNext,
  onToggleAutoplay,
  isAutoplay,
  canGoPrevious,
  canGoNext
}) => {
  return (
    <>
      {/* Navigation arrows for desktop */}
      <div className="hidden md:block">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white/80 hover:bg-black/50 transition-all disabled:opacity-30"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white/80 hover:bg-black/50 transition-all disabled:opacity-30"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Autoplay toggle */}
      <button
        onClick={onToggleAutoplay}
        className="absolute bottom-4 left-4 z-20 p-3 rounded-full bg-black/30 text-white/80 hover:bg-black/50 transition-all"
      >
        {isAutoplay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
    </>
  );
};