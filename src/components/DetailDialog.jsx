import { track } from "../analytics.js";
import { useEffect, useRef, useState } from "react";
import { Credits, WorldCupStory } from "./Stories.jsx";
import { gallery } from "../content.js";
import { useFavourites } from "../hooks.js";

const YT_ORIGIN = "https://www.youtube-nocookie.com";

export function filmLink(id) {
  if (typeof window === "undefined") return `#film=${id}`;
  return `${window.location.origin}${window.location.pathname}#film=${id}`;
}

function ShareButton({ id }) {
  const [state, setState] = useState("idle");
  async function copy() {
    const url = filmLink(id);
    try {
      if (navigator.share) {
        await navigator.share({ title: "Lionel Messi World", url });
        setState("shared");
        track("film_share", { id, method: "native" });
      } else {
        await navigator.clipboard.writeText(url);
        setState("copied");
        track("film_share", { id, method: "copy_link" });
      }
    } catch {
      setState("idle");
      return;
    }
    setTimeout(() => setState("idle"), 2200);
  }
  return (
    <button className="dialog-share" onClick={copy} aria-live="polite">
      {state === "copied" ? "Link copied ✓" : state === "shared" ? "Shared ✓" : "Share this film ↗"}
    </button>
  );
}

function GoalStory({ goal, autoplay, continuous, onToggleContinuous, onEnded }) {
  const [playing, setPlaying] = useState(autoplay);
  const frame = useRef(null);
  const { has, toggle } = useFavourites();
  const saved = has(goal.id);

  // Listen for the YouTube player's "ended" state so a reel can run on its own.
  useEffect(() => {
    if (!playing) return;
    function onMessage(event) {
      if (event.origin !== YT_ORIGIN || event.source !== frame.current?.contentWindow) return;
      let data;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      const ended =
        (data?.event === "onStateChange" && data.info === 0) ||
        (data?.event === "infoDelivery" && data.info?.playerState === 0);
      if (ended) onEnded();
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [playing, onEnded]);

  function subscribe() {
    const win = frame.current?.contentWindow;
    if (!win) return;
    const send = (payload) => win.postMessage(JSON.stringify(payload), YT_ORIGIN);
    send({ event: "listening", id: "lmw", channel: "widget" });
    send({ event: "command", func: "addEventListener", args: ["onStateChange"], id: "lmw", channel: "widget" });
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const src = `${YT_ORIGIN}/embed/${goal.video}?autoplay=1&rel=0&enablejsapi=1${origin.startsWith("http") ? `&origin=${encodeURIComponent(origin)}` : ""}`;
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
            ref={frame}
            src={src}
            title={`${goal.opponent} — ${goal.channel}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={subscribe}
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
              onClick={() => {
                track("video_play", { id: goal.id, video_id: goal.video, source: "dialog" });
                setPlaying(true);
              }}
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
      <div className="dialog-tools">
        <button
          className={`dialog-save ${saved ? "on" : ""}`}
          aria-pressed={saved}
          onClick={() => toggle(goal.id)}
        >
          {saved ? "♥ In your reel" : "♡ Save to my reel"}
        </button>
        <ShareButton id={goal.id} />
        <label className="dialog-continuous">
          <input
            type="checkbox"
            checked={continuous}
            onChange={(e) => onToggleContinuous(e.target.checked)}
          />
          Play next film automatically
        </label>
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
  const [continuous, setContinuous] = useState(() => Boolean(detail.autoplay));
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
      trigger?.focus?.();
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
    if (!canStep || event.target.closest?.("iframe, input, textarea")) return;
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
          <GoalStory
            key={detail.goal.id}
            goal={detail.goal}
            autoplay={Boolean(detail.autoplay)}
            continuous={continuous}
            onToggleContinuous={setContinuous}
            onEnded={() => {
              if (continuous && canStep) onStep(1, { autoplay: true });
            }}
          />
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
