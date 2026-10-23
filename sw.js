const V='food-army-v1';
    const EXT=[];
    self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./", "./index.html"]).then(()=>Promise.all(EXT.map(u=>c.add(new Request(u,{mode:'cors'})).catch(()=>{})))))).then(()=>self.skipWaiting()));});
    self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
    self.addEventListener('fetch',e=>{
      if(e.request.method!=='GET')return;
      const same=new URL(e.request.url).origin===location.origin;
      e.respondWith((same?fetch(e.request.url,{cache:'no-store'}):fetch(e.request)).then(r=>{const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
    });
    