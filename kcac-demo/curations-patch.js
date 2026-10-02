(function(){
  const curations=[
    {title:'처음 만나는 한국 현대미술',desc:'첫 컬렉션을 시작하는 사람을 위한 회화와 오브제 셀렉션.',tag:'FIRST COLLECTION',count:'12 works',img:'photo-1577083552431-6e5fd01988a5'},
    {title:'Quiet Objects',desc:'조용한 공간에 오래 머무는 작품들. 절제된 색과 물성의 큐레이션.',tag:'MOOD · QUIET',count:'9 works',img:'photo-1549490349-8643362247b5'},
    {title:'Under 3 Million',desc:'300만원 이하에서 발견하는 지금 주목할 만한 작품.',tag:'PRICE CURATION',count:'16 works',img:'photo-1579783902614-a3fb3927b6a5'},
    {title:'Living with Art',desc:'거실과 일상의 중심에 자연스럽게 놓이는 작품을 골랐습니다.',tag:'SPACE · LIVING',count:'11 works',img:'photo-1541961017774-22349e4a1262'},
    {title:'New Voices',desc:'KCAC가 새롭게 발견한 젊은 작가들의 작업.',tag:'EMERGING ARTISTS',count:'14 works',img:'photo-1547891654-e66ed7ebb968'},
    {title:'A Touch of Blue',desc:'푸른색이 만드는 온도와 깊이를 따라가는 작품 셀렉션.',tag:'COLOR · BLUE',count:'10 works',img:'photo-1561440238-08eade76a77e'},
    {title:'Small Works, Big Presence',desc:'작은 크기지만 공간의 분위기를 선명하게 바꾸는 작품.',tag:'SMALL FORMAT',count:'13 works',img:'photo-1577083165633-14ebcdb0f658'},
    {title:'Weekend Collector',desc:'주말에 천천히 보고, 부담 없이 시작하는 첫 구매 제안.',tag:'KCAC EDIT',count:'8 works',img:'photo-1561214115-f2f134cc4912'}
  ];

  const img=(id,w=1200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&q=86&w=${w}`;

  const style=document.createElement('style');
  style.textContent=`
    .curations-page{padding:48px 0 92px}
    .curations-head{display:flex;align-items:end;justify-content:space-between;gap:28px;padding-bottom:26px;border-bottom:1px solid #111}
    .curations-head h1{font:52px/.96 Georgia,'Times New Roman',serif;letter-spacing:-.05em;margin:8px 0 0}
    .curations-intro{max-width:420px;font-size:11px;line-height:1.8;color:#777;margin:0 0 3px}
    .curations-feature{display:grid;grid-template-columns:1.45fr .55fr;gap:22px;padding:34px 0 42px;border-bottom:1px solid #e9e5df;cursor:pointer}
    .curations-feature-image{min-height:430px;overflow:hidden;background:#f2f0ec}
    .curations-feature-image img{width:100%;height:100%;min-height:430px;object-fit:cover;transition:transform .45s ease}
    .curations-feature:hover img{transform:scale(1.015)}
    .curations-feature-copy{display:flex;flex-direction:column;justify-content:flex-end;padding:10px 0 4px}
    .curations-feature-copy .meta{display:flex;gap:12px;align-items:center;font-size:9px;letter-spacing:.11em;color:#8b857d;text-transform:uppercase;margin-bottom:14px}
    .curations-feature-copy h2{font:40px/.98 Georgia,'Times New Roman',serif;letter-spacing:-.045em;margin:0 0 14px}
    .curations-feature-copy p{font-size:12px;line-height:1.75;color:#6f6a63;margin:0 0 22px}
    .curations-arrow{font-size:18px}
    .curations-section-head{display:flex;align-items:end;justify-content:space-between;padding:34px 0 18px}
    .curations-section-head h2{font:31px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:0}
    .curations-section-head span{font-size:10px;color:#999}
    .curations-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px 18px}
    .curation-card{cursor:pointer;min-width:0}
    .curation-card .image{aspect-ratio:1.18/1;overflow:hidden;background:#f2f0ec}
    .curation-card img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}
    .curation-card:hover img{transform:scale(1.02)}
    .curation-card .meta{display:flex;justify-content:space-between;gap:10px;margin:11px 0 7px;font-size:8px;letter-spacing:.12em;color:#938c83;text-transform:uppercase}
    .curation-card h3{font:25px/1.04 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:0 0 8px}
    .curation-card p{font-size:10px;line-height:1.65;color:#777;margin:0;max-width:92%}
    @media(max-width:900px){.curations-head{align-items:start;flex-direction:column}.curations-feature{grid-template-columns:1fr}.curations-feature-image,.curations-feature-image img{min-height:360px}.curations-feature-copy{max-width:620px}.curations-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){.curations-page{padding-top:32px}.curations-head h1{font-size:42px}.curations-feature-image,.curations-feature-image img{min-height:280px}.curations-feature-copy h2{font-size:34px}.curations-grid{grid-template-columns:1fr}.curation-card h3{font-size:27px}}
  `;
  document.head.appendChild(style);

  function card(c){
    return `<article class="curation-card" onclick="location.hash='discover'"><div class="image"><img src="${img(c.img,900)}" alt="${c.title}"></div><div class="meta"><span>${c.tag}</span><span>${c.count}</span></div><h3>${c.title}</h3><p>${c.desc}</p></article>`;
  }

  function page(){
    const f=curations[0];
    return `<div class="wrap curations-page">
      <div class="curations-head"><div><div class="kicker">KCAC CURATIONS</div><h1>Curations</h1></div><p class="curations-intro">취향, 공간, 예산, 그리고 지금의 감각을 기준으로 KCAC가 작품을 새롭게 묶어 소개합니다.</p></div>
      <section class="curations-feature" onclick="location.hash='discover'">
        <div class="curations-feature-image"><img src="${img(f.img,1500)}" alt="${f.title}"></div>
        <div class="curations-feature-copy"><div class="meta"><span>FEATURED CURATION</span><span>${f.count}</span></div><h2>${f.title}</h2><p>${f.desc}</p><span class="curations-arrow">→</span></div>
      </section>
      <div class="curations-section-head"><h2>Explore Curations</h2><span>${curations.length-1} selections</span></div>
      <section class="curations-grid">${curations.slice(1).map(card).join('')}</section>
    </div>`;
  }

  const prevRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='curations'){
      document.body.classList.remove('auth-page');
      const h=document.querySelector('header'),f=document.querySelector('footer');
      if(h)h.style.display=''; if(f)f.style.display='';
      document.getElementById('app').innerHTML=page();
      window.scrollTo(0,0);
      return;
    }
    prevRender();
  };
  window.addEventListener('hashchange',()=>window.render());
  window.render();
})();