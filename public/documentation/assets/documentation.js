(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('barcoder-doc-theme');
  const initial=saved||((window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');
  root.dataset.theme=initial;

  const themeBtn=document.getElementById('theme-toggle');
  if(themeBtn){
    themeBtn.addEventListener('click',()=>{
      const next=root.dataset.theme==='dark'?'light':'dark';
      root.dataset.theme=next;
      localStorage.setItem('barcoder-doc-theme',next);
    });
  }

  const back=document.getElementById('back-to-app');
  const embedded=window.self!==window.top;
  if(embedded){
    root.classList.add('embedded-documentation');
    if(back)back.remove();
  }else if(back){
    back.addEventListener('click',()=>{
      window.close();
      setTimeout(()=>history.back(),80);
    });
  }

  const lang=document.body.dataset.lang||'fr';
  const moduleName=document.body.dataset.module||'openmetabar';
  localStorage.setItem('barcoder-doc-lang',lang);
  const select=document.getElementById('language-select');
  if(select){
    select.addEventListener('change',()=>{
      const page=document.body.dataset.kind==='reference'?'references-techniques.html':'guides-methodologiques.html';
      const anchor=location.hash;
      localStorage.setItem('barcoder-doc-lang',select.value);
      location.href='../../'+select.value+'/'+moduleName+'/'+page+anchor;
    });
  }

  const input=document.getElementById('doc-search');
  const article=document.querySelector('.doc-article');
  const empty=document.getElementById('search-empty');
  if(input&&article){
    const blocks=[...article.querySelectorAll('h2')].map(h=>{
      const nodes=[h];
      let n=h.nextElementSibling;
      while(n&&n.tagName!=='H2'){
        nodes.push(n);
        n=n.nextElementSibling;
      }
      return {h,nodes,text:nodes.map(x=>x.innerText||'').join(' ').toLowerCase()};
    });
    const apply=()=>{
      const q=input.value.trim().toLowerCase();
      let visible=0;
      blocks.forEach(block=>{
        const show=!q||block.text.includes(q);
        block.nodes.forEach(node=>node.classList.toggle('search-hidden',!show));
        block.h.classList.toggle('search-match',show&&!!q);
        if(show) visible++;
      });
      if(empty) empty.hidden=visible>0;
    };
    input.addEventListener('input',apply);
    document.addEventListener('keydown',event=>{
      if(event.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){
        event.preventDefault();
        input.focus();
      }
    });
  }

  const tocLinks=[...document.querySelectorAll('.toc a')];
  const heads=tocLinks.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
  if('IntersectionObserver' in window&&heads.length){
    const observer=new IntersectionObserver(entries=>{
      entries.filter(entry=>entry.isIntersecting).forEach(entry=>{
        tocLinks.forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id));
      });
    },{rootMargin:'-80px 0px -70% 0px'});
    heads.forEach(h=>observer.observe(h));
  }
})();
