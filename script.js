// MENU RESPONSIVO
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });
}

// ANIMAÇÕES DE ENTRADA
window.addEventListener("scroll", () => {
  const elementos = document.querySelectorAll(".fade-in");
  elementos.forEach((el) => {
    const posicao = el.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;
    if (posicao < alturaTela - 100) el.classList.add("visivel");
  });
});

// QUIZ
const perguntas = document.querySelectorAll(".pergunta");
const btnResultado = document.getElementById("ver-resultado");

if (btnResultado) {
  btnResultado.addEventListener("click", () => {
    let acertos = 0;
    perguntas.forEach((p) => {
      const correta = p.dataset.correta;
      const selecionada = p.querySelector("input:checked");
      if (selecionada && selecionada.value === correta) acertos++;
    });
    alert(`Você acertou ${acertos} de ${perguntas.length} perguntas!`);
  });
}

// EFEITO SUAVE AO CARREGAR
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
