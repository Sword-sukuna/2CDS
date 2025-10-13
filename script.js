(function(){
  document.addEventListener('DOMContentLoaded', function(){
    try {
      var openBtns = document.querySelectorAll('.menu-toggle');
      var side = document.getElementById('side-menu');
      var overlay = document.getElementById('overlay');
      var closeBtn = document.getElementById('close-menu');

      function openMenu(){
        if(side){ side.setAttribute('aria-hidden','false'); side.style.left = '0'; }
        if(overlay){ overlay.classList.remove('hidden'); overlay.setAttribute('aria-hidden','false'); }
        document.documentElement.style.overflow = 'hidden';
      }
      function closeMenu(){
        if(side){ side.setAttribute('aria-hidden','true'); side.style.left = ''; }
        if(overlay){ overlay.classList.add('hidden'); overlay.setAttribute('aria-hidden','true'); }
        document.documentElement.style.overflow = '';
      }

      openBtns.forEach(function(b){
        b.addEventListener('click', openMenu);
      });
      if(closeBtn) closeBtn.addEventListener('click', closeMenu);
      if(overlay) overlay.addEventListener('click', closeMenu);

      function revealOnScroll(){
        document.querySelectorAll('.fade-in').forEach(function(el){
          var rect = el.getBoundingClientRect();
          if(rect.top < window.innerHeight - 80) el.classList.add('visivel');
        });
      }
      revealOnScroll();
      window.addEventListener('scroll', revealOnScroll, {passive:true});

      var quizButtons = document.querySelectorAll('.quiz-btn');
      quizButtons.forEach(function(btn){
  btn.addEventListener('click', function(){
    var group = btn.closest('.pergunta');
    if(!group) return;
    var buttons = group.querySelectorAll('.quiz-btn');
    buttons.forEach(function(b){ b.disabled = true; });
    var selected = btn.getAttribute('data-value');
    var correct = group.getAttribute('data-correta');
    if(selected === correct){
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      buttons.forEach(function(b){
        if(b.getAttribute('data-value') === correct) b.classList.add('correct');
      });
    }
  });
});


      var verBtn = document.getElementById('ver-resultado');
      var reiniciar = document.getElementById('reiniciar-quiz');
      var resultadoBox = document.getElementById('resultado-box');

      if(verBtn){
        verBtn.addEventListener('click', function(){
          var perguntas = document.querySelectorAll('.pergunta');
          var acertos = 0;
          perguntas.forEach(function(p){
            var correta = p.getAttribute('data-correta');
            var chosen = Array.prototype.slice.call(p.querySelectorAll('.quiz-btn')).find(function(b){ return b.classList.contains('correct'); });
            if(chosen && chosen.getAttribute('data-value') === correta) acertos++;
          });
          resultadoBox.textContent = 'Você acertou ' + acertos + ' de ' + perguntas.length + ' perguntas.';
        });
      }

      if(reiniciar){
        reiniciar.addEventListener('click', function(){
          document.querySelectorAll('.pergunta .quiz-btn').forEach(function(b){
            b.classList.remove('correct','wrong');
            b.disabled = false;
          });
          if(resultadoBox) resultadoBox.textContent = '';
          var first = document.querySelector('.quiz');
          if(first) first.scrollIntoView({behavior:'smooth', block:'start'});
        });
      }

      document.body.style.opacity = '1';
    } catch (e) {
      console.error(e);
      document.body.style.opacity = '1';
    }
  });
})();
