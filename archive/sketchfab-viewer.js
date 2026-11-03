// Free, attributed artist models. The rejected procedural figure is archived,
// and never loaded by this page. Sketchfab handles geometry, textures and orbit.
export const MODELS = Object.freeze({
  scan: {
    uid: '3f9e75e29ad846d79597af4fda04b831',
    title: 'Lionel Messi — Musée Grévin 3D scan by FoxTrotte',
    label: 'Musée Grévin scan · FoxTrotte',
    source: 'https://sketchfab.com/3d-models/lionel-messi-3d-model-from-musee-grevin-3f9e75e29ad846d79597af4fda04b831',
  },
  barca: {
    uid: '7a2877c80f7a49018b425f223fb11049',
    title: '3D Lionel Messi in Barcelona jersey by caonghia2009',
    label: 'Barça model · caonghia2009',
    source: 'https://sketchfab.com/3d-models/3d-lionel-messi-barca-jersey-7a2877c80f7a49018b425f223fb11049',
  },
});

export function embedUrl(model) {
  const url = new URL(`https://sketchfab.com/models/${model.uid}/embed`);
  // Use free-tier options only. Leave Sketchfab's attribution and controls intact.
  const options = { autostart:1, autospin:0, camera:0, animation_autoplay:0, ui_theme:'dark', dnt:1, scrollwheel:0 };
  for (const [key,value] of Object.entries(options)) url.searchParams.set(key,value);
  return url.href;
}

export function initSculpture() {
  const art = document.querySelector('#hero-art');
  const frame = document.querySelector('#messi-viewer');
  const expand = document.querySelector('#model-expand');
  const attribution = document.querySelector('#model-attribution a');
  const direct = document.querySelector('#viewer-direct');
  const help = document.querySelector('#viewer-help');
  const buttons = [...document.querySelectorAll('[data-model]')];
  let selected = 'scan';
  let expanded = false;
  let helpTimer;
  let priorFocus;
  const inertBefore = new Map();

  function scheduleHelp() {
    clearTimeout(helpTimer);
    help.hidden = true;
    // An iframe load does not prove that its cross-origin WebGL scene is ready.
    // Keep a recovery link available after a grace period, regardless of load.
    helpTimer = setTimeout(() => { help.hidden = false; }, 18000);
  }

  function chooseModel(key) {
    if (!MODELS[key] || key === selected) return;
    selected = key;
    const model = MODELS[key];
    frame.title = model.title;
    frame.src = embedUrl(model);
    attribution.textContent = model.label + ' ↗';
    attribution.href = model.source;
    direct.href = model.source;
    buttons.forEach(button => {
      const active = button.dataset.model === key;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#announcement').textContent = `Selected ${model.label}. The external 3D viewer is loading.`;
    scheduleHelp();
  }
  buttons.forEach(button => button.addEventListener('click', () => chooseModel(button.dataset.model)));
  frame.addEventListener('error', () => { clearTimeout(helpTimer); help.hidden = false; });

  function setExpanded(value) {
    expanded = value;
    art.classList.toggle('model-expanded', value);
    document.body.classList.toggle('body-locked', value);
    expand.textContent = value ? '×' : '⛶';
    expand.setAttribute('aria-label', value ? 'Close expanded 3D viewer' : 'Expand 3D viewer');
    expand.setAttribute('aria-expanded', String(value));
    if (value) {
      priorFocus = document.activeElement;
      document.querySelectorAll('.site-header,main>section:not(.hero),footer,.hero-copy,.hero-bottom,.skip-link').forEach(el => {
        inertBefore.set(el, el.inert);
        el.inert = true;
      });
      expand.focus();
    } else {
      for (const [el,wasInert] of inertBefore) el.inert = wasInert;
      inertBefore.clear();
      (priorFocus?.isConnected ? priorFocus : expand).focus();
    }
  }
  expand.addEventListener('click', () => setExpanded(!expanded));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && expanded) setExpanded(false);
    if (event.key !== 'Tab' || !expanded) return;
    const focusable = [...art.querySelectorAll('button, a[href], iframe')].filter(el => !el.closest('[hidden]'));
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  scheduleHelp();
  window.addEventListener('pagehide', () => clearTimeout(helpTimer), { once:true });
}
