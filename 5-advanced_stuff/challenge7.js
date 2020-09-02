/*
INSTRUCTIONS:
/////////////////////////////
// CODING CHALLENGE
*/
//console.log("Challenge accepted!");
/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
*/
// var Question = function(question, answerChoices, correctAnswer) {
//     this.question = question;
//     this.answerChoices = answerChoices;
//     this.correctAnswer = correctAnswer;
// }

/*
2. Create a couple of questions using the constructor
*/
// var question1 = new Question("Which musician was deported from Japan in the 1980s for possession of cannabis?", [`Ric Ocasek`, `Paul McCartney`, `James Brown`, `Frank Zappa`], 1);
// var question2 = new Question("Which famous music group was formerly known as the Yardbirds", [`Led Zeppelin`, `The Mamas and the Papas`, `The Kinks`, `Metallica`], 0);
// var question3 = new Question("What was Elvis Presley's first number one hit in 1956?", [`Jailhouse Rock`, `Heartbreak Hotel`, `Blue Suede Shoes`, `That's Alright`], 1);
// var question4 = new Question("From what country does rock band AC/DC originate?", [`Canada`, `The United States`, `South Africa`, `Australia`], 3);
// var question5 = new Question("Who is the lead singer of the band Pearl Jam?", [`Eddie Vedder`, `Scott Weiland`, `Thom Yorke`, `Maynard Keenan`], 0);
// var question6 = new Question("Which singer is godmother to Elton John's two sons?", [`Lady Gaga`, `Madonna`, `Joan Jett`, `Miley Cyrus`], 0);
// var question7 = new Question("What is the name of that one Fleetwood Mac song that the Smashing Pumpkins covered?", [`Never Going Back`, `The Chain`, `Landslide`, `Dreams`], 2);
// var question8 = new Question("Released in 1971, what is the title of the album by T.Rex that signalled the band's turn from folk to glam?", [`Sparkle Boogaloo`, `Tanx`, `Electric Warrior`, `Futuristic Dragon`], 2);
// var question9 = new Question("What was the name of the first band that Jimi Hendrix formed with a friend after being discharged from the army?", [`Olive Drab`, `The Sunburst Brothers`, `Little Golden Wings`, `King Kasuals`], 3);
// var question10 = new Question("What film did Tejana singer Selena appear in months before her death?", [`Stand and Deliver`, `Beaches`, `Don Juan Demarco`, `The Fugitive`], 2);



/*
3. Store them all inside an array
*/
// var questions = [];

// questions.push(question1);
// questions.push(question2);
// questions.push(question3);
// questions.push(question4);
// questions.push(question5);
// questions.push(question6);
// questions.push(question7);
// questions.push(question8);
// questions.push(question9);
// questions.push(question10);

//console.log(questions);
/*
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
*/

// Question.prototype.displayQuestion = 
// function() {
//     console.log(this.question);
//     console.table(this.answerChoices);
// };

// var randomQ = questions[Math.floor(Math.random() * 10)];
// randomQ.displayQuestion();
/*
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
*/

// var answer = prompt("Enter the numerical value that corresponds with the correct answer here...", `Whaddaya think?`);

// if (randomQ.correctAnswer == answer){
//     alert("You got it!")
// } else {alert(`Wrong-o!`)};

/*
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
*/

// Question.prototype.checkAnswer = function() {
//     if (this.correctAnswer == answer){
//         console.log("You got it!")
//     } else {console.log(`Wrong-o!`)};
// }

// randomQ.checkAnswer();

/*
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

*/
(function() {

    var Question = function(question, answerChoices, correctAnswer) {
        this.question = question;
        this.answerChoices = answerChoices;
        this.correctAnswer = correctAnswer;
    }

    var question1 = new Question("Which musician was deported from Japan in the 1980s for possession of cannabis?", [`Ric Ocasek`, `Paul McCartney`, `James Brown`, `Frank Zappa`], 1);
    var question2 = new Question("Which famous music group was formerly known as the Yardbirds", [`Led Zeppelin`, `The Mamas and the Papas`, `The Kinks`, `Metallica`], 0);
    var question3 = new Question("What was Elvis Presley's first number one hit in 1956?", [`Jailhouse Rock`, `Heartbreak Hotel`, `Blue Suede Shoes`, `That's Alright`], 1);
    var question4 = new Question("From what country does rock band AC/DC originate?", [`Canada`, `The United States`, `South Africa`, `Australia`], 3);
    var question5 = new Question("Who is the lead singer of the band Pearl Jam?", [`Eddie Vedder`, `Scott Weiland`, `Thom Yorke`, `Maynard Keenan`], 0);
    var question6 = new Question("Which singer is godmother to Elton John's two sons?", [`Lady Gaga`, `Madonna`, `Joan Jett`, `Miley Cyrus`], 0);
    var question7 = new Question("What is the name of that one Fleetwood Mac song that the Smashing Pumpkins covered?", [`Never Going Back`, `The Chain`, `Landslide`, `Dreams`], 2);
    var question8 = new Question("Released in 1971, what is the title of the album by T.Rex that signalled the band's turn from 'folk' to 'glam'?", [`Sparkle Boogaloo`, `Tanx`, `Electric Warrior`, `Futuristic Dragon`], 2);
    var question9 = new Question("What was the name of the first band that Jimi Hendrix formed with a friend after being discharged from the army?", [`Olive Drab`, `The Sunburst Brothers`, `Little Golden Wings`, `King Kasuals`], 3);
    var question10 = new Question("What film did Tejana singer Selena appear in months before her death?", [`Stand and Deliver`, `Beaches`, `Don Juan Demarco`, `The Fugitive`], 2);

    var questions = [];
    var playerScore = 0;

    questions.push(question1);
    questions.push(question2);
    questions.push(question3);
    questions.push(question4);
    questions.push(question5);
    questions.push(question6);
    questions.push(question7);
    questions.push(question8);
    questions.push(question9);
    questions.push(question10);

    document.addEventListener('keydown', playGame);

    /*
    --- Expert level ---
    8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)
    */

    function playGame() {

        Question.prototype.displayQuestion = 
        function() {
            console.log(this.question);
            console.table(this.answerChoices);
        };
    
        var randomQ = questions[Math.floor(Math.random() * questions.length)];
        randomQ.displayQuestion();
    
        var answer = prompt("Enter the number for the correct answer, or type 'exit' if yr done.", `0, 1, 2, or 3?`);
    
        Question.prototype.checkAnswer = function() {
            if (this.correctAnswer == answer){
                playerScore++;
                console.log(`Bingo! Player score: ${playerScore}`)
                playGame();
            }
            /*
            9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
            */
            else if (answer === 'exit'){
                console.log(`See you next time!`);
                return;
            }
            else {console.log(`Wrong-o! Score: ${playerScore}`)
        playGame()};
        };
    
        randomQ.checkAnswer();



    };


})();


/*
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/