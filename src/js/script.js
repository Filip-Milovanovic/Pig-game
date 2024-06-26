"use strict";

//Buttons
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

//Player stats
const player0El = document.querySelector(".player0");
const player1El = document.querySelector(".player1");
const current0El = document.querySelector(".player0--current");
const current1El = document.querySelector(".player1--current");
const total0El = document.querySelector(".player0--score");
const total1El = document.querySelector(".player1--score");
const diceEl = document.querySelector(".dice");

//Variables
let currentScore = 0;
let totalScores = [0, 0];
let playing = true;

//Starting states
diceEl.classList.add("hidden");

//Roll button
rollBtn.addEventListener("click", function () {
  if (playing) {
    //Number between 1 and 6
    let dice = Math.trunc(Math.random() * 6) + 1;

    //Show the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `src/img/dice-${dice}.png`;

    //If not 1
    if (dice !== 1) {
      currentScore += dice;
      if (player0El.classList.contains("player--active")) {
        current0El.textContent = currentScore;
      } else current1El.textContent = currentScore;
    } else {
      //Change player and reset current
      currentScore = 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
      current0El.textContent = currentScore;
      current1El.textContent = currentScore;
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    if (player0El.classList.contains("player--active")) {
      totalScores[0] += currentScore;
      currentScore = 0;
      total0El.textContent = totalScores[0];
      current0El.textContent = 0;
      if (totalScores[0] >= 100) {
        player0El.classList.add("player--winer");
        playing = false;
      }

      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    } else {
      totalScores[1] += currentScore;
      currentScore = 0;
      total1El.textContent = totalScores[1];
      current1El.textContent = 0;
      if (totalScores[1] >= 100) {
        player1El.classList.add("player--winer");
        playing = false;
      }
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

newBtn.addEventListener("click", function () {
  totalScores[0] = totalScores[1] = 0;
  currentScore = 0;
  playing = true;

  player0El.classList.remove("player--winer");
  player1El.classList.remove("player--winer");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  diceEl.classList.add("hidden");

  current0El.textContent = 0;
  current1El.textContent = 0;
  total0El.textContent = 0;
  total1El.textContent = 0;
});
