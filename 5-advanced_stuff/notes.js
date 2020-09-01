// Function constructor

var ryan = {
    name: 'Ryan',
    yearOfBirth: 1983,
    job: 'writer'
};

var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person.prototype.calculateAge = 
function() {
    console.log(2020 - this.yearOfBirth);
};

Person.prototype.lastName = 'Helgerson';

var jazmin = new Person('John', 1988, 'social worker');
var damon = new Person('Damon', 2016, 'designer');
var don = new Person('Don', 1955, 'retired');

jazmin.calculateAge();
damon.calculateAge();
don.calculateAge();

console.log(jazmin.lastName, damon.lastName, don.lastName);
//This is inheritance in practice. The 'calculateAge()' method 
//is not attached to the object itself, it's inherited from the Prototype
//property of the function constructor

var Card = function(color, number, shape, clarity) {
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.clarity = clarity;
};

var cardX = new Card('black', 12, 'hexagon', 'clear');
var deck = [];

var colors = ['red', 'green', 'purple'];

var numbers = [1, 2, 3];

var shapes = ['diamond', 'squiggle', 'oval'];



for (var i = 0; i < 81; i++) {
    
    deck[i] = new Card(colors[Math.random], 3, 'square', 'shaded');
    
}

console.log(deck);

// Object.create
/*
var personProto = {
    calculateAge: function() {
        console.log(2020 - this.yearOfBirth)
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1988;
john.job = 'teacher';

var jane = Object.create(personProto, 
    {
        name: { value: 'Jane'},
        yearOfBirth: { value: 1969 },
        job: { value: 'designer' }
    });
*/

// Primitives
var a = 13;
var b = a;
a = 46;
console.log(a, b);

//Objects
var obj1 = {
    name: 'John',
    age: 37
};

var obj2 = obj1
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

var age = 37;
var obj = {
    name: 'Ryan',
    city: 'Minneapolis'
};

function change(a, b) {
    a = 5000;
    b.city = 'San Jose';
}

change(age, obj);

console.log(age);
console.log(obj.city);

//Lecture: Passing Functions as Arguments

/*
Some things about functions:
1. They are always instantiations of the Object type
2. They behave like any other object
3. They can be stored in a variable
4. They can be passed as an argument to another function
5. They can be returned from a function
*/

//Passing functions as arguments

var years = [1983, 1991, 1939, 2007, 2015];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function populateDeck(cards) {
    for (var i = 0; i < amt; i++) {
        
    }
}

function calculateAge(el) {
    return 2020 - el;
};

function canDrink(el) {
    return el >= 21;
};

function calcHeartMax(el) {

    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return 'n/a';
    }
};

var ages = arrayCalc(years, calculateAge);

console.log(ages);

var drinkers = arrayCalc(ages, canDrink);
console.log(drinkers);

var maxBpms = arrayCalc(ages, calcHeartMax);
console.log(maxBpms);

//Functions returning functions

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what are your skills?');
        }
    }
}

var teacherQuestion =
interviewQuestion('teacher');

var designerQuestion =
interviewQuestion('designer');

teacherQuestion('Ryan');
designerQuestion('Ryan');
interviewQuestion('writer')('Ryan');

var deck = [];

//IIFE

function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();

