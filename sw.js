if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const o=e=>i(e,l),d={module:{uri:l},exports:a,require:o};s[l]=Promise.all(r.map((e=>d[e]||o(e)))).then((e=>(n(...e),a)))}}define(["./workbox-ab24e45d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"about.html",revision:"5f3aa72829db802d177df75cd64f1a27"},{url:"assets/_...all_.61a86856.js",revision:null},{url:"assets/_name_.80e37cdf.js",revision:null},{url:"assets/404.706a77ca.js",revision:null},{url:"assets/about.d0dd727b.js",revision:null},{url:"assets/app.0ac5bb53.js",revision:null},{url:"assets/home.aedb9444.js",revision:null},{url:"assets/index.8351766e.css",revision:null},{url:"assets/README.b0b40f55.js",revision:null},{url:"assets/virtual_pwa-register.ea99fd4f.js",revision:null},{url:"assets/workbox-window.prod.es5.6954f450.js",revision:null},{url:"index.html",revision:"2a110f67c2e8c553df57b46d0591d19e"},{url:"readme.html",revision:"e7ae3b79e265eeac26add615da0cd83b"},{url:"favicon.svg",revision:"a795ab195c26601ea433babed25a7d0d"},{url:"safari-pinned-tab.svg",revision:"5eaf74d1c43d30e0af743b68a3f48504"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"37e8d18026b05432f623fc5efac2b4b1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
