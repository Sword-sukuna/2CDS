// MENU MOBILE
const btnMenu = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// QUIZ
const perguntas = [
  { pergunta: "O que significa JS?", respostas: ["JavaSystem", "JavaScript", "JustScript"], correta: 1 },
  { pergunta: "Quem criou o JavaScript?", respostas: ["Elon Musk", "Brendan Eich", "Bill Gates"], correta: 1 },
];

let indice = 0;
const perguntaElem = document.getElementById("pergunta");
const respostasElem = document.getElementById("respostas");
const resultadoElem = document.getElementById("resultado");

if (perguntaElem) carregarPergunta();

function carregarPergunta() {
  const atual = perguntas[indice];
  perguntaElem.textContent = atual.pergunta;
  respostasElem.innerHTML = "";
  atual.respostas.forEach((resp, i) => {
    const botao = document.createElement("button");
    botao.textContent = resp;
    botao.onclick = () => verificarResposta(i);
    respostasElem.appendChild(botao);
  });
}

function verificarResposta(i) {
  const atual = perguntas[indice];
  resultadoElem.textContent = (i === atual.correta) ? "✅ Correto!" : "❌ Errado!";
  indice++;
  if (indice < perguntas.length) setTimeout(carregarPergunta, 1000);
  else setTimeout(() => resultadoElem.textContent = "Fim do Quiz!", 1000);
}
