/*-------------------------------- Constants --------------------------------*/
const words = [
    { word: 'Maryland', hint: 'It is known for crab cakes.', category: 'States' },
    { word: 'Florida', hint: 'It is home to the Everglades.', category: 'States' },
    { word: 'District of Columbia', hint: 'The capital of the United States of America.', category: 'Capitals' },
    { word: 'Colorado', hint: 'What is the centennial state?', category: 'States' },
    { word: 'Nebraska', hint: 'Football team is the Cornhuskers.', category: 'States' }
  ];
  const maxTries = 6;
  
  /*---------------------------- Variables (state) ----------------------------*/
  let selectedWord = '';
  let hint = '';
  let category = '';
  let guessedLetters = [];
  let triesLeft = maxTries;
  let displayWord = [];
  let gameOver = false;
  
  /*------------------------ Cached Element References ------------------------*/
  const wordDisplayEl = document.querySelector('#word-display');
  const messageEl = document.querySelector('#message');
  const hintBtnEl = document.querySelector('#hint-btn');
  const hintTextEl = document.querySelector('#hint-text');
  const letterBtnsContainer = document.querySelector('#letter-buttons');
  const hangmanGraphicEl = document.querySelector('#hangman-graphic');
  const resetBtnEl = document.querySelector('#reset-btn');
  const categoryEl = document.querySelector('#category');
  
  /*----------------------------- Event Listeners -----------------------------*/
  hintBtnEl.addEventListener('click', showHint);
  resetBtnEl.addEventListener('click', init);
  
  /*-------------------------------- Functions --------------------------------*/
  function init() {
    const random = words[Math.floor(Math.random() * words.length)];
    selectedWord = random.word.toUpperCase();
    hint = random.hint;
    category = random.category;
    guessedLetters = [];
    triesLeft = maxTries;
    displayWord = selectedWord.split('').map(char => (char === ' ' ? ' ' : '_'));
    gameOver = false;
    hintTextEl.textContent = '';
    messageEl.textContent = '';
    categoryEl.textContent = `Category: ${category}`;
    renderKeyboard();
    updateDisplay();
    updateHangman();
  }
  
  function renderKeyboard() {
    const layout = [
      'QWERTYUIOP',
      'ASDFGHJKL',
      'ZXCVBNM'
    ];
    letterBtnsContainer.innerHTML = '';
    layout.forEach(row => {
      const rowDiv = document.createElement('div');
      row.split('').forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.classList.add('letter-btn');
        btn.addEventListener('click', handleGuess);
        rowDiv.appendChild(btn);
      });
      letterBtnsContainer.appendChild(rowDiv);
    });
  }
  
  function updateDisplay() {
    wordDisplayEl.textContent = displayWord.join(' ');
  }
  
  function handleGuess(evt) {
    if (gameOver) return;
    const letter = evt.target.textContent;
    if (!/^[A-Z]$/.test(letter)) return;
    evt.target.disabled = true;
  
    if (selectedWord.includes(letter)) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
          displayWord[i] = letter;
        }
      }
    } else {
      triesLeft--;
    }
  
    updateDisplay();
    updateHangman();
    checkGameStatus();
  }
  
  function checkGameStatus() {
    if (!displayWord.includes('_')) {
      messageEl.textContent = '🎉 You win!';
      gameOver = true;
    } else if (triesLeft <= 0) {
      messageEl.textContent = `💀 Game Over! The word was: ${selectedWord}`;
      gameOver = true;
    }
  }
  
  function showHint() {
    hintTextEl.textContent = hint;
  }
  
  function updateHangman() {
    hangmanGraphicEl.textContent = `Tries left: ${triesLeft}`;
  }
  
  // Initialize game on load
  init();
  