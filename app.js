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
  
 