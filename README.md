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

- Hero: `public/assets/messi-world-cup.jpg`, the owner-supplied Messi/World Cup illustration at its full source resolution (1199 × 1312, high-quality JPEG from `archive/artwork/messi-world-cup-source.png`). An earlier 80-colour vector tracing looked blotchy and is kept in `archive/artwork/messi-world-cup-traced.svg`, not served. No third-party license is asserted for the supplied artwork.
- Trophy: [FIFA World Cup Trophy](https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_Trophy_(Ank_Kumar,_Infosys_Limited)_02.jpg), Ank Kumar, CC BY-SA 4.0, 2009 × 3976. A museum photograph from Zürich in 2018, clearly identified as such; replaces the drawn SVG trophy.
- Rosario: [National Flag Memorial](https://commons.wikimedia.org/wiki/File:Monumento_a_la_Bandera_Rosario.jpg), Micaela Muro, CC BY-SA 4.0, 4586 × 3033. Photographed in 2012; contextual city imagery, not a childhood photograph.
- Barcelona: [Messi v AS Roma 2015](https://commons.wikimedia.org/wiki/File:Messi_v_AS_Roma_2015.jpg), Justine Magny, CC BY-SA 2.0, 4726 × 3151.
- Paris: [Messi, Neymar and Mbappé, 2022](https://commons.wikimedia.org/wiki/File:Messi_Neymar_Mbapp%C3%A9_PSG_2022.jpg), Liondartois, CC BY-SA 4.0, 4837 × 3524.
- Miami: [Messi against NYCFC, September 2025](https://commons.wikimedia.org/wiki/File:Lionel_Messi_NYCFC_Miami_24_Sep_2025-051.jpg), Bryan Berlin, CC BY-SA 4.0, 5000 × 3333.

The hero SVG is served locally and needs no third-party image request. Other photographs load from Wikimedia Commons and require internet access. Journey images load when their chapter is selected. Responsive framing and separate caption overlays are applied in CSS. Image adaptations retain the original respective CC BY-SA license. No image or 3D asset was purchased. The rejected 3D implementations are kept in `archive/` and are not served.

## Features

- **70 films** from official channels (FIFA, UEFA, FC Barcelona, LALIGA, Copa América, Olympic Games, MLS, Ligue 1, TNT Sports, CBS Sports Golazo, Guardian Football), 2004–2026, in seven categories including **full matches**. Click-to-load, privacy-friendly YouTube embeds with previous/next/arrow-key browsing.
- **My reel**: tap ♡ on any film to save it (localStorage only), filter to your reel, and **play it continuously**. The player listens for YouTube's "ended" event and advances when "Play next film automatically" is on.
- **Shareable films**: every film has a `#film=<id>` deep link; opening one loads the page with that film ready to play. A share button uses the Web Share API or copies the link.
- **Search palette** (⌘K / Ctrl+K / `/`): searches films, records, timeline moments, anniversaries, Ballon d'Or years, trophies, photos and sections.
- **The final, minute by minute**: the 2022 final as a scrubbable timeline with a live scoreboard, the shoot-out kick by kick, and a "play the night" auto-advance.
- **Season by season**: an accessible bar chart of club goals across 19 seasons (Barcelona and PSG), with hover/focus detail and a table view.
- **Ballon d'Or room**: all eight awards with podiums. **In their words**: a rotating wall of quotes. **The dossier**: essentials plus "on this day / coming up" anniversaries computed from the visitor's date.
- **Qatar 2022 "Road to Lusail"** (all seven matches, each linked to a film), a **24-moment timeline**, **trophy room**, **36 filterable records**, a **14-photo gallery** with lightbox, and a **quiz that draws 10 questions from a pool of 26** each game.
- **Support the tribute**: a donations section (PayPal, crypto with QR codes and copy buttons; UPI with the payee's own QR image at `public/assets/upi-qr.png`, configured in `src/support.js`). Donations fund hosting and upkeep only and do not go to Lionel Messi.
- Scroll progress bar, reveal animations, ticker, back-to-top, mobile navigation, reduced-motion support.

Every video ID was checked against YouTube's oEmbed endpoint when added (a 401 means embedding is disabled). Gallery photos come from Wikimedia Commons with author and license shown. Records and trophy counts are completed milestones; 2026 World Cup details follow the published tournament record. Re-check video availability occasionally, since publishers can remove or restrict uploads.

## Files and validation

- `index.html`: Vite entry page and metadata.
- `src/main.jsx` and `src/App.jsx`: React entry and page composition.
- `src/components/`: page sections, goal filters, career tabs, and accessible dialogs. `Experience.jsx` holds the final timeline, season chart, Ballon d'Or room, quotes, dossier and search palette.
- `src/videos.js`: the film library. `src/content.js`: timeline, trophies, records, the final's events, seasons, Ballon d'Or podiums, quotes, dossier, anniversaries, gallery and quiz data. `src/data.js`: career chapters and photographs. `src/hooks.js`: in-view, scroll progress and the persistent "my reel" store.
- `src/styles.css`, `src/argentina.css`, `src/premium.css` and `src/experience.css`: layout, Argentina theme, and the premium/experience layers.
- `public/assets/`: hero image and favicon, copied into the build.
- `vite.config.js`: Vite configuration, relative production asset paths, and port 4173.
- `dist/`: generated production output; edit the source files above, then rebuild.

`npm run build` passed. React DOM checks (`qa/verify-react.cjs`, jsdom) cover StrictMode rendering, filters and the personal reel, deep links, the video consent flow and cleanup, focus restoration, the final's timeline and shoot-out, the seasons table view, Ballon d'Or cards, quotes, anniversaries, the search palette, the quiz, records filters, dialogs, mobile navigation, anchors and unique ids. Full-page renders at 1440px and 390px were checked with headless Chrome.

## Deployment

The site has not been deployed and lionelmessi.world is not connected. Source sync was blocked by DNS restrictions. Reuse the existing project in `.openai/hosting.json` if resuming Sites deployment; do not create another project. Run `npm run build` before deployment. Any static host can serve the resulting `dist/`.
