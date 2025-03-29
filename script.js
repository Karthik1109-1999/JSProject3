"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// Select item by ID
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
// Select item by ID
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");

let playing,currentScore,activePlayer,scores;

const init = function(){
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Stop any active animations (confetti, etc.)
  const confettiElements = document.querySelectorAll(".confetti");
  confettiElements.forEach(confetti => confetti.remove());
}
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // This make if class is there list it removes or else it adds
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //  Generating random values for dices
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    //Remove hidden change file
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 50
    if (scores[activePlayer] >= 50) {
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer] +
      " - Winner🥇";
      playing =false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // Trigger confetti when a player wins
      createConfetti(document.querySelector(`.player--${activePlayer}`));
      
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click',init);

// Function to create confetti effect
const createConfetti = (playerElement) => {
  // Create multiple confetti elements
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    playerElement.appendChild(confetti);

    // Set random positions for each confetti particle
    const randomLeft = Math.random() * 100;
    confetti.style.left = `${randomLeft}%`;
    confetti.style.animationDelay = `${Math.random() * 2}s`; // Random delay for different fall timings
  }
};