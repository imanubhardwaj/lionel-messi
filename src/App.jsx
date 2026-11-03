import { useState } from "react";
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
import Moments from "./components/Moments.jsx";
import Journey from "./components/Journey.jsx";
import DetailDialog from "./components/DetailDialog.jsx";
import { gallery } from "./content.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  function step(delta) {
    setDetail((d) => {
      if (d?.type === "goal") {
        const i = d.list.findIndex((g) => g.id === d.goal.id);
        const next = d.list[(i + delta + d.list.length) % d.list.length];
        return { ...d, goal: next };
      }
      if (d?.type === "photo") {
        return { ...d, index: (d.index + delta + gallery.length) % gallery.length };
      }
      return d;
    });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollChrome />
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      <main id="main">
        <Hero />
        <Ticker />
        <Numbers />
        <Moments onSelect={(goal, list) => setDetail({ type: "goal", goal, list })} />
        <WorldCup onOpen={() => setDetail({ type: "world-cup" })} />
        <RoadToLusail onSelect={(goal, list) => setDetail({ type: "goal", goal, list })} />
        <Timeline />
        <Journey />
        <Trophies />
        <Records />
        <Gallery onOpen={(index) => setDetail({ type: "photo", index })} />
        <Quiz />
        <Closing />
      </main>
      <Footer onOpenCredits={() => setDetail({ type: "credits" })} />
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
