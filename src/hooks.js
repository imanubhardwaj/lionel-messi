import { track } from "./analytics.js";
import { useCallback, useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Fires once when the element first scrolls into view.
export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(
    () => typeof IntersectionObserver === "undefined" || prefersReducedMotion(),
  );
  useEffect(() => {
    const el = ref.current;
    if (seen || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen];
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [past, setPast] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setPast(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return { progress, past };
}

// Small persistent store, shared across components, backed by localStorage.
// Storage can be unavailable (private mode, blocked data), so every access is guarded.
const KEY = "lmw:reel";
const listeners = new Set();
let cache = null;
function read() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw).filter((x) => typeof x === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}
function write(next) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable: keep the in-memory copy for this visit.
  }
  listeners.forEach((fn) => fn(next));
}

export function useFavourites() {
  const [favourites, setFavourites] = useState(read);
  useEffect(() => {
    listeners.add(setFavourites);
    return () => listeners.delete(setFavourites);
  }, []);
  const toggle = useCallback((id) => {
    const current = read();
    track("film_save", { id, saved: !current.includes(id) });
    write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }, []);
  const has = useCallback((id) => favourites.includes(id), [favourites]);
  return { favourites, toggle, has };
}
