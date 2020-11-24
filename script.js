'use strict';
let scores, currentScore, activePlayer, playing;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// . use for selecting class, # use for selecting the ID
const score0El = document.querySelector('#score--0');
// this is another way to select, getElementById is faster and use for big data
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//dice element
const diceEl = document.querySelector('.dice');

//Select bottons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Create function to switch player to avoid repeating code
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to next player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle is will add element if it does not included, will remove if it included.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//New Game Button
btnNew.addEventListener('click', function () {
  init();
});

const init = function () {
  //add class to hide the picture by class
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();
//Create dice roll logic
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `pictures/dice-${dice}.png`;
    //3.Check for rolled, if it true, swich to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //current0El.textContent = currentScore; // will change latter
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch next player
      switchPlayer();
    }
  }
});
