import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView, useScrollProgress } from "../hooks.js";
import {
  gallery,
  quiz,
  recordCategories,
  records,
  roadMatches,
  ticker,
  timeline,
  trophies,
} from "../content.js";
import { goals } from "../videos.js";

export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, seen] = useInView(0.12);
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Counter({ value, pad = 0 }) {
  const [ref, seen] = useInView(0.5);
  const [shown, setShown] = useState(prefersReducedMotion() ? value : 0);
  useEffect(() => {
    if (!seen || prefersReducedMotion()) {
      if (seen) setShown(value);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let frame;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, value]);
  return (
    <span ref={ref} aria-label={String(value)}>
      <span aria-hidden="true">{String(shown).padStart(pad, "0")}</span>
    </span>
  );
}

export function ScrollChrome() {
  const { progress, past } = useScrollProgress();
  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <a
        href="#home"
        className={`to-top ${past ? "show" : ""}`}
        aria-label="Back to top"
        tabIndex={past ? 0 : -1}
      >
        ↑
      </a>
    </>
  );
}

export function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="ticker" aria-label="Career highlights" role="region">
      <div className="ticker-track" aria-hidden="true">
        {items.map((text, i) => (
          <span key={i}>
            {text} <b>★</b>
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {ticker.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export function Timeline() {
  const scroller = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  function check() {
    const el = scroller.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }
  function scrollBy(dir) {
    const el = scroller.current;
    el.scrollBy({
      left: dir * Math.max(320, el.clientWidth * 0.8),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }
  return (
    <section className="section timeline-section" id="timeline">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">04 /</span> A LIFE IN FOOTBALL
          </div>
          <h2>
            Forty years.
            <br />
            <em>Sixteen moments.</em>
          </h2>
        </div>
        <div className="timeline-controls">
          <button aria-label="Earlier" disabled={edge.start} onClick={() => scrollBy(-1)}>
            ←
          </button>
          <button aria-label="Later" disabled={edge.end} onClick={() => scrollBy(1)}>
            →
          </button>
        </div>
      </Reveal>
      <div
        className="timeline-scroll"
        ref={scroller}
        onScroll={check}
        tabIndex={0}
        role="region"
        aria-label="Career timeline. Scroll horizontally."
      >
        <ol className="timeline-track">
          {timeline.map((m, i) => (
            <li key={m.year + m.title} className="tl-card">
              <span className="tl-icon" aria-hidden="true">
                {m.icon}
              </span>
              <span className="tl-year">{m.year}</span>
              <small>{m.date}</small>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <span className="tl-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RoadToLusail({ onSelect }) {
  return (
    <section className="section road-section" id="road">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow gold">
            <span className="section-index">03 /</span> QATAR 2022 · SEVEN MATCHES
          </div>
          <h2>
            The road to
            <br />
            <em>Lusail.</em>
          </h2>
        </div>
        <p>
          It started with a defeat. It ended with a trophy.
          <br />
          Every step, match by match. Tap a match to watch.
        </p>
      </Reveal>
      <ol className="road-list">
        {roadMatches.map((m, i) => {
          const goal = m.video && goals.find((g) => g.id === m.video);
          const Inner = (
            <>
              <span className="road-step">{String(i + 1).padStart(2, "0")}</span>
              <small>{m.stage}</small>
              <strong>{m.opponent}</strong>
              <span className={`road-score ${m.result === "L" ? "loss" : ""}`}>
                {m.score}
                {m.pens && <em>{m.pens}</em>}
              </span>
              <p>{m.note}</p>
              {goal && <span className="road-watch">▶ Watch</span>}
            </>
          );
          return (
            <li key={m.stage + m.opponent} className={m.stage === "FINAL" ? "is-final" : ""}>
              {goal ? (
                <button onClick={() => onSelect(goal, goals)} aria-label={`Watch ${m.opponent}, ${m.stage}`}>
                  {Inner}
                </button>
              ) : (
                <div>{Inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="road-foot">
        Messi: 7 goals, 3 assists, Golden Ball. Scored in the group stage, round of 16, quarter-final, semi-final and final.
      </p>
    </section>
  );
}

export function Trophies() {
  return (
    <section className="section trophy-section" id="trophies">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow gold">
            <span className="section-index">06 /</span> THE TROPHY ROOM
          </div>
          <h2>
            Everything
            <br />
            <em>he touched, he won.</em>
          </h2>
        </div>
        <p>
          Four clubs and countries. A career&rsquo;s worth of silverware.
          <br />
          Team honours, by chapter.
        </p>
      </Reveal>
      <div className="trophy-grid">
        {trophies.map((t, i) => (
          <Reveal as="article" key={t.team} className="trophy-card" delay={i * 90} style={{ "--accent": t.accent }}>
            <header>
              <small>{t.years}</small>
              <h3>{t.team}</h3>
              <strong className="trophy-total">
                <Counter value={t.total} />
                <span>HONOURS</span>
              </strong>
            </header>
            <ul>
              {t.items.map(([n, label]) => (
                <li key={label}>
                  <b>{n}</b>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <p className="trophy-note">
        Honours as commonly listed for senior club and national teams, plus Olympic gold and the 2005 Under-20 World Cup. Counts exclude individual awards.
      </p>
    </section>
  );
}

export function Records() {
  const [filter, setFilter] = useState("all");
  const list = records.filter((r) => filter === "all" || r.cat === filter);
  return (
    <section className="section record-section rec-section" id="record-book">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">07 /</span> IN A LEAGUE OF HIS OWN
          </div>
          <h2>
            History.
            <br />
            <em>Written with his left foot.</em>
          </h2>
        </div>
        <p>
          {records.length} milestones from a record book that keeps growing.
          <br />
          Completed achievements, preserved in time.
        </p>
      </Reveal>
      <div className="archive-toolbar">
        <div className="filters" role="group" aria-label="Filter records">
          {recordCategories.map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? "active" : undefined}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="archive-count" aria-live="polite">
          {String(list.length).padStart(2, "0")} RECORDS
        </span>
      </div>
      <ul className="rec-grid">
        {list.map((r) => {
          const body = (
            <>
              <span className="rec-n">
                <Counter value={r.n} pad={r.n < 10 ? 2 : 0} />
              </span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <span className="rec-foot">
                <span className="record-tag">{r.tag || " "}</span>
                {r.href && <span aria-hidden="true">↗</span>}
              </span>
            </>
          );
          return (
            <li key={r.title}>
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              ) : (
                <div>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Gallery({ onOpen }) {
  return (
    <section className="section gallery-section" id="gallery">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-index">08 /</span> THE GALLERY
          </div>
          <h2>
            Frozen
            <br />
            <em>in time.</em>
          </h2>
        </div>
        <p>
          Photographs from every chapter, licensed for reuse.
          <br />
          Tap any image to enlarge.
        </p>
      </Reveal>
      <div className="gallery-grid">
        {gallery.map((p, i) => (
          <Reveal
            as="button"
            key={p.id}
            className={`gallery-tile ${p.size === "wide" ? "wide" : ""}`}
            delay={(i % 3) * 80}
            onClick={() => onOpen(i)}
            aria-label={`Enlarge photo: ${p.caption}`}
          >
            <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            <span>{p.caption}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Quiz() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const done = step >= quiz.length;
  const item = quiz[step];
  function choose(i) {
    if (picked !== null) return;
    setPicked(i);
    if (i === item.c) setScore((s) => s + 1);
  }
  function next() {
    setPicked(null);
    setStep((s) => s + 1);
  }
  function restart() {
    setStep(0);
    setPicked(null);
    setScore(0);
  }
  const verdict =
    score === quiz.length
      ? "Perfect. A true Messista."
      : score >= 8
        ? "Elite. You have been paying attention."
        : score >= 5
          ? "Solid. A proper fan, with room to relive a few matches."
          : "Time to rewatch the films above.";
  return (
    <section className="section quiz-section" id="quiz">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow gold">
            <span className="section-index">09 /</span> PROVE YOU&rsquo;RE A FAN
          </div>
          <h2>
            The Messi
            <br />
            <em>challenge.</em>
          </h2>
        </div>
        <p>
          Ten questions. No tricks, just football history.
          <br />
          How well do you know number 10?
        </p>
      </Reveal>
      <div className="quiz-card" aria-live="polite">
        {done ? (
          <div className="quiz-result">
            <small>YOUR SCORE</small>
            <strong>
              {score}
              <span>/ {quiz.length}</span>
            </strong>
            <p>{verdict}</p>
            <button className="button button-blue" onClick={restart}>
              Play again <span>↻</span>
            </button>
          </div>
        ) : (
          <>
            <div className="quiz-meta">
              <span>
                QUESTION {step + 1} / {quiz.length}
              </span>
              <span>SCORE {score}</span>
            </div>
            <div className="quiz-bar" aria-hidden="true">
              <span style={{ width: `${(step / quiz.length) * 100}%` }} />
            </div>
            <h3>{item.q}</h3>
            <div className="quiz-options">
              {item.a.map((text, i) => {
                const state =
                  picked === null ? "" : i === item.c ? "correct" : i === picked ? "wrong" : "dim";
                return (
                  <button key={text} className={state} disabled={picked !== null && state === "dim"} onClick={() => choose(i)}>
                    <b>{String.fromCharCode(65 + i)}</b>
                    {text}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="quiz-why">
                <p>
                  <strong>{picked === item.c ? "Correct." : "Not quite."}</strong> {item.why}
                </p>
                <button className="text-link" onClick={next}>
                  {step === quiz.length - 1 ? "See my score" : "Next question"} <span>→</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
