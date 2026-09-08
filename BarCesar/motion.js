/* Native scroll choreography. One scheduled frame, no intercepted wheel/touch events. */
(()=>{
  const root=document.documentElement;
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const range=(n,a,b)=>clamp((n-a)/(b-a));
  const ease=n=>n*n*(3-2*n);
  const hero=document.querySelector('.hero');
  const heroCopy=document.querySelector('.hero-copy');
  const waves=document.querySelector('.scene-waves');
  const offer=document.querySelector('.offer');
  const manifesto=document.querySelector('.manifesto');
  const track=document.querySelector('.dish-track');
  const frame=document.querySelector('.dish-frame');
  const dishContainer=document.querySelector('#dish-art');
  const story=document.querySelector('.story');
  const photos=document.querySelector('.photo-story');
  const reviewsSection=document.querySelector('.reviews');
  const footer=document.querySelector('.footer-curtain');
  const headline=document.querySelector('.read-along');
  // Preserve semantic text and its emphasis; no duplicate accessibility labels.
  const walker=document.createTreeWalker(headline,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(token=>{if(!token.trim()){fragment.append(document.createTextNode(token));return}const span=document.createElement('span');span.className='word';span.textContent=token;fragment.append(span)});node.replaceWith(fragment)});
  const words=[...headline.querySelectorAll('.word')];
  dishContainer.innerHTML=dishes.map((dish,i)=>`<div class="dish-layer" data-layer="${i}" aria-hidden="${i!==0}">${dishArt(dish)}</div>`).join('');
  const layers=[...dishContainer.children];
  const revealTargets=document.querySelectorAll('.offer .section-heading,.favourites>.section-heading,.story-panel>.eyebrow,.story-panel>h2,.photo-story-title,.party-intro>h2');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.12});
  revealTargets.forEach(el=>{el.setAttribute('data-reveal','');observer.observe(el)});
  root.classList.add('motion-ready');
  let pending=false;
  const sectionProgress=(el,start=1,end=0)=>{const rect=el.getBoundingClientRect();return range(innerHeight*start-rect.top,0,rect.height+innerHeight*(start-end))};
  function draw(){
    pending=false;
    if(motion.matches){words.forEach(w=>w.style.setProperty('--word-fill',1));heroCopy.style.opacity='1';heroCopy.style.transform='none';waves.style.transform='none';return}
    const vh=innerHeight;
    const cover=clamp((vh-offer.getBoundingClientRect().top)/vh);
    heroCopy.style.transform=`translate3d(0,${-cover*(mobile.matches?32:110)}px,0)`;
    heroCopy.style.opacity=1-range(cover,.4,.95)*.8;
    waves.style.transform=`translate3d(0,${cover*-65}px,0) scale(${1+cover*.08})`;
    hero.style.setProperty('--hero-scale',1+cover*.04);
    const mr=manifesto.getBoundingClientRect();
    const readProgress=mobile.matches?range(vh*.85-mr.top,0,vh*.75):range(vh*.45-mr.top,0,manifesto.offsetHeight-vh*.75);
    words.forEach((w,i)=>w.style.setProperty('--word-fill',ease(range(readProgress*1.2,i/words.length,(i+3)/words.length))));
    if(!mobile.matches){
      const p=clamp((68-track.getBoundingClientRect().top)/(track.offsetHeight-frame.offsetHeight));
      const units=p*5;
      layers.forEach((layer,i)=>{const entering=i===0?1:ease(range(units,i-.8,i-.2));layer.style.clipPath=`inset(${(1-entering)*100}% 0 0)`;const image=layer.querySelector('img');if(image)image.style.transform=`scale(${1.035-clamp(units-i+1)*.035})`;layer.setAttribute('aria-hidden',String(i!==Math.round(units)))});
      setDish(Math.round(units));
      frame.style.setProperty('--dish-progress',p);
      const sp=sectionProgress(story,1,.3);
      story.style.setProperty('--story-mask',`${(1-ease(range(sp,0,.35)))*24}%`);
      story.style.setProperty('--story-offset',`${(1-ease(range(sp,0,.55)))*70}px`);
      const pp=sectionProgress(photos,1,0);
      photos.style.setProperty('--photo-lift',`${(1-pp)*65}px`);
      photos.style.setProperty('--photo-counter',`${(pp-.5)*-55}px`);
    }
    const reviewProgress=range(vh*.82-reviewsSection.getBoundingClientRect().top,0,vh*.45);
    reviewsSection.style.setProperty('--review-fill',`${ease(reviewProgress)*100}%`);
    const fp=range(vh-footer.getBoundingClientRect().top,0,vh*.7);
    footer.style.setProperty('--footer-offset',`${(1-ease(fp))*(mobile.matches?35:100)}px`);
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(draw)}}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
  motion.addEventListener('change',schedule);mobile.addEventListener('change',schedule);
  document.fonts.ready.then(schedule);addEventListener('load',schedule);draw();
})();
