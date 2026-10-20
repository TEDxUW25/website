import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1280,height:800}});
await p.goto('http://localhost:3000'); await p.waitForTimeout(2500);
const h = await p.evaluate(()=>document.documentElement.scrollHeight);
for (let y=0,i=0;y<h;y+=800,i++){ await p.evaluate(y=>window.scrollTo(0,y),y); await p.waitForTimeout(900); await p.screenshot({path:process.argv[2]+`/s${String(i).padStart(2,'0')}.png`}); }
console.log(h); await b.close();
