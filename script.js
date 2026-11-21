"use strict";

// =====================================================================
// SUAS PISTAS FICAM AQUI!
// Para editar as dicas, altere SOMENTE o texto entre as aspas de `pista`.
// Exemplo de formato: pista: "Escreva aqui a pista que você criou."
// Use até 15 palavras, sem citar a resposta ou escrever a sigla por extenso.
// Não altere resposta, linha, coluna ou direcao: definem os cruzamentos.
// As coordenadas começam em zero. H = horizontal; V = vertical.
// =====================================================================
const PALAVRAS = [
  { resposta: "CPU",              pista: "Executo as instruções dos programas e faço o processamento do computador.", linha: 3,  coluna: 13, direcao: "H" },
  { resposta: "ULA",              pista: "Dentro do processador, sou quem faz as contas e compara valores.", linha: 6,  coluna: 12, direcao: "V" },
  { resposta: "UC",               pista: "Dentro do processador, organizo os passos e digo quando cada tarefa deve acontecer.", linha: 6,  coluna: 14, direcao: "H" },
  { resposta: "REGISTRADORES",    pista: "Dentro do processador, guardamos valores imediatos: temos a maior velocidade e pouquíssimo espaço.", linha: 0,  coluna: 2,  direcao: "H" },
  { resposta: "RAM",              pista: "Guardo programas em uso: tenho mais velocidade e menos espaço que o armazenamento permanente.", linha: 0,  coluna: 8,  direcao: "V" },
  { resposta: "ROM",              pista: "Já venho com instruções de fábrica e normalmente não deixo você mudá-las.", linha: 0,  coluna: 12, direcao: "V" },
  { resposta: "EEPROM",           pista: "Não esqueço sem energia e deixo apagar e reescrever um byte de cada vez.", linha: 3,  coluna: 0,  direcao: "V" },
  { resposta: "FLASH",            pista: "Estou nos pendrives: não esqueço sem energia e apago informações em blocos.", linha: 2,  coluna: 3,  direcao: "V" },
  { resposta: "CACHE",            pista: "Guardo informações frequentes perto do processador: tenho mais velocidade e menos espaço que a principal.", linha: 12, coluna: 7,  direcao: "H" },
  { resposta: "MEMORIADEMASSA",   pista: "Tenho menos velocidade, mas muito espaço para guardar arquivos, mesmo depois de desligar.", linha: 10, coluna: 1,  direcao: "H" },
  { resposta: "DMA",              pista: "Levo dados entre dispositivos e memória sem fazer o processador cuidar de cada transferência.", linha: 10, coluna: 8,  direcao: "V" },
  { resposta: "ADDRESSBUS",       pista: "Sou o caminho que leva o endereço de onde buscar ou guardar algo.", linha: 4,  coluna: 3,  direcao: "H" },
  { resposta: "DATABUS",          pista: "Sou o caminho por onde passam as informações trocadas entre as peças do computador.", linha: 0,  coluna: 10, direcao: "V" },
  { resposta: "MICROCONTROLADOR", pista: "Reúno processamento, memória e conexões num só chip; apareço em brinquedos e eletrodomésticos.", linha: 8,  coluna: 0,  direcao: "H" },
  { resposta: "DUALCORE",         pista: "Tenho dois núcleos no mesmo processador para dividir o trabalho.", linha: 4,  coluna: 5,  direcao: "V" },
  { resposta: "QUADCORE",         pista: "Tenho quatro núcleos no mesmo processador para dividir o trabalho.", linha: 2,  coluna: 15, direcao: "V" },
];
// ==================== FIM DO CADASTRO DAS PISTAS =======================

const TOTAL_VIDAS = 5;
const LINHAS = 13;
const COLUNAS = 16;
const cells = new Map();
let activeWord = null;
let lives = TOTAL_VIDAS;
let finished = false;
let hasChecked = false;

const ui = {
  board: document.getElementById("crossword"),
  check: document.getElementById("check-button"),
  reset: document.getElementById("reset-button"),
  feedback: document.getElementById("feedback"),
  score: document.getElementById("score"),
  progress: document.getElementById("progress"),
  progressFill: document.getElementById("progress-fill"),
  lives: document.getElementById("lives"),
  lifeCount: document.getElementById("life-count"),
  scene: document.getElementById("execution-scene"),
  sceneStatus: document.getElementById("scene-status"),
  clueLabel: document.getElementById("active-clue-label"),
  clueText: document.getElementById("active-clue-text"),
  dialog: document.getElementById("help-dialog"),
};

const key = (row, col) => `${row},${col}`;
const directionLabel = (word) => word.direcao === "H" ? "Horizontal" : "Vertical";
const clueText = (word) => word.pista.trim() || "Pista ainda não cadastrada.";
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "");

