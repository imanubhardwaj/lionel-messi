import { useState } from "react";
import { goals } from "../data.js";

function GoalCard({ goal, onSelect }) {
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
          {goal.year} / {String(goals.indexOf(goal) + 1).padStart(2, "0")}
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
  const selected = goals.filter(
    (goal) => filter === "all" || goal.club === filter,
  );
  return (
    <section className="section moments-section" id="moments">
      <div className="section-heading">
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
          The runs that stopped time. The left foot that
          <br className="desktop-only" /> made the impossible feel inevitable.
        </p>
      </div>
      <div className="archive-toolbar">
        <div className="filters" role="group" aria-label="Filter iconic goals">
          {[
            ["all", "All moments"],
            ["barcelona", "FC Barcelona"],
            ["argentina", "Argentina"],
          ].map(([key, label]) => (
            <button
              key={key}
              data-filter={key}
              className={filter === key ? "active" : undefined}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
              {key === "all" && <span>04</span>}
            </button>
          ))}
        </div>
        <span className="archive-count" id="archive-count" aria-live="polite">
          {String(selected.length).padStart(2, "0")} SELECTED MOMENTS
        </span>
      </div>
      <div className="goals-grid" id="goals-grid">
        {selected.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onSelect={onSelect} />
        ))}
      </div>
      <div className="section-note">
        <span>
          AN EDITOR’S SELECTION. EVERY GOAL, A DIFFERENT KIND OF MAGIC.
        </span>
        <span>
          OFFICIAL CHANNELS <span>↗</span>
        </span>
      </div>
      <div className="sr-only" aria-live="polite">
        Showing {selected.length}{" "}
        {filter === "all"
          ? "iconic"
          : filter === "barcelona"
            ? "Barcelona"
            : "Argentina"}{" "}
        moments
      </div>
    </section>
  );
}
