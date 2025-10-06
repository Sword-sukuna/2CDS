// Função para alternar o tema
function alternarTema() {
  const body = document.body;
  body.classList.toggle("modo-escuro");
}

// Adiciona um ouvinte de evento ao botão de alternar
const botaoTema = document.getElementById("botao-tema");
botaoTema.addEventListener("click", alternarTema);
