(function(){
  const AIMG='https://images.unsplash.com/';
  const artists=[
    ['한소미','갤러리 소소','도자와 유리를 활용한 오브제 작업, 일상의 사물을 재해석한다.','photo-1534528741775-53994a69daeb'],
    ['Shin Dain','HERAS ART GALLERY','색과 감정의 관계를 탐구하며 내면의 장면을 회화로 기록한다.','photo-1494438639946-1ebd1d20bf85'],
    ['김선우','PKM Gallery','유기적인 형태와 밝은 색을 통해 기억과 풍경을 재구성한다.','photo-1506794778202-cad84cf45f1d'],
    ['최유진','국제갤러리','빛과 표면의 변화를 섬세한 회화적 언어로 탐구한다.','photo-1527980965255-d3b416303d12'],
    ['박서현','조현화랑','비와 시간, 도시의 감정을 절제된 화면으로 풀어낸다.','photo-1500648767791-00dcc994a43e'],
    ['이도윤','Gallery M','조각과 설치를 통해 공간과 몸의 관계를 실험한다.','photo-1519085360753-af0119f7cbe7']
  ];
  const ai=(id,w=1000)=>`${AIMG}${id}?auto=format&fit=crop&q=84&w=${w}`;

  const style=document.createElement('style');
  style.textContent=`
    .artist-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px 18px;padding-bottom:72px}
    .artist-card{cursor:pointer}
    .artist-card .artist-img{width:100%;aspect-ratio:4/5;object-fit:cover;background:#f2f0ec;filter:saturate(.82)}
    .artist-card h3{font:26px/1.05 Georgia,'Times New Roman',serif;letter-spacing:-.035em;margin:12px 0 5px}
    .artist-card .artist-gallery{font-size:10px;letter-spacing:.06em;color:#7d7871;text-transform:uppercase}
    .artist-card p{font-size:11px;line-height:1.65;color:#777;margin:9px 0 0;max-width:92%}
    .artist-detail{padding:32px 0 80px}
    .artist-back{display:inline-block;font-size:10px;color:#777;margin-bottom:30px;border-bottom:1px solid #aaa;padding-bottom:3px}
    .artist-head{display:grid;grid-template-columns:1.2fr .8fr;gap:70px;border-bottom:1px solid #e8e5df;padding-bottom:42px}
    .artist-head h1{font:64px/.95 Georgia,'Times New Roman',serif;letter-spacing:-.045em;margin:12px 0 10px}
    .artist-gallery-link{font-size:12px;text-decoration:underline;text-underline-offset:4px}
    .artist-lead{font-size:16px;line-height:1.9;max-width:680px;margin:28px 0 0;color:#333}
    .artist-follow{justify-self:end;align-self:start;border:0;background:#111;color:#fff;padding:13px 20px;font-size:11px;font-weight:700;cursor:pointer}
    .artist-info-grid{display:grid;grid-template-columns:.65fr 1.35fr;gap:60px;padding:42px 0 20px}
    .artist-portrait{width:100%;aspect-ratio:4/5;object-fit:cover;background:#f3f1ed}
    .artist-section{border-top:1px solid #e8e5df;padding-top:20px;margin-bottom:34px}
    .artist-section h3{font-size:12px;margin:0 0 16px;letter-spacing:.08em;text-transform:uppercase}
    .artist-section p,.artist-section li{font-size:13px;line-height:1.85;color:#62605c}
    .artist-section ul{list-style:none;padding:0;margin:0}
    .artist-works{margin-top:26px;border-top:1px solid #111;padding-top:26px}
    .artist-works-title{display:flex;align-items:end;justify-content:space-between;margin-bottom:18px}
    .artist-works-title h2{font:36px/1 Georgia,'Times New Roman',serif;margin:0;letter-spacing:-.04em}
    .artist-works-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px 18px}
    @media(max-width:980px){.artist-grid{grid-template-columns:repeat(2,1fr)}.artist-head,.artist-info-grid{grid-template-columns:1fr;gap:28px}.artist-follow{justify-self:start}.artist-head h1{font-size:52px}.artist-portrait{max-width:520px}.artist-works-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){.artist-grid{grid-template-columns:1fr}.artist-head h1{font-size:44px}.artist-detail{padding-top:24px}.artist-lead{font-size:14px}.artist-works-title h2{font-size:30px}.artist-works-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  function artistCard(a,i){return `<article class="artist-card" onclick="location.hash='artist-detail'${i?"":""}"><img class="artist-img" src="${ai(a[3])}" alt="${a[0]}"><div class="artist-gallery">${a[1]}</div><h3>${a[0]}</h3><p>${a[2]}</p></article>`}

  function artistsPage(){
    return `<div class="wrap"><div class="subtop"><div class="kicker">ARTISTS</div><h1 class="serif">Artists</h1><p>지금 주목할 동시대 작가와 그들의 작업 세계를 만나보세요. 작품과 전시, 갤러리의 연결을 통해 작가를 더 깊이 이해할 수 있습니다.</p></div><div class="toolbar"><div class="filters"><span class="fchip">전체</span><span class="fchip">회화</span><span class="fchip">조각·설치</span><span class="fchip">사진·미디어</span></div><span class="sub">이름순⌄</span></div><div class="artist-grid">${artists.map(artistCard).join('')}</div></div>`;
  }

  function artistDetailPage(){
    const a=artists[0];
    const works=[data.works[0],data.works[2],data.works[1],data.works[3]];
    return `<div class="wrap artist-detail"><a class="artist-back" href="#artists">← 작가 목록으로</a><section class="artist-head"><div><div class="kicker">ARTIST</div><h1>${a[0]}</h1><a class="artist-gallery-link" href="#gallery-detail">${a[1]}</a><p class="artist-lead">${a[2]}</p></div><button class="artist-follow">+ FOLLOW</button></section><section class="artist-info-grid"><div><img class="artist-portrait" src="${ai(a[3],1200)}" alt="${a[0]}"></div><div><div class="artist-section"><h3>About</h3><p>한소미는 도자와 유리를 주요 재료로 삼아 일상에서 마주치는 익숙한 사물의 형태와 감각을 새롭게 번역합니다. 단단함과 투명함, 무게와 빛처럼 서로 다른 물성이 만나는 순간을 통해 기억과 감정의 균형을 탐구합니다.</p></div><div class="artist-section"><h3>Career</h3><ul><li>2025 개인전 《Objects Between Us》, 갤러리 소소</li><li>2023 개인전 《쓰임의 바깥》</li><li>2022 KCAC Emerging Artist Program</li><li>2021 단체전 《Material & Memory》</li></ul></div></div></section><section class="artist-works"><div class="artist-works-title"><div><div class="kicker">SELECTED WORKS</div><h2>이 작가의 작품 <span style="font-size:16px;font-family:Inter,Pretendard,sans-serif;font-weight:400">${works.length}점</span></h2></div><a class="more" href="#discover">전체 작품 보기 →</a></div><div class="artist-works-grid">${works.map(workCard).join('')}</div></section></div>`;
  }

  const prevRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='artists'||route==='artist-detail'){
      document.body.classList.remove('auth-page');
      const h=document.querySelector('header'),f=document.querySelector('footer');
      if(h)h.style.display=''; if(f)f.style.display='';
      document.getElementById('app').innerHTML=route==='artists'?artistsPage():artistDetailPage();
      window.scrollTo(0,0);
      return;
    }
    prevRender();
  };
  window.addEventListener('hashchange',()=>window.render());
  window.render();
})();