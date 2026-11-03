import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Header,
  Hero,
  Numbers,
  WorldCup,
  Closing,
  Footer,
} from "./components/Sections.jsx";
import {
  Gallery,
  Quiz,
  Records,
  RoadToLusail,
  ScrollChrome,
  Ticker,
  Timeline,
  Trophies,
} from "./components/Premium.jsx";
import {
  BallonDorRoom,
  Dossier,
  Quotes,
  SearchPalette,
  Seasons,
  TheFinal,
} from "./components/Experience.jsx";
import Moments from "./components/Moments.jsx";
import Journey from "./components/Journey.jsx";
import DetailDialog from "./components/DetailDialog.jsx";
import Support from "./components/Support.jsx";
import Preloader from "./components/Preloader.jsx";
import { anniversaries, ballonDor, gallery, records, timeline, trophies } from "./content.js";
import { findGoal, goals } from "./videos.js";

const sections = [
  ["#moments", "Films", "Every film in the archive"],
  ["#the-final", "The final, minute by minute", "Lusail, 18 December 2022"],
  ["#road", "Road to Lusail", "All seven matches of Qatar 2022"],
  ["#timeline", "Timeline", "A life in football"],
  ["#seasons", "Season by season", "Club goals, 2004 to 2023"],
  ["#journey", "The journey", "Rosario, Barcelona, Paris, Miami"],
  ["#trophies", "Trophy room", "Team honours by chapter"],
  ["#ballon-dor", "Ballon d’Or room", "Eight awards, eight podiums"],
  ["#record-book", "Record book", "Milestones, filterable"],
  ["#gallery", "Gallery", "Licensed photographs"],
  ["#voices", "In their words", "What they said about him"],
  ["#dossier", "The dossier", "Facts and anniversaries"],
  ["#quiz", "The quiz", "Ten questions, drawn at random"],
  ["#support", "Support the tribute", "Tips for hosting and upkeep: PayPal or crypto"],
];

function readFilmHash() {
  const m = /[#&]film=([\w-]+)/.exec(window.location.hash);
  return m ? findGoal(m[1]) : null;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState(() => {
    const film = typeof window !== "undefined" && readFilmHash();
    return film ? { type: "goal", goal: film, list: goals, deepLink: true } : null;
  });
  const [searchOpen, setSearchOpen] = useState(false);

  const openGoal = useCallback((goal, list = goals, extra = {}) => {
    setDetail({ type: "goal", goal, list, ...extra });
  }, []);

  function step(delta, extra = {}) {
    setDetail((d) => {
      if (d?.type === "goal") {
        const i = d.list.findIndex((g) => g.id === d.goal.id);
        const next = d.list[(i + delta + d.list.length) % d.list.length];
        return { ...d, goal: next, ...extra };
      }
      if (d?.type === "photo") {
        return { ...d, index: (d.index + delta + gallery.length) % gallery.length };
      }
      return d;
    });
  }

  // Keep a shareable #film=… in the address bar while a film is open.
  useEffect(() => {
    if (typeof history === "undefined") return;
    if (detail?.type === "goal") {
      history.replaceState(null, "", `#film=${detail.goal.id}`);
    } else if (/film=/.test(window.location.hash)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [detail]);

  // Keyboard: ⌘K / Ctrl+K or "/" opens search.
  useEffect(() => {
    function onKey(e) {
      const typing = /^(input|textarea|select)$/i.test(e.target?.tagName || "");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !detail)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail]);

  const searchIndex = useMemo(() => {
    const entry = (kind, key, title, meta, extra, action) => ({
      kind,
      key,
      title,
      meta,
      haystack: `${kind} ${title} ${meta} ${extra || ""}`.toLowerCase(),
      action,
    });
    return [
      ...goals.map((g) =>
        entry("FILM", `film-${g.id}`, g.title, `${g.opponent} · ${g.date}`, `${g.competition} ${g.label} ${g.channel} ${g.description} ${g.year}`, () =>
          openGoal(g, goals),
        ),
      ),
      ...records.map((r) =>
        entry("RECORD", `rec-${r.title}`, `${r.n} · ${r.title}`, r.text, r.tag, () => jump("#record-book")),
      ),
      ...timeline.map((t) =>
        entry("MOMENT", `tl-${t.year}-${t.title}`, `${t.year} · ${t.title}`, t.text, t.date, () => jump("#timeline")),
      ),
      ...anniversaries.map((a) =>
        entry("ON THIS DAY", `ann-${a.title}`, `${a.day}.${a.month}.${a.year} · ${a.title}`, a.text, "", () =>
          a.film ? openGoal(findGoal(a.film), goals) : jump("#dossier"),
        ),
      ),
      ...ballonDor.map((b) =>
        entry("BALLON D’OR", `bdo-${b.year}`, `Ballon d’Or ${b.year}`, `No. ${b.n} · ahead of ${b.runnerUp}`, b.text, () => jump("#ballon-dor")),
      ),
      ...trophies.flatMap((t) =>
        t.items.map(([n, label]) =>
          entry("TROPHY", `tr-${t.team}-${label}`, `${n} × ${label}`, t.team, t.years, () => jump("#trophies")),
        ),
      ),
      ...gallery.map((p, i) =>
        entry("PHOTO", `ph-${p.id}`, p.caption, `Photo: ${p.author}`, p.alt, () => setDetail({ type: "photo", index: i })),
      ),
      ...sections.map(([href, title, meta]) => entry("SECTION", `sec-${href}`, title, meta, "", () => jump(href))),
    ];
  }, [openGoal]);

  function jump(href) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pick(item) {
    setSearchOpen(false);
    // Let the palette close before opening another dialog or scrolling.
    setTimeout(item.action, 30);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader />
      <ScrollChrome />
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
        onSearch={() => setSearchOpen(true)}
      />
      <main id="main">
        <Hero onSearch={() => setSearchOpen(true)} />
        <Ticker />
        <Numbers />
        <Moments onSelect={openGoal} />
        <WorldCup onOpen={() => setDetail({ type: "world-cup" })} />
        <TheFinal onWatch={openGoal} />
        <RoadToLusail onSelect={openGoal} />
        <Timeline />
        <Seasons />
        <Journey />
        <Trophies />
        <BallonDorRoom />
        <Records />
        <Gallery onOpen={(index) => setDetail({ type: "photo", index })} />
        <Quotes />
        <Dossier onWatch={openGoal} />
        <Quiz />
        <Support />
        <Closing />
      </main>
      <Footer onOpenCredits={() => setDetail({ type: "credits" })} />
      <SearchPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        index={searchIndex}
        onPick={pick}
      />
      {detail && (
        <DetailDialog
          key={detail.type}
          detail={detail}
          onClose={() => setDetail(null)}
          onStep={step}
        />
      )}
    </>
  );
}