function buildBoard() {
  const ordered = [...PALAVRAS].sort((a, b) => a.linha - b.linha || a.coluna - b.coluna);
  const starts = new Map();
  let number = 0;
  for (const word of ordered) {
    const start = key(word.linha, word.coluna);
    if (!starts.has(start)) starts.set(start, ++number);
    word.numero = starts.get(start);
    word.cells = [];
    [...word.resposta].forEach((letter, i) => {
      const row = word.linha + (word.direcao === "V" ? i : 0);
      const col = word.coluna + (word.direcao === "H" ? i : 0);
      const id = key(row, col);
      if (!cells.has(id)) cells.set(id, { row, col, letter, words: [] });
      const cell = cells.get(id);
      if (cell.letter !== letter) throw new Error(`Cruzamento incompatível em ${id}`);
      cell.words.push(word);
      word.cells.push(cell);
    });
  }

  const fragment = document.createDocumentFragment();
  for (let row = 0; row < LINHAS; row++) {
    for (let col = 0; col < COLUNAS; col++) {
      const wrapper = document.createElement("div");
      wrapper.className = "cell";
      const cell = cells.get(key(row, col));
      if (!cell) {
        wrapper.classList.add("empty");
        wrapper.setAttribute("aria-hidden", "true");
      } else {
        cell.wrapper = wrapper;
        const startNumber = starts.get(key(row, col));
        if (startNumber) {
          const label = document.createElement("span");
          label.className = "cell-number";
          label.textContent = startNumber;
          label.setAttribute("aria-hidden", "true");
          wrapper.append(label);
        }
        const input = document.createElement("input");
        input.type = "text";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.setAttribute("autocapitalize", "characters");
        input.setAttribute("aria-label", `Linha ${row + 1}, coluna ${col + 1}. ${cell.words.map(w => `${w.numero} ${directionLabel(w).toLowerCase()}`).join(" e ")}.`);
        input.dataset.row = row;
        input.dataset.col = col;
        cell.input = input;
        input.addEventListener("focus", () => {
          if (!activeWord || !cell.words.includes(activeWord)) selectWord(cell.words[0]);
          input.select();
        });
        input.addEventListener("pointerdown", () => {
          if (document.activeElement === input && cell.words.length > 1 && activeWord && cell.words.includes(activeWord)) {
            selectWord(cell.words.find(w => w !== activeWord));
          }
        });
        input.addEventListener("click", () => input.select());
        input.addEventListener("input", () => handleInput(cell));
        input.addEventListener("keydown", (event) => handleKey(event, cell));
        input.addEventListener("paste", (event) => {
          event.preventDefault();
          insertLetters(cell, normalize(event.clipboardData.getData("text")));
        });
        wrapper.append(input);
      }
      fragment.append(wrapper);
    }
  }
  ui.board.append(fragment);
  buildClues(ordered);
}

function buildClues(words) {
  for (const direction of ["H", "V"]) {
    const name = direction === "H" ? "horizontal" : "vertical";
    const list = document.getElementById(`${name}-clues`);
    const group = words.filter(w => w.direcao === direction);
    document.getElementById(`${name}-count`).textContent = `${String(group.length).padStart(2, "0")} PISTAS`;
    for (const word of group) {
      const item = document.createElement("li");
      item.value = word.numero;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "clue-button";
      button.dataset.number = word.numero;
      button.dataset.direction = word.direcao;
      const number = document.createElement("span");
      number.className = "clue-number";
      number.textContent = String(word.numero).padStart(2, "0");
      const copy = document.createElement("span");
      copy.className = "clue-copy";
      copy.textContent = clueText(word);
      const length = document.createElement("small");
      length.textContent = `${word.resposta.length} LETRAS`;
      copy.append(length);
      const status = document.createElement("span");
      status.className = "clue-status";
      status.textContent = "EM ABERTO";
      button.append(number, copy, status);
      button.addEventListener("click", () => {
        selectWord(word);
        const next = word.cells.find(c => !c.input.value) || word.cells[0];
        next.input.focus({ preventScroll: true });
        next.input.scrollIntoView({ block: "nearest", behavior: "auto" });
      });
      word.button = button;
      word.status = status;
      item.append(button);
      list.append(item);
    }
  }
}

function selectWord(word) {
  activeWord = word;
  for (const cell of cells.values()) cell.wrapper.classList.toggle("is-active", word.cells.includes(cell));
  for (const item of PALAVRAS) {
    item.button.classList.toggle("is-active", item === word);
    item.button.setAttribute("aria-pressed", String(item === word));
  }
  ui.clueLabel.textContent = `${String(word.numero).padStart(2, "0")} / ${directionLabel(word).toUpperCase()} / ${word.resposta.length} LETRAS`;
  ui.clueText.textContent = clueText(word);
}

