import { useState } from "react";
import { categories, goals } from "../videos.js";
import { Reveal } from "./Premium.jsx";
import { useFavourites } from "../hooks.js";

const INITIAL = 12;

function GoalCard({ goal, number, onSelect, saved, onToggleSave }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className={`goal-card ${saved ? "is-saved" : ""}`} data-goal={goal.id}>
      <button
        className="goal-open"
        aria-label={`Watch ${goal.opponent}, ${goal.date}`}
        onClick={() => onSelect(goal)}
      >
        <div className="goal-image" data-year={goal.year}>
          <img
            src={`https://i.ytimg.com/vi/${goal.video}/hqdefault.jpg`}
            alt={
              imageFailed
                ? "Match video thumbnail unavailable"
                : `${goal.opponent} match video thumbnail`
            }
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            style={{ opacity: imageFailed ? 0 : 1 }}
          />
          <span className="goal-club">{goal.label}</span>
          <span className="goal-index">
            {goal.year} / {String(number).padStart(2, "0")}
          </span>
          <span className="goal-play" aria-hidden="true">
            ▶
          </span>
        </div>
        <h3>{goal.title}</h3>
        <div className="goal-meta">
          <span>{goal.opponent}</span>
          <span>{goal.date}</span>
        </div>
      </button>
      <button
        className="goal-save"
        aria-pressed={saved}
        aria-label={saved ? `Remove ${goal.title} from my reel` : `Save ${goal.title} to my reel`}
        title={saved ? "In your reel" : "Save to my reel"}
        onClick={() => onToggleSave(goal.id)}
      >
        {saved ? "♥" : "♡"}
      </button>
    </article>
  );
}

export default function Moments({ onSelect }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const { favourites, toggle, has } = useFavourites();
  const selected = goals.filter((goal) =>
    filter === "all"
      ? true
      : filter === "mine"
        ? favourites.includes(goal.id)
        : goal.category === filter,
  );
  const visible = expanded ? selected : selected.slice(0, INITIAL);
  const countFor = (key) =>
    key === "all"
      ? goals.length
      : key === "mine"
        ? favourites.length
        : goals.filter((g) => g.category === key).length;
  const allFilters = [...categories, ["mine", "My reel"]];
  const label = allFilters.find(([key]) => key === filter)[1];
  const years = `${goals[0].year} to ${goals.reduce((max, g) => Math.max(max, parseInt(g.year, 10) || 0), 0)}`;
  return (
    <section className="section moments-section" id="moments">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">01 /</span> PURE, UNFILTERED GENIUS
          </div>
          <h2>
            Some moments.
            <br />
            <em>Forever Messi.</em>
          </h2>
        </div>
        <p>
          {goals.length} films from official channels, {years}.
          <br className="desktop-only" /> Tap ♡ to build your own reel. It stays on
          this device.
        </p>
      </Reveal>
      <div className="archive-toolbar">
        <div className="filters" role="group" aria-label="Filter films">
          {allFilters.map(([key, name]) => (
            <button
              key={key}
              data-filter={key}
              className={`${filter === key ? "active" : ""} ${key === "mine" ? "mine" : ""}`.trim() || undefined}
              aria-pressed={filter === key}
              onClick={() => {
                setFilter(key);
                setExpanded(false);
              }}
            >
              {key === "mine" && <i aria-hidden="true">♥</i>}
              {name}
              <span>{String(countFor(key)).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <span className="archive-count" id="archive-count" aria-live="polite">
          {String(selected.length).padStart(2, "0")} FILMS
        </span>
      </div>
      {filter === "mine" && selected.length === 0 ? (
        <div className="reel-empty">
          <strong>Your reel is empty.</strong>
          <p>Tap the ♡ on any film to save it here. Then press play and let it run.</p>
          <button className="text-link" onClick={() => setFilter("all")}>
            Browse all films <span>→</span>
          </button>
        </div>
      ) : (
        <div className="goals-grid" id="goals-grid">
          {visible.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              number={goals.indexOf(goal) + 1}
              saved={has(goal.id)}
              onToggleSave={toggle}
              onSelect={(g) => onSelect(g, selected)}
            />
          ))}
        </div>
      )}
      {selected.length > INITIAL && (
        <div className="show-more">
          <button className="button button-blue" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? "Show fewer films" : `Show all ${selected.length} films`}{" "}
            <span>{expanded ? "↑" : "↓"}</span>
          </button>
        </div>
      )}
      {filter === "mine" && selected.length > 0 && (
        <div className="show-more">
          <button className="button button-blue" onClick={() => onSelect(selected[0], selected, { autoplay: true })}>
            <span className="play-small">▶</span> Play my reel <span>↗</span>
          </button>
        </div>
      )}
      <div className="section-note">
        <span>
          AN EDITOR’S SELECTION. EVERY FILM, A DIFFERENT KIND OF MAGIC.
        </span>
        <span>
          OFFICIAL CHANNELS <span>↗</span>
        </span>
      </div>
      <div className="sr-only" aria-live="polite">
        Showing {visible.length} of {selected.length} films in {label}
      </div>
    </section>
  );
}
