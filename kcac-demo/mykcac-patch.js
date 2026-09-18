(function(){
  let activeTab='saved';
  let savedMode='liked';
  let followingMode='artists';

  const style=document.createElement('style');
  style.textContent=`
    .mykcac-page{padding:46px 0 88px}
    .mykcac-top{display:flex;align-items:end;justify-content:space-between;gap:24px;padding-bottom:24px}
    .mykcac-title{font:42px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:0}
    .mykcac-profile{font-size:11px;color:#777}
    .mykcac-tabs{display:flex;gap:30px;border-bottom:1px solid #e7e2db;overflow-x:auto;white-space:nowrap;margin-bottom:34px}
    .mykcac-tab{border:0;background:transparent;padding:14px 2px 12px;font-size:11px;color:#6f6a63;cursor:pointer;border-bottom:2px solid transparent}
    .mykcac-tab.active{color:#111;font-weight:700;border-bottom-color:#111}
    .mykcac-section-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin:0 0 18px}
    .mykcac-section-head h2{font:32px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:6px 0 0}
    .mykcac-subtabs{display:flex;gap:8px;margin-bottom:22px}
    .mykcac-subtab{border:1px solid #ddd;background:#fff;border-radius:18px;padding:8px 13px;font-size:10px;color:#777;cursor:pointer}
    .mykcac-subtab.active{background:#111;color:#fff;border-color:#111}
    .mykcac-grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px 18px}
    .mykcac-card{cursor:pointer;min-width:0}
    .mykcac-card img{width:100%;aspect-ratio:1/1.06;object-fit:cover;background:#f4f2ee}
    .mykcac-card .eyebrow{font-size:9px;letter-spacing:.12em;color:#8c867d;margin-top:10px;text-transform:uppercase}
    .mykcac-card h3{font:23px/1.05 Georgia,'Times New Roman',serif;letter-spacing:-.035em;margin:6px 0}
    .mykcac-card p{font-size:11px;line-height:1.6;color:#777;margin:0}
    .mykcac-list{border-top:1px solid #111}
    .mykcac-row{display:grid;grid-template-columns:150px 1.4fr 1fr 110px;gap:20px;align-items:center;padding:18px 0;border-bottom:1px solid #ece8e2;font-size:11px}
    .mykcac-row .strong{font-weight:700;color:#222}
    .mykcac-row .muted{color:#888}
    .mykcac-status{display:inline-flex;justify-content:center;border:1px solid #ddd;border-radius:18px;padding:7px 10px;font-size:9px;background:#fff}
    .mykcac-empty{min-height:280px;display:grid;place-items:center;border-top:1px solid #111;border-bottom:1px solid #eee;color:#777;font-size:13px}
    .mykcac-taste{font:38px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;padding:34px 0 220px;border-top:1px solid #111}
    .artyear-card{background:#171411;color:#fff;border-radius:12px;padding:22px 18px 18px;margin-top:4px}
    .artyear-card h3{font:16px/1.2 Georgia,'Times New Roman',serif;margin:0 0 16px}
    .artyear-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:34px}
    .artyear-num{font-size:22px;font-weight:800;line-height:1}
    .artyear-label{font-size:9px;margin-top:4px;color:#fff}
    .artyear-copy{font-size:10px;margin:16px 0 0;color:#ddd}
    .collection-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:0 0 28px}
    .collection-stat-card{border:1px solid #e6e1da;background:#faf9f7;padding:20px 20px 18px;min-height:132px;display:flex;flex-direction:column;justify-content:space-between}
    .collection-stat-label{font-size:9px;letter-spacing:.16em;color:#827c73;text-transform:uppercase}
    .collection-stat-value{font:32px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin-top:18px}
    .collection-stat-note{font-size:10px;color:#888;margin-top:7px;line-height:1.5}
    .collection-order{display:grid;grid-template-columns:110px 1fr auto;gap:18px;align-items:center;padding:18px 0;border-bottom:1px solid #ece8e2}
    .collection-order img{width:110px;height:110px;object-fit:cover}
    .collection-order h3{font:22px/1 Georgia,'Times New Roman',serif;margin:4px 0}
    .collection-order .price{font-size:12px}
    @media(max-width:1000px){.mykcac-grid4{grid-template-columns:repeat(2,minmax(0,1fr))}.mykcac-row{grid-template-columns:120px 1fr 100px}.mykcac-row .hide-md{display:none}.collection-stats{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:680px){.mykcac-page{padding-top:30px}.mykcac-title{font-size:34px}.mykcac-tabs{gap:20px}.mykcac-grid4{grid-template-columns:1fr 1fr}.artyear-metrics{grid-template-columns:1fr 1fr}.mykcac-row{grid-template-columns:1fr;gap:7px}.collection-stats{grid-template-columns:1fr}.collection-stat-card{min-height:112px}.collection-order{grid-template-columns:82px 1fr}.collection-order img{width:82px;height:82px}.collection-order .price{grid-column:2}.mykcac-profile{display:none}}
    @media(max-width:460px){.mykcac-grid4{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const savedLiked=[
    ['Shin Dain','Blue Ketchup, 2025','photo-1541961017774-22349e4a1262','Price on request'],
    ['김선우','Moment of Bloom','photo-1547891654-e66ed7ebb968','₩2,800,000'],
    ['최유진','Light within','photo-1579783902614-a3fb3927b6a5','₩3,500,000'],
    ['박서현','After the Rain','photo-1577083552431-6e5fd01988a5','₩1,800,000']
  ];
  const savedRecent=[
    ['한소미','Objects Between Us','photo-1549490349-8643362247b5','₩1,200,000'],
    ['Shin Dain','Blue Ketchup, 2025','photo-1541961017774-22349e4a1262','Price on request'],
    ['김선우','Moment of Bloom','photo-1547891654-e66ed7ebb968','₩2,800,000']
  ];
  const followArtists=[
    ['Shin Dain','PAINTING','photo-1494438639946-1ebd1d20bf85','HERAS ART GALLERY'],
    ['한소미','OBJECT · SCULPTURE','photo-1534528741775-53994a69daeb','갤러리 소소'],
    ['김선우','PAINTING','photo-1506794778202-cad84cf45f1d','PKM Gallery']
  ];

  function workCards(items){
    return items.map(w=>`<article class="mykcac-card" onclick="location.hash='artwork'">${safeImg(img(w[2],900))}<div class="eyebrow">${w[0]}</div><h3>${w[1]}</h3><p>${w[3]}</p></article>`).join('');
  }
  function savedView(){
    const items=savedMode==='liked'?savedLiked:savedRecent;
    return `<div class="mykcac-section-head"><div><div class="kicker">SAVED</div><h2>${savedMode==='liked'?'관심작품':'최근 본 작품'}</h2></div><span class="sub">${items.length} items</span></div><div class="mykcac-subtabs"><button class="mykcac-subtab ${savedMode==='liked'?'active':''}" data-saved="liked">관심작품</button><button class="mykcac-subtab ${savedMode==='recent'?'active':''}" data-saved="recent">최근 본 작품</button></div><div class="mykcac-grid4">${workCards(items)}</div>`;
  }
  function followingView(){
    if(followingMode==='artists'){
      return `<div class="mykcac-section-head"><div><div class="kicker">FOLLOWING</div><h2>Artists</h2></div></div><div class="mykcac-subtabs"><button class="mykcac-subtab active" data-following="artists">Artists</button><button class="mykcac-subtab" data-following="galleries">Galleries</button></div><div class="mykcac-grid4">${followArtists.map(a=>`<article class="mykcac-card" onclick="location.hash='artist-detail'">${safeImg(img(a[2],900))}<div class="eyebrow">${a[1]}</div><h3>${a[0]}</h3><p>${a[3]}</p></article>`).join('')}</div>`;
    }
    return `<div class="mykcac-section-head"><div><div class="kicker">FOLLOWING</div><h2>Galleries</h2></div></div><div class="mykcac-subtabs"><button class="mykcac-subtab" data-following="artists">Artists</button><button class="mykcac-subtab active" data-following="galleries">Galleries</button></div><div class="mykcac-grid4">${data.gals.slice(0,3).map(g=>`<article class="mykcac-card" onclick="location.hash='gallery-detail'">${safeImg(img(g[2],1000))}<div class="eyebrow">FOLLOWED GALLERY</div><h3>${g[0]}</h3><p>${g[1]}</p></article>`).join('')}</div>`;
  }
  function exhibitionsView(){
    return `<div class="mykcac-section-head"><div><div class="kicker">MY EXHIBITIONS</div><h2>저장 · 방문 예정 전시</h2></div></div><div class="mykcac-list">
      <div class="mykcac-row"><span class="muted">2026.09.01—10.12</span><span class="strong">Flowers · HERAS ART GALLERY</span><span class="hide-md">판교</span><span class="mykcac-status">방문 예정</span></div>
      <div class="mykcac-row"><span class="muted">2026.09.10—11.03</span><span class="strong">감각의 지도 · 리움미술관</span><span class="hide-md">서울</span><span class="mykcac-status">저장</span></div>
      <div class="mykcac-row"><span class="muted">2026.08.20—10.20</span><span class="strong">더 가까운 세계 · 국립현대미술관</span><span class="hide-md">서울</span><span class="mykcac-status">저장</span></div>
    </div>`;
  }
  function inquiriesView(){
    return `<div class="mykcac-section-head"><div><div class="kicker">INQUIRIES</div><h2>문의 내역</h2></div></div><div class="mykcac-list">
      <div class="mykcac-row"><span class="muted">2026.09.15</span><span class="strong">Blue Ketchup, 2025 · 작품 문의</span><span class="hide-md">HERAS ART GALLERY</span><span class="mykcac-status">답변 완료</span></div>
      <div class="mykcac-row"><span class="muted">2026.09.02</span><span class="strong">Moment of Bloom · 구매 문의</span><span class="hide-md">PKM Gallery</span><span class="mykcac-status">확인 중</span></div>
    </div>`;
  }
  function collectionView(){
    return `<div class="mykcac-section-head"><div><div class="kicker">MY COLLECTION</div><h2>작품 구매 내역</h2></div><span class="sub">2 works</span></div>
    <div class="collection-stats">
      <div class="collection-stat-card"><div class="collection-stat-label">Artworks</div><div><div class="collection-stat-value">2</div><div class="collection-stat-note">구매한 작품</div></div></div>
      <div class="collection-stat-card"><div class="collection-stat-label">My Artists</div><div><div class="collection-stat-value">2</div><div class="collection-stat-note">구매 작품의 작가</div></div></div>
      <div class="collection-stat-card"><div class="collection-stat-label">Average Purchase</div><div><div class="collection-stat-value">₩3,150,000</div><div class="collection-stat-note">총 구매금액 ₩6,300,000</div></div></div>
    </div>
    <div class="mykcac-list">
      <article class="collection-order">${safeImg(img('photo-1579783902614-a3fb3927b6a5',500))}<div><div class="kicker">2026 PURCHASE</div><h3>Light within</h3><div class="sub">최유진 · 국제갤러리</div></div><div class="price">₩3,500,000</div></article>
      <article class="collection-order">${safeImg(img('photo-1547891654-e66ed7ebb968',500))}<div><div class="kicker">2026 PURCHASE</div><h3>Moment of Bloom</h3><div class="sub">김선우 · PKM Gallery</div></div><div class="price">₩2,800,000</div></article>
    </div>`;
  }
  function tasteView(){return `<div class="mykcac-taste">취향테스트</div>`;}
  function artYearView(){
    return `<div class="mykcac-section-head"><div><div class="kicker">KCAC ART YEAR</div><h2>올해의 발견</h2></div><span class="sub">2026</span></div><section class="artyear-card"><h3>KCAC ART YEAR — 2026</h3><div class="artyear-metrics"><div><div class="artyear-num">822</div><div class="artyear-label">올해 본 작품</div></div><div><div class="artyear-num">75</div><div class="artyear-label">저장</div></div><div><div class="artyear-num">2</div><div class="artyear-label">Follow 작가</div></div><div><div class="artyear-num">2</div><div class="artyear-label">보유 작품</div></div></div><p class="artyear-copy">올해의 발견과 컬렉션을 한 장의 리포트로 보여주는 리텐션 콘텐츠입니다.</p></section>`;
  }

  function tabContent(){
    if(activeTab==='saved') return savedView();
    if(activeTab==='following') return followingView();
    if(activeTab==='exhibitions') return exhibitionsView();
    if(activeTab==='inquiries') return inquiriesView();
    if(activeTab==='collection') return collectionView();
    if(activeTab==='taste') return tasteView();
    return artYearView();
  }

  function myKcacPage(){
    return `<div class="wrap mykcac-page"><div class="mykcac-top"><h1 class="mykcac-title">MY KCAC</h1><div class="mykcac-profile">이수아 · ART LOVER</div></div><nav class="mykcac-tabs">
      <button class="mykcac-tab ${activeTab==='saved'?'active':''}" data-mytab="saved">Saved</button>
      <button class="mykcac-tab ${activeTab==='following'?'active':''}" data-mytab="following">Following</button>
      <button class="mykcac-tab ${activeTab==='exhibitions'?'active':''}" data-mytab="exhibitions">My Exhibitions</button>
      <button class="mykcac-tab ${activeTab==='inquiries'?'active':''}" data-mytab="inquiries">Inquiries</button>
      <button class="mykcac-tab ${activeTab==='collection'?'active':''}" data-mytab="collection">My Collection</button>
      <button class="mykcac-tab ${activeTab==='taste'?'active':''}" data-mytab="taste">Taste</button>
      <button class="mykcac-tab ${activeTab==='artyear'?'active':''}" data-mytab="artyear">KCAC ART YEAR</button>
    </nav><section id="mykcac-content">${tabContent()}</section></div>`;
  }

  function bindMyKcac(){
    document.querySelectorAll('[data-mytab]').forEach(btn=>btn.onclick=()=>{activeTab=btn.dataset.mytab;document.getElementById('app').innerHTML=myKcacPage();bindMyKcac();window.scrollTo(0,0);});
    document.querySelectorAll('[data-saved]').forEach(btn=>btn.onclick=()=>{savedMode=btn.dataset.saved;document.getElementById('mykcac-content').innerHTML=savedView();bindMyKcac();});
    document.querySelectorAll('[data-following]').forEach(btn=>btn.onclick=()=>{followingMode=btn.dataset.following;document.getElementById('mykcac-content').innerHTML=followingView();bindMyKcac();});
  }
  function activateHeaderMyKcac(){
    const user=document.querySelector('.user');
    if(user){user.style.cursor='pointer';user.onclick=()=>location.hash='mykcac';user.title='My KCAC';}
  }

  const prevRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='mykcac'){
      document.body.classList.remove('auth-page');
      const h=document.querySelector('header'),f=document.querySelector('footer');
      if(h)h.style.display=''; if(f)f.style.display='';
      document.getElementById('app').innerHTML=myKcacPage();
      bindMyKcac();
      activateHeaderMyKcac();
      window.scrollTo(0,0);
      return;
    }
    prevRender();
    requestAnimationFrame(activateHeaderMyKcac);
  };
  window.addEventListener('hashchange',()=>window.render());
  activateHeaderMyKcac();
  window.render();
})();