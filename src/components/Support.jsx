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

function Copy({ text, what, primary = false, children = "Copy" }) {
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
    <button className={primary ? "button button-gold" : "copy"} onClick={go} aria-label={`Copy ${what}`}>
      {ok ? "Copied ✓" : children}
      {primary && <span aria-hidden="true">⧉</span>}
    </button>
  );
}

function Card({ delay, label, title, headRight, intro, visual, field, note, action, className = "" }) {
  return (
    <Reveal delay={delay} className={`dcard ${className}`}>
      <span className="eyebrow">{label}</span>
      <div className="dhead">
        <h3>{title}</h3>
        {headRight}
      </div>
      <div className="dslot">{intro}</div>
      <div className="dvisual">{visual}</div>
      {field}
      <small className="dnote">{note}</small>
      <div className="dcard-act">{action}</div>
    </Reveal>
  );
}

const short = (v) => (v.length > 26 ? `${v.slice(0, 12)}…${v.slice(-12)}` : v);
function Field({ id, label, value, what }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [value]);
  const long = value.length > 26;
  return (
    <div className="dfield">
      <span className="flabel" id={id}>{label}</span>
      <div className={`field ${open ? "open" : ""}`} aria-labelledby={id}>
        {long ? (
          <button
            type="button"
            className="code"
            aria-expanded={open}
            aria-label={open ? `${what}: ${value}. Click to collapse` : `${what}, shortened. Click to show the full address`}
            title={open ? "Click to collapse" : value}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? value : short(value)}
          </button>
        ) : (
          <code className="code">{value}</code>
        )}
        <Copy text={value} what={what} />
      </div>
    </div>
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
      </p>
      <div className="support-grid">
        {upi.id && (
          <Card
            delay={0}
            label="UPI · INDIA"
            title="Pay with UPI"
            intro={<p>Scan with Google Pay, PhonePe, Paytm or any UPI app.</p>}
            visual={
              upi.qr ? (
                <div className="qr">
                  <img src={`${import.meta.env.BASE_URL}${upi.qr}`} alt={`UPI QR code for ${upi.id}`} width="640" height="640" loading="lazy" />
                </div>
              ) : (
                <QR text={upiLink} label="UPI payment" />
              )
            }
            field={<Field id="l-upi" label="UPI ID" value={upi.id} what="UPI ID" />}
            note="On a phone, tap the button to open your UPI app."
            action={<a className="button button-gold" href={upiLink}>Open UPI app <span aria-hidden="true">↗</span></a>}
          />
        )}
        <Card
          delay={80}
          label="PAYPAL · WORLDWIDE"
          title="Pay with PayPal"
          intro={<p>Any amount, from cards or your PayPal balance.</p>}
          visual={
            <div className="qr pp">
              <img src={`${import.meta.env.BASE_URL}assets/paypal.svg`} alt="" width="96" height="96" />
              <b>PayPal</b>
            </div>
          }
          field={<Field id="l-pp" label="PayPal link" value={paypal.replace("https://", "")} what="PayPal link" />}
          note="Opens PayPal in a new tab."
          action={<a className="button button-gold" href={paypal} target="_blank" rel="noopener noreferrer">Donate via PayPal <span aria-hidden="true">↗</span></a>}
        />
        <Card
          delay={160}
          className="crypto"
          label="CRYPTO · MULTI-CHAIN"
          title="Pay with crypto"
          headRight={
            <label className="chain">
              <span className="sr-only">Network</span>
              <select id="chain-select" aria-label="Network" value={c.id} onChange={(e) => setChain(e.target.value)}>
                {crypto.map((x) => (
                  <option key={x.id} value={x.id}>{x.label}</option>
                ))}
              </select>
            </label>
          }
          intro={<p>Pick a network, then scan the code or copy the address.</p>}
          visual={<QR text={c.uri(c.address)} label={`${c.chain} address`} />}
          field={<Field id="l-addr" label="Address" value={c.address} what={`${c.chain} address`} />}
          note={c.warn}
          action={<Copy key={c.id} primary text={c.address} what={`${c.chain} address`}>Copy address</Copy>}
        />
      </div>
      <p className="support-foot">
        Check the first and last characters of any address after pasting. Crypto transfers cannot be
        reversed. Sent to the wrong network, funds are lost.
      </p>
    </section>
  );
}