function invalidateCell(cell) {
  cell.wrapper.classList.remove("is-correct", "is-incorrect");
  cell.input.removeAttribute("aria-invalid");
  for (const word of cell.words) {
    delete word.button.dataset.result;
    word.status.textContent = "EDITANDO";
  }
}

function handleInput(cell) {
  if (finished) return;
  insertLetters(cell, normalize(cell.input.value));
}

function insertLetters(cell, letters) {
  if (finished) return;
  if (!activeWord || !cell.words.includes(activeWord)) selectWord(cell.words[0]);
  const start = activeWord.cells.indexOf(cell);
  if (!letters) {
    cell.input.value = "";
    invalidateCell(cell);
  } else {
    const available = activeWord.cells.slice(start);
    const count = Math.min(letters.length, available.length);
    for (let i = 0; i < count; i++) {
      available[i].input.value = letters[i];
      invalidateCell(available[i]);
    }
    available[Math.min(count, available.length - 1)].input.focus({ preventScroll: true });
  }
  if (hasChecked) {
    updateScore();
    setFeedback("Respostas editadas. Confira novamente para validar as alterações.");
  }
  ui.sceneStatus.textContent = "DECODIFICAÇÃO EM ANDAMENTO";
}

function handleKey(event, cell) {
  if (finished) return;
  const moves = { ArrowLeft: [0, -1, "H"], ArrowRight: [0, 1, "H"], ArrowUp: [-1, 0, "V"], ArrowDown: [1, 0, "V"] };
  if (moves[event.key]) {
    event.preventDefault();
    const [dr, dc, direction] = moves[event.key];
    const next = cells.get(key(cell.row + dr, cell.col + dc));
    if (next) {
      const word = cell.words.find(w => w.direcao === direction && next.words.includes(w));
      if (word) selectWord(word);
      next.input.focus({ preventScroll: true });
    }
  } else if (event.key === "Backspace") {
    event.preventDefault();
    const position = activeWord.cells.indexOf(cell);
    const target = cell.input.value || position === 0 ? cell : activeWord.cells[position - 1];
    target.input.value = "";
    invalidateCell(target);
    target.input.focus({ preventScroll: true });
    if (hasChecked) { updateScore(); setFeedback("Respostas editadas. Confira novamente para validar as alterações."); }
  } else if (event.key === "Delete") {
    event.preventDefault();
    cell.input.value = "";
    invalidateCell(cell);
    if (hasChecked) { updateScore(); setFeedback("Respostas editadas. Confira novamente para validar as alterações."); }
  } else if (event.key === "Enter") {
    event.preventDefault();
    checkAnswers();
  } else if (event.key === " " && cell.words.length > 1) {
    event.preventDefault();
    selectWord(cell.words.find(w => w !== activeWord));
  }
}

function wordResult(word) {
  const wrong = word.cells.some(cell => cell.input.value && cell.input.value !== cell.letter);
  if (wrong) return "incorrect";
  return word.cells.every(cell => cell.input.value === cell.letter) ? "correct" : "incomplete";
}

function updateScore() {
  // Só conta palavras com todas as letras corretas E validadas na conferência.
  const count = PALAVRAS.filter(word => word.cells.every(cell => cell.input.value === cell.letter && cell.wrapper.classList.contains("is-correct"))).length;
  ui.score.innerHTML = `${count} <span>de ${PALAVRAS.length}</span>`;
  ui.progress.setAttribute("aria-valuenow", count);
  ui.progressFill.style.width = `${count / PALAVRAS.length * 100}%`;
  return count;
}

function setFeedback(message, type = "") {
  ui.feedback.textContent = message;
  ui.feedback.className = `feedback ${type}`.trim();
}

function checkAnswers() {
  if (finished) return;
  const written = [...cells.values()].filter(cell => cell.input.value);
  if (!written.length) {
    setFeedback("Nenhuma letra preenchida. Digite uma resposta antes de conferir.");
    return;
  }
  hasChecked = true;
  let errors = 0;
  for (const cell of cells.values()) {
    const filled = Boolean(cell.input.value);
    const wrong = filled && cell.input.value !== cell.letter;
    cell.wrapper.classList.toggle("is-correct", filled && !wrong);
    cell.wrapper.classList.toggle("is-incorrect", wrong);
    if (wrong) { errors++; cell.input.setAttribute("aria-invalid", "true"); }
    else cell.input.removeAttribute("aria-invalid");
  }
  for (const word of PALAVRAS) {
    const result = wordResult(word);
    word.button.dataset.result = result;
    word.status.textContent = { correct: "✓ CERTA", incorrect: "× ERRADA", incomplete: "INCOMPLETA" }[result];
  }
  const count = updateScore();
  if (count === PALAVRAS.length) {
    finishGame(true);
    return;
  }
  if (errors > 0) {
    lives--;
    updateLives();
    ui.sceneStatus.textContent = "FALHA DETECTADA. A CORDA APERTOU.";
    ui.scene.setAttribute("aria-label", `Forca com ${TOTAL_VIDAS - lives} de 5 partes desenhadas. ${lives} vidas restantes.`);
    ui.scene.closest(".survival-panel").classList.remove("taking-hit");
    void ui.scene.offsetWidth;
    ui.scene.closest(".survival-panel").classList.add("taking-hit");
    if (lives === 0) finishGame(false);
    else setFeedback(`${errors} ${errors === 1 ? "letra incorreta" : "letras incorretas"}. Você perdeu 1 vida. Corrija as casas vermelhas antes de conferir.`, "error");
  } else {
    setFeedback(`Tudo o que você escreveu está correto. ${count} de ${PALAVRAS.length} palavras completas. Nenhuma vida perdida.`, "success");
    ui.sceneStatus.textContent = "SEM FALHAS. CONTINUE DECIFRANDO.";
  }
}

