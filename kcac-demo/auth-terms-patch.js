(function(){
  const style=document.createElement('style');
  style.textContent=`
    .terms-modal{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(15,15,15,.54);backdrop-filter:blur(3px)}
    .terms-modal.open{display:flex}
    .terms-dialog{width:min(620px,100%);max-height:min(76vh,720px);background:#fff;display:flex;flex-direction:column;box-shadow:0 24px 70px rgba(0,0,0,.22)}
    .terms-dialog-head{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:26px 28px 20px;border-bottom:1px solid #e8e5df}
    .terms-dialog-head .eyebrow{font-size:9px;letter-spacing:.2em;font-weight:800;color:#777;margin-bottom:8px}
    .terms-dialog-head h2{font:30px/1.05 Georgia,'Times New Roman',serif;letter-spacing:-.035em;margin:0}
    .terms-close{border:0;background:transparent;font-size:24px;line-height:1;cursor:pointer;padding:0;color:#333}
    .terms-dialog-body{overflow:auto;padding:26px 28px 30px;color:#555;font-size:12px;line-height:1.85}
    .terms-dialog-body h3{font-size:12px;color:#111;margin:26px 0 8px;letter-spacing:.03em}
    .terms-dialog-body h3:first-child{margin-top:0}
    .terms-dialog-body p{margin:0 0 12px}
    .terms-dialog-foot{padding:16px 28px 22px;border-top:1px solid #eee;display:flex;justify-content:flex-end}
    .terms-confirm{border:0;background:#111;color:#fff;padding:12px 22px;font-size:11px;font-weight:700;cursor:pointer}
    body.terms-modal-open{overflow:hidden}
    @media(max-width:560px){.terms-modal{padding:14px}.terms-dialog{max-height:84vh}.terms-dialog-head,.terms-dialog-body{padding-left:20px;padding-right:20px}.terms-dialog-head h2{font-size:26px}.terms-dialog-foot{padding:14px 20px 18px}}
  `;
  document.head.appendChild(style);

  const copy={
    terms:{title:'이용약관',body:`<h3>제1조 목적</h3><p>본 약관은 KCAC가 제공하는 온라인 예술 플랫폼 서비스의 이용 조건과 회원 및 서비스 운영자의 권리·의무에 관한 기본 사항을 정합니다.</p><h3>제2조 회원가입 및 계정</h3><p>회원은 정확한 정보를 바탕으로 계정을 생성하며, 본인의 계정 정보를 안전하게 관리할 책임이 있습니다.</p><h3>제3조 서비스 이용</h3><p>회원은 작품 탐색, 전시 및 갤러리 정보 확인, 관심 콘텐츠 저장 등 KCAC가 제공하는 기능을 서비스 정책에 따라 이용할 수 있습니다.</p><h3>제4조 서비스 변경 및 중단</h3><p>서비스 개선이나 운영상 필요한 경우 일부 기능이 변경될 수 있으며, 중요한 변경 사항은 적절한 방식으로 안내합니다.</p><h3>제5조 회원의 의무</h3><p>회원은 타인의 권리를 침해하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.</p>`},
    privacy:{title:'개인정보 처리방침',body:`<h3>수집하는 개인정보</h3><p>회원가입 시 이메일, 비밀번호, 닉네임 등 서비스 제공에 필요한 최소한의 정보를 수집할 수 있습니다.</p><h3>이용 목적</h3><p>회원 식별, 계정 관리, 서비스 제공, 고객 문의 대응 및 서비스 개선을 위해 개인정보를 이용합니다.</p><h3>보유 및 이용 기간</h3><p>개인정보는 회원 탈퇴 또는 수집·이용 목적 달성 시 관련 법령에서 정한 경우를 제외하고 지체 없이 파기합니다.</p><h3>이용자의 권리</h3><p>이용자는 자신의 개인정보에 대해 열람, 수정, 삭제 등을 요청할 수 있습니다.</p><h3>안전성 확보 조치</h3><p>KCAC는 개인정보 보호를 위해 접근 통제, 관리적 보호조치 등 필요한 안전조치를 적용합니다.</p>`},
    marketing:{title:'마케팅 정보 수신 동의',body:`<h3>수신 정보</h3><p>KCAC의 신규 전시, 작품 큐레이션, 갤러리 소식, 이벤트 및 혜택 정보를 이메일 등의 방법으로 받아볼 수 있습니다.</p><h3>선택 동의</h3><p>마케팅 정보 수신 동의는 선택 사항이며, 동의하지 않아도 회원가입 및 기본 서비스 이용에는 제한이 없습니다.</p><h3>철회</h3><p>수신 동의 후에도 언제든지 설정을 통해 마케팅 정보 수신을 철회할 수 있습니다.</p>`}
  };

  const modal=document.createElement('div');
  modal.className='terms-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`<div class="terms-dialog" role="dialog" aria-modal="true" aria-labelledby="terms-modal-title"><div class="terms-dialog-head"><div><div class="eyebrow">KCAC MEMBER POLICY</div><h2 id="terms-modal-title"></h2></div><button class="terms-close" type="button" aria-label="닫기">×</button></div><div class="terms-dialog-body"></div><div class="terms-dialog-foot"><button class="terms-confirm" type="button">확인</button></div></div>`;
  document.body.appendChild(modal);

  function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('terms-modal-open');}
  function openModal(type){const item=copy[type]||copy.terms;modal.querySelector('#terms-modal-title').textContent=item.title;modal.querySelector('.terms-dialog-body').innerHTML=item.body;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('terms-modal-open');}

  document.addEventListener('click',function(e){
    const view=e.target.closest('.term-view');
    if(view){e.preventDefault();const row=view.closest('.term-row');const text=row?row.textContent:'';let type='terms';if(text.includes('개인정보'))type='privacy';else if(text.includes('마케팅'))type='marketing';openModal(type);return;}
    if(e.target===modal||e.target.closest('.terms-close')||e.target.closest('.terms-confirm')) closeModal();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
})();