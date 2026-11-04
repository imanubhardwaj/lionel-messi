// Generic analytics client -> Supabase edge function "analytics".
// Needs VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY. No-ops if missing or during SSR/prerender.
const DASHBOARD = "messi";
const URL_ = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));

function sessionId() {
  try {
    let id = sessionStorage.getItem("an_sid");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("an_sid", id);
    }
    return id;
  } catch {
    return undefined;
  }
}

export function track(event, metadata = {}) {
  if (typeof window === "undefined" || !URL_ || !KEY) return;
  try {
    const token = b64(`${new Date().toISOString()}_${DASHBOARD}_analytics`);
    const body = b64(
      JSON.stringify({
        event,
        metadata: {
          path: location.pathname,
          referrer: document.referrer || undefined,
          session_id: sessionId(),
          ...metadata,
        },
      }),
    );
    fetch(`${URL_}/functions/v1/analytics`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        "x-analytics-token": token,
      },
      body: JSON.stringify({ data: body }),
    }).catch(() => {});
  } catch {
    /* analytics must never break the app */
  }
}

// Zero-config tracking: outbound links and in-page nav clicks.
export function initAutoTracking() {
  if (typeof window === "undefined" || window.__anInit) return;
  window.__anInit = true;
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (/^upi:|paypal\.me/.test(href)) return; // tracked explicitly in the support section
      const label = (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 80);
      if (href.startsWith("#")) return track("nav_click", { target: href, label });
      try {
        const u = new URL(a.href);
        if (u.origin !== location.origin) track("outbound_click", { href: u.href.slice(0, 300), label });
      } catch { /* ignore malformed hrefs */ }
    },
    true,
  );
}
