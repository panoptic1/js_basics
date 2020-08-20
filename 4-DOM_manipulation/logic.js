/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
//Global Variables
var scores, roundScore, activePlayer, gamePlaying;

var rolls = [];

startGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        console.log(`Roll, homie!`);
        //1. Generate a random number between 1 and six and store it as a variable.
        var dice = Math.floor(Math.random() * 6) + 1;

        //Push the result of each roll into the 'rolls' array
        rolls.push(dice);
        
        //Once the array reaches a length of two, cap it by shifting off the first item for every roll thereafter
        if (rolls.length > 2) {
            rolls.shift();
        }
        
        if (rolls[0] === 6 && rolls[1] === 6) {
            //zero out all active player scores
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        };

        //2. Display the result
        var diceEl = document.querySelector('.dice');
        diceEl.style.display = 'block';
        diceEl.src = 'dice-' + dice + '.png';

        console.log(rolls);

        //3. Update the round score IF it was not a 1 OR if the last two rolls were not sixes
        if (dice !== 1) {
            //Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});



document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
        //Check if the player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            } else {
            //The next player takes their turn
            nextPlayer();
        };
    }    
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.btn-new').addEventListener('click', startGame);

function startGame(){
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
 (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/



