(function(){
  const style=document.createElement('style');
  style.textContent=`
    .inquiry-modal{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(15,15,15,.52);backdrop-filter:blur(3px)}
    .inquiry-modal.open{display:flex}
    .inquiry-dialog{width:min(620px,100%);max-height:86vh;background:#fff;display:flex;flex-direction:column;box-shadow:0 24px 70px rgba(0,0,0,.22)}
    .inquiry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:26px 28px 20px;border-bottom:1px solid #e8e5df}
    .inquiry-eyebrow{font-size:9px;letter-spacing:.2em;font-weight:800;color:#777;margin-bottom:8px}
    .inquiry-head h2{font:31px/1.05 Georgia,'Times New Roman',serif;letter-spacing:-.035em;margin:0}
    .inquiry-close{border:0;background:transparent;font-size:24px;line-height:1;cursor:pointer;padding:0;color:#333}
    .inquiry-body{overflow:auto;padding:24px 28px 28px}
    .inquiry-artwork{display:grid;grid-template-columns:70px 1fr;gap:14px;align-items:center;padding-bottom:20px;margin-bottom:22px;border-bottom:1px solid #eee}
    .inquiry-artwork img{width:70px;height:70px;object-fit:cover;background:#f5f3ef}
    .inquiry-artwork .artist{font-size:9px;letter-spacing:.12em;color:#8a857f;text-transform:uppercase;margin-bottom:4px}
    .inquiry-artwork .title{font:19px/1.1 Georgia,'Times New Roman',serif}
    .inquiry-guide{font-size:12px;line-height:1.75;color:#666;margin:0 0 20px}
    .inquiry-guide strong{color:#111;font-weight:700}
    .inquiry-field{margin-bottom:16px}
    .inquiry-field label{display:block;font-size:10px;font-weight:700;margin-bottom:7px}
    .inquiry-field input,.inquiry-field textarea{width:100%;border:1px solid #ddd9d3;background:#fff;padding:12px 13px;font:12px Inter,Pretendard,Arial,sans-serif;color:#222;outline:none}
    .inquiry-field textarea{min-height:150px;resize:vertical;line-height:1.65}
    .inquiry-field input:focus,.inquiry-field textarea:focus{border-color:#111}
    .inquiry-help{font-size:9px;line-height:1.5;color:#999;margin-top:6px}
    .inquiry-actions{display:flex;gap:8px;margin-top:22px}
    .inquiry-cancel,.inquiry-submit{flex:1;border:1px solid #111;padding:13px 16px;font-size:11px;font-weight:700;cursor:pointer}
    .inquiry-cancel{background:#fff;color:#111}.inquiry-submit{background:#111;color:#fff}
    .inquiry-success{display:none;padding:30px 0 10px;text-align:center}
    .inquiry-success.show{display:block}
    .inquiry-success h3{font:28px/1.1 Georgia,'Times New Roman',serif;margin:0 0 10px}
    .inquiry-success p{font-size:11px;line-height:1.7;color:#777;margin:0}
    body.inquiry-modal-open{overflow:hidden}
    @media(max-width:560px){.inquiry-modal{padding:14px}.inquiry-head,.inquiry-body{padding-left:20px;padding-right:20px}.inquiry-head h2{font-size:27px}.inquiry-actions{flex-direction:column}}
  `;
  document.head.appendChild(style);

  const modal=document.createElement('div');
  modal.className='inquiry-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`<div class="inquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="inquiry-title"><div class="inquiry-head"><div><div class="inquiry-eyebrow">ARTWORK INQUIRY</div><h2 id="inquiry-title">작품 문의</h2></div><button type="button" class="inquiry-close" aria-label="닫기">×</button></div><div class="inquiry-body"><div class="inquiry-form-view"><div class="inquiry-artwork"><img class="inquiry-thumb" alt="작품 이미지"><div><div class="artist"></div><div class="title"></div></div></div><p class="inquiry-guide"><strong>가격·작품 상태·배송 등 궁금한 내용을 적어주세요.</strong><br>갤러리가 확인한 뒤 등록하신 연락처로 답변드립니다.</p><form class="inquiry-form"><div class="inquiry-field"><label>문의 내용 *</label><textarea required placeholder="가격, 작품 상태, 배송 가능 지역 등 궁금한 내용을 자유롭게 적어주세요."></textarea></div><div class="inquiry-field"><label>이메일 또는 연락처 *</label><input required type="text" placeholder="example@email.com 또는 010-0000-0000"><div class="inquiry-help">답변을 받을 수 있는 이메일 또는 연락처를 입력해 주세요.</div></div><div class="inquiry-actions"><button class="inquiry-cancel" type="button">취소</button><button class="inquiry-submit" type="submit">문의 보내기</button></div></form></div><div class="inquiry-success"><h3>문의가 접수되었습니다.</h3><p>갤러리 확인 후 입력하신 연락처로 답변드리겠습니다.<br>문의 내역은 MY KCAC에서 확인할 수 있습니다.</p><button class="inquiry-submit" style="margin-top:20px;min-width:160px" type="button">확인</button></div></div></div>`;
  document.body.appendChild(modal);

  function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('inquiry-modal-open');setTimeout(()=>{modal.querySelector('.inquiry-form-view').style.display='';modal.querySelector('.inquiry-success').classList.remove('show');modal.querySelector('.inquiry-form').reset();},150);}
  function openModal(){
    const copy=document.querySelector('.detailCopy');
    const media=document.querySelector('.detailMedia img');
    const title=copy?.querySelector('h1')?.textContent?.trim()||'작품';
    const artist=copy?.querySelector('b')?.textContent?.trim()||'KCAC ARTIST';
    modal.querySelector('.inquiry-artwork .title').textContent=title;
    modal.querySelector('.inquiry-artwork .artist').textContent=artist;
    const thumb=modal.querySelector('.inquiry-thumb');
    thumb.src=media?.src||'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=86&w=300';
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('inquiry-modal-open');
  }
  function enhanceInquiryButton(){
    if(location.hash.slice(1)!=='artwork') return;
    const copy=document.querySelector('.detailCopy'); if(!copy) return;
    const btn=[...copy.querySelectorAll('button,.btn')].find(el=>el.textContent.trim()==='문의하기');
    if(btn && !btn.dataset.inquiryBound){btn.dataset.inquiryBound='1';btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openModal();});}
  }

  modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.inquiry-close')||e.target.closest('.inquiry-cancel'))closeModal();});
  modal.querySelector('.inquiry-success .inquiry-submit').addEventListener('click',closeModal);
  modal.querySelector('.inquiry-form').addEventListener('submit',e=>{e.preventDefault();modal.querySelector('.inquiry-form-view').style.display='none';modal.querySelector('.inquiry-success').classList.add('show');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
  const obs=new MutationObserver(()=>enhanceInquiryButton());obs.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>setTimeout(enhanceInquiryButton,0));enhanceInquiryButton();
})();