const menuBtn = document.getElementById("menu-btn");
const menuLateral = document.getElementById("menu-lateral");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  const ativo = menuLateral.style.right === "0px";
  menuLateral.style.right = ativo ? "-250px" : "0";
  overlay.style.display = ativo ? "none" : "block";
});

overlay.addEventListener("click", () => {
  menuLateral.style.right = "-250px";
  overlay.style.display = "none";
});

function iniciarQuiz() {
  const perguntas = [
    { pergunta: "Qual palavra-chave cria uma variável?", resposta: "let" },
    { pergunta: "Qual símbolo é usado para comentários de linha única?", resposta: "//" },
    { pergunta: "Como se escreve um alerta em JavaScript?", resposta: "alert()" }
  ];
  let html = "";
  perguntas.forEach((p, i) => {
    html += `<div><p>${i + 1}. ${p.pergunta}</p>
    <input type="text" id="resp${i}"></div>`;
  });
  html += `<button onclick="verificarQuiz()">Verificar</button>`;
  document.getElementById("perguntas").innerHTML = html;
}

function verificarQuiz() {
  const respostas = ["let", "//", "alert()"];
  let acertos = 0;
  respostas.forEach((r, i) => {
    if (document.getElementById(`resp${i}`).value.trim() === r) acertos++;
  });
  alert(`Você acertou ${acertos} de ${respostas.length} perguntas!`);
}
