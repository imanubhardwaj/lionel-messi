import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../hooks.js";

// Counts up to Messi's number 10, once per browser session. Skipped for crawlers,
// automated browsers and visitors who prefer reduced motion.
const KEY = "lm-intro";
const initial = () => {
  if (typeof window === "undefined") return "gone";
  if (/bot|crawl|spider|slurp|lighthouse|pagespeed|headless/i.test(navigator.userAgent) || navigator.webdriver) return "gone";
  try {
    return sessionStorage.getItem(KEY) || prefersReducedMotion() ? "gone" : "on";
  } catch {
    return "on";
  }
};

export default function Preloader() {
  const [state, setState] = useState(initial);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (state === "gone") return;
    document.body.classList.add("body-locked");
    let raf, t0, timer;
    const step = (t) => {
      t0 ??= t;
      const p = Math.min(1, (t - t0) / 1500);
      setN(Math.round(10 * p));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setState("out");
        timer = setTimeout(() => {
          setState("gone");
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {
            // Storage unavailable: the intro simply plays again next visit.
          }
        }, 700);
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state === "gone") document.body.classList.remove("body-locked");
  }, [state]);

  if (state === "gone") return null;
  return (
    <div className={`preloader ${state === "out" ? "out" : ""}`} aria-hidden="true">
      <div className="pre-inner">
        <span className="pre-n">{String(n).padStart(2, "0")}</span>
        <span className="pre-l">LIONEL MESSI · BEYOND GREATNESS</span>
        <span className="pre-bar">
          <i style={{ transform: `scaleX(${n / 10})` }} />
        </span>
      </div>
    </div>
  );
}
