# Book Quote Shorts

A modern web app for discovering inspiring book quotes in a short-form content format, similar to social media reels.

## Features

- **Quote Display**: Beautiful full-screen quote cards with author and book information
- **Navigation**: Swipe gestures on mobile, arrow keys on desktop, or click progress indicators
- **Auto-play**: Automatic progression through quotes with pause/play control
- **Interactions**: Like quotes and share functionality
- **Responsive**: Works seamlessly on mobile and desktop devices

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Lucide React for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── QuoteCard.tsx   # Main quote display
│   ├── ProgressBar.tsx # Navigation indicators
│   ├── NavigationControls.tsx
│   └── ShareModal.tsx
├── hooks/              # Custom React hooks
│   └── useSwipe.ts     # Touch gesture handling
├── data/               # Static data
│   └── quotes.ts       # Quote collection
├── types/              # TypeScript definitions
│   └── Quote.ts
└── App.tsx             # Main application
```

## Usage

- **Mobile**: Swipe up/down or left/right to navigate between quotes
- **Desktop**: Use arrow keys or click the navigation arrows
- **Auto-play**: Toggle with the play/pause button in the bottom left
- **Progress**: Click on progress bars at the top to jump to specific quotes
- **Interactions**: Like quotes with the heart button, share with the share button

## Customization

Add new quotes by editing `src/data/quotes.ts`. Each quote should follow the `Quote` interface defined in `src/types/Quote.ts`.