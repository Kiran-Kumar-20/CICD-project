// Space theme interactivity (clean)

document.addEventListener('DOMContentLoaded', () => {
  generateStars(180);
  setInterval(shootingStar, 5000 + Math.random()*5000);
  setupSmoothScroll();
  highlightActiveNav();
  updateBuildInfo();
  setupThemeToggle();
  animatePipelineProgress();
function animatePipelineProgress() {
  const progress = document.querySelector('.pipeline-progress-line');
  if (!progress) return;
  // Reset animation
  progress.style.animation = 'none';
  void progress.offsetWidth; // trigger reflow
  progress.style.animation = '';
  // Animate when in view
  function onScroll() {
    const rect = progress.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      progress.classList.add('animate');
      progress.style.animation = '';
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
}
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  // Load saved theme
  const saved = localStorage.getItem('space-theme');
  if (saved === 'nebula') document.body.classList.add('nebula-theme');
  else document.body.classList.remove('nebula-theme');
  updateToggleIcons();
  btn.addEventListener('click', () => {
    document.body.classList.toggle('nebula-theme');
    const isNebula = document.body.classList.contains('nebula-theme');
    localStorage.setItem('space-theme', isNebula ? 'nebula' : 'galaxy');
    updateToggleIcons();
  });
}

function updateToggleIcons() {
  const isNebula = document.body.classList.contains('nebula-theme');
  document.querySelectorAll('.theme-toggle .galaxy').forEach(el => el.style.opacity = isNebula ? '0' : '1');
  document.querySelectorAll('.theme-toggle .nebula').forEach(el => el.style.opacity = isNebula ? '1' : '0');
}
});

function generateStars(count){
  const bg = document.querySelector('.animated-bg');
  if(!bg) return;
  for(let i=0;i<count;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random()<0.8 ? 2 : 3;
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.top = Math.random()*100+'%';
    s.style.left = Math.random()*100+'%';
    s.style.animationDelay = (Math.random()*2).toFixed(2)+'s';
    bg.appendChild(s);
  }
}

function shootingStar(){
  const bg = document.querySelector('.animated-bg');
  if(!bg) return;
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.top = (10 + Math.random()*40) + '%';
  s.style.right = Math.random()*10 + '%';
  bg.appendChild(s);
  setTimeout(()=>s.remove(), 1500);
}

function setupSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      const navH = document.querySelector('.navbar')?.offsetHeight || 0;
      const y = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({top:y, behavior:'smooth'});
    });
  });
}

function highlightActiveNav(){
  const links = [...document.querySelectorAll('.nav-menu a')];
  const sections = [...document.querySelectorAll('section[id]')];
  const onScroll = () => {
    const y = window.scrollY + (document.querySelector('.navbar')?.offsetHeight || 0) + 10;
    let current = sections[0]?.id;
    for(const s of sections){
      if(y >= s.offsetTop && y < s.offsetTop + s.offsetHeight){ current = s.id; break; }
    }
    links.forEach(l=> l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

function updateBuildInfo(){
  const bn = document.getElementById('build-number');
  const dt = document.getElementById('deploy-time');
  if(bn) bn.textContent = 'v2.1.0';
  if(dt){
    const now = new Date();
    dt.textContent = now.toLocaleString();
  }
}
