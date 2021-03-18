/*
GAME RULES:

-The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that ROUND score gets added to his GLOBAL score. After that, it's the next player's turn. 
- The first player to reach 100 points on Global score wins the game.

*/
var scores, roundScore, activePlayer, gamePlaying;
init();

// var previousDice;

document.querySelector(".btn--roll").addEventListener("click", function () {
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        displayDice();
        document.getElementById("dice-1").src = "img/dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "img/dice-" + dice2 + ".png";
 
  /* if (dice === 6 && previousDice === 6) {
        console.log('twice!');
        //Player loses Global score
        scores[activePlayer] = 0;
        document.querySelector('#score--' + activePlayer).textContent  = '0';
        nextPlayer();
    }
    */


    // 3. Update the round score IF the rolled number was NOT a 1
     if (dice1 !== 1 && dice2  !== 1) {
        //Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current--' + activePlayer).textContent  = roundScore;
    }else {
        //Next Player
        nextPlayer();
    }
}

});

document.querySelector(".btn--hold").addEventListener("click", function () {
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
            alert('rolled a 1, lost your turn!')
            //Next player
            nextPlayer();
        }
    }
});

function hideDice() {
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

function displayDice() {
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
}

function nextPlayer() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById("current--0").textContent = "0";
    document.getElementById("current--1").textContent = "0";

    document.querySelector(".player--0").classList.toggle("player--active");
    document.querySelector(".player--1").classList.toggle("player--active");

    hideDice();

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
    document.getElementById("current--0").textContent = "0";
    document.getElementById("current--1").textContent = "0";
    //Set Player 1
    document.getElementById("name--0").textContent = "Player 1";
    //Set Player 2
    document.getElementById("name--1").textContent = "Player 2";
    //Remove winner classes from both players
    document.querySelector(".player--0").classList.remove("winner");
    document.querySelector(".player--1").classList.remove("winner");
    //Remove active classes from both players
    document.querySelector(".player--0").classList.remove("player--active");
    document.querySelector(".player--1").classList.remove("player--active");
    //Add active class to Player 1
    document.querySelector(".player--0").classList.add("player--active");
};

document.querySelector("#input-form").addEventListener("submit", (e) => {
    e.preventDefault();
});
