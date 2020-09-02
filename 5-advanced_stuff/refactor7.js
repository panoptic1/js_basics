

// (function () {
// //make the function constructor pattern

// function Question(question, answers, correct) {
//     this.question = question;
//     this.answers = answers;
//     this.correct = correct;
// }

// //We want to display questions[n] with the prototype 
// //We don't want to write this method directly onto the function
// //constructor, so we'll use the prototype instead.

// Question.prototype.displayQuestion = 
// function () {
//     console.log(this.question);

//     for (var i = 0; i < this.answers.length; i++){
//         console.log(i + ` : ` + this.answers[i]);
//     }
// };

// //
// //Now, the 'this' keyword ^^^ in the method will point to whatever question object calls the  function.
// //The method is not attached to the questions, it's in their prototype.

// //Make a method to check the answer.
// Question.prototype.checkAnswer = function(ans){
//     if (ans === this.correct) {
//         console.log(`Correct answer!`);
//     } else {
//         console.log(`Sorry! Try again...`);
//     }
// }
// var q1 = new Question('Are you serious?', [`Yes`, `No`, `Maybe`], 0);
// var q2 = new Question('Can you even?', [`Yes`, `No`, `Maybe`], 2);
// var q3 = new Question('Will today be a great success?', [`Yes`, `No`, `Maybe`, `Ask me again later.`], 3);

// var questions = [q1, q2, q3];

// var n = Math.floor(Math.random() * questions.length);

// questions[n].displayQuestion();

// var answer = parseInt(prompt(`Please select the correct answer.`));

// questions[n].checkAnswer(answer);
// })();

(function () {
    //make the function constructor pattern
    
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    //We want to display questions[n] with the prototype 
    //We don't want to write this method directly onto the function
    //constructor, so we'll use the prototype instead.
    
    Question.prototype.displayQuestion = 
    function () {
        console.log(this.question);
    
        for (var i = 0; i < this.answers.length; i++){
            console.log(i + ` : ` + this.answers[i]);
        }
    };
    
    //
    //Now, the 'this' keyword ^^^ in the method will point to whatever question object calls the  function.
    //The method is not attached to the questions, it's in their prototype.
    
    //Make a method to check the answer.
    Question.prototype.checkAnswer = function(ans, callback){
        var sc;

        if (ans === this.correct) {
            console.log(`Correct answer!`);
            sc = callback(true);
            //this is the closure at work^^^
        } else {
            console.log(`Sorry! Try again...`);
            sc = callback(false);
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score) {
        console.log(`Current Score : ` + score + ` -------------------`)
    }

    var q1 = new Question('Are you serious?', [`Yes`, `No`, `Maybe`], 0);
    var q2 = new Question('Can you even?', [`Yes`, `No`, `Maybe`], 2);
    var q3 = new Question('Will today be a great success?', [`Yes`, `No`, `Maybe`, `Ask me again later.`], 3);
    
    var questions = [q1, q2, q3];

    function score() {
        var sc = 0;
        return function (correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    //the power of the closure is that we will always have access to the variables defined by the other function.
    //in this case, the 'sc' variable will be accessible by the keepScore function below. 
    var keepScore = score();
    function nextQuestion() {
    
        var n = Math.floor(Math.random() * questions.length);
        
        questions[n].displayQuestion();
        
        var answer = prompt(`Please select the correct answer.`);

        if(answer !== `exit`){
            
            questions[n].checkAnswer(parseInt(answer), keepScore);

            nextQuestion();
        };

    }

    nextQuestion();

})();