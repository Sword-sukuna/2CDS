// contador de visitantes (simulado)
let visitantes = Math.floor(Math.random() * 50) + 1;
console.log("Visitantes online:", visitantes);

// --- Quiz simples ---
const perguntas = [
  { pergunta: "O que significa JS?", respostas: ["JavaSystem", "JavaScript", "JustScript"], correta: 1 },
  { pergunta: "Quem criou o JavaScript?", respostas: ["Elon Musk", "Brendan Eich", "Bill Gates"], correta: 1 },
];

let indice = 0;
const perguntaElem = document.getElementById("pergunta");
const respostasElem = document.getElementById("respostas");
const resultadoElem = document.getElementById("resultado");

if (perguntaElem) {
  carregarPergunta();
}

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

function verificarResposta(indiceResp) {
  const atual = perguntas[indice];
  if (indiceResp === atual.correta) {
    resultadoElem.textContent = "✅ Correto!";
  } else {
    resultadoElem.textContent = "❌ Errado!";
  }
  indice++;
  if (indice < perguntas.length) {
    setTimeout(carregarPergunta, 1000);
  } else {
    setTimeout(() => resultadoElem.textContent = "Fim do Quiz!", 1000);
  }
}
// contador de visitantes (simulado)
let visitantes = Math.floor(Math.random() * 50) + 1;
console.log("Visitantes online:", visitantes);

// --- Quiz simples ---
const perguntas = [
  { pergunta: "O que significa JS?", respostas: ["JavaSystem", "JavaScript", "JustScript"], correta: 1 },
  { pergunta: "Quem criou o JavaScript?", respostas: ["Elon Musk", "Brendan Eich", "Bill Gates"], correta: 1 },
];

let indice = 0;
const perguntaElem = document.getElementById("pergunta");
const respostasElem = document.getElementById("respostas");
const resultadoElem = document.getElementById("resultado");

if (perguntaElem) {
  carregarPergunta();
}

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

function verificarResposta(indiceResp) {
  const atual = perguntas[indice];
  if (indiceResp === atual.correta) {
    resultadoElem.textContent = "✅ Correto!";
  } else {
    resultadoElem.textContent = "❌ Errado!";
  }
  indice++;
  if (indice < perguntas.length) {
    setTimeout(carregarPergunta, 1000);
  } else {
    setTimeout(() => resultadoElem.textContent = "Fim do Quiz!", 1000);
  }
}
