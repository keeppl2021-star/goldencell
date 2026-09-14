(function(){
  const SHOT={
    artwork:'https://image.thum.io/get/width/1200/crop/850/https://herasart.co.kr/27/?idx=61',
    artist:'https://image.thum.io/get/width/1200/crop/850/https://herasart.co.kr/27',
    gallery:'https://image.thum.io/get/width/1200/crop/850/https://herasart.co.kr/',
    exhibition:'https://image.thum.io/get/width/1200/crop/850/https://herasart.co.kr/27'
  };
  function swapByText(text,src){
    [...document.querySelectorAll('article,section,div')].forEach(el=>{
      if(el.children.length && el.textContent.includes(text)){
        const im=el.querySelector('img'); if(im){im.src=src; im.style.objectFit='cover';}
      }
    });
  }
  function enhance(){
    swapByText('Blue Ketchup',SHOT.artwork);
    swapByText('Shin Dain',SHOT.artist);
    swapByText('HERAS ART GALLERY',SHOT.gallery);
    swapByText('Flowers',SHOT.exhibition);
    document.querySelectorAll('a[href*="herasart"],a[href*="HERAS"]').forEach(a=>a.removeAttribute('href'));
  }
  const oldRender=window.render;
  if(typeof oldRender==='function') window.render=function(){oldRender(); setTimeout(enhance,0)};
  const oldFirst=window.firstart;
  if(typeof oldFirst==='function') window.firstart=function(){
    const base=oldFirst();
    const curated=`<section class="section" style="padding-top:16px"><div class="titleRow"><div><h2 class="serif">Curated for your first collection</h2><span class="sub">처음 소장하는 작품을 위한 KCAC 큐레이션</span></div></div><div class="collections"><div class="collection"><img src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=86&w=1200"><div><h3 class="serif">첫 컬렉션 추천</h3><span class="sub" style="color:#fff">부담 없이 시작하기 좋은 작품</span></div></div><div class="collection"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=86&w=1200"><div><h3 class="serif">작은 공간을 위한 작품</h3><span class="sub" style="color:#fff">침실·서재·작은 벽을 위한 선택</span></div></div><div class="collection"><img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=86&w=1200"><div><h3 class="serif">100만원 이하</h3><span class="sub" style="color:#fff">첫 구매에 적합한 가격대</span></div></div><div class="collection"><img src="https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&q=86&w=1200"><div><h3 class="serif">Curator's Pick</h3><span class="sub" style="color:#fff">KCAC가 고른 입문 컬렉터 추천작</span></div></div></div></section>`;
    return base.replace('</div></div>', '</div>'+curated+'</div>');
  };
  window.addEventListener('hashchange',()=>setTimeout(enhance,50));
  window.addEventListener('load',()=>setTimeout(enhance,150));
})();