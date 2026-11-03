import { useEffect, useState } from "react";
import { support } from "../support.js";
import { Reveal } from "./Premium.jsx";

function QR({ text, label }) {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    let live = true;
    import("qrcode")
      .then((m) =>
        (m.default || m).toString(text, {
          type: "svg",
          margin: 1,
          width: 480,
          color: { dark: "#0d2038", light: "#ffffff" },
        }),
      )
      .then((s) => live && setSvg(s))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [text]);
  return svg ? (
    <div className="qr" role="img" aria-label={`QR code for ${label}`} dangerouslySetInnerHTML={{ __html: svg }} />
  ) : (
    <div className="qr qr-empty" aria-hidden="true" />
  );
}

function Copy({ text, what }) {
  const [ok, setOk] = useState(false);
  const go = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
      } catch {
        // Clipboard unavailable: the value stays visible for manual copying.
      }
      t.remove();
    }
    setOk(true);
    setTimeout(() => setOk(false), 1800);
  };
  return (
    <button className="copy" onClick={go} aria-label={`Copy ${what}`}>
      {ok ? "Copied ✓" : "Copy"}
    </button>
  );
}

export default function Support() {
  const { upi, paypal, crypto } = support;
  const [chain, setChain] = useState(crypto[0].id);
  const c = crypto.find((x) => x.id === chain);
  const upiLink = upi.id
    ? `upi://pay?pa=${encodeURIComponent(upi.id)}&pn=${encodeURIComponent(upi.name)}&cu=INR&tn=${encodeURIComponent("Support Lionel Messi World")}`
    : "";
  return (
    <section className="section support-section" id="support" aria-labelledby="support-h">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow gold">
            <span className="section-index">15 /</span> SUPPORT THE TRIBUTE
          </div>
          <h2 id="support-h">
            Keep the
            <br />
            <em>magic alive.</em>
          </h2>
        </div>
        <p>
          This site is free and ad-free.
          <br />
          Tips help cover hosting and upkeep.
        </p>
      </Reveal>
      <p className="support-note">
        <b>Please note:</b> this is an independent fan project. Donations support the website only.
        They are voluntary, non-refundable, and <b>do not go to Lionel Messi</b>, his representatives,
        or any club or federation.
      </p>
      <div className="support-grid">
        {upi.id && (
          <Reveal className="dcard">
            <span className="eyebrow">UPI · INDIA</span>
            <h3>Pay with any UPI app</h3>
            <QR text={upiLink} label="UPI payment" />
            <div className="field">
              <code>{upi.id}</code>
              <Copy text={upi.id} what="UPI ID" />
            </div>
            <small>Scan on a phone, or tap the button on mobile.</small>
            <div className="dcard-act">
              <a className="button button-gold" href={upiLink}>
                Open UPI app <span>↗</span>
              </a>
            </div>
          </Reveal>
        )}
        <Reveal delay={80} className="dcard">
          <span className="eyebrow">PAYPAL · WORLDWIDE</span>
          <h3>Send a tip with PayPal</h3>
          <p>Any amount, from cards or your PayPal balance. Opens PayPal in a new tab.</p>
          <div className="field">
            <code>{paypal.replace("https://", "")}</code>
            <Copy text={paypal} what="PayPal link" />
          </div>
          <div className="dcard-act">
            <a className="button button-gold" href={paypal} target="_blank" rel="noopener noreferrer">
              Donate via PayPal <span>↗</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={160} className="dcard crypto">
          <span className="eyebrow">CRYPTO</span>
          <h3>Send crypto</h3>
          <div className="crypto-body">
            <QR text={c.uri(c.address)} label={`${c.chain} address`} />
            <div className="crypto-info">
              <label className="chain" htmlFor="chain-select">
                <span>Network</span>
                <select id="chain-select" value={c.id} onChange={(e) => setChain(e.target.value)}>
                  {crypto.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="field">
                <code className="addr" aria-live="polite">
                  {c.address}
                </code>
                <Copy key={c.id} text={c.address} what={`${c.chain} address`} />
              </div>
              <small>{c.warn}</small>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="support-foot">
        Check the first and last characters of any address after pasting. Crypto transfers cannot be
        reversed. Sent to the wrong network, funds are lost.
      </p>
    </section>
  );
}
