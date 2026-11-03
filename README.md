# Lionel Messi World

A responsive fan tribute inspired by Argentina’s 2026 home jersey: white and graduated sky-blue stripes, navy trim, and gold accents. Design reference: [adidas’s official 2026 home-kit announcement](https://news.adidas.com/SportsBrandCombinedCategory/adidas-reveals-largest-ever-collection-of-home-kits-ahead-of-fifa-world-cup-2026-/S/a62a06a3-ea5a-4cb7-a585-0379b40ab18f).

## Run

This is a React web app built with Vite. Use Node.js 20.19+ or 22.12+ (Node 24 is supported). Python is not used.

```sh
npm install
npm run dev
```

Open **http://localhost:4173**. Stop any previous preview occupying that port first. For a reproducible installation with the included lockfile, use `pnpm install --frozen-lockfile` instead of `npm install`.

```sh
npm run build
npm run preview
```

Vite writes the production site to `dist/`. Deploy that folder to a static host; no Python or Node server is needed in production. Open the app through Vite or a static host rather than double-clicking the HTML file, because the React app uses bundled JavaScript modules.

Photos, Google Fonts, and YouTube playback require internet access. The SVG hero is local.

## Photography

The hero uses artwork supplied by the site owner. The other photographs use free Creative Commons sources, with photographer, source, and license attribution in the site’s credits.

- Hero: `public/assets/messi-world-cup.svg`, a true vector tracing of the owner-supplied Messi/World Cup illustration. Uses coloured paths, with no embedded raster image. The full portrait is preserved. The prior Wikimedia video still and its credits have been removed. No third-party license is asserted for the supplied artwork.
- Trophy: [FIFA World Cup Trophy](https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_Trophy_(Ank_Kumar,_Infosys_Limited)_02.jpg), Ank Kumar, CC BY-SA 4.0, 2009 × 3976. A museum photograph from Zürich in 2018, clearly identified as such; replaces the drawn SVG trophy.
- Rosario: [National Flag Memorial](https://commons.wikimedia.org/wiki/File:Monumento_a_la_Bandera_Rosario.jpg), Micaela Muro, CC BY-SA 4.0, 4586 × 3033. Photographed in 2012; contextual city imagery, not a childhood photograph.
- Barcelona: [Messi v AS Roma 2015](https://commons.wikimedia.org/wiki/File:Messi_v_AS_Roma_2015.jpg), Justine Magny, CC BY-SA 2.0, 4726 × 3151.
- Paris: [Messi, Neymar and Mbappé, 2022](https://commons.wikimedia.org/wiki/File:Messi_Neymar_Mbapp%C3%A9_PSG_2022.jpg), Liondartois, CC BY-SA 4.0, 4837 × 3524.
- Miami: [Messi against NYCFC, September 2025](https://commons.wikimedia.org/wiki/File:Lionel_Messi_NYCFC_Miami_24_Sep_2025-051.jpg), Bryan Berlin, CC BY-SA 4.0, 5000 × 3333.

The hero SVG is served locally and needs no third-party image request. Other photographs load from Wikimedia Commons and require internet access. Journey images load when their chapter is selected. Responsive framing and separate caption overlays are applied in CSS. Image adaptations retain the original respective CC BY-SA license. No image or 3D asset was purchased. The rejected 3D implementations are kept in `archive/` and are not served.

## Features

Four goal stories with filters and official click-to-load YouTube videos; seven-match Qatar 2022 journey; keyboard-accessible career tabs; sourced historical records; mobile navigation; image failure links; reduced-motion support. This is an independent fan site and does not provide live statistics.

## Files and validation

- `index.html`: Vite entry page and metadata.
- `src/main.jsx` and `src/App.jsx`: React entry and page composition.
- `src/components/`: page sections, goal filters, career tabs, and accessible dialogs.
- `src/data.js`: goal, career, and photograph data.
- `src/styles.css` and `src/argentina.css`: original layout and Argentina theme.
- `public/assets/`: SVG hero and favicon, copied into the build.
- `vite.config.js`: Vite configuration, relative production asset paths, and port 4173.
- `dist/`: generated production output; edit the source files above, then rebuild.

`npm run build` passed. React DOM checks passed for StrictMode rendering, filters, video consent and cleanup, focus restoration, all career tabs, keyboard navigation, image error handling, World Cup and credits dialogs, Escape, mobile navigation, and anchors. The SVG was also rendered locally for visual inspection during vectorization.

A live Vite preview could not be started in the execution sandbox because binding to 127.0.0.1:4173 returns EPERM. Full-page visual rendering and remote image loading remain unverified here.

## Deployment

The site has not been deployed and lionelmessi.world is not connected. Source sync was blocked by DNS restrictions. Reuse the existing project in `.openai/hosting.json` if resuming Sites deployment; do not create another project. Run `npm run build` before deployment. Any static host can serve the resulting `dist/`.

## Hero vector source

The supplied PNG is preserved in `archive/artwork/messi-world-cup-source.png` outside the served site. `scripts/vectorize-hero.cjs` performs colour quantization, region tracing, and polygon simplification; it requires the free `sharp` Node package when regenerating the SVG. The website itself has no dependency on this tool. The raster preview in `qa/hero-vector-preview.png` is for review only and is not loaded by the website.
