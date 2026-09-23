(function(){
  const style=document.createElement('style');
  style.textContent=`
    .inquiry-modal{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(15,15,15,.52);backdrop-filter:blur(2px)}
    .inquiry-modal.open{display:flex}
    .inquiry-dialog{width:min(680px,100%);max-height:88vh;overflow:auto;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.2)}
    .inquiry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:26px 28px 20px;border-bottom:1px solid #ece8e2}
    .inquiry-head .kicker{margin-bottom:8px}.inquiry-head h2{font:31px/1.05 Georgia,'Times New Roman',serif;letter-spacing:-.035em;margin:0}
    .inquiry-close{border:0;background:transparent;font-size:26px;line-height:1;cursor:pointer;color:#333;padding:0}
    .inquiry-artwork{display:grid;grid-template-columns:92px 1fr;gap:16px;align-items:center;padding:20px 28px;border-bottom:1px solid #eee;background:#faf9f7}
    .inquiry-artwork img{width:92px;height:92px;object-fit:cover}.inquiry-artwork .artist{font-size:9px;letter-spacing:.12em;color:#8d877f;text-transform:uppercase}.inquiry-artwork h3{font:23px/1.05 Georgia,'Times New Roman',serif;margin:5px 0 0;letter-spacing:-.03em}
    .inquiry-body{padding:26px 28px 30px}.inquiry-guide{font-size:13px;line-height:1.8;color:#4e4a45;margin:0 0 22px}.inquiry-guide strong{color:#111}
    .inquiry-field{margin-bottom:18px}.inquiry-field label{display:block;font-size:10px;font-weight:700;margin-bottom:7px}.inquiry-field textarea,.inquiry-field input{width:100%;border:1px solid #ddd8d1;background:#fff;padding:12px 13px;font:12px Inter,Pretendard,Arial,sans-serif;color:#222;outline:none}.inquiry-field textarea{min-height:145px;resize:vertical;line-height:1.65}.inquiry-field small{display:block;font-size:9px;color:#999;margin-top:6px;line-height:1.5}
    .inquiry-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.inquiry-cancel,.inquiry-submit{padding:12px 18px;font-size:10px;font-weight:700;cursor:pointer}.inquiry-cancel{border:1px solid #d8d4cd;background:#fff;color:#333}.inquiry-submit{border:1px solid #111;background:#111;color:#fff}
    .inquiry-success{display:none;padding:48px 28px;text-align:center}.inquiry-success.show{display:block}.inquiry-success h3{font:30px/1 Georgia,'Times New Roman',serif;margin:0 0 12px}.inquiry-success p{font-size:12px;line-height:1.8;color:#777;margin:0 0 22px}
    body.inquiry-open{overflow:hidden}
    @media(max-width:560px){.inquiry-modal{padding:12px}.inquiry-head,.inquiry-body{padding-left:20px;padding-right:20px}.inquiry-artwork{grid-template-columns:72px 1fr;padding:16px 20px}.inquiry-artwork img{width:72px;height:72px}.inquiry-head h2{font-size:27px}.inquiry-actions{display:grid;grid-template-columns:1fr 1fr}.inquiry-cancel,.inquiry-submit{width:100%}}
  `;
  document.head.appendChild(style);

  const modal=document.createElement('div');
  modal.className='inquiry-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`<div class="inquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="inquiry-title"><div class="inquiry-head"><div><div class="kicker">ARTWORK INQUIRY</div><h2 id="inquiry-title">작품 문의</h2></div><button class="inquiry-close" type="button" aria-label="닫기">×</button></div><div class="inquiry-form-view"><div class="inquiry-artwork"><img class="inquiry-thumb" alt="작품 이미지"><div><div class="artist inquiry-artist"></div><h3 class="inquiry-work-title"></h3></div></div><div class="inquiry-body"><p class="inquiry-guide"><strong>가격·작품 상태·배송 등 궁금한 내용을 적어주세요.</strong><br>갤러리가 확인한 뒤 등록하신 연락처로 답변드립니다.</p><form class="inquiry-form"><div class="inquiry-field"><label>문의 내용 *</label><textarea required placeholder="궁금한 내용을 자유롭게 적어주세요."></textarea></div><div class="inquiry-field"><label>답변 받을 이메일 또는 연락처 *</label><input required type="text" placeholder="example@email.com 또는 010-0000-0000"><small>문의 답변을 받을 수 있는 정보를 입력해 주세요.</small></div><div class="inquiry-actions"><button class="inquiry-cancel" type="button">취소</button><button class="inquiry-submit" type="submit">문의 보내기</button></div></form></div></div><div class="inquiry-success"><div class="kicker" style="margin-bottom:10px">INQUIRY SENT</div><h3>문의가 접수되었습니다.</h3><p>갤러리가 확인한 뒤 입력하신 연락처로 답변드립니다.<br>문의 내역은 MY KCAC의 Inquiries에서도 확인할 수 있습니다.</p><button class="inquiry-submit inquiry-success-close" type="button">확인</button></div></div>`;
  document.body.appendChild(modal);

  function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('inquiry-open');setTimeout(()=>{modal.querySelector('.inquiry-form-view').style.display='';modal.querySelector('.inquiry-success').classList.remove('show');const form=modal.querySelector('.inquiry-form');if(form)form.reset();},150);}
  function openModal(){
    const copy=document.querySelector('.detailCopy');
    const media=document.querySelector('.detailMedia img');
    const title=copy?.querySelector('h1')?.textContent?.trim()||'Blue Ketchup, 2025';
    const artist=copy?.querySelector('.meta')?.textContent?.trim()||'Shin Dain';
    modal.querySelector('.inquiry-work-title').textContent=title;
    modal.querySelector('.inquiry-artist').textContent=artist;
    modal.querySelector('.inquiry-thumb').src=media?.src||'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=85&w=400';
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('inquiry-open');
  }

  document.addEventListener('click',function(e){
    if(location.hash.slice(1)==='artwork'){
      const btn=e.target.closest('.detailCopy .btn');
      if(btn && /문의/.test(btn.textContent)){e.preventDefault();openModal();return;}
    }
    if(e.target===modal||e.target.closest('.inquiry-close')||e.target.closest('.inquiry-cancel')||e.target.closest('.inquiry-success-close')) closeModal();
  });
  modal.querySelector('.inquiry-form').addEventListener('submit',function(e){e.preventDefault();modal.querySelector('.inquiry-form-view').style.display='none';modal.querySelector('.inquiry-success').classList.add('show');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
})();