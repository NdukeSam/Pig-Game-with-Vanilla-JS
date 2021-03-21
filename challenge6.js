/*
GAME RULES:

-The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that ROUND score gets added to his GLOBAL score. After that, it's the next player's turn. 
- The first player to reach 100 points on Global score wins the game.

*/
var scores, roundScore, activePlayer, gamePlaying;

var previousDice;

const gameDice1 = document.querySelector("#dice-1");
const gameDice2 = document.querySelector("#dice-2");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

const rollBtn = document.querySelector(".btn--roll");
rollBtn.addEventListener("click", roll);

document.querySelector(".btn--hold").addEventListener("click", hold);

const bot = {
    currentScore: 0,

    isOkToRollAgain(d1, d2) {
        return ![d1, d2].includes(1);
    },

    play() {
        const diceVal = this.roll();
        if (this.isOkToRollAgain(diceVal[0], diceVal[1])) {
            this.currentScore += diceVal[0] + diceVal[1];
            console.log("bot current-score: " + this.currentScore);

            if (this.currentScore > 20) {
                this.hold();
                this.currentScore = 0;
                return;
            }

            setTimeout(() => {
                // wait a little, check to roll again
                this.play();
            }, 2500);
        } else {
            this.currentScore = 0;
        }
    },
};

bot.roll = roll;
bot.hold = hold;

function roll() {
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        displayDice();
        gameDice1.src = "img/dice-" + dice1 + ".png";
        gameDice2.src = "img/dice-" + dice2 + ".png";

        /* if (dice === 6 && previousDice === 6) {
        console.log('twice!');
        //Player loses Global score
        scores[activePlayer] = 0;
        document.querySelector('#score--' + activePlayer).textContent  = '0';
        nextPlayer();
        }
        */

        // 3. Update the round score IF the rolled number was NOT a 1
        console.log("Player " + (activePlayer + 1) + ":");
        console.log(dice1 + " + " + dice2 + " = " + (dice1 + dice2));

        roundScore += dice1 + dice2;
        console.log("round-score", roundScore);

        document.querySelector(
            "#current--" + activePlayer
        ).textContent = roundScore;

        if (![dice1, dice2].includes(1)) {
            nextPlayer();
        }

        /*
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            console.log("round-score", roundScore);
            document.querySelector(
                "#current--" + activePlayer
            ).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }*/

        // previousDice = dice;

        return [dice1, dice2];
    }
}

function hold() {
    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector("#score--" + activePlayer).textContent =
            scores[activePlayer];

        //Update score user sets
        var input = document.querySelector(".final-score").value;
        var winningScore;

        // Undefined, null, 0 or "" are COERCED to false
        //Anything else is true

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if the player won
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name--" + activePlayer).textContent =
                "Winner! 🏆";
            hideDice();
            document
                .querySelector(".player--" + activePlayer)
                .classList.add("winner");
            document
                .querySelector(".player--" + activePlayer)
                .classList.remove("player--active");

            //Set gamePlayer state variable to false
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
}

function hideDice() {
    gameDice1.style.display = "none";
    gameDice2.style.display = "none";
}

function displayDice() {
    gameDice1.style.display = "block";
    gameDice2.style.display = "block";
}

function nextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;

    currentScore0.textContent = "0";
    currentScore1.textContent = "0";

    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");

    hideDice();

    if (activePlayer === 1) {
        roll.disable = true;
        bot.play();
    } else {
        roll.disable = false;
    }

    // document.querySelector('.player--0').classList.remove('player--active');
    // document.querySelector('.player--1').classList.add('player--active');
}

document.querySelector(".btn--new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // document.querySelector('.dice').style.display = 'none';
    // document.querySelector('.secondDice').style.display = 'none';
    hideDice();

    document.getElementById("score--0").textContent = "0";
    document.getElementById("score--1").textContent = "0";
    currentScore0.textContent = "0";
    currentScore1.textContent = "0";
    //Set Player 1
    document.getElementById("name--0").textContent = "Player 1";
    //Set Player 2
    document.getElementById("name--1").textContent = "Player 2";
    //Remove winner classes from both players
    player0.classList.remove("winner");
    player1.classList.remove("winner");
    //Remove active classes from both players
    player0.classList.remove("player--active");
    player1.classList.remove("player--active");
    //Add active class to Player 1
    player0.classList.add("player--active");
}

document.querySelector("#input-form").addEventListener("submit", (e) => {
    e.preventDefault();
});

init();
