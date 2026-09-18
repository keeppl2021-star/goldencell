(function(){
  let activeTermsTab='terms';

  const policyCopy={
    terms:{
      label:'이용약관',
      body:`<h3>제1조 목적</h3><p>본 약관은 KCAC가 제공하는 온라인 예술 플랫폼 서비스의 이용 조건과 회원 및 서비스 운영자의 권리·의무에 관한 기본 사항을 정합니다.</p><h3>제2조 회원가입 및 계정</h3><p>회원은 정확한 정보를 바탕으로 계정을 생성하며, 본인의 계정 정보를 안전하게 관리할 책임이 있습니다.</p><h3>제3조 서비스 이용</h3><p>회원은 작품 탐색, 전시 및 갤러리 정보 확인, 관심 콘텐츠 저장 등 KCAC가 제공하는 기능을 서비스 정책에 따라 이용할 수 있습니다.</p><h3>제4조 서비스 변경 및 중단</h3><p>서비스 개선이나 운영상 필요한 경우 일부 기능이 변경될 수 있으며, 중요한 변경 사항은 적절한 방식으로 안내합니다.</p><h3>제5조 회원의 의무</h3><p>회원은 타인의 권리를 침해하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.</p>`
    },
    privacy:{
      label:'개인정보 처리방침',
      body:`<h3>수집하는 개인정보</h3><p>회원가입 시 이메일, 비밀번호, 닉네임 등 서비스 제공에 필요한 최소한의 정보를 수집할 수 있습니다.</p><h3>이용 목적</h3><p>회원 식별, 계정 관리, 서비스 제공, 고객 문의 대응 및 서비스 개선을 위해 개인정보를 이용합니다.</p><h3>보유 및 이용 기간</h3><p>개인정보는 회원 탈퇴 또는 수집·이용 목적 달성 시 관련 법령에서 정한 경우를 제외하고 지체 없이 파기합니다.</p><h3>이용자의 권리</h3><p>이용자는 자신의 개인정보에 대해 열람, 수정, 삭제 등을 요청할 수 있습니다.</p><h3>안전성 확보 조치</h3><p>KCAC는 개인정보 보호를 위해 접근 통제, 관리적 보호조치 등 필요한 안전조치를 적용합니다.</p>`
    },
    marketing:{
      label:'마케팅 정보 수신 동의',
      body:`<h3>수신 정보</h3><p>KCAC의 신규 전시, 작품 큐레이션, 갤러리 소식, 이벤트 및 혜택 정보를 이메일 등의 방법으로 받아볼 수 있습니다.</p><h3>선택 동의</h3><p>마케팅 정보 수신 동의는 선택 사항이며, 동의하지 않아도 회원가입 및 기본 서비스 이용에는 제한이 없습니다.</p><h3>철회</h3><p>수신 동의 후에도 언제든지 설정을 통해 마케팅 정보 수신을 철회할 수 있습니다.</p>`
    }
  };

  const style=document.createElement('style');
  style.textContent=`
    .foot-right{display:flex;align-items:center;gap:30px}
    .foot-policy-link{font-size:10px;color:#777;text-decoration:none;white-space:nowrap}
    .foot-policy-link:hover{color:#111;text-decoration:underline;text-underline-offset:3px}
    .terms-page{padding:54px 0 92px}
    .terms-page-top{padding-bottom:28px;border-bottom:1px solid #111}
    .terms-page-top h1{font:52px/.98 Georgia,'Times New Roman',serif;letter-spacing:-.045em;margin:10px 0 12px}
    .terms-page-top p{font-size:12px;line-height:1.7;color:#777;margin:0}
    .terms-page-tabs{display:flex;gap:32px;border-bottom:1px solid #e8e4de;margin-bottom:0;overflow-x:auto;white-space:nowrap}
    .terms-page-tab{border:0;background:transparent;padding:18px 2px 14px;font-size:11px;color:#777;cursor:pointer;border-bottom:2px solid transparent}
    .terms-page-tab.active{color:#111;font-weight:700;border-bottom-color:#111}
    .terms-page-content{max-width:900px;padding:38px 0 20px}
    .terms-page-content h2{font:34px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:0 0 28px}
    .terms-page-content h3{font-size:13px;margin:30px 0 9px;color:#111}
    .terms-page-content h3:first-of-type{margin-top:0}
    .terms-page-content p{font-size:13px;line-height:1.9;color:#5f5b55;margin:0 0 13px}
    .terms-page-content .terms-date{font-size:10px;color:#999;border-top:1px solid #eee;margin-top:36px;padding-top:16px}
    @media(max-width:680px){.foot-right{gap:16px}.terms-page{padding-top:34px}.terms-page-top h1{font-size:42px}.terms-page-tabs{gap:22px}.terms-page-content{padding-top:28px}.terms-page-content h2{font-size:29px}}
  `;
  document.head.appendChild(style);

  function termsPage(){
    const item=policyCopy[activeTermsTab];
    return `<div class="wrap terms-page"><div class="terms-page-top"><div class="kicker">KCAC POLICY</div><h1>KCAC 약관</h1><p>KCAC 서비스 이용과 개인정보, 마케팅 정보 수신에 관한 정책을 확인할 수 있습니다.</p></div><nav class="terms-page-tabs"><button class="terms-page-tab ${activeTermsTab==='terms'?'active':''}" data-policy-tab="terms">이용약관</button><button class="terms-page-tab ${activeTermsTab==='privacy'?'active':''}" data-policy-tab="privacy">개인정보 처리방침</button><button class="terms-page-tab ${activeTermsTab==='marketing'?'active':''}" data-policy-tab="marketing">마케팅 정보 수신 동의</button></nav><article class="terms-page-content"><h2>${item.label}</h2>${item.body}<div class="terms-date">시행일자 2026.09.18 · 본 내용은 KCAC 서비스 시안용 약관 문구입니다.</div></article></div>`;
  }

  function bindTerms(){
    document.querySelectorAll('[data-policy-tab]').forEach(btn=>{
      btn.onclick=()=>{
        activeTermsTab=btn.dataset.policyTab;
        document.getElementById('app').innerHTML=termsPage();
        bindTerms();
        window.scrollTo(0,0);
      };
    });
  }

  function ensureFooterLink(){
    const foot=document.querySelector('.foot');
    if(!foot) return;
    const slogan=[...foot.children].find(el=>el.tagName==='SPAN' && el.textContent.includes('ART BRINGS'));
    if(!slogan) return;
    if(foot.querySelector('.foot-right')) return;
    const group=document.createElement('div');
    group.className='foot-right';
    const link=document.createElement('a');
    link.className='foot-policy-link';
    link.href='#terms';
    link.textContent='KCAC 약관';
    foot.insertBefore(group,slogan);
    group.appendChild(link);
    group.appendChild(slogan);
  }

  const prevRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='terms'){
      document.body.classList.remove('auth-page');
      const h=document.querySelector('header'),f=document.querySelector('footer');
      if(h)h.style.display=''; if(f)f.style.display='';
      document.getElementById('app').innerHTML=termsPage();
      bindTerms();
      ensureFooterLink();
      window.scrollTo(0,0);
      return;
    }
    prevRender();
    requestAnimationFrame(ensureFooterLink);
  };

  window.addEventListener('hashchange',()=>window.render());
  ensureFooterLink();
  window.render();
})();