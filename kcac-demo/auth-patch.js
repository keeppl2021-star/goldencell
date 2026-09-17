(function(){
  const style=document.createElement('style');
  style.textContent=`
  body.auth-page{background:#f7f5f1}
  body.auth-page header,body.auth-page footer{display:none}
  body.auth-page #app{min-height:100vh}
  .auth-shell{min-height:100vh;display:grid;grid-template-columns:minmax(420px,1.05fr) minmax(480px,.95fr);background:#f7f5f1;color:#151515}
  .auth-visual{position:relative;min-height:100vh;background:url('https://images.unsplash.com/photo-1774021802549-d34b0a3c5750?auto=format&fit=crop&fm=jpg&q=82&w=1800') center/cover;overflow:hidden}
  .auth-visual:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.10),rgba(0,0,0,.64))}
  .auth-visual-copy{position:absolute;left:54px;right:48px;bottom:52px;color:#fff;z-index:1}
  .auth-visual .kicker{font-size:10px;letter-spacing:.24em;font-weight:800;margin-bottom:16px}
  .auth-visual h2{font:48px/1.02 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:0 0 16px;max-width:560px}
  .auth-visual p{font-size:13px;line-height:1.7;max-width:460px;margin:0;color:rgba(255,255,255,.84)}
  .auth-panel{display:flex;flex-direction:column;justify-content:center;min-height:100vh;padding:46px 9vw 50px;background:#fff}
  .auth-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:58px}
  .auth-logo{font-family:Georgia,'Times New Roman',serif;font-size:25px;font-weight:700;letter-spacing:-.02em;cursor:pointer}
  .auth-back{font-size:10px;letter-spacing:.08em;color:#777;cursor:pointer}
  .auth-card{width:100%;max-width:500px;margin:auto;border-top:1px solid #111;padding-top:24px}
  .auth-eyebrow{font-size:10px;letter-spacing:.20em;font-weight:800;margin-bottom:12px;color:#6b665f}
  .auth-card h1{font:46px/1 Georgia,'Times New Roman',serif;letter-spacing:-.04em;margin:0 0 14px}
  .auth-intro{font-size:13px;line-height:1.7;color:#777;margin:0 0 32px;max-width:430px}
  .auth-field{margin-bottom:19px}
  .auth-label{display:block;font-size:12px;font-weight:600;margin-bottom:9px}
  .auth-input{width:100%;height:50px;border:0;border-bottom:1px solid #cfcac2;padding:0 2px;font:14px Inter,Pretendard,Arial,sans-serif;outline:none;background:transparent;border-radius:0;transition:.2s}
  .auth-input:focus{border-color:#111}
  .auth-input::placeholder{color:#b3aea7}
  .auth-help{font-size:10px;color:#8a857f;margin-top:7px;line-height:1.55}
  .auth-actions{display:flex;align-items:center;justify-content:space-between;margin-top:4px;font-size:10px;color:#777}
  .auth-actions a{text-decoration:underline;text-underline-offset:3px}
  .auth-btn{width:100%;height:50px;border:0;background:#111;color:#fff;font-size:12px;font-weight:700;letter-spacing:.08em;cursor:pointer;margin-top:26px;transition:.2s}
  .auth-btn:hover{background:#2b2b2b}
  .auth-links{margin-top:22px;font-size:12px;color:#777}
  .auth-links a{color:#111;font-weight:700;text-decoration:underline;text-underline-offset:3px;margin-left:4px}
  .auth-divider{border:0;border-top:1px solid #e7e2db;margin:26px 0 18px}
  .terms{display:grid;gap:11px}
  .term-row{display:grid;grid-template-columns:18px 1fr auto;gap:8px;align-items:start;font-size:12px;line-height:1.45}
  .term-row input{appearance:none;width:15px;height:15px;border:1px solid #bcb7b0;margin:1px 0 0;display:grid;place-items:center;background:#fff}
  .term-row input:checked{background:#111;border-color:#111}
  .term-row input:checked:after{content:'✓';font-size:10px;color:#fff;line-height:1}
  .term-row .required{font-weight:700}
  .term-row .optional{color:#858078}
  .term-view{font-size:10px;color:#666;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
  .auth-signup .auth-panel{padding-top:34px;padding-bottom:34px}
  .auth-signup .auth-top{margin-bottom:34px}
  .auth-signup .auth-card h1{font-size:42px}
  .auth-signup .auth-intro{margin-bottom:24px}
  .auth-signup .auth-field{margin-bottom:15px}
  .auth-signup .auth-input{height:46px}
  .auth-signup .auth-divider{margin:20px 0 15px}
  .auth-signup .auth-btn{margin-top:20px}
  @media(max-width:980px){.auth-shell{grid-template-columns:1fr}.auth-visual{min-height:270px}.auth-visual-copy{left:32px;bottom:30px}.auth-visual h2{font-size:38px}.auth-panel{min-height:auto;padding:38px 28px 50px}.auth-top{margin-bottom:38px}.auth-card{max-width:620px}}
  @media(max-width:560px){.auth-visual{min-height:220px}.auth-visual-copy{left:22px;right:22px;bottom:22px}.auth-visual h2{font-size:31px}.auth-visual p{font-size:11px}.auth-panel{padding:28px 20px 38px}.auth-top{margin-bottom:30px}.auth-card h1,.auth-signup .auth-card h1{font-size:36px}.auth-intro{font-size:12px}.term-row{font-size:11px}}
  `;
  document.head.appendChild(style);

  function visualCopy(type){
    if(type==='signup') return `<aside class="auth-visual"><div class="auth-visual-copy"><div class="kicker">BEGIN YOUR ART JOURNEY</div><h2>Discover your taste.<br>Build your collection.</h2><p>작품을 저장하고, 작가와 갤러리를 팔로우하며 나만의 컬렉션 여정을 시작해보세요.</p></div></aside>`;
    return `<aside class="auth-visual"><div class="auth-visual-copy"><div class="kicker">WELCOME BACK TO KCAC</div><h2>Art lives<br>a richer life.</h2><p>관심 있는 작품과 전시, 그리고 나의 취향이 이어지는 KCAC로 다시 돌아오세요.</p></div></aside>`;
  }

  function loginPage(){
    return `<div class="auth-shell auth-login">${visualCopy('login')}<main class="auth-panel"><div class="auth-top"><div class="auth-logo" onclick="location.hash='home'">KCAC</div><div class="auth-back" onclick="location.hash='home'">BACK TO HOME →</div></div><section class="auth-card"><div class="auth-eyebrow">MEMBER LOGIN</div><h1>Welcome back.</h1><p class="auth-intro">나의 취향과 저장한 작품, 관심 전시를 이어서 만나보세요.</p><div class="auth-field"><label class="auth-label">이메일</label><input class="auth-input" type="email" autocomplete="email" placeholder="name@example.com"></div><div class="auth-field"><label class="auth-label">비밀번호</label><input class="auth-input" type="password" autocomplete="current-password" placeholder="비밀번호를 입력해 주세요"></div><div class="auth-actions"><label><input type="checkbox"> 로그인 상태 유지</label><a href="javascript:void(0)">비밀번호 찾기</a></div><button class="auth-btn" type="button" onclick="location.hash='home'">LOGIN</button><div class="auth-links">아직 KCAC 회원이 아니신가요?<a href="#signup">회원가입</a></div></section></main></div>`;
  }

  function signupPage(){
    return `<div class="auth-shell auth-signup">${visualCopy('signup')}<main class="auth-panel"><div class="auth-top"><div class="auth-logo" onclick="location.hash='home'">KCAC</div><div class="auth-back" onclick="location.hash='home'">BACK TO HOME →</div></div><section class="auth-card"><div class="auth-eyebrow">JOIN KCAC</div><h1>Create your account.</h1><p class="auth-intro">취향을 발견하고, 작품을 이해하고, 나만의 첫 컬렉션을 시작하세요.</p><div class="auth-field"><label class="auth-label">이메일</label><input class="auth-input" type="email" autocomplete="email" placeholder="name@example.com"></div><div class="auth-field"><label class="auth-label">비밀번호</label><input class="auth-input" type="password" autocomplete="new-password" placeholder="비밀번호를 입력해 주세요"><div class="auth-help">8~64자, 영문·숫자·특수문자를 각각 1자 이상 포함해 주세요.</div></div><div class="auth-field"><label class="auth-label">닉네임</label><input class="auth-input" type="text" maxlength="20" placeholder="KCAC에서 사용할 이름"><div class="auth-help">2~20자로 지어 주세요.</div></div><hr class="auth-divider"><div class="terms"><label class="term-row"><input type="checkbox"><span><span class="required">(필수)</span> 이용약관에 동의합니다.</span><a class="term-view" href="javascript:void(0)">보기</a></label><label class="term-row"><input type="checkbox"><span><span class="required">(필수)</span> 개인정보 처리방침에 동의합니다.</span><a class="term-view" href="javascript:void(0)">보기</a></label><label class="term-row"><input type="checkbox"><span><span class="optional">(선택)</span> 마케팅 정보 수신에 동의합니다.</span><a class="term-view" href="javascript:void(0)">보기</a></label></div><button class="auth-btn" type="button" onclick="location.hash='login'">CREATE ACCOUNT</button><div class="auth-links">이미 계정이 있으신가요?<a href="#login">로그인</a></div></section></main></div>`;
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
  window.render();
})();