import { useState } from "react";
import { categories, goals } from "../videos.js";
import { Reveal } from "./Premium.jsx";

const INITIAL = 9;

function GoalCard({ goal, number, onSelect }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <button
      className="goal-card"
      data-goal={goal.id}
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
  );
}

export default function Moments({ onSelect }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const selected = goals.filter(
    (goal) => filter === "all" || goal.category === filter,
  );
  const visible = expanded ? selected : selected.slice(0, INITIAL);
  const countFor = (key) =>
    key === "all" ? goals.length : goals.filter((g) => g.category === key).length;
  const label = categories.find(([key]) => key === filter)[1];
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
          {goals.length} films from official channels, 2007 to 2026.
          <br className="desktop-only" /> The runs that stopped time. The left
          foot that made the impossible feel inevitable.
        </p>
      </Reveal>
      <div className="archive-toolbar">
        <div className="filters" role="group" aria-label="Filter films">
          {categories.map(([key, name]) => (
            <button
              key={key}
              data-filter={key}
              className={filter === key ? "active" : undefined}
              aria-pressed={filter === key}
              onClick={() => {
                setFilter(key);
                setExpanded(false);
              }}
            >
              {name}
              <span>{String(countFor(key)).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <span className="archive-count" id="archive-count" aria-live="polite">
          {String(selected.length).padStart(2, "0")} FILMS
        </span>
      </div>
      <div className="goals-grid" id="goals-grid">
        {visible.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            number={goals.indexOf(goal) + 1}
            onSelect={(g) => onSelect(g, selected)}
          />
        ))}
      </div>
      {selected.length > INITIAL && (
        <div className="show-more">
          <button className="button button-blue" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? "Show fewer films" : `Show all ${selected.length} films`}{" "}
            <span>{expanded ? "↑" : "↓"}</span>
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
