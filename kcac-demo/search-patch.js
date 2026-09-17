(function(){
  const SIMG='https://images.unsplash.com/';
  const artists=[
    ['한소미','갤러리 소소','photo-1534528741775-53994a69daeb'],
    ['Shin Dain','HERAS ART GALLERY','photo-1494438639946-1ebd1d20bf85'],
    ['김선우','PKM Gallery','photo-1506794778202-cad84cf45f1d'],
    ['최유진','국제갤러리','photo-1527980965255-d3b416303d12'],
    ['박서현','조현화랑','photo-1500648767791-00dcc994a43e'],
    ['이도윤','Gallery M','photo-1519085360753-af0119f7cbe7']
  ];
  const simg=(id,w=900)=>`${SIMG}${id}?auto=format&fit=crop&q=84&w=${w}`;

  const style=document.createElement('style');
  style.textContent=`
    header .search{display:flex;align-items:center;gap:8px;padding:0 13px;height:36px;cursor:text}
    header .search .search-icon{font-size:15px;color:#777;line-height:1}
    header .search input{width:100%;border:0;outline:0;background:transparent;font:11px Inter,Pretendard,Arial,sans-serif;color:#222;padding:0}
    header .search input::placeholder{color:#999}
    .search-page{padding-bottom:80px}
    .search-top{padding:52px 0 26px;border-bottom:1px solid #e9e7e3}
    .search-top .kicker{margin-bottom:14px}
    .search-query-box{display:flex;align-items:center;gap:12px;max-width:900px;border-bottom:1px solid #111;padding:0 0 14px}
    .search-query-box span{font-size:25px}
    .search-query-box input{flex:1;border:0;outline:0;background:transparent;font:48px/1 Georgia,'Times New Roman',serif;letter-spacing:-.035em;color:#151515;min-width:0}
    .search-query-box button{border:0;background:#111;color:#fff;width:44px;height:44px;border-radius:50%;cursor:pointer;font-size:16px}
    .search-summary{font-size:12px;color:#777;margin-top:16px}
    .search-tabs{display:flex;gap:8px;flex-wrap:wrap;padding:20px 0;border-bottom:1px solid #eee}
    .search-tabs a{font-size:10px;border:1px solid #ddd;border-radius:18px;padding:8px 12px;background:#fff}
    .search-tabs a.active{background:#111;color:#fff;border-color:#111}
    .search-section{padding:34px 0;border-bottom:1px solid #ece9e4}
    .search-section-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:18px}
    .search-section-head h2{font:34px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:0}
    .search-count{font-size:11px;color:#888;margin-left:6px;font-family:Inter,Pretendard,Arial,sans-serif}
    .search-artist-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px 16px}
    .search-artist-card{cursor:pointer}
    .search-artist-card img{width:100%;aspect-ratio:4/5;object-fit:cover;background:#f2f0ec}
    .search-artist-card h3{font:23px/1.05 Georgia,'Times New Roman',serif;margin:10px 0 4px;letter-spacing:-.035em}
    .search-artist-card p{font-size:10px;color:#888;margin:0;text-transform:uppercase;letter-spacing:.05em}
    .search-empty{padding:64px 0 90px;text-align:center;color:#777}
    .search-empty b{display:block;font:38px Georgia,'Times New Roman',serif;color:#222;margin-bottom:12px}
    @media(max-width:980px){.search-query-box input{font-size:38px}.search-artist-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:900px){header .search{display:none}}
    @media(max-width:600px){.search-query-box input{font-size:30px}.search-artist-grid{grid-template-columns:1fr}.search-section-head h2{font-size:29px}}
  `;
  document.head.appendChild(style);

  function upgradeHeaderSearch(){
    const box=document.querySelector('header .search');
    if(!box || box.dataset.ready==='1') return;
    box.dataset.ready='1';
    box.innerHTML=`<span class="search-icon">⌕</span><input id="kcacGlobalSearch" type="search" aria-label="통합검색" placeholder="작품, 작가, 갤러리를 검색해보세요.">`;
    const input=box.querySelector('input');
    input.addEventListener('keydown',e=>{
      if(e.key==='Enter'){
        e.preventDefault();
        const q=input.value.trim();
        location.hash='search?q='+encodeURIComponent(q);
      }
    });
  }

  function getQuery(){
    const hash=location.hash.slice(1);
    const qm=hash.indexOf('?');
    if(qm<0) return '';
    const params=new URLSearchParams(hash.slice(qm+1));
    return (params.get('q')||'').trim();
  }
  function matchText(values,q){
    if(!q) return true;
    const needle=q.toLowerCase();
    return values.join(' ').toLowerCase().includes(needle);
  }
  function searchPage(){
    const q=getQuery();
    const works=data.works.filter(x=>matchText([x[0],x[1]],q));
    const artistResults=artists.filter(x=>matchText([x[0],x[1]],q));
    const exhibitions=data.exh.filter(x=>matchText([x[0],x[1]],q));
    const galleries=data.gals.filter(x=>matchText([x[0],x[1]],q));
    const guides=data.guides.filter(x=>matchText([x[0],x[1]],q));
    const total=works.length+artistResults.length+exhibitions.length+galleries.length+guides.length;
    const term=q||'전체';
    const section=(id,title,count,body,more)=>count?`<section class="search-section" id="${id}"><div class="search-section-head"><h2>${title}<span class="search-count">${count}</span></h2>${more?`<a class="more" href="${more}">전체 보기 →</a>`:''}</div>${body}</section>`:'';
    const artistsHtml=`<div class="search-artist-grid">${artistResults.map(a=>`<article class="search-artist-card" onclick="location.hash='artist-detail'"><img src="${simg(a[2])}" alt="${a[0]}"><h3>${a[0]}</h3><p>${a[1]}</p></article>`).join('')}</div>`;
    return `<div class="wrap search-page"><div class="search-top"><div class="kicker">SEARCH</div><div class="search-query-box"><span>⌕</span><input id="searchPageInput" value="${q.replace(/"/g,'&quot;')}" placeholder="검색어를 입력해 주세요"><button id="searchPageButton" type="button">→</button></div><div class="search-summary"><b>‘${term}’</b> 검색 결과 ${total}건</div></div><nav class="search-tabs"><a class="active" href="#search?q=${encodeURIComponent(q)}">통합검색 ${total}</a><a href="#search?q=${encodeURIComponent(q)}#works">작품 ${works.length}</a><a href="#search?q=${encodeURIComponent(q)}#artists-result">작가 ${artistResults.length}</a><a href="#search?q=${encodeURIComponent(q)}#exhibitions-result">전시 ${exhibitions.length}</a><a href="#search?q=${encodeURIComponent(q)}#galleries-result">갤러리 ${galleries.length}</a><a href="#search?q=${encodeURIComponent(q)}#guide-result">아트가이드 ${guides.length}</a></nav>${total===0?`<div class="search-empty"><b>No results found.</b><p>다른 검색어로 다시 검색해 보세요.</p></div>`:section('works','작품',works.length,`<div class="grid4">${works.map(workCard).join('')}</div>`,'#discover')+section('artists-result','작가',artistResults.length,artistsHtml,'#artists')+section('exhibitions-result','전시',exhibitions.length,`<div class="grid3">${exhibitions.map(x=>tile(x,'exhibition-detail')).join('')}</div>`,'#exhibitions')+section('galleries-result','갤러리',galleries.length,`<div class="grid4">${galleries.map(x=>tile(x,'gallery-detail')).join('')}</div>`,'#galleries')+section('guide-result','아트가이드',guides.length,`<div class="grid3">${guides.map(x=>tile(x,'guide-detail')).join('')}</div>`,'#guide')}</div>`;
  }

  function bindSearchPage(){
    const input=document.getElementById('searchPageInput');
    const button=document.getElementById('searchPageButton');
    if(!input) return;
    const run=()=>{location.hash='search?q='+encodeURIComponent(input.value.trim())};
    input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();run();}});
    if(button) button.onclick=run;
    requestAnimationFrame(()=>input.focus());
    const headerInput=document.getElementById('kcacGlobalSearch');
    if(headerInput) headerInput.value=getQuery();
  }

  upgradeHeaderSearch();
  const prevRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='search'||route.startsWith('search?')){
      document.body.classList.remove('auth-page');
      const h=document.querySelector('header'),f=document.querySelector('footer');
      if(h)h.style.display=''; if(f)f.style.display='';
      document.getElementById('app').innerHTML=searchPage();
      upgradeHeaderSearch();
      bindSearchPage();
      window.scrollTo(0,0);
      return;
    }
    prevRender();
    upgradeHeaderSearch();
  };
  window.addEventListener('hashchange',()=>window.render());
  window.render();
})();