(function(){
  const style=document.createElement('style');
  style.textContent=`
    .gallery-apply-page{padding:42px 0 90px}
    .gallery-apply-hero{position:relative;overflow:hidden;background:linear-gradient(90deg,rgba(18,16,14,.76),rgba(18,16,14,.42)),url('https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=88&w=1800') center 45%/cover;color:#fff;border-radius:14px;padding:54px 42px 48px;margin-bottom:26px}
    .gallery-apply-hero h1{font:46px/.98 Georgia,'Times New Roman',serif;letter-spacing:-.045em;margin:0 0 18px}
    .gallery-apply-hero p{max-width:760px;font-size:13px;line-height:1.8;color:#ddd;margin:0 0 24px}
    .gallery-apply-cta{display:inline-flex;align-items:center;justify-content:center;background:#fff;color:#111;border:0;padding:13px 18px;font-size:11px;font-weight:700;cursor:pointer}
    .gallery-apply-benefits{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:16px}
    .gallery-benefit{border:1px solid #e5e0d9;border-radius:12px;padding:24px 20px;min-height:126px;background:#fff}
    .gallery-benefit h3{font:19px/1.1 Georgia,'Times New Roman',serif;margin:0 0 9px;letter-spacing:-.02em}
    .gallery-benefit p{font-size:11px;line-height:1.7;color:#777;margin:0}
    .gallery-apply-note{font-size:10px;color:#a09a91;margin:0 0 56px}
    .gallery-form-wrap{max-width:920px;margin:0 auto}
    .gallery-form-head{margin-bottom:28px}
    .gallery-form-head h2{font:42px/1 Georgia,'Times New Roman',serif;letter-spacing:-.045em;margin:0 0 10px}
    .gallery-form-head p{font-size:10px;color:#999;line-height:1.7;margin:0}
    .gallery-form{display:grid;gap:18px}
    .gallery-field label{display:block;font-size:11px;font-weight:700;margin-bottom:7px}
    .gallery-field input,.gallery-field select,.gallery-field textarea{width:100%;border:1px solid #e0ddd8;background:#fff;padding:12px 13px;font:12px Inter,Pretendard,Arial,sans-serif;color:#222;outline:none}
    .gallery-field textarea{min-height:148px;resize:vertical;line-height:1.6}
    .gallery-field small{display:block;font-size:9px;color:#999;margin-top:6px;line-height:1.5}
    .gallery-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .gallery-file{border:1px dashed #d8d4cd;padding:15px;background:#faf9f7}
    .gallery-file input{border:0;padding:0;background:transparent}
    .gallery-submit{width:100%;border:0;background:#111;color:#fff;padding:14px;font-size:11px;font-weight:700;cursor:pointer;margin-top:4px}
    .gallery-submit:hover{background:#2b2926}
    .gallery-apply-success{display:none;margin-top:14px;padding:14px;border:1px solid #dcd8d2;background:#faf9f7;font-size:11px;color:#555}
    .gallery-apply-success.show{display:block}
    .foot-gallery-link{font-size:10px;color:#777;text-decoration:none;white-space:nowrap}
    .foot-gallery-link:hover{color:#111;text-decoration:underline;text-underline-offset:3px}
    @media(max-width:760px){.gallery-apply-hero{padding:38px 24px}.gallery-apply-hero h1{font-size:38px}.gallery-apply-benefits{grid-template-columns:1fr}.gallery-form-grid{grid-template-columns:1fr}.gallery-form-head h2{font-size:36px}}
  `;
  document.head.appendChild(style);

  function page(){
    return `<div class="wrap gallery-apply-page">
      <section class="gallery-apply-hero">
        <div class="kicker" style="color:#c8c1b8;margin-bottom:15px">FOR GALLERIES</div>
        <h1>당신의 갤러리를,<br>더 많은 컬렉터에게</h1>
        <p>KCAC는 신뢰할 수 있는 갤러리와 컬렉터를 연결하는 온라인 진열장입니다.<br>작가·작품·전시를 한곳에서 관리하고, 새로운 컬렉터를 만나보세요.</p>
        <button class="gallery-apply-cta" type="button" onclick="location.hash='gallery-apply-form'">갤러리 입점 신청하기</button>
      </section>

      <section class="gallery-apply-benefits">
        <article class="gallery-benefit"><h3>온라인 진열장</h3><p>작가·작품·전시를 등록하고 KCAC 마켓플레이스에 노출하세요.</p></article>
        <article class="gallery-benefit"><h3>신규 컬렉터 유입</h3><p>검색과 큐레이션을 통해 새로운 컬렉터에게 더 가까이 다가갑니다.</p></article>
        <article class="gallery-benefit"><h3>컬렉터 CRM</h3><p>기존 컬렉터를 등급·태그로 관리하고 갤러리 소식을 전달하세요.</p></article>
      </section>
      <p class="gallery-apply-note">신청 후 로그인이 필요합니다 → 입점 신청 폼 작성 → 플랫폼 관리자 검토 → 승인 시 동일 계정에 갤러리 권한이 부여됩니다.</p>

    </div>`;
  }

  function formPage(){
    return `<div class="wrap gallery-apply-page"><section class="gallery-form-wrap"><a class="more" href="#gallery-apply">← 갤러리 입점 소개로</a><div class="gallery-form-head" style="margin-top:20px"><div class="kicker">GALLERY APPLICATION</div><h2>갤러리 입점 신청</h2><p>제출하신 내용은 플랫폼 관리자가 확인한 뒤 승인 여부를 알려드립니다. 진행 상황은 MY KCAC에서 확인할 수 있습니다.</p></div><form class="gallery-form" onsubmit="event.preventDefault();document.querySelector('.gallery-apply-success').classList.add('show')"><div class="gallery-field"><label>갤러리명 *</label><input required type="text" placeholder="갤러리명을 입력해 주세요"></div><div class="gallery-field"><label>사업자등록번호 *</label><input required type="text" placeholder="000-00-00000"><small>숫자만 입력하시면 자동으로 끊어집니다.</small></div><div class="gallery-form-grid"><div class="gallery-field"><label>지역 *</label><select required><option value="">지역을 선택해 주세요</option><option>서울</option><option>경기</option><option>부산</option><option>대구</option><option>광주</option><option>대전</option><option>제주</option><option>기타</option></select></div><div class="gallery-field"><label>주소</label><input type="text" placeholder="주소를 입력해 주세요"></div></div><div class="gallery-form-grid"><div class="gallery-field"><label>담당자명 *</label><input required type="text" placeholder="담당자명"></div><div class="gallery-field"><label>담당자 연락처 *</label><input required type="tel" placeholder="010-0000-0000"><small>심사 중 확인이 필요할 때 연락드립니다.</small></div></div><div class="gallery-field"><label>갤러리 소개 *</label><textarea required maxlength="1000" placeholder="어떤 작가·작품을 다루는 공간인지 알려 주세요."></textarea><small>1000자까지 입력할 수 있습니다.</small></div><div class="gallery-field gallery-file"><label>포트폴리오 *</label><input required type="file" accept=".jpg,.jpeg,.png,.webp,.pdf"><small>이미지(jpg·png·webp) 또는 PDF를 최대 5개, 각 10MB 이하로 첨부해 주세요.</small></div><button class="gallery-submit" type="submit">신청서 제출</button><div class="gallery-apply-success">입점 신청이 접수되었습니다. 관리자 검토 후 안내드리겠습니다.</div></form></section></div>`;
  }

  function ensureFooterGalleryLink(){
    const group=document.querySelector('.foot-right');
    if(!group) return;
    if(group.querySelector('.foot-gallery-link')) return;
    const policy=group.querySelector('.foot-policy-link');
    const link=document.createElement('a');
    link.className='foot-gallery-link';
    link.href='#gallery-apply';
    link.textContent='갤러리 입점';
    if(policy) group.insertBefore(link,policy); else group.insertBefore(link,group.firstChild);
  }

  const prevRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='gallery-apply'||route==='gallery-apply-form'){
      document.body.classList.remove('auth-page');
      const h=document.querySelector('header'),f=document.querySelector('footer');
      if(h)h.style.display=''; if(f)f.style.display='';
      document.getElementById('app').innerHTML=route==='gallery-apply'?page():formPage();
      ensureFooterGalleryLink();
      window.scrollTo(0,0);
      return;
    }
    prevRender();
    requestAnimationFrame(ensureFooterGalleryLink);
  };
  window.addEventListener('hashchange',()=>window.render());
  ensureFooterGalleryLink();
  window.render();
})();