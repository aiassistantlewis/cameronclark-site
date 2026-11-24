(function(){
var nav=document.getElementById('mainNav'),b=document.getElementById('menuBtn');
if(b&&nav)b.addEventListener('click',function(){var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false')});
var f=document.getElementById('auditForm');
if(f)f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('formDone').hidden=false});
})();
