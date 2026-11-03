// Offline colour-region tracing. Requires sharp; no raster is embedded in the SVG.
const fs = require('node:fs');
const sharp = process.env.MESSI_SHARP_LOADER ? require(process.env.MESSI_SHARP_LOADER) : require('sharp');
function simplify(points,tolerance=.65){
 if(points.length<=3)return points;
 const a=points[0],b=points[points.length-1],dx=b[0]-a[0],dy=b[1]-a[1],den=dx*dx+dy*dy;
 let max=0,at=0;
 for(let i=1;i<points.length-1;i++){
  const p=points[i],t=den?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/den)):0;
  const d=(p[0]-a[0]-t*dx)**2+(p[1]-a[1]-t*dy)**2;
  if(d>max){max=d;at=i;}
 }
 if(max<=tolerance*tolerance)return[a,b];
 return simplify(points.slice(0,at+1),tolerance).slice(0,-1).concat(simplify(points.slice(at),tolerance));
}
(async()=>{
 const input=process.argv[2]||'archive/artwork/messi-world-cup-source.png';
 const output=process.argv[3]||'dist/assets/messi-world-cup.svg';
 const png=await sharp(input).resize({width:1200,withoutEnlargement:true}).removeAlpha().median(3).blur(.7).png({palette:true,colours:80,dither:0,effort:10}).toBuffer();
 const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const w=info.width,h=info.height,n=w*h,palette=[],lookup=new Map(),labels=new Uint16Array(n);
 for(let i=0;i<n;i++){
  const k=data[i*3]*65536+data[i*3+1]*256+data[i*3+2];
  if(!lookup.has(k)){lookup.set(k,palette.length);palette.push('#'+k.toString(16).padStart(6,'0'));}
  labels[i]=lookup.get(k);
 }
 // Refine PNG's fixed bit-depth palette to 80 weighted colour clusters.
 const counts=new Uint32Array(palette.length);
 for(const c of labels)counts[c]++;
 const rgb=palette.map(hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)));
 const distance=(a,b)=>.3*(a[0]-b[0])**2+.59*(a[1]-b[1])**2+.11*(a[2]-b[2])**2;
 const centers=[rgb[counts.indexOf(Math.max(...counts))].slice()];
 while(centers.length<80){
  let best=-1,index=0;
  rgb.forEach((c,i)=>{const score=Math.min(...centers.map(v=>distance(c,v)))*Math.sqrt(counts[i]);if(score>best){best=score;index=i;}});
  centers.push(rgb[index].slice());
 }
 const mapping=new Uint16Array(palette.length);
 for(let iter=0;iter<15;iter++){
  const sums=centers.map(()=>[0,0,0,0]);
  rgb.forEach((c,i)=>{
   let best=Infinity,index=0;centers.forEach((v,j)=>{const d=distance(c,v);if(d<best){best=d;index=j;}});
   mapping[i]=index;const sum=sums[index],weight=counts[i];
   for(let k=0;k<3;k++)sum[k]+=c[k]*weight;sum[3]+=weight;
  });
  centers.forEach((c,i)=>{if(sums[i][3])for(let k=0;k<3;k++)c[k]=sums[i][k]/sums[i][3];});
 }
 for(let i=0;i<n;i++)labels[i]=mapping[labels[i]];
 palette.splice(0,palette.length,...centers.map(c=>'#'+c.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('')));
 // Merge isolated texture specks into their most frequent neighbour.
 const visited=new Uint8Array(n),queue=new Int32Array(n);
 for(let i=0;i<n;i++){
  if(visited[i])continue;
  const color=labels[i];let head=0,tail=1;queue[0]=i;visited[i]=1;
  const border=new Map();
  while(head<tail){
   const p=queue[head++],x=p%w;
   for(const q of [x>0?p-1:-1,x<w-1?p+1:-1,p>=w?p-w:-1,p<n-w?p+w:-1]){
    if(q<0)continue;
    if(labels[q]===color){if(!visited[q]){visited[q]=1;queue[tail++]=q;}}
    else border.set(labels[q],(border.get(labels[q])||0)+1);
   }
  }
  if(tail<9&&border.size){const replacement=[...border].sort((a,b)=>b[1]-a[1])[0][0];for(let j=0;j<tail;j++)labels[queue[j]]=replacement;}
 }
 const edges=palette.map(()=>new Map()),stride=w+1;
 function edge(c,a,b){const e=edges[c];if(!e.has(a))e.set(a,[]);e.get(a).push(b);}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const i=y*w+x,c=labels[i],a=y*stride+x,b=a+1,d=a+stride,e=d+1;
  if(y===0||labels[i-w]!==c)edge(c,a,b);
  if(x===w-1||labels[i+1]!==c)edge(c,b,e);
  if(y===h-1||labels[i+w]!==c)edge(c,e,d);
  if(x===0||labels[i-1]!==c)edge(c,d,a);
 }
 let contours=0,paths=[];
 for(let c=0;c<palette.length;c++){
  const remaining=edges[c],shapes=[];
  while(remaining.size){
   const start=remaining.keys().next().value;let cur=start;const points=[];
   do{
    points.push([cur%stride,Math.floor(cur/stride)]);
    const next=remaining.get(cur);if(!next)throw Error('Unclosed colour boundary');
    const dest=next.pop();if(!next.length)remaining.delete(cur);cur=dest;
   }while(cur!==start);
   points.push(points[0]);
   const clean=simplify(points);if(clean.length<4)continue;
   shapes.push('M'+clean.slice(0,-1).map(p=>p.join(' ')).join('L')+'Z');contours++;
  }
  if(shapes.length)paths.push(`<path fill="${palette[c]}" stroke="${palette[c]}" stroke-width=".35" stroke-linejoin="round" fill-rule="evenodd" d="${shapes.join('')}"/>`);
 }
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">Messi with the World Cup</title><desc id="desc">Colour-vector tracing of the supplied illustration of Lionel Messi smiling and holding the World Cup trophy.</desc>${paths.join('')}</svg>`;
 fs.writeFileSync(output,svg);
 await sharp(Buffer.from(svg)).resize(720).png().toFile('qa/hero-vector-preview.png');
 console.log(JSON.stringify({width:w,height:h,colours:palette.length,contours,bytes:Buffer.byteLength(svg),output}));
})().catch(e=>{console.error(e);process.exit(1);});
