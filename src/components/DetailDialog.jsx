import { useEffect, useRef, useState } from "react";
import { Credits, WorldCupStory } from "./Stories.jsx";
import { gallery } from "../content.js";

function GoalStory({ goal }) {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <h2 id="dialog-title">{goal.title}</h2>
      <p className="dialog-matchline">
        <strong>{goal.opponent}</strong> <span>{goal.date}</span>
      </p>
      <p className="dialog-description">{goal.description}</p>
      <div className="video-shell">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${goal.video}?autoplay=1&rel=0`}
            title={`${goal.opponent} — ${goal.channel}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <img
              src={`https://i.ytimg.com/vi/${goal.video}/hqdefault.jpg`}
              alt=""
              referrerPolicy="no-referrer"
            />
            <button
              className="video-consent"
              id="load-video"
              onClick={() => setPlaying(true)}
            >
              ▶ Play on this page
            </button>
          </>
        )}
      </div>
      <div className="video-help">
        <span>
          Video from {goal.channel}. Playing connects to YouTube.
          <br />
          Playback can vary by region and publisher settings.
        </span>
        <a
          href={`https://www.youtube.com/watch?v=${goal.video}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube ↗
        </a>
      </div>
    </>
  );
}

function PhotoStory({ photo }) {
  return (
    <figure className="photo-story">
      <h2 id="dialog-title" className="sr-only">
        {photo.caption}
      </h2>
      <img src={photo.src} alt={photo.alt} referrerPolicy="no-referrer" />
      <figcaption>
        <strong>{photo.caption}</strong>
        <a href={photo.source} target="_blank" rel="noopener noreferrer">
          Photo: {photo.author} · {photo.license} ↗
        </a>
      </figcaption>
    </figure>
  );
}

export default function DetailDialog({ detail, onClose, onStep }) {
  const dialog = useRef(null),
    closeButton = useRef(null);
  useEffect(() => {
    const trigger = document.activeElement;
    const element = dialog.current;
    element.showModal();
    document.body.classList.add("body-locked");
    closeButton.current.focus();
    return () => {
      // Removing the dialog also unmounts the player, stopping video playback.
      element.close();
      document.body.classList.remove("body-locked");
      trigger?.focus();
    };
  }, []);
  function closeOnBackdrop(event) {
    if (event.target !== dialog.current) return;
    const r = dialog.current.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      onClose();
  }
  const count =
    detail.type === "goal"
      ? detail.list.length
      : detail.type === "photo"
        ? gallery.length
        : 0;
  const position =
    detail.type === "goal"
      ? detail.list.findIndex((g) => g.id === detail.goal.id)
      : detail.index;
  const canStep = count > 1 && onStep;
  function onKeyDown(event) {
    if (!canStep || event.target.closest?.("iframe")) return;
    if (event.key === "ArrowRight") onStep(1);
    if (event.key === "ArrowLeft") onStep(-1);
  }
  const eyebrow =
    detail.type === "goal"
      ? detail.goal.competition
      : detail.type === "photo"
        ? "THE GALLERY"
        : detail.type === "world-cup"
          ? "QATAR 2022 · THE ROAD TO GLORY"
          : "THE PEOPLE, THE NUMBERS, THE SOURCES";
  return (
    <dialog
      ref={dialog}
      id="detail-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={closeOnBackdrop}
      onKeyDown={onKeyDown}
    >
      <div className="dialog-top">
        <span className="eyebrow" id="dialog-eyebrow">
          {eyebrow}
        </span>
        <button
          ref={closeButton}
          className="icon-button"
          id="dialog-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div id="dialog-body">
        {detail.type === "goal" ? (
          <GoalStory key={detail.goal.id} goal={detail.goal} />
        ) : detail.type === "photo" ? (
          <PhotoStory key={detail.index} photo={gallery[detail.index]} />
        ) : detail.type === "world-cup" ? (
          <WorldCupStory />
        ) : (
          <Credits />
        )}
      </div>
      {canStep && (
        <nav className="dialog-nav" aria-label="Browse">
          <button onClick={() => onStep(-1)}>← Previous</button>
          <span>
            {String(position + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button onClick={() => onStep(1)}>Next →</button>
        </nav>
      )}
    </dialog>
  );
}
