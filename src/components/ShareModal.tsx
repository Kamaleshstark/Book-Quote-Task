import React from 'react';
import { X, Copy, Twitter, Facebook } from 'lucide-react';
import { Quote } from '../types/Quote';

interface ShareModalProps {
  quote: Quote;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ quote, isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareText = `"${quote.text}" — ${quote.author}, ${quote.book}`;
  const shareUrl = window.location.href;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Share Quote</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 italic text-sm">"{quote.text}"</p>
          <p className="text-gray-600 mt-2 text-sm">— {quote.author}</p>
          <p className="text-gray-500 text-xs">{quote.book}</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </button>

          <button
            onClick={shareOnTwitter}
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>

          <button
            onClick={shareOnFacebook}
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};