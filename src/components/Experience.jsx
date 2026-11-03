import { useEffect, useMemo, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "../hooks.js";
import {
  anniversaries,
  ballonDor,
  dossier,
  finalTimeline,
  quotes,
  seasons,
} from "../content.js";
import { findGoal, goals } from "../videos.js";
import { Counter, Reveal } from "./Premium.jsx";

/* ---------- The final, minute by minute ---------- */
export function TheFinal({ onWatch }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const listRef = useRef(null);
  const event = finalTimeline[active];
  const goal = findGoal("final22");

  useEffect(() => {
    if (!playing) return;
    if (active >= finalTimeline.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setActive((a) => a + 1), 2600);
    return () => clearTimeout(t);
  }, [playing, active]);

  useEffect(() => {
    const el = listRef.current?.children[active];
    el?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [active]);

  function onKeyDown(e) {
    if (e.key === "ArrowRight") setActive((a) => Math.min(a + 1, finalTimeline.length - 1));
    if (e.key === "ArrowLeft") setActive((a) => Math.max(a - 1, 0));
    if (e.key === "Home") setActive(0);
    if (e.key === "End") setActive(finalTimeline.length - 1);
  }

  const [arg, fra] = event.score.split("–");
  const penRows = finalTimeline.filter((e) => e.pen);
  return (
    <section className="section final-section" id="the-final">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow gold">
            <span className="section-index">03 /</span> LUSAIL · 18 DECEMBER 2022
          </div>
          <h2>
            The final,
            <br />
            <em>minute by minute.</em>
          </h2>
        </div>
        <p>
          Six goals, a save with a leg, and four penalties.
          <br />
          Step through the night Argentina became champions. Use ← → on a keyboard.
        </p>
      </Reveal>
      <div className="final-stage">
        <div className="final-board" aria-live="polite">
          <div className="final-board-score">
            <div className={event.team === "ARG" ? "scoring" : ""}>
              <span className="argentina-flag" aria-hidden="true"></span>
              <span>ARGENTINA</span>
            </div>
            <strong>
              {arg} <span>–</span> {fra}
            </strong>
            <div className={event.team === "FRA" ? "scoring" : ""}>
              <span>FRANCE</span>
              <span className="france-flag" aria-hidden="true"></span>
            </div>
          </div>
          <small>{event.pen ? "PENALTY SHOOT-OUT" : "MATCH"} · {event.minute}</small>
          <h3>{event.title}</h3>
          <p>{event.text}</p>
          {event.pen && (
            <ol className="pen-track" aria-label="Shoot-out so far">
              {penRows.map((row, i) => {
                const idx = finalTimeline.indexOf(row);
                const shown = idx <= active;
                const scored = !/saved|wide/i.test(row.title);
                return (
                  <li
                    key={row.minute + row.team}
                    className={`${row.team.toLowerCase()} ${shown ? (scored ? "scored" : "missed") : "pending"}`}
                    title={row.title}
                  >
                    <span>{row.team}</span>
                    <b aria-hidden="true">{shown ? (scored ? "●" : "×") : "○"}</b>
                    <span className="sr-only">{shown ? row.title : "not yet taken"}</span>
                    {i % 2 === 1 && <i aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          )}
          <div className="final-board-actions">
            <button className="button button-gold" onClick={() => setPlaying((p) => !p)}>
              {playing ? "Pause" : active === finalTimeline.length - 1 ? "Replay the night" : "Play the night"}{" "}
              <span>{playing ? "❚❚" : "▶"}</span>
            </button>
            {goal && (
              <button className="text-link gold" onClick={() => onWatch(goal, goals)}>
                Watch the highlights <span>↗</span>
              </button>
            )}
          </div>
        </div>
        <ol
          className="final-track"
          ref={listRef}
          role="listbox"
          aria-label="Events of the final"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-activedescendant={`final-event-${active}`}
        >
          {finalTimeline.map((e, i) => (
            <li
              key={e.minute + e.team + e.title}
              id={`final-event-${i}`}
              role="option"
              aria-selected={i === active}
              className={`${i === active ? "active" : ""} ${i < active ? "past" : ""} ${e.key ? "key" : ""} ${e.pen ? "pen" : ""} ${e.team.toLowerCase()}`}
              onClick={() => {
                setPlaying(false);
                setActive(i);
              }}
            >
              <span className="final-minute">{e.minute}</span>
              <span className="final-dot" aria-hidden="true"></span>
              <span className="final-label">
                {e.team && <b>{e.team}</b>} {e.score}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Season by season chart ---------- */
export function Seasons() {
  const [hover, setHover] = useState(null);
  const [table, setTable] = useState(false);
  const [ref, seen] = useInView(0.25);
  const peak = Math.max(...seasons.map((s) => s.goals));
  const max = Math.ceil(peak / 20) * 20;
  const total = seasons.reduce((a, s) => a + s.goals, 0);
  const best = seasons.reduce((a, s) => (s.goals > a.goals ? s : a), seasons[0]);
  const focus = hover === null ? best : seasons[hover];
  const ticks = Array.from({ length: max / 20 + 1 }, (_, i) => i * 20);
  return (
    <section className="section seasons-section" id="seasons">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">06 /</span> NINETEEN SEASONS
          </div>
          <h2>
            Season
            <br />
            <em>by season.</em>
          </h2>
        </div>
        <p>
          Club goals in all competitions, Barcelona and Paris.
          <br />
          {total} goals across nineteen seasons. Hover or focus a bar.
        </p>
      </Reveal>
      <div className="seasons-panel" ref={ref}>
        <div className="seasons-focus" aria-live="polite">
          <small>{focus.club.toUpperCase()} · {focus.season}</small>
          <strong>{focus.goals}</strong>
          <span>{focus.note || "goals in all competitions"}</span>
        </div>
        <div className="seasons-tools">
          <button className="text-link" aria-pressed={table} onClick={() => setTable((t) => !t)}>
            {table ? "Show chart" : "Show as table"} <span>{table ? "▥" : "☰"}</span>
          </button>
        </div>
        {table ? (
          <table className="seasons-table">
            <thead>
              <tr>
                <th scope="col">Season</th>
                <th scope="col">Club</th>
                <th scope="col">Goals</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {seasons.map((s) => (
                <tr key={s.season}>
                  <td>{s.season}</td>
                  <td>{s.club}</td>
                  <td>{s.goals}</td>
                  <td>{s.note || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            className="seasons-chart"
            role="group"
            aria-label={`Bar chart of goals per season, from ${seasons[0].goals} in 2004/05 to a peak of ${best.goals} in ${best.season}.`}
          >
            <div className="seasons-plot">
              <div className="seasons-grid" aria-hidden="true">
                {ticks.map((t) => (
                  <div key={t} style={{ bottom: `${(t / max) * 100}%` }}>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <ul className="seasons-bars" onMouseLeave={() => setHover(null)}>
                {seasons.map((s, i) => (
                  <li
                    key={s.season}
                    className={`${s.club === "PSG" ? "psg" : ""} ${hover === i ? "hover" : ""}`}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    tabIndex={0}
                    aria-label={`${s.season}, ${s.club}: ${s.goals} goals`}
                  >
                    {(s.season === best.season || i === 0 || i === seasons.length - 1) && (
                      <b className="bar-value">{s.goals}</b>
                    )}
                    <span
                      className="bar"
                      style={{
                        height: seen ? `${(s.goals / max) * 100}%` : "0%",
                        transitionDelay: `${i * 35}ms`,
                      }}
                    />
                    <small>{s.season}</small>
                  </li>
                ))}
              </ul>
            </div>
            <div className="seasons-legend" aria-hidden="true">
              <span><i className="swatch barca" /> FC Barcelona</span>
              <span><i className="swatch psg" /> Paris Saint-Germain</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Ballon d'Or room ---------- */
export function BallonDorRoom() {
  return (
    <section className="section bdo-section" id="ballon-dor">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow gold">
            <span className="section-index">09 /</span> THE GOLDEN ROOM
          </div>
          <h2>
            Eight
            <br />
            <em>Ballons d’Or.</em>
          </h2>
        </div>
        <p>
          No player has more. No player has had more than five.
          <br />
          Each award, with the podium behind it.
        </p>
      </Reveal>
      <ol className="bdo-grid">
        {ballonDor.map((b, i) => (
          <Reveal as="li" key={b.year} className="bdo-card" delay={i * 70}>
            <span className="bdo-ball" aria-hidden="true">
              <i />
            </span>
            <span className="bdo-n">{String(b.n).padStart(2, "0")}</span>
            <strong className="bdo-year">{b.year}</strong>
            <p>{b.text}</p>
            <dl>
              <div>
                <dt>2nd</dt>
                <dd>{b.runnerUp}</dd>
              </div>
              <div>
                <dt>3rd</dt>
                <dd>{b.third}</dd>
              </div>
            </dl>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Quotes ---------- */
export function Quotes() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setI((n) => (n + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, [paused]);
  const q = quotes[i];
  return (
    <section
      className="quotes-section"
      id="voices"
      aria-label="What they said about Messi"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="eyebrow">
        <span className="section-index">12 /</span> IN THEIR WORDS
      </div>
      <figure key={i} className="quote">
        <blockquote>
          <span aria-hidden="true">“</span>
          {q.text}
          <span aria-hidden="true">”</span>
        </blockquote>
        <figcaption>
          <strong>{q.who}</strong>
          <span>{q.role}</span>
        </figcaption>
      </figure>
      <div className="quote-dots" role="tablist" aria-label="Choose a quote">
        {quotes.map((item, n) => (
          <button
            key={item.who + n}
            role="tab"
            aria-selected={n === i}
            aria-label={`Quote by ${item.who}`}
            className={n === i ? "active" : undefined}
            onClick={() => {
              setI(n);
              setPaused(true);
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Dossier + on this day ---------- */
function nextOccurrence(month, day, now) {
  const year = now.getFullYear();
  let next = new Date(year, month - 1, day);
  const today = new Date(year, now.getMonth(), now.getDate());
  if (next < today) next = new Date(year + 1, month - 1, day);
  return { days: Math.round((next - today) / 86400000), year: next.getFullYear() };
}

export function Dossier({ onWatch, now = new Date() }) {
  const upcoming = useMemo(() => {
    return anniversaries
      .map((a) => {
        const next = nextOccurrence(a.month, a.day, now);
        return { ...a, days: next.days, yearsAgo: next.year - a.year };
      })
      .sort((a, b) => a.days - b.days || a.year - b.year)
      .slice(0, 3);
  }, [now]);
  const today = upcoming.find((a) => a.days === 0);
  return (
    <section className="section dossier-section" id="dossier">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">13 /</span> THE DOSSIER
          </div>
          <h2>
            Facts,
            <br />
            <em>for the record.</em>
          </h2>
        </div>
        <p>
          The essentials, and the anniversaries coming up.
          <br />
          Dates follow your device’s calendar.
        </p>
      </Reveal>
      <div className="dossier-grid">
        <dl className="dossier-list">
          {dossier.map((d) => (
            <div key={d.label}>
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
        <aside className="on-this-day" aria-labelledby="otd-title">
          <div className="eyebrow gold" id="otd-title">
            {today ? "ON THIS DAY" : "COMING UP"}
          </div>
          <ol>
            {upcoming.map((a) => {
              const film = a.film && findGoal(a.film);
              return (
                <li key={a.title}>
                  <small>
                    {a.days === 0
                      ? `TODAY · ${a.yearsAgo} YEARS AGO`
                      : a.days === 1
                        ? `TOMORROW · ${a.yearsAgo} YEARS`
                        : `IN ${a.days} DAYS · ${a.yearsAgo} YEARS`}{" "}
                    · {String(a.day).padStart(2, "0")}.{String(a.month).padStart(2, "0")}.{a.year}
                  </small>
                  <strong>{a.title}</strong>
                  <p>{a.text}</p>
                  {film && (
                    <button className="text-link" onClick={() => onWatch(film, goals)}>
                      Watch <span>▶</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </section>
  );
}

/* ---------- Search palette ---------- */
export function SearchPalette({ open, onClose, index, onPick }) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef(null);
  const dialog = useRef(null);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
      setQ("");
      setCursor(0);
      setTimeout(() => input.current?.focus(), 0);
    } else if (el.open) {
      el.close();
    }
  }, [open]);
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return index.slice(0, 8);
    const terms = needle.split(/\s+/);
    return index
      .map((item) => {
        const hay = item.haystack;
        const base = item.kind === "FILM" ? 2 : 0;
        const score = terms.reduce((s, t) => (hay.includes(t) ? s + (item.title.toLowerCase().includes(t) ? 3 : 1) : s - 100), base);
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.item);
  }, [q, index]);
  useEffect(() => setCursor(0), [results]);
  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      onPick(results[cursor]);
    }
  }
  return (
    <dialog
      ref={dialog}
      className="palette"
      aria-label="Search the archive"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      <div className="palette-box" onKeyDown={onKeyDown}>
        <div className="palette-input">
          <span aria-hidden="true">⌕</span>
          <input
            ref={input}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search films, records, moments… try “free kick” or “2015”"
            aria-label="Search"
            autoComplete="off"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-results" role="listbox" aria-label="Results">
          {results.length === 0 && <li className="palette-empty">Nothing found. Try a year, an opponent, or a trophy.</li>}
          {results.map((r, i) => (
            <li key={r.key} role="option" aria-selected={i === cursor}>
              <button
                className={i === cursor ? "active" : undefined}
                onMouseEnter={() => setCursor(i)}
                onClick={() => onPick(r)}
              >
                <small>{r.kind}</small>
                <strong>{r.title}</strong>
                <span>{r.meta}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="palette-foot">
          <span>↑↓ to move · ↵ to open</span>
          <span>{index.length} entries in the archive</span>
        </div>
      </div>
    </dialog>
  );
}
