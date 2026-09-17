(function(){
  const style=document.createElement('style');
  style.textContent=`
    .gallery-current{padding:34px 0 70px;border-top:1px solid #ece9e4}
    .gallery-current-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:18px}
    .gallery-current-head h2{font:38px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:6px 0 0}
    .gallery-current-layout{display:grid;grid-template-columns:minmax(300px,.86fr) minmax(0,1.14fr);gap:34px;align-items:start}
    .gallery-exhibition-card{cursor:pointer}
    .gallery-exhibition-card img{width:100%;aspect-ratio:1.45/1;object-fit:cover;background:#f3f1ed}
    .gallery-exhibition-card .meta{margin-top:9px}
    .gallery-exhibition-card h3{font:30px/1.05 Georgia,'Times New Roman',serif;letter-spacing:-.035em;margin:5px 0 0}
    .gallery-exhibited{border-top:1px solid #111;padding-top:18px}
    .gallery-exhibited-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:16px}
    .gallery-exhibited-head h3{font:29px/1 Georgia,'Times New Roman',serif;letter-spacing:-.035em;margin:5px 0 0}
    .gallery-exhibited-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px 16px}
    .gallery-exhibited-grid .work img{aspect-ratio:1/1.08;object-fit:cover}
    .gallery-exhibited-grid .work h4{margin-top:7px}
    @media(max-width:1100px){.gallery-current-layout{grid-template-columns:1fr}.gallery-exhibited-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:760px){.gallery-current-head{align-items:start;flex-direction:column}.gallery-exhibited-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:520px){.gallery-exhibited-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  function galleryDetailExpanded(){
    const exhibition=data.exh[0];
    return `<div class="wrap galleryHero">${safeImg(img('photo-1561214115-f2f134cc4912',1600))}<div><div class="kicker">GALLERY</div><h1 class="serif">HERAS ART GALLERY</h1><p>판교를 기반으로 동시대 작가의 전시와 작품을 소개하는 갤러리. 작가의 작업 세계와 컬렉터의 새로운 발견을 연결합니다.</p><button class="btn">갤러리 팔로우</button></div></div><section class="wrap gallery-current"><div class="gallery-current-head"><div><div class="kicker">NOW AT THE GALLERY</div><h2>Current Exhibition</h2></div><a class="more" href="#exhibitions">전체 전시 보기 →</a></div><div class="gallery-current-layout"><article class="gallery-exhibition-card" onclick="location.hash='exhibition-detail'">${safeImg(img(exhibition[2],1400))}<div class="meta">${exhibition[1]}</div><h3>${exhibition[0]}</h3><p class="sub">현재 진행 중인 전시와 출품작을 함께 살펴보세요.</p></article><div class="gallery-exhibited"><div class="gallery-exhibited-head"><div><div class="kicker">EXHIBITED WORKS</div><h3>출품작 <span style="font:12px Inter,Pretendard,sans-serif;color:#888">${data.works.length}점</span></h3></div></div><div class="gallery-exhibited-grid">${data.works.map(workCard).join('')}</div></div></div></section>`;
  }

  window.galleryDetail=galleryDetailExpanded;
  const prevRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='gallery-detail'){
      document.body.classList.remove('auth-page');
      const header=document.querySelector('header'),footer=document.querySelector('footer');
      if(header)header.style.display='';
      if(footer)footer.style.display='';
      document.getElementById('app').innerHTML=galleryDetailExpanded();
      window.scrollTo(0,0);
      return;
    }
    prevRender();
  };
  window.addEventListener('hashchange',()=>window.render());
  window.render();
})();