/* Menu responsivo: suporta múltiplas páginas/headers */
document.querySelectorAll('.menu-btn').forEach(btn => {
  // local menu correspondente: nextElementSibling could vary, so find nearest .menu in header
  const header = btn.closest('.cabecalho');
  const menu = header ? header.querySelector('.menu') : null;
  if (!menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    // highlight animation: briefly add a class for effect
    menu.classList.add('menu-open-glow');
    setTimeout(()=> menu.classList.remove('menu-open-glow'), 380);
  });
});

/* animação fade-in on load + on scroll */
function revealOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add('visivel');
  });
}

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  revealOnScroll();
});
window.addEventListener('scroll', revealOnScroll);

/* QUIZ: resultado e reiniciar (se houver) */
(function initQuiz() {
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
      // scroll to top of quiz
      const quiz = document.querySelector('.quiz');
      if (quiz) quiz.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
})();
