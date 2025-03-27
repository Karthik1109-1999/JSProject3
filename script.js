'use strict';

const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
// Select item by ID
const score0E1 = document.querySelector('#score--0');
const score1E1 = document.querySelector('#score--0');
// Select item by ID
const current0E1 = document.querySelector('#current--0');
const current1E1 = document.querySelector('#current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const diceE1 = document.querySelector('.dice');


//starting condition
score0E1.textContent = 0;
score1E1.textContent = 0;
diceE1.classList.add('hidden');

let currentScore = 0;

btnRoll.addEventListener('click',function(){
//  Generating random values for dices
const dice = Math.trunc((Math.random() * 6 )+ 1);
console.log(dice);

//Remove hidden change file
diceE1.classList.remove('hidden');
diceE1.src = `dice-${dice}.png`;

if(dice !== 1){
    currentScore += dice;
    current0E1.textContent = currentScore;
}else{
    console.log('Switch Player 2')
}



});

