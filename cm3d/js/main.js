const b=document.querySelector('.burger'),u=document.querySelector('nav>ul');
b?.addEventListener('click',()=>{const o=u.classList.toggle('open');b.setAttribute('aria-expanded',o)});
const themeToggle=document.querySelector('[data-theme-toggle]');
const savedTheme=localStorage.getItem('cm3d-theme');
const systemTheme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
const setTheme=theme=>{document.documentElement.dataset.theme=theme;localStorage.setItem('cm3d-theme',theme);if(themeToggle){themeToggle.textContent=theme==='dark'?'Tema claro':'Tema escuro';themeToggle.setAttribute('aria-label',theme==='dark'?'Mudar para tema claro':'Mudar para tema escuro')}};
setTheme(savedTheme||systemTheme);
themeToggle?.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
 const track=carousel.querySelector('.carousel-track'),slides=[...carousel.querySelectorAll('.carousel-slide')],dots=[...carousel.querySelectorAll('[data-carousel-dot]')];
 let index=0;
 const show=next=>{index=(next+slides.length)%slides.length;track.style.transform=`translateX(-${index*100}%)`;dots.forEach((dot,i)=>dot.setAttribute('aria-selected',i===index));};
 carousel.querySelector('[data-carousel-prev]')?.addEventListener('click',()=>show(index-1));
 carousel.querySelector('[data-carousel-next]')?.addEventListener('click',()=>show(index+1));
 dots.forEach(dot=>dot.addEventListener('click',()=>show(Number(dot.dataset.carouselDot))));
 carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')show(index-1);if(event.key==='ArrowRight')show(index+1)});
});
document.querySelectorAll('[role=tablist]').forEach(l=>{
 const t=[...l.querySelectorAll('[role=tab]')];
 const sel=x=>t.forEach(y=>{const on=y===x;y.setAttribute('aria-selected',on);y.tabIndex=on?0:-1;document.getElementById(y.getAttribute('aria-controls')).hidden=!on});
 t.forEach((x,i)=>{x.onclick=()=>sel(x);x.onkeydown=e=>{const n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(n){const k=t[(i+n+t.length)%t.length];k.focus();sel(k)}}});
});
const links=[...document.querySelectorAll('.phase-nav a')];
if(links.length&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});
 links.forEach(a=>{const s=document.querySelector(a.hash);s&&io.observe(s)})}
