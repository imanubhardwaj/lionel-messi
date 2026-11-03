import { useState } from "react";
import { heroStats, trophyTotal } from "../content.js";
import { goals } from "../videos.js";
import { Counter } from "./Premium.jsx";
export function Header({ menuOpen, onMenuToggle, onNavigate, onSearch }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Lionel Messi World home">
        <span className="brand-mark">
          10<span>★</span>
        </span>
        <span>
          LIONEL MESSI<span className="brand-world">WORLD</span>
        </span>
      </a>
      <nav
        aria-label="Main navigation"
        id="main-nav"
        className={menuOpen ? "open" : undefined}
        onClick={onNavigate}
      >
        <a href="#moments">Films</a>
        <a href="#the-final">The Final</a>
        <a href="#timeline">Timeline</a>
        <a href="#seasons">Seasons</a>
        <a href="#trophies">Trophies</a>
        <a href="#record-book">Records</a>
        <a href="#gallery">Gallery</a>
        <a href="#quiz">Quiz</a>
      </nav>
      <button className="header-search" onClick={onSearch} aria-label="Search the archive">
        <span aria-hidden="true">⌕</span> Search <kbd>⌘K</kbd>
      </button>
      <button
        className="menu-toggle icon-button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-controls="main-nav"
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
      >
        {menuOpen ? "×" : "☰"}
      </button>
    </header>
  );
}
export function Hero({ onSearch }) {
  const [imageError, setImageError] = useState(false);
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot"></span> A BOY FROM ROSARIO. A GIFT TO THE
          WORLD.
        </div>
        <h1 id="hero-title">
          BEYOND
          <br />
          <span>GREATNESS.</span>
        </h1>
        <p className="hero-subtitle">
          Some play the game.
          <br />
          One makes you fall in love with it.
        </p>
        <div className="hero-actions">
          <a className="button button-blue" href="#moments">
            <span className="play-small">▶</span> Watch the films{" "}
            <span>↗</span>
          </a>
          <a className="text-link" href="#the-final">
            Relive the final <span>↓</span>
          </a>
        </div>
        <div className="hero-quick" aria-label="Quick links">
          <a href="#moments">
            <strong>{goals.length}</strong>
            <span>FILMS</span>
          </a>
          <a href="#trophies">
            <strong>{trophyTotal}</strong>
            <span>TROPHIES</span>
          </a>
          <a href="#timeline">
            <strong>{new Date().getFullYear() - 1987}</strong>
            <span>YEARS</span>
          </a>
          <button onClick={onSearch}>
            <strong>⌕</strong>
            <span>SEARCH</span>
          </button>
        </div>
        <div className="hero-caption">
          <span className="argentina-flag" aria-label="Argentina"></span>
          <span>
            LIONEL ANDRÉS MESSI
            <br />
            <small>ROSARIO, ARGENTINA · NO. 10</small>
          </span>
        </div>
      </div>
      <figure className="hero-photograph hero-illustration">
        <img
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
          id="hero-photo"
          src={`${import.meta.env.BASE_URL}assets/messi-world-cup.jpg`}
          alt="Illustration of Lionel Messi smiling as he holds the World Cup trophy"
          width="1199"
          height="1312"
          fetchPriority="high"
          decoding="async"
        />
        <figcaption>
          <span className="photo-stars" aria-hidden="true">
            ★ ★ ★
          </span>
          <strong>A dream. A lifetime. A world champion.</strong>
        </figcaption>
        <p className="photo-error" id="photo-error" hidden={!imageError}>
          Illustration unavailable. Please reload the page.
        </p>
      </figure>
      <div className="hero-bottom">
        <a href="#moments">
          <span className="scroll-line"></span> SCROLL INTO GREATNESS
        </a>
        <span>THE BEAUTIFUL GAME. THE BEAUTIFUL EXCEPTION.</span>
        <span className="edition">
          EST. 1987 <span>↗</span>
        </span>
      </div>
    </section>
  );
}
export function Numbers() {
  return (
    <section
      className="numbers-band"
      id="records"
      aria-label="Career highlights"
    >
      <div className="number-intro">
        <span className="eyebrow">THE NUMBERS SPEAK.</span>
        <p>
          The feeling?
          <br />
          Beyond numbers.
        </p>
      </div>
      {heroStats.map((stat) => (
        <a key={stat.label} href={stat.href}>
          <strong>
            <Counter value={stat.value} pad={stat.value < 10 ? 2 : 0} />
            <span>{stat.suffix}</span>
          </strong>
          <span>{stat.label}</span>
        </a>
      ))}
    </section>
  );
}
export function WorldCup({ onOpen }) {
  const [imageError, setImageError] = useState(false);
  return (
    <section className="world-cup-section" id="world-cup">
      <figure className="world-cup-art">
        <img
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
          id="trophy-photo"
          src="https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_04.jpg/1280px-FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_04.jpg"
          width="1280"
          height="2070"
          alt="Close-up photograph of the gold FIFA World Cup trophy on display at the FIFA World Football Museum in Zürich"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <figcaption>
          <span className="wc-stars" aria-hidden="true">
            ★ ★ ★
          </span>
          <strong>THE WORLD’S GREATEST PRIZE.</strong>
          <span>FIFA WORLD CUP TROPHY · MUSEUM PHOTOGRAPH</span>
          <a
            href="https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_04.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Photo: Ank Kumar · CC BY-SA 4.0 ↗
          </a>
        </figcaption>
        <p className="photo-error" id="trophy-error" hidden={!imageError}>
          Photo unavailable.{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_04.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the original ↗
          </a>
        </p>
      </figure>
      <div className="world-cup-copy">
        <div className="eyebrow gold">
          <span className="section-index">02 /</span> THE DREAM, COMPLETED
        </div>
        <h2>
          He won it all.
          <br />
          <em>
            Then he won
            <br />
            the world.
          </em>
        </h2>
        <p>
          A lifetime of belief. On a December night in Lusail,
          the little boy from Rosario finally held his biggest dream in his
          hands.
        </p>
        <div className="final-score">
          <div>
            <span className="argentina-flag"></span> ARGENTINA
          </div>
          <strong>
            3 <span>–</span> 3
          </strong>
          <div>
            <span className="france-flag"></span> FRANCE
          </div>
          <small>
            18 DECEMBER 2022 · FINAL · ARGENTINA WIN 4–2 ON PENALTIES
          </small>
        </div>
        <div className="world-cup-actions">
          <a className="text-link gold" href="#the-final">
            Minute by minute <span>↓</span>
          </a>
          <button className="text-link gold" id="open-world-cup" onClick={onOpen}>
            Relive the road to glory <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
export function Closing() {
  return (
    <section className="closing">
      <div className="eyebrow">
        FOR EVERYONE WHO EVER FELL IN LOVE WITH FOOTBALL.
      </div>
      <p>
        What a time
        <br />
        <em>to be alive.</em>
        <span>10</span>
      </p>
      <a className="text-link" href="#home">
        Back to the magic <span>↑</span>
      </a>
    </section>
  );
}
export function Footer({ onOpenCredits }) {
  return (
    <footer>
      <a className="brand" href="#home">
        <span className="brand-mark">
          10<span>★</span>
        </span>
        <span>
          LIONEL MESSI<span className="brand-world">WORLD</span>
        </span>
      </a>
      <p>
        An independent fan tribute. Made for the love of the game.
        <br />
        Not affiliated with Lionel Messi, his representatives, or any club.
      </p>
      <button
        className="footer-button"
        id="open-credits"
        onClick={onOpenCredits}
      >
        Credits &amp; sources ↗
      </button>
      <span className="footer-domain">LIONELMESSI.WORLD</span>
    </footer>
  );
}
