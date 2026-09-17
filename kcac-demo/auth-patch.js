(function(){
  const style=document.createElement('style');
  style.textContent=`
  body.auth-page{background:#fff}
  body.auth-page header,body.auth-page footer{display:none}
  body.auth-page #app{min-height:100vh}
  .auth-shell{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:30px 20px 48px;background:#fff;color:#111}
  .auth-logo{font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0 0 32px;cursor:pointer}
  .auth-card{width:100%;max-width:400px;border:1px solid #e6e6e6;border-radius:8px;padding:32px;background:#fff}
  .auth-card h1{font-size:22px;margin:0 0 26px;font-weight:700;letter-spacing:-.03em}
  .auth-field{margin-bottom:18px}
  .auth-label{display:block;font-size:14px;margin-bottom:9px}
  .auth-input{width:100%;height:44px;border:1px solid #e3e3e3;border-radius:6px;padding:0 12px;font:14px Inter,Pretendard,Arial,sans-serif;outline:none;background:#fff}
  .auth-input:focus{border-color:#8f8f8f}
  .auth-help{font-size:11px;color:#777;margin-top:7px;line-height:1.5}
  .auth-btn{width:100%;height:45px;border:0;border-radius:5px;background:#111;color:#fff;font-size:15px;font-weight:700;cursor:pointer;margin-top:16px}
  .auth-btn:hover{background:#282828}
  .auth-links{text-align:center;margin-top:24px;font-size:13px;color:#777}
  .auth-links a{color:#111;text-decoration:underline;text-underline-offset:3px}
  .auth-divider{border:0;border-top:1px solid #e7e7e7;margin:22px 0 16px}
  .terms{display:grid;gap:10px}
  .term-row{display:grid;grid-template-columns:18px 1fr auto;gap:7px;align-items:start;font-size:13px;line-height:1.45}
  .term-row input{width:16px;height:16px;margin:1px 0 0}
  .term-row .required{font-weight:700}
  .term-row .optional{color:#777}
  .term-view{font-size:12px;color:#666;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
  .login-card{max-width:400px;padding-top:34px;padding-bottom:34px}
  .login-meta{display:flex;justify-content:flex-end;margin-top:-8px;margin-bottom:6px;font-size:11px;color:#777}
  @media(max-width:520px){.auth-shell{padding:24px 16px 36px}.auth-card{padding:26px 22px}.auth-logo{margin-bottom:26px}}
  `;
  document.head.appendChild(style);

  function loginPage(){
    return `<div class="auth-shell"><div class="auth-logo" onclick="location.hash='home'">KCAC</div><section class="auth-card login-card"><h1>로그인</h1><div class="auth-field"><label class="auth-label">이메일</label><input class="auth-input" type="email" autocomplete="email"></div><div class="auth-field"><label class="auth-label">비밀번호</label><input class="auth-input" type="password" autocomplete="current-password"></div><button class="auth-btn" type="button" onclick="location.hash='home'">로그인</button></section><div class="auth-links">아직 회원이 아니신가요? <a href="#signup">회원가입</a></div></div>`;
  }

  function signupPage(){
    return `<div class="auth-shell"><div class="auth-logo" onclick="location.hash='home'">KCAC</div><section class="auth-card"><h1>회원가입</h1><div class="auth-field"><label class="auth-label">이메일</label><input class="auth-input" type="email" autocomplete="email"></div><div class="auth-field"><label class="auth-label">비밀번호</label><input class="auth-input" type="password" autocomplete="new-password"><div class="auth-help">8~64자, 영문·숫자·특수문자를 각각 1자 이상 포함해 주세요.</div></div><div class="auth-field"><label class="auth-label">닉네임</label><input class="auth-input" type="text" maxlength="20"><div class="auth-help">2~20자로 지어 주세요.</div></div><hr class="auth-divider"><div class="terms"><label class="term-row"><input type="checkbox"><span><span class="required">(필수)</span> 이용약관에 동의합니다.</span><a class="term-view" href="javascript:void(0)">보기</a></label><label class="term-row"><input type="checkbox"><span><span class="required">(필수)</span> 개인정보 처리방침에 동의합니다.</span><a class="term-view" href="javascript:void(0)">보기</a></label><label class="term-row"><input type="checkbox"><span><span class="optional">(선택)</span> 마케팅 정보 수신에 동의합니다.</span><a class="term-view" href="javascript:void(0)">보기</a></label></div><button class="auth-btn" type="button" onclick="location.hash='login'">가입하기</button></section><div class="auth-links">이미 계정이 있으신가요? <a href="#login">로그인</a></div></div>`;
  }

  const previousRender=window.render;
  window.render=function(){
    const route=location.hash.slice(1)||'home';
    if(route==='login'||route==='signup'){
      document.body.classList.add('auth-page');
      document.getElementById('app').innerHTML=route==='login'?loginPage():signupPage();
      window.scrollTo(0,0);
      return;
    }
    document.body.classList.remove('auth-page');
    previousRender();
    const user=document.querySelector('.user');
    if(user){user.style.cursor='pointer';user.title='로그인 화면 보기';user.onclick=()=>location.hash='login';}
  };
  window.addEventListener('hashchange',()=>{});
  window.render();
})();