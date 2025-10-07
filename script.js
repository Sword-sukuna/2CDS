// Alterna o tema escuro/claro
function alternarTema() {
  document.body.classList.toggle("modo-escuro");
}

// Botão de tema
const botaoTema = document.getElementById("botao-tema");
if (botaoTema) {
  botaoTema.addEventListener("click", alternarTema);
}

// Contador de visitantes (simulado)
function atualizarVisitantes() {
  let visitantes = Math.floor(Math.random() * 20) + 1; // variável numérica
  let contador = document.getElementById("contador-visitantes");
  if (contador) {
    contador.textContent = "Visitantes Online: " + visitantes;
  }
}
setInterval(atualizarVisitantes, 3000);

// Navegação
function abrirAlunos() {
  window.location.href = "alunos.html";
}

function voltarHome() {
  window.location.href = "index.html";
}
