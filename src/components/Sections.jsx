import { useState } from "react";
export function Header({ menuOpen, onMenuToggle, onNavigate }) {
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
        <a href="#moments">The magic</a>
        <a href="#records">The records</a>
        <a href="#journey">The journey</a>
        <a href="#world-cup">The dream</a>
      </nav>
      <a className="header-link" href="#world-cup">
        WORLD CHAMPION <span>★ ★ ★</span>
      </a>
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
export function Hero() {
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
            <span className="play-small">▶</span> Witness the magic{" "}
            <span>↗</span>
          </a>
          <a className="text-link" href="#journey">
            Discover his story <span>↓</span>
          </a>
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
          src={`${import.meta.env.BASE_URL}assets/messi-world-cup.svg`}
          alt="Vector illustration of Lionel Messi smiling as he holds the World Cup trophy"
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
        <a href="#records">
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
      <a href="#record-book">
        <strong>
          08<span>★</span>
        </strong>
        <span>BALLON D’OR AWARDS</span>
      </a>
      <a href="#record-book">
        <strong>
          91<span>↗</span>
        </strong>
        <span>GOALS IN A YEAR · 2012</span>
      </a>
      <a href="#record-book">
        <strong>
          672<span>↗</span>
        </strong>
        <span>GOALS FOR FC BARCELONA</span>
      </a>
      <a href="#world-cup">
        <strong>
          01<span>♜</span>
        </strong>
        <span>WORLD CUP · QATAR 2022</span>
      </a>
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
          src="https://upload.wikimedia.org/wikipedia/commons/6/65/FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg"
          width="2009"
          height="3976"
          alt="Photograph of the FIFA World Cup trophy on display at the FIFA Museum in Zürich"
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
            href="https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Photo: Ank Kumar · CC BY-SA 4.0 ↗
          </a>
        </figcaption>
        <p className="photo-error" id="trophy-error" hidden={!imageError}>
          Photo unavailable.{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg"
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
          Five World Cups. A lifetime of belief. On a December night in Lusail,
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
        <button className="text-link gold" id="open-world-cup" onClick={onOpen}>
          Relive the road to glory <span>↗</span>
        </button>
      </div>
    </section>
  );
}
export function Records() {
  return (
    <section className="section record-section" id="record-book">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">04 /</span> IN A LEAGUE OF HIS OWN
          </div>
          <h2>
            History.
            <br />
            <em>Written with his left foot.</em>
          </h2>
        </div>
        <p>
          A few chapters in an extraordinary record book.
          <br />
          Completed milestones, preserved in time.
        </p>
      </div>
      <div className="record-list">
        <a
          href="https://www.uefa.com/news/0242-0e97e0ac1cb3-eef786ff788c-1000--messi-all-his-records/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="record-number">08</span>
          <div>
            <h3>Ballon d’Or awards</h3>
            <p>2009 · 2010 · 2011 · 2012 · 2015 · 2019 · 2021 · 2023</p>
          </div>
          <span className="record-tag">INDIVIDUAL BRILLIANCE</span>
          <span>↗</span>
        </a>
        <a
          href="https://www.fcbarcelona.com/en/football/first-team/news/1670444/stat-of-the-day--91-messis-goals-in-a-calendar-year/amp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="record-number">91</span>
          <div>
            <h3>A year like no other</h3>
            <p>79 for Barcelona. 12 for Argentina. One astonishing 2012.</p>
          </div>
          <span className="record-tag">CALENDAR-YEAR GOALS</span>
          <span>↗</span>
        </a>
        <a
          href="https://www.fcbarcelona.com/en/football/first-team/news/2153661/eighth-pichichi-for-leo-messi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="record-number">672</span>
          <div>
            <h3>One club. An everlasting legacy.</h3>
            <p>Barcelona’s all-time leading scorer across 778 appearances.</p>
          </div>
          <span className="record-tag">FC BARCELONA · 2004–2021</span>
          <span>↗</span>
        </a>
        <a
          href="https://inside.fifa.com/news/three-more-records-for-a-goalscorer-supreme"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="record-number">06</span>
          <div>
            <h3>European Golden Shoes</h3>
            <p>2010 · 2012 · 2013 · 2017 · 2018 · 2019</p>
          </div>
          <span className="record-tag">EUROPE’S GOLD STANDARD</span>
          <span>↗</span>
        </a>
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
