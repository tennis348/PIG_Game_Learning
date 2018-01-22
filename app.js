/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var roundScore, activePlayer, someScore;

roundScore = 0;
activePlayer = 0;

// dice = Math.floor(Math.random() * 6 + 1);

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<bold>' + dice + '</bold>';

function newGame() {
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
}

function winnerScore(finalScore) {
    if (someScore > finalScore){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        activePlayer = 0;
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.dice').style.display = 'none';
    }
    else{
        switchingPlayer();
    }
}

function switchingPlayer() {
    var DiceDOM = document.querySelector('.dice');
    if (activePlayer === 0){
        activePlayer = 1;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        DiceDOM.style.display = 'none';
    }else{
        activePlayer = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        DiceDOM.style.display = 'none';
    }
}

newGame();

document.querySelector('.btn-roll').addEventListener('click', function () {
    var dice = Math.floor(Math.random() * 6) + 1;

    var DiceDOM = document.querySelector('.dice');
    DiceDOM.style.display = 'block';
    DiceDOM.src = 'dice-' + dice + '.png';

    if(dice !== 1){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else{
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = '0';
        switchingPlayer();
    }

})

document.querySelector('.btn-hold').addEventListener('click', function () {
    var globalScore =  document.querySelector('#score-' + activePlayer).textContent;
    globalScore = Number(globalScore);
    roundScore += globalScore;
    document.querySelector('#score-' + activePlayer).textContent = roundScore;
    someScore = roundScore;
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = '0';

    var finalInput = document.querySelector('.final-score').value;

    if (finalInput > 0){
        winnerScore(finalInput);
    }
    else {
        winnerScore(99);
    }

//    Another way you could have done it
//     var winningScore;
//     if (finalInput){
//         winningScore = finalInput;
//     }else{
//         winningScore = 99;
//     }

})

document.querySelector('.btn-new').addEventListener('click', newGame);