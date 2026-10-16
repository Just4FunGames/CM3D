const b=document.querySelector('.burger'),u=document.querySelector('nav>ul');
b?.addEventListener('click',()=>{const o=u.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.querySelectorAll('[role=tablist]').forEach(l=>{
 const t=[...l.querySelectorAll('[role=tab]')];
 const sel=x=>t.forEach(y=>{const on=y===x;y.setAttribute('aria-selected',on);y.tabIndex=on?0:-1;document.getElementById(y.getAttribute('aria-controls')).hidden=!on});
 t.forEach((x,i)=>{x.onclick=()=>sel(x);x.onkeydown=e=>{const n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(n){const k=t[(i+n+t.length)%t.length];k.focus();sel(k)}}});
});
const links=[...document.querySelectorAll('.phase-nav a')];
if(links.length&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});
 links.forEach(a=>{const s=document.querySelector(a.hash);s&&io.observe(s)})}
