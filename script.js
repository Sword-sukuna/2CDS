/* ---------- Arquivo único de comportamento (index, alunos, quiz) ---------- */

/*
  Comentários para apresentação:
  - Variáveis: usadas para armazenar dados temporários (por exemplo 'visitantes', 'currentQuestion').
  - Funções: agrupam operações que repetimos (por exemplo 'alternarTema', 'goToPage').
  - Eventos: conectam elementos HTML a funções (ex: click -> alternarTema).
*/

/* ---------------- util: som de clique leve (WebAudio) ---------------- */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClickTone() {
  // criação de um som curto (seno) para clique "clean"
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.14);
}

/* ---------------- tema escuro / claro ---------------- */
function alternarTema() {
  document.body.classList.toggle('modo-escuro');
  playClickTone();
}

/* adiciona listeners ao carregar */
document.addEventListener('DOMContentLoaded', () => {
  // botões possíveis nas 3 páginas
  const botaoTema = document.getElementById('botao-tema') || document.getElementById('botao-tema-2') || document.getElementById('botao-tema-3');
  if (botaoTema) botaoTema.addEventListener('click', alternarTema);

  // navegação com transição
  const btnAlunos = document.getElementById('btn-alunos');
  const btnQuiz = document.getElementById('btn-quiz');
  const btnHome = document.getElementById('btn-home');
  const btnHomeQuiz = document.getElementById('btn-home-quiz');

  if (btnAlunos) btnAlunos.addEventListener('click', () => goToPage('alunos.html'));
  if (btnQuiz) btnQuiz.addEventListener('click', () => goToPage('quiz.html'));
  if (btnHome) btnHome.addEventListener('click', () => goToPage('index.html'));
  if (btnHomeQuiz) btnHomeQuiz.addEventListener('click', () => goToPage('index.html'));

  // linkes na homepage (preview de alunos)
  document.querySelectorAll('.preview .estudante-div').forEach(el => {
    el.addEventListener('click', () => goToPage('alunos.html'));
  });

  // contador de visitantes
  startVisitorsSimulator();

  // inicializa quiz se estivermos na página de quiz
  if (document.body.dataset.page === 'quiz') {
    initQuiz();
  }

  // clique sonoro em todos os botões .btn
  document.querySelectorAll('.btn').forEach(b => {
    b.addEventListener('click', () => {
      // garantir que o áudio só toque após interação do usuário (resume se necessário)
      if (audioCtx.state === 'suspended') audioCtx.resume();
      playClickTone();
    });
  });
});

/* ---------------- visitantes simulados (variável + função) ---------------- */
let visitantesIntervalId = null;
function startVisitorsSimulator() {
  // variável 'visitantes' será atualizada periodicamente
  function atualizarVisitantes() {
    const visitantes = Math.floor(Math.random() * 20) + 1; // número aleatório (1..20)
    const el = document.getElementById('contador-visitantes');
    if (el) el.textContent = 'Visitantes Online: ' + visitantes;
  }
  atualizarVisitantes();
  visitantesIntervalId = setInterval(atualizarVisitantes, 3000);
}

/* ---------------- transição de página suave ---------------- */
function goToPage(url) {
  const overlay = document.getElementById('transition-overlay');
  if (!overlay) {
    // fallback rápido
    window.location.href = url;
    return;
  }
  overlay.classList.remove('hidden');
  overlay.classList.add('show');
  // aguarda a animação e depois navega
  setTimeout(() => { window.location.href = url; }, 450);
}

/* ---------------- Quiz: simples, em memória (comentado para apresentação) ---------------- */
function initQuiz() {
  // variáveis que guardam estado do quiz
  let currentQuestion = 0;
  let score = 0;

  // perguntas (array de objetos)
  const questions = [
    {
      q: "Qual palavra-chave usamos para declarar uma variável mutável em JavaScript?",
      answers: ["const", "var", "immutable"],
      correct: 1 // índice
    },
    {
      q: "Qual método adiciona um item ao final de um array?",
      answers: ["push()", "pop()", "shift()"],
      correct: 0
    },
    {
      q: "Qual comando exibe texto no console do navegador?",
      answers: ["console.log()", "print()", "echo()"],
      correct: 0
    }
  ];

  // elementos do DOM
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const resultEl = document.getElementById('quiz-result');

  // exibe uma pergunta
  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = `Pergunta ${currentQuestion+1}: ${q.q}`;
    // limpa respostas
    answersEl.innerHTML = '';
    q.answers.forEach((text, idx) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = text;
      btn.onclick = () => selectAnswer(idx);
      answersEl.appendChild(btn);
    });
    // atualiza botões
    nextBtn.disabled = true;
    restartBtn.classList.add('hidden');
    resultEl.classList.add('hidden');
  }

  // Ao selecionar uma resposta
  function selectAnswer(selectedIdx) {
    const btns = answersEl.querySelectorAll('.answer-btn');
    // marca visualmente as respostas
    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === questions[currentQuestion].correct) b.style.borderColor = 'green';
      if (i === selectedIdx && i !== questions[currentQuestion].correct) b.style.borderColor = 'red';
    });
    // atualiza pontuação
    if (selectedIdx === questions[currentQuestion].correct) score++;
    nextBtn.disabled = false;
  }

  // próxima pergunta / fim
  nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      // fim do quiz
      questionEl.textContent = 'Quiz finalizado!';
      answersEl.innerHTML = '';
      resultEl.classList.remove('hidden');
      resultEl.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
      nextBtn.disabled = true;
      restartBtn.classList.remove('hidden');
    }
  };

  restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  };

  // inicia
  showQuestion();
}

/* ---------------- fim do script ---------------- */
