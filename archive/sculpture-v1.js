import * as THREE from 'three';
import { OrbitControls } from './assets/vendor/OrbitControls.js';
import { RoomEnvironment } from './assets/vendor/RoomEnvironment.js';

// Original procedural sculpture. Every surface is actual 3D geometry.
export function initSculpture(){
  const host=document.querySelector('#sculpture');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const scene=new THREE.Scene();
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));
  renderer.setClearColor(0x000000,0);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  const camera=new THREE.PerspectiveCamera(33,1,.1,60);
  const controls=new OrbitControls(camera,renderer.domElement);
  controls.target.set(0,2.12,0);controls.enableDamping=true;controls.dampingFactor=.065;
  controls.enablePan=false;controls.enableZoom=true;controls.enableRotate=true;
  controls.autoRotate=!reduced.matches;controls.autoRotateSpeed=.42;
  controls.minDistance=4.5;controls.maxDistance=12;controls.minPolarAngle=.15;controls.maxPolarAngle=Math.PI*.65;
  controls.enableZoom=false; // Keep ordinary page scrolling uninterrupted; touch pinch and +/- below handle zoom.
  controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
  const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();
  const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xdceeff,0x17202b,2.4));
  const key=new THREE.DirectionalLight(0xffe0ae,4.5);key.position.set(-3,7,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-3;key.shadow.camera.right=3;key.shadow.camera.top=5;key.shadow.camera.bottom=-2;key.shadow.normalBias=.025;scene.add(key);
  const rim=new THREE.DirectionalLight(0x95d5ff,4.5);rim.position.set(3,4,-3);scene.add(rim);
  const front=new THREE.DirectionalLight(0xfff5de,1.5);front.position.set(1,4,6);scene.add(front);
  const bronze=new THREE.MeshStandardMaterial({color:0xb58b53,metalness:.72,roughness:.44});
  const bronzeLight=new THREE.MeshStandardMaterial({color:0xc9a46b,metalness:.68,roughness:.42});
  const hair=new THREE.MeshStandardMaterial({color:0x342b24,metalness:.48,roughness:.7});
  const eye=new THREE.MeshStandardMaterial({color:0x171b1b,metalness:.25,roughness:.5});
  const ivory=new THREE.MeshStandardMaterial({color:0xd8d6c8,metalness:.38,roughness:.47});
  const blue=new THREE.MeshStandardMaterial({color:0x6099b0,metalness:.5,roughness:.4});
  const dark=new THREE.MeshStandardMaterial({color:0x192c37,metalness:.5,roughness:.48});
  const gold=new THREE.MeshStandardMaterial({color:0xe0b352,metalness:.88,roughness:.23});
  const green=new THREE.MeshStandardMaterial({color:0x244c3d,metalness:.65,roughness:.32});
  const figure=new THREE.Group();scene.add(figure);
  function mesh(geometry,material,parent=figure){const m=new THREE.Mesh(geometry,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
  function ellipsoid(pos,scale,mat=bronze,parent=figure,segments=24){const m=mesh(new THREE.SphereGeometry(1,segments,16),mat,parent);m.position.set(...pos);m.scale.set(...scale);return m;}
  function limb(a,b,r1,r2,mat=bronze,parent=figure,radial=16){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b);const delta=end.clone().sub(start);const m=mesh(new THREE.CylinderGeometry(r2,r1,delta.length(),radial,4),mat,parent);m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;}
  function torus(pos,r,t,mat,parent=figure){const m=mesh(new THREE.TorusGeometry(r,t,8,64),mat,parent);m.position.set(...pos);m.rotation.x=Math.PI/2;return m;}
  function textPlane(text,pos,size,color,parent=figure,rotate=0){const c=document.createElement('canvas');c.width=512;c.height=512;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`bold ${text.length>2?135:300}px Arial`;ctx.fillText(text,256,270);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const m=mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshStandardMaterial({map:texture,transparent:true,roughness:.6,metalness:.3,depthWrite:false}),parent);m.position.set(...pos);m.rotation.y=rotate;return m;}
  // A dark plinth and engraved gold rings frame the collectible.
  const plinth=mesh(new THREE.CylinderGeometry(.96,1.03,.13,96),dark);plinth.position.y=.065;
  torus([0,.13,0],.94,.009,gold);torus([0,.01,0],1.02,.008,gold);
  // Boots, socks and anatomical legs.
  for(const sign of [-1,1]){
    const x=sign*.235;
    const boot=ellipsoid([x,.235,.13],[.15,.105,.31],bronzeLight);boot.rotation.y=-sign*.12;
    limb([x,.29,-.02],[sign*.23,.86,-.025],.103,.119,ivory);
    for(let i=0;i<2;i++)torus([sign*.23,.77+i*.047,-.025],.112,.008,blue);
    limb([sign*.23,.85,-.025],[sign*.22,1.28,0],.113,.145,bronze);
    ellipsoid([sign*.22,1.25,.015],[.145,.15,.14]);
    limb([sign*.22,1.28,0],[sign*.2,1.67,0],.146,.19,bronze);
    const short=limb([sign*.225,1.47,0],[sign*.19,1.88,0],.195,.225,dark);short.scale.z=.91;
    for(let i=0;i<3;i++)limb([sign*(.405+i*.012),1.5,0],[sign*(.376+i*.012),1.84,0],.006,.006,ivory);
    for(let i=0;i<4;i++){const lace=limb([x-.065,.315,.08+i*.035],[x+.065,.315,.08+i*.035],.006,.006,dark);lace.rotation.x=.1;}
  }
  textPlane('10',[.23,1.66,.186],.18,'#d4bf8f');
  // Tapered shirt, individual painted stripes wrapped onto its surface.
  const profile=[[.32,1.76],[.34,1.84],[.31,2.01],[.35,2.2],[.405,2.37],[.37,2.44],[.21,2.48]];
  const torsoGeo=new THREE.LatheGeometry(profile.map(([r,y])=>new THREE.Vector2(r,y)),64);
  const torso=mesh(torsoGeo,ivory);torso.scale.z=.61;
  for(let face=0;face<2;face++)for(const center of [-.65,0,.65]){
    const stripe=new THREE.LatheGeometry(profile.map(([r,y])=>new THREE.Vector2(r+.003,y)),20,face*Math.PI+center-.18,.36);
    const s=mesh(stripe,blue);s.scale.z=.615;
  }
  const collar=torus([0,2.46,0],.152,.034,dark);collar.scale.z=.8;
  limb([0,2.43,0],[0,2.68,0],.125,.13,bronze);
  textPlane('10',[0,2.12,.224],.29,'#152735');
  textPlane('10',[0,2.08,-.226],.41,'#152735',figure,Math.PI);
  textPlane('MESSI',[0,2.36,-.219],.27,'#152735',figure,Math.PI);
  const crest=mesh(new THREE.BoxGeometry(.07,.095,.008),gold);crest.position.set(.2,2.34,.216);
  for(let i=-1;i<=1;i++)ellipsoid([.2+i*.025,2.411,.217],[.006,.006,.004],gold);
  // Raised arms with continuous tapered anatomy and articulated fingers.
  for(const sign of [-1,1]){
    const shoulder=[sign*.37,2.35,0],upper=[sign*.56,2.56,.005],elbow=[sign*.73,2.83,.035],wrist=[sign*.31,3.37,.09];
    const sleeve=limb(shoulder,upper,.185,.15,ivory);sleeve.scale.z=.95;
    ellipsoid(shoulder,[.18,.17,.16],ivory);
    for(let i=0;i<3;i++)limb([sign*(.39+i*.02),2.49,-.045],[sign*(.5+i*.02),2.59,-.03],.008,.008,dark);
    limb(upper,elbow,.126,.103,bronze);ellipsoid(elbow,[.105,.114,.105]);
    limb(elbow,wrist,.108,.067,bronzeLight);
    ellipsoid(wrist,[.075,.09,.075],bronzeLight);
    const palm=ellipsoid([sign*.255,3.43,.085],[.075,.112,.063],bronzeLight);palm.rotation.z=-sign*.47;
    for(let i=0;i<4;i++){
      const y=3.405+i*.038;
      limb([sign*.255,y,.13],[sign*.17,y+.025,.15],.014,.012,bronzeLight);
      ellipsoid([sign*.166,y+.022,.137],[.014,.018,.022],bronzeLight,figure,12);
    }
    limb([sign*.3,3.43,.04],[sign*.19,3.49,.02],.022,.018,bronzeLight);
    if(sign===-1){
      // Engraved bands suggest the tattooed right arm without texture downloads.
      for(let i=0;i<8;i++){
        const p=new THREE.Vector3(...elbow).lerp(new THREE.Vector3(...wrist),.15+i*.085);
        const band=mesh(new THREE.TorusGeometry(.084-i*.002,.004,5,28),dark);band.position.copy(p);band.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(...wrist).sub(new THREE.Vector3(...elbow)).normalize());
      }
    }else{
      const band=limb([sign*.598,2.64,.015],[sign*.64,2.70,.02],.126,.12,blue);
      textPlane('C',[sign*.64,2.66,.131],.075,'#d8d6c8');
    }
  }
  // Hand-shaped face, with brow, cheek, jaw and nose volumes.
  const head=ellipsoid([0,2.85,.025],[.208,.285,.203],bronzeLight,figure,40);
  const positions=head.geometry.attributes.position;
  for(let i=0;i<positions.count;i++){
    let x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i);
    if(y<-.35)x*=.88;
    if(z>.2&&y>-.15&&y<.35)z+=.04;
    positions.setXYZ(i,x,y,z);
  }head.geometry.computeVertexNormals();
  ellipsoid([0,2.69,.09],[.147,.105,.134],bronze);
  for(const sign of [-1,1]){
    ellipsoid([sign*.204,2.84,.015],[.038,.065,.033],bronzeLight);
    ellipsoid([sign*.21,2.84,.04],[.015,.039,.012],bronze);
    ellipsoid([sign*.094,2.846,.207],[.052,.024,.014],bronze);
    ellipsoid([sign*.085,2.853,.222],[.031,.011,.008],eye);
    ellipsoid([sign*.08,2.858,.229],[.007,.007,.003],bronzeLight);
    const brow=ellipsoid([sign*.089,2.886,.213],[.062,.014,.018],hair);brow.rotation.z=-sign*.07;
    ellipsoid([sign*.126,2.785,.175],[.07,.058,.045],bronzeLight);
  }
  const nose=ellipsoid([0,2.81,.226],[.034,.07,.044],bronzeLight);nose.rotation.x=-.15;
  ellipsoid([0,2.774,.252],[.038,.025,.031],bronzeLight);
  for(const sign of [-1,1])ellipsoid([sign*.027,2.764,.245],[.017,.013,.014],bronze);
  // Beard is a fitted surface wrapping the jaw, not a flat face image.
  const beardGeometry=new THREE.SphereGeometry(1,40,20,0,Math.PI*2,Math.PI*.48,Math.PI*.47);
  const beard=mesh(beardGeometry,hair);beard.position.set(0,2.836,.03);beard.scale.set(.21,.273,.202);
  ellipsoid([0,2.735,.219],[.074,.018,.009],hair);
  ellipsoid([0,2.714,.218],[.052,.008,.009],bronzeLight);
  // Short swept hair; fine ridges give the bronze a sculpted finish.
  const cap=mesh(new THREE.SphereGeometry(1,40,20,0,Math.PI*2,0,Math.PI*.43),hair);cap.position.set(0,2.86,.015);cap.scale.set(.215,.29,.21);
  for(let i=0;i<17;i++){
    const x=-.18+i*.022;const y=3.08+.049*Math.sin((i/16)*Math.PI);
    const lock=ellipsoid([x,y,.032],[.028,.025,.16],hair,figure,12);lock.rotation.z=-.18;lock.rotation.x=-.09;
  }
  for(const sign of [-1,1])ellipsoid([sign*.186,2.953,.01],[.032,.083,.145],hair);
  // World Cup-inspired gold trophy: malachite base, two lifting figures, globe.
  const trophy=new THREE.Group();figure.add(trophy);trophy.position.set(0,3.37,.06);
  const base=mesh(new THREE.CylinderGeometry(.17,.19,.075,48),gold,trophy);base.position.y=.035;
  for(let i=0;i<2;i++)torus([0,.012+i*.038,0],.177,.012,green,trophy);
  const stem=mesh(new THREE.LatheGeometry([[.15,.07],[.115,.12],[.09,.23],[.125,.36],[.18,.44]].map(([r,y])=>new THREE.Vector2(r,y)),40),gold,trophy);
  for(const sign of [-1,1]){
    const path=new THREE.CatmullRomCurve3([new THREE.Vector3(sign*.10,.1,0),new THREE.Vector3(sign*.08,.25,.025),new THREE.Vector3(sign*.18,.39,.01),new THREE.Vector3(sign*.2,.48,0)]);
    mesh(new THREE.TubeGeometry(path,24,.037,9,false),gold,trophy);
    ellipsoid([sign*.12,.35,.09],[.046,.055,.044],gold,trophy);
    limb([sign*.1,.24,.09],[sign*.19,.47,.04],.03,.019,gold,trophy);
  }
  ellipsoid([0,.515,0],[.227,.227,.227],gold,trophy,48);
  const continent=new THREE.MeshStandardMaterial({color:0xb18c42,metalness:.8,roughness:.43});
  function land(points){const shape=new THREE.Shape();points.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();const geo=new THREE.ShapeGeometry(shape);const attr=geo.attributes.position;for(let i=0;i<attr.count;i++){let x=attr.getX(i),y=attr.getY(i);attr.setZ(i,Math.sqrt(Math.max(.003,.227**2-x*x-y*y))+.002);}const m=mesh(geo,continent,trophy);m.position.y=.515;}
  land([[-.13,.14],[-.06,.18],[-.015,.14],[-.03,.08],[-.075,.06],[-.07,.02],[-.13,.035],[-.17,.08]]);
  land([[-.09,.015],[-.025,-.015],[-.02,-.075],[-.06,-.155],[-.08,-.17],[-.10,-.08]]);
  land([[.03,.10],[.09,.15],[.16,.09],[.18,.035],[.12,.025],[.1,-.05],[.055,-.12],[.015,-.04],[.035,.015]]);
  const backLand=ellipsoid([.04,.57,-.204],[.09,.1,.025],continent,trophy);
  // Medal ribbon and a restrained halo on the floor.
  limb([-.1,2.46,.15],[0,2.17,.25],.012,.012,dark);limb([.1,2.46,.15],[0,2.17,.25],.012,.012,dark);
  const medal=mesh(new THREE.CylinderGeometry(.047,.047,.012,32),gold);medal.rotation.x=Math.PI/2;medal.position.set(0,2.145,.257);
  const ground=mesh(new THREE.CircleGeometry(4,96),new THREE.ShadowMaterial({opacity:.3}),scene);ground.rotation.x=-Math.PI/2;ground.position.y=-.01;ground.receiveShadow=true;
  const ringMaterial=new THREE.MeshBasicMaterial({color:0x779bb0,transparent:true,opacity:.15});torus([0,-.005,0],1.45,.004,ringMaterial,scene);torus([0,-.005,0],1.65,.003,ringMaterial,scene);
  function defaultPosition(back=false){const distance=host.clientWidth/host.clientHeight<.9?8.7:8;camera.position.set(back?-.55:.55,2.9,back?-distance:distance);controls.target.set(0,2.10,0);controls.update();}
  defaultPosition();
  host.replaceChildren(renderer.domElement);
  let visible=true,expanded=false;
  const pauseButton=document.querySelector('#rotate-toggle');
  function updatePause(){pauseButton.textContent=controls.autoRotate?'Ⅱ':'▶';pauseButton.setAttribute('aria-label',controls.autoRotate?'Pause automatic rotation':'Start automatic rotation');pauseButton.setAttribute('aria-pressed',String(controls.autoRotate));}
  updatePause();
  pauseButton.addEventListener('click',()=>{controls.autoRotate=!controls.autoRotate;updatePause();});
  controls.addEventListener('start',()=>{controls.autoRotate=false;updatePause();document.querySelectorAll('[data-view]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});});
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{controls.autoRotate=false;defaultPosition(button.dataset.view==='back');updatePause();document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});}));
  document.querySelector('#model-reset').addEventListener('click',()=>{defaultPosition();controls.autoRotate=!reduced.matches;updatePause();document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view==='front');b.setAttribute('aria-pressed',String(b.dataset.view==='front'));});});
  const expand=document.querySelector('#model-expand'),art=document.querySelector('#hero-art');
  function setExpanded(value){expanded=value;art.classList.toggle('model-expanded',expanded);document.body.classList.toggle('body-locked',expanded);expand.textContent=expanded?'×':'⛶';expand.setAttribute('aria-label',expanded?'Close expanded sculpture':'Expand 3D sculpture');expand.setAttribute('aria-expanded',String(expanded));if(expanded){document.querySelector('.site-header').inert=true;document.querySelectorAll('main>section:not(.hero),footer,.hero-copy,.hero-bottom').forEach(el=>el.inert=true);host.focus();}else{document.querySelector('.site-header').inert=false;document.querySelectorAll('main>section:not(.hero),footer,.hero-copy,.hero-bottom').forEach(el=>el.inert=false);expand.focus();}resize();}
  expand.addEventListener('click',()=>setExpanded(!expanded));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&expanded)setExpanded(false);});
  host.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','=','Home'].includes(event.key))return;
    event.preventDefault();controls.autoRotate=false;updatePause();
    const offset=camera.position.clone().sub(controls.target);const spherical=new THREE.Spherical().setFromVector3(offset);
    if(event.key==='ArrowLeft')spherical.theta-=.15;if(event.key==='ArrowRight')spherical.theta+=.15;
    if(event.key==='ArrowUp')spherical.phi=Math.max(.15,spherical.phi-.1);if(event.key==='ArrowDown')spherical.phi=Math.min(Math.PI*.65,spherical.phi+.1);
    if(event.key==='+'||event.key==='=')spherical.radius=Math.max(4.5,spherical.radius-.4);if(event.key==='-')spherical.radius=Math.min(12,spherical.radius+.4);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));if(event.key==='Home')defaultPosition();controls.update();
  });
  // Two-finger pinch zoom without consuming wheel scrolling on the landing page.
  let pinchDistance=0;
  renderer.domElement.addEventListener('touchstart',event=>{if(event.touches.length===2)pinchDistance=Math.hypot(event.touches[0].clientX-event.touches[1].clientX,event.touches[0].clientY-event.touches[1].clientY);},{passive:true});
  renderer.domElement.addEventListener('touchmove',event=>{if(event.touches.length===2){const d=Math.hypot(event.touches[0].clientX-event.touches[1].clientX,event.touches[0].clientY-event.touches[1].clientY);if(pinchDistance&&d){const offset=camera.position.clone().sub(controls.target);offset.setLength(THREE.MathUtils.clamp(offset.length()*pinchDistance/d,4.5,12));camera.position.copy(controls.target).add(offset);}pinchDistance=d;}},{passive:true});
  renderer.domElement.addEventListener('touchend',()=>{pinchDistance=0;},{passive:true});
  function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}
  const observer=new ResizeObserver(resize);observer.observe(host);resize();
  const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:0});visibility.observe(host);
  reduced.addEventListener('change',()=>{if(reduced.matches){controls.autoRotate=false;updatePause();}});
  const clock=new THREE.Clock();
  renderer.setAnimationLoop(()=>{const delta=Math.min(clock.getDelta(),.05);if(!visible||document.hidden)return;controls.update(delta);renderer.render(scene,camera);});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();renderer.setAnimationLoop(null);const notice=document.createElement('div');notice.className='scene-fallback';notice.innerHTML='<p>The 3D view paused because graphics memory was lost.</p><button>Reload 3D view</button>';notice.querySelector('button').onclick=()=>location.reload();host.append(notice);});
}
