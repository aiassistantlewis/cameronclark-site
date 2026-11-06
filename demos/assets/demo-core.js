/* Shared behavior for Cameron Clark demo sites */
(function(){
  var d=document;
  // every page opens at the top (unless the link points at a section on the page)
  try{if('scrollRestoration' in history)history.scrollRestoration='manual';}catch(e){}
  function toTop(){var h=(location.hash||'').slice(1);if(h){try{if(d.getElementById(decodeURIComponent(h)))return;}catch(e){}}
    try{window.scrollTo({top:0,left:0,behavior:'instant'});}catch(e){window.scrollTo(0,0);}
    try{if(window.top!==window.self&&d.body)d.body.scrollIntoView({block:'start',inline:'nearest',behavior:'instant'});}catch(e){}}
  toTop();window.addEventListener('pageshow',function(e){if(e.persisted)toTop();});
  // mobile nav
  var t=d.querySelector('.nav-toggle');
  if(t){t.addEventListener('click',function(){var o=d.body.classList.toggle('nav-open');t.setAttribute('aria-expanded',o?'true':'false');});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&d.body.classList.contains('nav-open')){d.body.classList.remove('nav-open');t.setAttribute('aria-expanded','false');t.focus();}});}
  // photos that could not load: hide them so the stand-in art shows
  Array.prototype.forEach.call(d.querySelectorAll('.ph img'),function(i){if(i.complete&&i.naturalWidth===0){i.classList.add('img-failed');}});
  // demo forms: never submit anywhere
  Array.prototype.forEach.call(d.querySelectorAll('form[data-demo-form]'),function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var ok=f.querySelector('.demo-ok');if(ok){ok.classList.add('show');ok.setAttribute('tabindex','-1');ok.focus();}f.reset&&f.reset();});
  });
  // tabs: <div data-tabs> buttons[data-tab=x] panels[data-tab-panel=x]
  Array.prototype.forEach.call(d.querySelectorAll('[data-tabs]'),function(w){
    var bs=w.querySelectorAll('[data-tab]'),ps=w.querySelectorAll('[data-tab-panel]');
    function show(k){Array.prototype.forEach.call(bs,function(b){var on=b.getAttribute('data-tab')===k;b.setAttribute('aria-selected',on?'true':'false');b.classList.toggle('is-on',on);});
      Array.prototype.forEach.call(ps,function(p){p.hidden=p.getAttribute('data-tab-panel')!==k;});}
    Array.prototype.forEach.call(bs,function(b){b.addEventListener('click',function(){show(b.getAttribute('data-tab'));var r=b.getBoundingClientRect();if(r.top<0){try{b.scrollIntoView({block:'start',behavior:'instant'});window.scrollBy(0,-90);}catch(e){}}});});
    if(bs[0])show(bs[0].getAttribute('data-tab'));
  });
  // filters: <div data-filters> buttons[data-filter=x|all] items[data-filter-item="a b"]
  Array.prototype.forEach.call(d.querySelectorAll('[data-filters]'),function(w){
    var bs=w.querySelectorAll('[data-filter]'),scope=d.querySelector(w.getAttribute('data-filters'))||d;
    var items=scope.querySelectorAll('[data-filter-item]');
    Array.prototype.forEach.call(bs,function(b){b.addEventListener('click',function(){var k=b.getAttribute('data-filter');
      Array.prototype.forEach.call(bs,function(x){x.classList.toggle('is-on',x===b);x.setAttribute('aria-pressed',x===b?'true':'false');});
      Array.prototype.forEach.call(items,function(it){it.hidden=!(k==='all'||(' '+it.getAttribute('data-filter-item')+' ').indexOf(' '+k+' ')>-1);});
    });});
  });
  // current year
  Array.prototype.forEach.call(d.querySelectorAll('[data-year]'),function(y){y.textContent=new Date().getFullYear();});
})();
