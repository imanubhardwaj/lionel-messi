import { useState } from "react";
import {
  Header,
  Hero,
  Numbers,
  WorldCup,
  Records,
  Closing,
  Footer,
} from "./components/Sections.jsx";
import Moments from "./components/Moments.jsx";
import Journey from "./components/Journey.jsx";
import DetailDialog from "./components/DetailDialog.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      <main id="main">
        <Hero />
        <Numbers />
        <Moments onSelect={(goal) => setDetail({ type: "goal", goal })} />
        <WorldCup onOpen={() => setDetail({ type: "world-cup" })} />
        <Journey />
        <Records />
        <Closing />
      </main>
      <Footer onOpenCredits={() => setDetail({ type: "credits" })} />
      {detail && (
        <DetailDialog
          key={detail.goal?.id || detail.type}
          detail={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </>
  );
}
