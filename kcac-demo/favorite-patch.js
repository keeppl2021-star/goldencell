(function(){
  const KEY='kcac_saved_artworks_v1';
  const defaults=['Blue Ketchup, 2025','Moment of Bloom','Light within','After the Rain'];

  function getSaved(){
    try{
      const raw=localStorage.getItem(KEY);
      if(!raw) return new Set(defaults);
      const arr=JSON.parse(raw);
      return new Set(Array.isArray(arr)?arr:defaults);
    }catch(e){return new Set(defaults);}
  }
  function setSaved(set){
    try{localStorage.setItem(KEY,JSON.stringify([...set]));}catch(e){}
  }
  function toggleSaved(title){
    const saved=getSaved();
    if(saved.has(title)) saved.delete(title); else saved.add(title);
    setSaved(saved);
    syncAll();
  }

  const style=document.createElement('style');
  style.textContent=`
    .save-artwork-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:38px;padding:0 16px;border:1px solid #111;background:#fff;color:#111;font-size:10px;font-weight:700;letter-spacing:.02em;cursor:pointer;margin:0 8px 0 0;vertical-align:middle;transition:.2s}
    .save-artwork-btn:hover{background:#f6f4f1}
    .save-artwork-btn.saved{background:#111;color:#fff}
    .save-artwork-btn .heart{font-size:15px;line-height:1}
    .detailCopy .save-actions{display:flex;align-items:center;gap:8px;margin:18px 0 22px;flex-wrap:wrap}
    .detailCopy .save-actions .btn{margin:0}
    .mykcac-card{position:relative}
    .saved-card-remove{position:absolute;top:10px;right:10px;z-index:3;width:34px;height:34px;border:1px solid rgba(20,20,20,.18);border-radius:50%;background:rgba(255,255,255,.94);display:grid;place-items:center;font-size:15px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06);transition:.2s}
    .saved-card-remove:hover{background:#111;color:#fff;border-color:#111}
    .saved-card-remove[aria-pressed="true"]{background:#111;color:#fff;border-color:#111}
    .saved-remove-toast{position:fixed;right:24px;bottom:24px;z-index:80;background:#111;color:#fff;padding:11px 14px;font-size:10px;opacity:0;transform:translateY(6px);pointer-events:none;transition:.2s}
    .saved-remove-toast.show{opacity:1;transform:none}
    @media(max-width:600px){.save-artwork-btn{width:100%;margin:0}.detailCopy .save-actions{display:grid;grid-template-columns:1fr 1fr}.detailCopy .save-actions .btn{width:100%;text-align:center}}
  `;
  document.head.appendChild(style);

  function toast(msg){
    let el=document.querySelector('.saved-remove-toast');
    if(!el){el=document.createElement('div');el.className='saved-remove-toast';document.body.appendChild(el);}
    el.textContent=msg; el.classList.add('show');
    clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),1400);
  }

  function enhanceArtwork(){
    if(location.hash.slice(1)!=='artwork') return;
    const copy=document.querySelector('.detailCopy');
    if(!copy) return;
    const title=copy.querySelector('h1')?.textContent?.trim() || 'Blue Ketchup, 2025';
    let actions=copy.querySelector('.save-actions');
    const inquiry=copy.querySelector('.btn');
    if(!actions && inquiry){
      actions=document.createElement('div');
      actions.className='save-actions';
      inquiry.parentNode.insertBefore(actions,inquiry);
      actions.appendChild(inquiry);
    }
    if(!actions) return;
    let saveBtn=actions.querySelector('.save-artwork-btn');
    if(!saveBtn){
      saveBtn=document.createElement('button');
      saveBtn.type='button';
      saveBtn.className='save-artwork-btn';
      saveBtn.onclick=()=>{toggleSaved(title);toast(getSaved().has(title)?'관심작품에 저장했습니다.':'관심작품에서 해제했습니다.');};
      actions.insertBefore(saveBtn,actions.firstChild);
    }
    const isSaved=getSaved().has(title);
    saveBtn.classList.toggle('saved',isSaved);
    saveBtn.setAttribute('aria-pressed',String(isSaved));
    saveBtn.innerHTML=`<span class="heart">${isSaved?'♥':'♡'}</span><span>${isSaved?'관심작품 저장됨':'관심작품 저장'}</span>`;
  }

  function enhanceMyKcac(){
    if(location.hash.slice(1)!=='mykcac') return;
    const active=document.querySelector('.mykcac-tab.active')?.dataset?.mytab;
    if(active!=='saved') return;
    const savedSub=document.querySelector('[data-saved="liked"].active');
    if(!savedSub) return;

    const saved=getSaved();
    const grid=document.querySelector('.mykcac-grid4');
    if(!grid) return;
    const cards=[...grid.querySelectorAll('.mykcac-card')];
    cards.forEach(card=>{
      const title=card.querySelector('h3')?.textContent?.trim();
      if(!title) return;
      if(!saved.has(title)){card.remove();return;}
      let btn=card.querySelector('.saved-card-remove');
      if(!btn){
        btn=document.createElement('button');
        btn.type='button';
        btn.className='saved-card-remove';
        btn.title='관심작품 해제';
        btn.setAttribute('aria-label',title+' 관심작품 해제');
        btn.innerHTML='♥';
        btn.onclick=(e)=>{
          e.stopPropagation();
          const next=getSaved(); next.delete(title); setSaved(next);
          card.remove();
          updateSavedCount();
          toast('관심작품에서 해제했습니다.');
        };
        card.appendChild(btn);
      }
    });
    updateSavedCount();
  }

  function updateSavedCount(){
    const grid=document.querySelector('.mykcac-grid4');
    const count=grid?grid.querySelectorAll('.mykcac-card').length:0;
    const sub=document.querySelector('#mykcac-content .mykcac-section-head .sub');
    if(sub) sub.textContent=count+' items';
  }

  function syncAll(){
    requestAnimationFrame(()=>{enhanceArtwork();enhanceMyKcac();});
  }

  const obs=new MutationObserver(()=>syncAll());
  obs.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>setTimeout(syncAll,0));
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-mytab],[data-saved]')) setTimeout(syncAll,0);
  });
  syncAll();
})();