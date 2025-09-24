import { useState, TouchEvent } from 'react';

interface SwipeConfig {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export const useSwipe = (config: SwipeConfig) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const threshold = config.threshold || 50;

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          config.onSwipeLeft?.();
        } else {
          config.onSwipeRight?.();
        }
      }
    } else {
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          config.onSwipeUp?.();
        } else {
          config.onSwipeDown?.();
        }
      }
    }

    setTouchStart(null);
  };

  return { handleTouchStart, handleTouchEnd };
};