/* script.js — versão robusta e segura */

/* evitar que um erro pare todo o script: encapsula tudo */
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    try {
      // Menu responsivo (trata múltiplos headers se existirem)
      document.querySelectorAll('.cabecalho').forEach(header => {
        const btn = header.querySelector('.menu-btn');
        const menu = header.querySelector('.menu');
        if (btn && menu) {
          btn.addEventListener('click', () => {
            menu.classList.toggle('ativo');
            // animação visual curta
            menu.classList.add('menu-open-glow');
            setTimeout(()=> menu.classList.remove('menu-open-glow'), 380);
          });
        }
      });

      // Reveal on scroll (fade-in)
      const revealOnScroll = () => {
        document.querySelectorAll('.fade-in').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) el.classList.add('visivel');
        });
      };
      // rodar imediatamente e no scroll
      revealOnScroll();
      window.addEventListener('scroll', revealOnScroll);

      // Quiz: resultado e reiniciar, com checagens
      const btnResultado = document.getElementById('ver-resultado');
      const btnReiniciar = document.getElementById('reiniciar-quiz');

      if (btnResultado) {
        btnResultado.addEventListener('click', () => {
          const perguntas = document.querySelectorAll('.pergunta');
          let acertos = 0;
          perguntas.forEach(p => {
            const correta = p.dataset.correta;
            const selecionada = p.querySelector('input:checked');
            if (selecionada && selecionada.value === correta) acertos++;
          });
          alert(`Você acertou ${acertos} de ${perguntas.length} perguntas.`);
        });
      }

      if (btnReiniciar) {
        btnReiniciar.addEventListener('click', () => {
          document.querySelectorAll('.pergunta input[type="radio"]').forEach(i => i.checked = false);
          const quiz = document.querySelector('.quiz');
          if (quiz) quiz.scrollIntoView({behavior:'smooth', block:'start'});
        });
      }

      // garante que a página não fique "invisível"
      document.body.classList.add('loaded');

    } catch (err) {
      // Se falhar, mostra o erro no console e garante que a página fique visível
      console.error('Erro no script.js:', err);
      try { document.body.classList.add('loaded'); } catch(e) {}
    }
  });
})();
