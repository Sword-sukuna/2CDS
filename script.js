// Função para alternar o tema da página
function alternarTema() {
  const body = document.body;
  body.classList.toggle("modo-escuro");
}

// Captura o botão e adiciona o evento de clique
const botaoTema = document.getElementById("botao-tema");
if (botaoTema) {
  botaoTema.addEventListener("click", alternarTema);
}

// Simulador de visitantes online
function atualizarVisitantes() {
  // Variável com número aleatório de visitantes
  let visitantes = Math.floor(Math.random() * 20) + 1;
  document.getElementById("contador-visitantes").textContent =
    "Visitantes Online: " + visitantes;
}
setInterval(atualizarVisitantes, 3000);

// Função para ir para a página de alunos
function irParaAlunos() {
  window.location.href = "alunos.html";
}

// Função para voltar para a página inicial
function voltarHome() {
  window.location.href = "index.html";
}
// Exemplo de variável e função comentada
// var aluno = "Raul"; // variável do tipo string
// console.log("Aluno em destaque: " + aluno);

// Explicação (para apresentar):
// - Variáveis armazenam dados temporários, como nomes, números, etc.
// - Funções agrupam ações que o JavaScript executa quando chamadas.
