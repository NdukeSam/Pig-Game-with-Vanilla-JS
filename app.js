/*
GAME RULES:

-The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that ROUND score gets added to his GLOBAL score. After that, it's the next player's turn. 
- The first player to reach 100 points on Global score wins the game.

*/
var scores, roundScore, activePlayer, dice;

scores =  [0, 0];
roundScore = 0;
activePlayer = 1;
dice = Math.floor(Math.random() * 6) + 1;

document.querySelector('#current--' + activePlayer).textContent  = dice;
// document.querySelector('#current--' +activePlayer).innerHTML = '<em>' + dice + '</em>';

document.querySelector('.dice').style.display = 'none';
