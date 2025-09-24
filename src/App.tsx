import React, { useState, useEffect, useCallback } from 'react';
import { QuoteCard } from './components/QuoteCard';
import { ProgressBar } from './components/ProgressBar';
import { NavigationControls } from './components/NavigationControls';
import { ShareModal } from './components/ShareModal';
import { useSwipe } from './hooks/useSwipe';
import { quotes } from './data/quotes';
import { Quote } from './types/Quote';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [quotesData, setQuotesData] = useState<Quote[]>(quotes);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const currentQuote = quotesData[currentIndex];

  const nextQuote = useCallback(() => {
    if (currentIndex < quotesData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, quotesData.length]);

  const prevQuote = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const goToQuote = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeUp: nextQuote,
    onSwipeDown: prevQuote,
    onSwipeLeft: nextQuote,
    onSwipeRight: prevQuote,
  });

  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      if (currentIndex < quotesData.length - 1) {
        nextQuote();
      } else {
        setCurrentIndex(0); // Loop back to start
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoplay, quotesData.length, nextQuote]);

  const handleLike = () => {
    setQuotesData(prev => prev.map((quote, index) => 
      index === currentIndex 
        ? { 
            ...quote, 
            isLiked: !quote.isLiked, 
            likes: quote.isLiked ? quote.likes - 1 : quote.likes + 1 
          }
        : quote
    ));
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          prevQuote();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          nextQuote();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoplay(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextQuote, prevQuote]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <div 
        className="w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <QuoteCard
          quote={currentQuote}
          onLike={handleLike}
          onShare={handleShare}
        />
      </div>

      <ProgressBar
        total={quotesData.length}
        current={currentIndex}
        onSeek={goToQuote}
      />

      <NavigationControls
        onPrevious={prevQuote}
        onNext={nextQuote}
        onToggleAutoplay={() => setIsAutoplay(prev => !prev)}
        isAutoplay={isAutoplay}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < quotesData.length - 1}
      />

      <ShareModal
        quote={currentQuote}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* Mobile instructions */}
      <div className="absolute bottom-4 right-4 z-10 md:hidden">
        <p className="text-xs text-white/50 text-right">
          Swipe to navigate
        </p>
      </div>
    </div>
  );
}

export default App;