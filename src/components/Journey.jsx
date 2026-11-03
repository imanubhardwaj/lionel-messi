import { useRef, useState } from "react";
import { eras, journeyPhotos } from "../data.js";
const keys = Object.keys(eras);
const dates = ["1987 — 2000", "2000 — 2021", "2021 — 2023", "ARRIVED 2023"];

function Chapter({ eraKey }) {
  const era = eras[eraKey],
    photo = journeyPhotos[eraKey];
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className="era-content">
      <figure className={`era-visual era-${eraKey}`}>
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          style={{ objectPosition: photo.position }}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
        <figcaption>
          <span>{photo.label}</span>
          <a href={photo.source} target="_blank" rel="noopener noreferrer">
            Photo: {photo.author} · CC BY-SA {photo.license} ↗
          </a>
        </figcaption>
        {imageFailed && (
          <p className="journey-image-error">
            Photo unavailable.{" "}
            <a href={photo.source} target="_blank" rel="noopener noreferrer">
              View original ↗
            </a>
          </p>
        )}
      </figure>
      <div className="era-copy">
        <div className="eyebrow">{era.eyebrow}</div>
        <h3>{era.title}</h3>
        <p>{era.text}</p>
        <a
          className="era-source"
          href={era.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          {era.sourceName} ↗
        </a>
      </div>
    </div>
  );
}

export default function Journey() {
  const [active, setActive] = useState("rosario");
  const tabs = useRef([]);
  function onKeyDown(event, index) {
    const positions = {
      ArrowRight: (index + 1) % keys.length,
      ArrowLeft: (index + keys.length - 1) % keys.length,
      Home: 0,
      End: keys.length - 1,
    };
    const next = positions[event.key];
    if (next !== undefined) {
      event.preventDefault();
      setActive(keys[next]);
      tabs.current[next].focus();
    }
  }
  return (
    <section className="section journey-section" id="journey">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">05 /</span> ONE EXTRAORDINARY
            JOURNEY
          </div>
          <h2>
            Small beginnings.
            <br />
            <em>Limitless possibility.</em>
          </h2>
        </div>
        <p>
          Different cities. Different shirts.
          <br />
          The same love for the ball.
        </p>
      </div>
      <div className="journey-tabs" role="tablist" aria-label="Career chapters">
        {keys.map((key, index) => (
          <button
            key={key}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            role="tab"
            id={`tab-${key}`}
            data-era={key}
            aria-selected={active === key}
            aria-controls="era-panel"
            tabIndex={active === key ? 0 : -1}
            onClick={() => setActive(key)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <small>{dates[index]}</small>
            {eras[key].city}
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div
        id="era-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        <Chapter key={active} eraKey={active} />
      </div>
    </section>
  );
}