function updateLives() {
  ui.lifeCount.textContent = `${lives} / ${TOTAL_VIDAS}`;
  ui.lives.setAttribute("aria-label", `${lives} de ${TOTAL_VIDAS} vidas restantes`);
  [...ui.lives.children].forEach((life, index) => life.classList.toggle("lost", index >= lives));
  document.querySelectorAll(".body-part").forEach(part => part.classList.toggle("drawn", Number(part.dataset.stage) <= TOTAL_VIDAS - lives));
}

function finishGame(won) {
  finished = true;
  document.body.classList.add(won ? "is-won" : "is-lost");
  ui.check.disabled = true;
  for (const cell of cells.values()) cell.input.disabled = true;
  for (const word of PALAVRAS) word.button.disabled = true;
  if (won) {
    setFeedback(`Sistema decifrado. Você escapou com ${lives} ${lives === 1 ? "vida" : "vidas"}! Todas as 16 palavras estão corretas.`, "success");
    ui.sceneStatus.textContent = "PROTOCOLO CONCLUÍDO. VOCÊ SOBREVIVEU.";
    ui.scene.setAttribute("aria-label", "Vitória! Você decifrou todas as palavras e sobreviveu.");
  } else {
    setFeedback("Fim de jogo. Suas cinco vidas acabaram. Reinicie para tentar escapar novamente.", "error");
    ui.sceneStatus.textContent = "SINAL PERDIDO. FIM DO ÚLTIMO CICLO.";
    ui.scene.setAttribute("aria-label", "Forca completa. O personagem morreu. Reinicie para jogar novamente.");
  }
  ui.reset.focus({ preventScroll: true });
}

function resetGame() {
  lives = TOTAL_VIDAS;
  finished = false;
  hasChecked = false;
  document.body.classList.remove("is-won", "is-lost");
  ui.scene.closest(".survival-panel").classList.remove("taking-hit");
  ui.check.disabled = false;
  for (const cell of cells.values()) {
    cell.input.value = "";
    cell.input.disabled = false;
    cell.input.removeAttribute("aria-invalid");
    cell.wrapper.classList.remove("is-correct", "is-incorrect");
  }
  for (const word of PALAVRAS) {
    word.button.disabled = false;
    delete word.button.dataset.result;
    word.status.textContent = "EM ABERTO";
  }
  updateLives();
  updateScore();
  ui.sceneStatus.textContent = "AGUARDANDO O PRIMEIRO MOVIMENTO";
  ui.scene.setAttribute("aria-label", "Forca vazia. Nenhuma vida perdida.");
  setFeedback("Nova chance. Tabuleiro limpo e cinco vidas recuperadas.");
  const first = [...PALAVRAS].sort((a, b) => a.numero - b.numero)[0];
  selectWord(first);
  first.cells[0].input.focus({ preventScroll: true });
}

function init() {
  buildBoard();
  for (let i = 0; i < TOTAL_VIDAS; i++) {
    const life = document.createElement("span");
    life.className = "life";
    life.setAttribute("aria-hidden", "true");
    life.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21 3.6 12.7C-1.8 7.3 5.6.4 10.6 5.2L12 6.6l1.4-1.4C18.4.4 25.8 7.3 20.4 12.7Z"/></svg>';
    ui.lives.append(life);
  }
  updateLives();
  ui.check.addEventListener("click", checkAnswers);
  ui.reset.addEventListener("click", resetGame);
  document.getElementById("help-button").addEventListener("click", () => ui.dialog.showModal());
  document.getElementById("close-help").addEventListener("click", () => ui.dialog.close());
  document.getElementById("start-button").addEventListener("click", () => ui.dialog.close());
  ui.dialog.addEventListener("click", event => {
    const bounds = ui.dialog.getBoundingClientRect();
    if (event.target === ui.dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) ui.dialog.close();
  });
}

init();