(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();


(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(1);

//One thing that the IIFE provides is DATA PRIVACY.
//By creating a new scope, the variables within the IIFE
//remain compartmentalized from the global scope. 

//CLOSURES ***BFD***
//By way of illustration, we will start by making a
//function that calculates the years until retirement

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yob) {
        var age = 2020 - yob;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
retirementUS(1983);

retirement(65)(1989);

//THE GHOST IN THE MACHINE
/*
So this is truly bizarre. I can see why this would come up in interview questions. 
I am going to attempt to explain what just happened there knowing full well that it's kind of inexplicable. 
1. I invoked the retirement function using a made up retirementAge of 65
2. The 'a' variable was created in the first part of the function's execution context before it returns the anonymous function inside of it
3. The anonymous function then executes after the retirement function has 'popped off of the execution stack' after having returned the Anonymous Function
4. The anonymous function creates the age variable using the second argument that I had 'set aside' for it.
5. Finally, the anonymous function logs the years until retirement using the difference between 'retirementAge' and 'age' in addition to the 'a' variable, which holds the string message. 
^^^That last part is where the head scratching begins. The 'retirementAge' variable as well as the 'a' variable should technically NOT have been able
to log, because they live in the context of the 'retirement' function, which has already closed after returning the anonymous function. 
This is what is referred to as a closure. 

Here's the Rule:
An inner function always has access to the variables of its outer function,
Even after that function has returned.

This enables us to be modular, because we can create more specific functions using the general pattern we have created.
*/

var retirementRyanland = retirement(44);
var retirementIceland = retirement(67);

retirementUS(1983);
retirementIceland(1983);
retirementRyanland(1983);

/*
Jonas's challenge: Rewrite the following function using the magical power of closures...

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what are your skills?');
        }
    }
}
*/

// function interviewQuestion(name) {
//     var greeting = `Thanks for coming to talk to us, ` + name + `. Why don't we start by asking you a question about your experience.`;
//     var writer = ` What are you thoughts on the concept of 'writer's block? Is it real? If so, how do you cope with it?`;
//     var coder = ` Say you have to create an array of 81 cards. Each card must be an object with four properties, each with three possible values. Each card must have a unique combination of values for each property. How would you perform this task?`;
//     var teacher = ` What is your classroom management philosophy?`;

//     return function (job) {
//         var generic =  ` Why should I hire you?`;
//         if (job === 'writer') {
//             console.log(greeting + writer);
//         }
//         else if (job === 'coder') {
//             console.log(greeting + coder);
//         }
//         else if (job === 'teacher') {
//             console.log(greeting + teacher);
//         }
//         else {
//             console.log(greeting + generic);
//         }
//     }
// }

// interviewQuestion(`Ryan`)(`coder`);


// var interviewTroy = interviewQuestion('Troy');

// interviewTroy('Echo tech');

//It's actually optimal to do this in reverse order (according to Jonas)...

function interviewQuestion(job) {

    return function(name) {
        if (job === `designer`) {
            console.log(name + ', can you please explain what UX design is?');
        }
        else if (job === `teacher`) {
            console.log('What subject do you teach, ' + name + '?');
        }
        else {
            console.log('Hello ' + name + ', what are your skills?');
        }
    }
}

interviewQuestion('teacher')('Ryan');

var interviewDesigner = interviewQuestion('designer');
interviewDesigner('Ryan');

//Lecture:  BIND    /   CALL    /   APPLY

var ryan = {
    name: 'Ryan',
    age: 37,
    job: 'desempleado',
    introduction: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log(`Good ` + timeOfDay + 
                        `, how do you do? My name is ` + this.name + 
                        ` and I am ` + this.age + 
                        ` years old. I'm a ` + this.job + `.`);
        }
        else if (style === 'casual') {
            console.log(`Hey bro, what's poppin' this ` + timeOfDay + 
            `? It's ` + this.name + `, homie.`);
        }
    }
};

ryan.introduction('formal', 'morning');

//Now, let's make another object for Jazmin, but without any methods. 
var jazmin = {
    name: `Jazmin`,
    age: 32,
    job: `social worker`,
}

//Suppose that we want to use the 'introduction' method in the 'ryan' object for Jazmin. 
//This is where we can use the .call method.
 /*
    How does this work? 
    The first parameter of the call method is used to set the 'this' keyword. 
 */

 ryan.introduction.call(jazmin, 'casual', 'evening');
//By using the call method after invoking the presentation method
//on the 'ryan' object, you are basically telling the parser(?) that you want to use the prentation method, but it should set the 'this' object
//to the 'jazmin' object instead of ryan. 

//apply works similarly, but it accepts an array as the second argument which contains all of the other arguments. 
// ryan.introduction.apply(jazmin, ['formal', 'afternoon']);
//this syntax won't work here because the method indicated doesn't expect an array.

//bind works similarly except that instead of immediately calling the function, 
//it creates a copy of the function so that you can store it and use it later. 
//this enables us, in effect, to create functions with pre-set arguments. 

var ryanFriendly = ryan.introduction.bind(ryan, 'casual');
ryanFriendly('morning');

var jazminFormal = ryan.introduction.bind(jazmin, 'formal');
jazminFormal('evening');
//this process is called 'currying', and it basically means what we just did: using existing functions but with preconfigured parameters.

var years = [1983, 1991, 1939, 2007, 2015];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2020 - el;
};

function canDrink(limit, el) {
    return el >= limit;
};

var ages = arrayCalc(years, calculateAge);

var canDrinkBrittania = arrayCalc(ages, canDrink.bind(this, 18));
console.log(ages);
console.log(canDrinkBrittania);


