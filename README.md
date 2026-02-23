# Netflix Clone (React + TypeScript + Vite)

A polished Netflix-style clone with a cinematic hero, horizontal content rails, search, "My List" persistence, and a full details modal.

## Highlights

- Netflix-inspired responsive interface for desktop and mobile.
- Dynamic featured hero rotation.
- Category rails with horizontal smooth scroll controls.
- Search across title, genre, and cast.
- "My List" add/remove with `localStorage` persistence.
- Title details modal with keyboard Escape support.
- Strong visual system: custom typography, layered gradients, and motion.

## Tech Stack

- React 19
- TypeScript
- Vite 7
- ESLint

## Run Locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite (typically `http://localhost:5173`).

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Type-check and production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

- `src/App.tsx`: app state, hero rotation, search, my-list logic.
- `src/data/catalog.ts`: curated catalog + category rails.
- `src/components/Header.tsx`: navigation and search.
- `src/components/HeroBanner.tsx`: featured title section.
- `src/components/RowRail.tsx`: reusable horizontal rail.
- `src/components/TitleCard.tsx`: card UI with quick list action.
- `src/components/DetailsModal.tsx`: title detail dialog.
- `src/App.css`: full design system and responsive layout.

## Notes

Catalog data is mock content for demo purposes and can be replaced with a real movie API later.
