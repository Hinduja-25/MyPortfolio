# MyPortfolio – Creative Developer Scrapbook

A **React + Vite** based personal portfolio that feels like a digital scrapbook.  
It combines a nostalgic desktop UI with modern, pastel‑colored developer aesthetics.

## Features
- **Scrapbook Hero** – an envelope that serves as the main focal point.
- **Floating developer pop‑ups** (tiny terminal, sticky‑note code snippet, folder icon) that emerge from the envelope on hover.
- **Achievements folder** on the desktop, opening a sleek window that showcases milestones.
- **Custom taskbar** with a terminal‑style status line (`>_ building my story…`).
- **Soft pastel theme** using Tailwind CSS v4 `@theme` block and custom retro colors.
- **Responsive drag‑and‑drop windows** powered by a lightweight hook.

## Tech Stack
- **React** (hooks)
- **Vite** for fast dev server and HMR
- **Tailwind CSS v4** (`@theme` for fonts & colors)
- **Lucide‑react** icons
- **React‑icons** for additional tech icons (React, Python, etc.)

## Getting Started
```bash
# Clone the repo
git clone <repo‑url>
cd MyPortfolio/vite-project

# Install dependencies
npm install

# Run the dev server
npm run dev
```
Open <http://localhost:5173> to explore the interactive desktop.

## Customisation
- Edit `src/index.css` to tweak the color palette in the `@theme` block.
- Modify `src/components/ScrapbookHero.jsx` to change the floating pop‑ups.
- Add new content windows in `src/contents/*` and register them in `src/App.jsx`.

## License
MIT © Hinduja Simhadri
