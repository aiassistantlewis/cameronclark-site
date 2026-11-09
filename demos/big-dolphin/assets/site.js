(function(){
  var KEY='bd-hide-ph', root=document.documentElement;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function sget(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
  function sset(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}
  var btn=document.getElementById('ph-toggle');
  function apply(h){root.classList.toggle('hide-ph',h);if(btn)btn.textContent=h?'Show placeholders':'Hide highlights';}
  apply(btn ? get(KEY)==='1' : true);
  if(btn)btn.addEventListener('click',function(){var h=!root.classList.contains('hide-ph');apply(h);set(KEY,h?'1':'0');});

  var hdr=document.querySelector('.site-header'),mb=document.querySelector('.menu-btn');
  if(mb&&hdr)mb.addEventListener('click',function(){var o=hdr.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');});

  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var m=f.querySelector('.form-msg');
      if(m){m.classList.add('show');m.textContent='Thanks! This form is a preview and is not connected yet, so nothing was sent.';}
    });
  });

  var modal=document.getElementById('promo');
  if(modal){
    function close(){modal.hidden=true;sset('bd-promo','1');}
    modal.querySelectorAll('[data-close]').forEach(function(b){b.addEventListener('click',close)});
    modal.addEventListener('click',function(e){if(e.target===modal)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)close();});
    if(!sget('bd-promo'))setTimeout(function(){modal.hidden=false;},6000);
  }
})();
