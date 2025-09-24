import React from 'react';
import { Heart, Share2, BookOpen } from 'lucide-react';
import { Quote } from '../types/Quote';

interface QuoteCardProps {
  quote: Quote;
  onLike: () => void;
  onShare: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onLike, onShare }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center p-6 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <BookOpen className="w-10 h-10 mx-auto text-white/60 mb-6" />
        </div>

        <blockquote className="text-xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8 px-4">
          "{quote.text}"
        </blockquote>

        <div className="space-y-2">
          <p className="text-lg md:text-xl font-medium">
            — {quote.author}
          </p>
          <p className="text-base md:text-lg text-white/80">
            {quote.book} {quote.year && `(${quote.year})`}
          </p>
          {quote.genre && (
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mt-4">
              {quote.genre}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-4 z-20">
        <button
          onClick={onLike}
          className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-white/10 transition-all"
        >
          <Heart 
            className={`w-7 h-7 ${
              quote.isLiked 
                ? 'fill-red-500 text-red-500' 
                : 'text-white/80'
            }`} 
          />
          <span className="text-xs text-white/80">
            {quote.likes.toLocaleString()}
          </span>
        </button>

        <button
          onClick={onShare}
          className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-white/10 transition-all"
        >
          <Share2 className="w-7 h-7 text-white/80" />
          <span className="text-xs text-white/80">Share</span>
        </button>
      </div>
    </div>
  );
};