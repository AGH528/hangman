/*-------------------------------- Constants --------------------------------*/
const words = [
    { word: 'Maryland', hint: 'It is known for crab cakes.' },
    { word: 'Florida', hint: 'It is home to the Everglades.' },
    { word: 'District of Columbia', hint: 'The capital of the United States of America.' },
    { word: 'Colorado', hint: 'What is the centennial state?' },
    { word: 'Nebraska', hint: 'Football team is the Cornhuskers.' }
  ];
  const maxTries = 6;
  
  /*---------------------------- Variables (state) ----------------------------*/
  let selectedWord = '';
  let hint = '';
  let guessedLetters = [];
  let triesLeft = maxTries;
  let displayWord = [];
  let gameOver = false;
  
  /*------------------------ Cached Element References ------------------------*/
  const wordDisplayEl = document.querySelector('#word-display');
  const messageEl = document.querySelector('#message');
  const hintBtnEl = document.querySelector('#hint-btn');
  const hintTextEl = document.querySelector('#hint-text');
  const letterBtns = document.querySelectorAll('.letter-btn');
  const hangmanGraphicEl = document.querySelector('#hangman-graphic');
  const resetBtnEl = document.querySelector('#reset-btn');
  
  /*----------------------------- Event Listeners -----------------------------*/
  letterBtns.forEach(btn => btn.addEventListener('click', handleGuess));
  hintBtnEl.addEventListener('click', showHint);
  resetBtnEl.addEventListener('click', init);
  
  /*-------------------------------- Functions --------------------------------*/
  function init() {
    const random = words[Math.floor(Math.random() * words.length)];
    selectedWord = random.word.toUpperCase();
    hint = random.hint;
    guessedLetters = [];
    triesLeft = maxTries;
    displayWord = selectedWord.split('').map(char => (char === ' ' ? ' ' : '_'));
    gameOver = false;
    hintTextEl.textContent = '';
    messageEl.textContent = '';
    updateDisplay();
    updateHangman();
    letterBtns.forEach(btn => {
      btn.disabled = false;
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
  