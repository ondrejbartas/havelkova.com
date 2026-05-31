document.getElementById('yr').textContent = new Date().getFullYear();

const navtog = document.getElementById('navtog');
document.querySelectorAll('.menu a').forEach(a =>
  a.addEventListener('click', () => { if (navtog) navtog.checked = false; })
);

const shots = [...document.querySelectorAll('.shot')];
const imgs = shots.map(s => s.getAttribute('href'));
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
let cur = 0;

function show(i){
  cur = (i + imgs.length) % imgs.length;
  lbImg.src = imgs[cur];
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function close(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

shots.forEach((s,i) => s.addEventListener('click', e => { e.preventDefault(); show(i); }));
document.getElementById('lbClose').addEventListener('click', close);
document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); show(cur-1); });
document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); show(cur+1); });
lb.addEventListener('click', e => { if (e.target === lb) close(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') show(cur-1);
  if (e.key === 'ArrowRight') show(cur+1);
});
