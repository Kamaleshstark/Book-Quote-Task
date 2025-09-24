import React from 'react';

interface ProgressBarProps {
  total: number;
  current: number;
  onSeek?: (index: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current, onSeek }) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSeek?.(index)}
          className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div 
            className={`h-full transition-all duration-300 ${
              index <= current ? 'bg-white' : 'bg-transparent'
            }`}
          />
        </button>
      ))}
    </div>
  );
};