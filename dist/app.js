const $ = (selector) => document.querySelector(selector);
const dialog = $('#detail-dialog');
const goals = [
  { id: 'getafe', title: 'The run that said everything.', opponent: 'Barcelona vs Getafe', date: '18 APR 2007', year: '2007', club: 'barcelona', label: 'FC BARCELONA', competition: 'COPA DEL REY · SEMI-FINAL', video: '_OlTuc_t_BY', channel: 'FC Barcelona', description: 'A teenager picks up the ball near halfway. A slalom through Getafe’s defence follows, all balance, close control and audacity. The finish is almost the quietest part of it. A glimpse of everything that was still to come.' },
  { id: 'bayern', title: 'One touch. A world on pause.', opponent: 'Barcelona vs Bayern Munich', date: '06 MAY 2015', year: '2015', club: 'barcelona', label: 'FC BARCELONA', competition: 'CHAMPIONS LEAGUE · SEMI-FINAL', video: 'tsBDaFllufc', channel: 'UEFA', description: 'A change of direction leaves Jérôme Boateng on the turf. Then, with his right foot, Messi floats the ball over Manuel Neuer. UEFA’s 2014/15 Goal of the Season — an unforgettable moment in Barcelona’s 3–0 first-leg win.' },
  { id: 'athletic', title: 'There was no way through.', opponent: 'Athletic Club vs Barcelona', date: '30 MAY 2015', year: '2015', club: 'barcelona', label: 'FC BARCELONA', competition: 'COPA DEL REY · FINAL', video: '0MzhNaejzvE', channel: 'FC Barcelona', description: 'Pinned near the right touchline, surrounded by red-and-white shirts, Messi invents a route to goal. His solo opener sets Barcelona on their way to a 3–1 win in the Copa del Rey final. This official video contains the full match.' },
  { id: 'mexico', title: 'When a nation needed him.', opponent: 'Argentina vs Mexico', date: '26 NOV 2022', year: '2022', club: 'argentina', label: 'ARGENTINA', competition: 'WORLD CUP · GROUP STAGE', video: 'xhDzgSY9oCE', channel: 'FIFA', description: 'After defeat in their opening match, Argentina needed an answer. Messi found it from outside the box: a low, precise left-foot strike that broke the deadlock against Mexico. A breath of belief on the road to the World Cup.' }
];
const eras = {
  rosario: { city:'Rosario', date:'1987', coords:'32.95° S / 60.64° W', caption:'WHERE IT ALL BEGAN', color:'#a4c7b0', eyebrow:'CHAPTER 01 · THE LITTLE BOY WITH A BALL', title:'Before the world knew his name.', text:'Born on 24 June 1987 in Rosario, Argentina, Lionel Andrés Messi grew up with a ball at his feet. From neighbourhood pitches to Newell’s Old Boys, a love for football became a life’s direction. At 13, a new chapter awaited across the Atlantic.', source:'https://www.fcbarcelona.com/en/card/2214377/lionel-messi', sourceName:'Biography · FC Barcelona' },
  barcelona: { city:'Barcelona', date:'2000 — 2021', coords:'41.38° N / 2.12° E', caption:'A HOME. A HISTORY. A LEGACY.', color:'#a5b5e0', eyebrow:'CHAPTER 02 · THE MAKING OF AN ICON', title:'A city that became his canvas.', text:'La Masia nurtured the talent. Camp Nou watched it become something extraordinary. From his first-team debut in 2004 to his final season in 2021, Messi scored 672 competitive goals in 778 appearances for Barcelona, leaving an imprint that numbers can only begin to describe.', source:'https://www.fcbarcelona.com/en/football/first-team/news/2153661/eighth-pichichi-for-leo-messi', sourceName:'Career milestones · FC Barcelona' },
  paris: { city:'Paris', date:'2021 — 2023', coords:'48.84° N / 2.25° E', caption:'A DIFFERENT STAGE. THE SAME MAGIC.', color:'#b7bce0', eyebrow:'CHAPTER 03 · A NEW HORIZON', title:'The journey moved to Paris.', text:'In 2021, Messi joined Paris Saint-Germain. Two seasons in the French capital brought two Ligue 1 titles and a new setting for his vision and craft. During this chapter, his international dream reached its unforgettable conclusion at Qatar 2022.', source:'https://gazettengr.com/lionel-messi-leaves-psg/', sourceName:'PSG departure statement · Peoples Gazette' },
  miami: { city:'Miami', date:'2023', coords:'25.76° N / 80.19° W', caption:'A NEW CHAPTER IN PINK.', color:'#e5b4c9', eyebrow:'CHAPTER 04 · ACROSS THE ATLANTIC', title:'The magic found a new home.', text:'Messi arrived at Inter Miami in July 2023. A stoppage-time free kick on his debut announced the next chapter, and the club’s first Leagues Cup title followed that August. Another city, another generation of supporters, and the same unmistakable left foot.', source:'https://www.intermiamicf.com/news/season-in-review-your-2023-inter-miami-cf-team', sourceName:'2023 season review · Inter Miami CF' }
};
const journeyPhotos = {
  "rosario": {
    "file": "Monumento a la Bandera Rosario.jpg",
    "author": "Micaela Muro",
    "alt": "The National Flag Memorial in Rosario, Argentina",
    "width": 4586,
    "height": 3033,
    "position": "50% 50%",
    "label": "ROSARIO · NATIONAL FLAG MEMORIAL",
    "src": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Monumento_a_la_Bandera_Rosario.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Monumento_a_la_Bandera_Rosario.jpg",
    "license": "4.0"
  },
  "barcelona": {
    "file": "Messi_v_AS_Roma_2015.jpg",
    "author": "Justine Magny",
    "alt": "Lionel Messi dribbling past Roma defenders for FC Barcelona in 2015",
    "width": 4726,
    "height": 3151,
    "position": "50% 50%",
    "label": "FC BARCELONA · 2015",
    "src": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Messi_v_AS_Roma_2015.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Messi_v_AS_Roma_2015.jpg",
    "license": "2.0"
  },
  "paris": {
    "file": "Messi Neymar Mbappé PSG 2022.jpg",
    "author": "Liondartois",
    "alt": "Messi alongside Neymar and Kylian Mbappé playing for Paris Saint-Germain in 2022",
    "width": 4837,
    "height": 3524,
    "position": "50% 40%",
    "label": "PARIS SAINT-GERMAIN · 2022",
    "src": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Messi_Neymar_Mbapp%C3%A9_PSG_2022.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Messi_Neymar_Mbapp%C3%A9_PSG_2022.jpg",
    "license": "4.0"
  },
  "miami": {
    "file": "Lionel Messi NYCFC Miami 24 Sep 2025-051.jpg",
    "author": "Bryan Berlin",
    "alt": "Lionel Messi playing for Inter Miami against New York City FC in September 2025",
    "width": 5000,
    "height": 3333,
    "position": "50% 40%",
    "label": "INTER MIAMI · 2025",
    "src": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Lionel_Messi_NYCFC_Miami_24_Sep_2025-051.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Lionel_Messi_NYCFC_Miami_24_Sep_2025-051.jpg",
    "license": "4.0"
  }
};
function openDialog(eyebrow, html) {
  $('#dialog-eyebrow').textContent = eyebrow;
  $('#dialog-body').innerHTML = html;
  dialog.showModal();
  document.body.classList.add('body-locked');
  $('#dialog-close').focus();
}
function closeDialog() { dialog.close(); }
$('#dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(); } });
dialog.addEventListener('close', () => { $('#dialog-body').replaceChildren(); document.body.classList.remove('body-locked'); });
function showGoal(goal) {
  openDialog(goal.competition, `<h2 id="dialog-title">${goal.title}</h2><p class="dialog-description">${goal.description}</p><div class="video-shell"><img src="https://i.ytimg.com/vi/${goal.video}/hqdefault.jpg" alt="" referrerpolicy="no-referrer"><button class="video-consent" id="load-video">▶ Play on this page</button></div><div class="video-help"><span>Video from ${goal.channel}. Playing connects to YouTube.<br>Playback can vary by region and publisher settings.</span><a href="https://www.youtube.com/watch?v=${goal.video}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div>`);
  $('#load-video').addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${goal.video}?autoplay=1&rel=0`;
    frame.title = `${goal.opponent} — ${goal.channel}`;
    frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    $('.video-shell').replaceChildren(frame);
  }, { once:true });
}
function renderGoals(filter='all') {
  const selected = goals.filter(g => filter==='all'||g.club===filter);
  $('#goals-grid').innerHTML=selected.map(g=>`<button class="goal-card" data-goal="${g.id}" aria-label="Watch ${g.opponent}, ${g.date}"><div class="goal-image" data-year="${g.year}"><img src="https://i.ytimg.com/vi/${g.video}/hqdefault.jpg" alt="${g.opponent} match video thumbnail" loading="lazy" referrerpolicy="no-referrer"><span class="goal-club">${g.label}</span><span class="goal-index">${g.year} / ${String(goals.indexOf(g)+1).padStart(2,'0')}</span><span class="goal-play" aria-hidden="true">▶</span></div><h3>${g.title}</h3><div class="goal-meta"><span>${g.opponent}</span><span>${g.date}</span></div></button>`).join('');
  $('#archive-count').textContent=`${String(selected.length).padStart(2,'0')} SELECTED MOMENTS`;
  $('#announcement').textContent=`Showing ${selected.length} ${filter==='all'?'iconic':filter==='barcelona'?'Barcelona':'Argentina'} moments`;
  document.querySelectorAll('.goal-card').forEach(card => card.addEventListener('click',()=>showGoal(goals.find(g=>g.id===card.dataset.goal))));
  document.querySelectorAll('.goal-image img').forEach(img=>img.addEventListener('error',()=>{img.style.opacity='0';img.alt='Match video thumbnail unavailable';}));
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  renderGoals(button.dataset.filter);
}));
function renderEra(key){
  const e=eras[key];
  const photo=journeyPhotos[key];
  document.querySelectorAll('[data-era]').forEach(tab=>{const active=tab.dataset.era===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  $('#era-panel').setAttribute('aria-labelledby',`tab-${key}`);
  $('#era-panel').innerHTML=`<div class="era-content"><figure class="era-visual era-${key}"><img src="${photo.src}" width="${photo.width}" height="${photo.height}" alt="${photo.alt}" style="object-position:${photo.position}" loading="lazy" decoding="async" referrerpolicy="no-referrer"><figcaption><span>${photo.label}</span><a href="${photo.source}" target="_blank" rel="noopener noreferrer">Photo: ${photo.author} · CC BY-SA ${photo.license} ↗</a></figcaption><p class="journey-image-error" hidden>Photo unavailable. <a href="${photo.source}" target="_blank" rel="noopener noreferrer">View original ↗</a></p></figure><div class="era-copy"><div class="eyebrow">${e.eyebrow}</div><h3>${e.title}</h3><p>${e.text}</p><a class="era-source" href="${e.source}" target="_blank" rel="noopener noreferrer">${e.sourceName} ↗</a></div></div>`;
  const photoElement = $('#era-panel img');
  photoElement.addEventListener('error', () => { $('#era-panel .journey-image-error').hidden = false; });
}
document.querySelectorAll('[data-era]').forEach((tab,index,tabs)=>{
  tab.addEventListener('click',()=>renderEra(tab.dataset.era));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();renderEra(tabs[next].dataset.era);tabs[next].focus();}
  });
});
$('#open-world-cup').addEventListener('click',()=>openDialog('QATAR 2022 · THE ROAD TO GLORY',`<h2 id="dialog-title">Seven matches.<br><em>One immortal night.</em></h2><p>From an opening shock to a final for the ages. Argentina’s journey through the 2022 World Cup.</p><div class="cup-stats"><div><strong>7</strong><span>MESSI GOALS</span></div><div><strong>3</strong><span>MESSI ASSISTS</span></div><div><strong>★</strong><span>GOLDEN BALL</span></div></div><ol class="match-list">${[['GROUP C','Saudi Arabia','1–2'],['GROUP C','Mexico','2–0'],['GROUP C','Poland','2–0'],['ROUND OF 16','Australia','2–1'],['QUARTER-FINAL','Netherlands · 4–3 on pens','2–2'],['SEMI-FINAL','Croatia','3–0'],['FINAL','France · 4–2 on pens','3–3']].map(m=>`<li><small>${m[0]}</small><strong>${m[1]}</strong><span class="match-score">${m[2]}</span></li>`).join('')}</ol><a class="text-link gold" href="https://inside.fifa.com/en/tournaments/mens/worldcup/qatar2022/news/triumphant-argentina-conclude-unprecedented-fifa-world-cup" target="_blank" rel="noopener noreferrer">Read FIFA’s tournament story <span>↗</span></a>`));
$('#open-credits').addEventListener('click',()=>openDialog('THE PEOPLE, THE NUMBERS, THE SOURCES',`<h2 id="dialog-title">Made for the love of the game.</h2><p>This is an independent fan tribute, not an official Lionel Messi website. The hero features an illustration of Messi holding the World Cup trophy.</p><p>Records describe completed career milestones. The Qatar section is specifically about the 2022 tournament; this site does not provide live statistics. The “01” World Cup figure refers to the featured 2022 title.</p><ul class="source-list"><li><a href="https://www.uefa.com/news/0242-0e97e0ac1cb3-eef786ff788c-1000--messi-all-his-records/" target="_blank" rel="noopener noreferrer">UEFA — Messi’s records and Ballon d’Or awards</a></li><li><a href="https://www.fcbarcelona.com/en/football/first-team/news/1670444/stat-of-the-day--91-messis-goals-in-a-calendar-year/amp" target="_blank" rel="noopener noreferrer">FC Barcelona — 91 goals in 2012</a></li><li><a href="https://www.fcbarcelona.com/en/football/first-team/news/2153661/eighth-pichichi-for-leo-messi" target="_blank" rel="noopener noreferrer">FC Barcelona — 672 goals and 778 appearances</a></li><li><a href="https://inside.fifa.com/news/three-more-records-for-a-goalscorer-supreme" target="_blank" rel="noopener noreferrer">FIFA — Six European Golden Shoes</a></li><li><a href="https://inside.fifa.com/en/tournaments/mens/worldcup/qatar2022/news/triumphant-argentina-conclude-unprecedented-fifa-world-cup" target="_blank" rel="noopener noreferrer">FIFA — Qatar 2022</a></li><li><a href="https://www.fcbarcelona.com/en/card/2214377/lionel-messi" target="_blank" rel="noopener noreferrer">FC Barcelona — Early life</a></li></ul><p>Match videos and thumbnails are supplied by the respective official YouTube channels: FC Barcelona, UEFA and FIFA. Videos load only when you choose to play. Media remains the property of its respective owners.</p><p>Hero illustration: supplied by the site owner and converted locally into an SVG made of coloured vector paths. The illustration is hosted with the site. Trophy photograph: <a href="https://commons.wikimedia.org/wiki/File:FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg" target="_blank" rel="noopener noreferrer">Ank Kumar, FIFA Museum, Zürich (2018)</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. This is a museum photograph, not a photograph from the Qatar final.</p><p>Journey photography: ${Object.values(journeyPhotos).map(photo=>`<a href="${photo.source}" target="_blank" rel="noopener noreferrer">${photo.author}</a> (<a href="https://creativecommons.org/licenses/by-sa/${photo.license}/" target="_blank" rel="noopener noreferrer">CC BY-SA ${photo.license}</a>)`).join('; ')}. Photos are displayed with responsive framing and caption overlays. Any image adaptations retain their respective Creative Commons license. Rosario’s photo is from 2012; the other captions show the actual photo dates.</p><p>Typography: Barlow Condensed and DM Sans via Google Fonts.</p>`));
const menu=$('.menu-toggle');
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));menu.setAttribute('aria-label',expanded?'Close navigation':'Open navigation');$('#main-nav').classList.toggle('open',expanded);menu.textContent=expanded?'×':'☰';});
document.querySelectorAll('#main-nav a').forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#main-nav').classList.remove('open');menu.textContent='☰';}));
renderGoals();renderEra('rosario');

const heroPhoto = $('#hero-photo');
const photoError = $('#photo-error');
heroPhoto.addEventListener('error', () => { photoError.hidden = false; });
heroPhoto.addEventListener('load', () => { photoError.hidden = true; });
if (heroPhoto.complete && heroPhoto.naturalWidth === 0) photoError.hidden = false;

const trophyPhoto = $('#trophy-photo');
trophyPhoto.addEventListener('error', () => { $('#trophy-error').hidden = false; });
trophyPhoto.addEventListener('load', () => { $('#trophy-error').hidden = true; });
