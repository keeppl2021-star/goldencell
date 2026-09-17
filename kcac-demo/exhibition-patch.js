(function(){
  const exhibitionWorks=[
    ['Shin Dain','Blue Ketchup, 2025','photo-1541961017774-22349e4a1262','Price on request'],
    ['김선우','Moment of Bloom','photo-1547891654-e66ed7ebb968','₩2,800,000'],
    ['최유진','Light within','photo-1579783902614-a3fb3927b6a5','₩3,500,000'],
    ['박서현','After the Rain','photo-1577083552431-6e5fd01988a5','₩1,800,000']
  ];
  const compactStyle=document.createElement('style');
  compactStyle.textContent=`
    .exhibited-works{padding-top:0!important;padding-bottom:38px!important;margin-top:4px}
    .exhibited-works .titleRow{padding-top:18px!important;margin-bottom:14px}
    .exhibited-works .titleRow h2{font-size:27px!important;margin:6px 0 2px!important}
    .exhibited-works .kicker{font-size:8px;letter-spacing:.22em}
    .exhibited-works .sub,.exhibited-works .more{font-size:9px}
    .exhibited-works .grid4{grid-template-columns:repeat(4,minmax(0,1fr));gap:20px 16px}
    .exhibited-works .work{min-width:0}
    .exhibited-works .work img{width:100%;height:220px;aspect-ratio:auto!important;object-fit:contain!important;object-position:center;background:#f7f6f3}
    .exhibited-works .work h4{font-size:10px;margin:7px 0 2px}
    .exhibited-works .work .name{font-size:13px}
    .exhibited-works .work .price{font-size:9px;margin-top:3px}
    @media(max-width:900px){.exhibited-works .grid4{grid-template-columns:repeat(2,minmax(0,1fr))}.exhibited-works .work img{height:210px}}
    @media(max-width:600px){.exhibited-works .grid4{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 12px}.exhibited-works .work img{height:180px}}
  `;
  document.head.appendChild(compactStyle);
  const oldExhibitionDetail=window.exhibitionDetail || exhibitionDetail;
  exhibitionDetail=function(){
    const base=oldExhibitionDetail();
    const works=`<section class="wrap section exhibited-works" style="border-top:1px solid #e9e7e3"><div class="titleRow"><div><div class="kicker">EXHIBITED WORKS</div><h2 class="serif">출품작</h2><span class="sub">Flowers 전시에 출품된 작품을 만나보세요.</span></div><a class="more" href="#discover">전체 작품 보기 →</a></div><div class="grid4">${exhibitionWorks.map(workCard).join('')}</div></section>`;
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