(function(){
  const exhibitionWorks=[
    ['Shin Dain','Blue Ketchup, 2025','photo-1541961017774-22349e4a1262','Price on request'],
    ['김선우','Moment of Bloom','photo-1547891654-e66ed7ebb968','₩2,800,000'],
    ['최유진','Light within','photo-1579783902614-a3fb3927b6a5','₩3,500,000'],
    ['박서현','After the Rain','photo-1577083552431-6e5fd01988a5','₩1,800,000']
  ];
  const oldExhibitionDetail=window.exhibitionDetail || exhibitionDetail;
  exhibitionDetail=function(){
    const base=oldExhibitionDetail();
    const works=`<section class="wrap section exhibited-works" style="padding-top:10px;padding-bottom:72px;border-top:1px solid #e9e7e3"><div class="titleRow" style="padding-top:28px"><div><div class="kicker">EXHIBITED WORKS</div><h2 class="serif" style="margin-top:10px">출품작</h2><span class="sub">Flowers 전시에 출품된 작품을 만나보세요.</span></div><a class="more" href="#discover">전체 작품 보기 →</a></div><div class="grid4">${exhibitionWorks.map(workCard).join('')}</div></section>`;
    return base+works;
  };
  const prevRender=window.render;
  if(typeof prevRender==='function'){
    window.render=function(){
      const r=location.hash.slice(1)||'home';
      if(r==='exhibition-detail'){
        document.getElementById('app').innerHTML=exhibitionDetail();
        window.scrollTo(0,0);
        return;
      }
      prevRender();
    };
    window.render();
  }
})();