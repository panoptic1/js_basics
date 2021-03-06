console.log("Uploading ES6!")

// Lecture: let and const (VARIABLES)

// ES5
var name5 = `Jane Smith`;
var age5 = 23;
name5 = `Jane Miller`;
console.log(name5);

// ES6
const name6 = `Jane Smith`;
let age6 = 23;
//name6 = `Jane Miller`; //throws error as 'name6' is a const and therefore immutable
console.log(name6);

// ES5
function driversLicense5(passedTest) {

    if (passedTest) {
        console.log(firstName);
        var firstName = 'John'
        var yearOfBirth = 1990;

        console.log(firstName + ', born in ' + yearOfBirth + ` is now officially allowed to drive a car.`);
    }
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest) {

    // if (passedTest) {
    //     let firstName = 'John'
    //     const yearOfBirth = 1990;
    // }
    //console.log(firstName + ', born in' + yearOfBirth + `is now officially allowed to drive a car.`);
    /*
    Interesting difference: Line 37 throws an error because 'let' and 'const' variables are 'block scoped'
    rather than 'function scoped'. As such, you can't log variables from outside of the curly braces in the fashion
    attempted above, similar how you can't log variables in the global scope that exist inside of a function in ES5
    */

    //console.log(firstName);
    //Instead, declare the variables outside of the block...
    let firstName; //the let variable can be declared without a value and it's value may be changed in child blocks
    const yearOfBirth = 1990; //the value of the const variable must be declared outside of the block.

    if (passedTest) {
        firstName = `John`;
    }

    console.log(firstName + ', born in ' + yearOfBirth + ` is now officially allowed to drive a car.`);
}

driversLicense6(true);

//let i = 23;

// for (let i =0; i < 5; i++) {
//     console.log(i); //This logs 0, 1, 2, 3, 4...
// }

// console.log(i); //... and this logs '23'

/*
This is cool. The two 'i' variables behave completely independently and don't interfere with one another whatsoever.
This is also because of block-scoping versus function-scoping.
*/


//Lecture: BLOCKS AND IIFEs
{
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b); 
//this throws an error, because the variables are not accessible outside of the brackets.
console.log(c); //however, this one will log as the 'var' declaration is function-scoped (not block-scoped)

//ES5
(function() {
    var c = 3;
})();

//console.log(c);

/*
In effect, using ES6 allows you to use brackets and the 'const' and 'let' variables to create 'data privacy'
in the fashion that using an IIFE allows you in ES5, like in the example on lines 85-87.
*/

//Lecture: STRINGS

let firstName = 'Ryan';
let lastName = 'Helgerson';
const yearOfBirth = 1983
function calcAge(year) {
    return 2020 - year;
}

/*
Template Literals
*/

//  ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is '  + calcAge(yearOfBirth) + ' years old.');

//Using backticks and the template literal syntax, you can just plop variables right into a string
//ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);
//The backticks signal to JS that you want to use a template literal.

const fullName = `${firstName} ${lastName}`;
console.log(fullName.startsWith('R'));
console.log(fullName.endsWith('son'));
console.log(fullName.includes('an He'));

//'startsWith and endsWith allows us to check whether or not a string starts or ends with something
console.log(`${firstName} `.repeat(5));

//Lecture: ARROW FUNCTIONS

const years = [1990, 1965, 1982, 1937];

//ES5
var ages5 = years.map(function(el){
    return 2020 - el;
});

console.log(ages5);

//ES6
let ages6 = years.map(el => 2020 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1} : ${age}.`
});
console.log(ages6);

// Lecture: Arrow Functions 2

// ES5
var box5 = {
    color: `green`,
    position : 1,
    clickMe: function() {

        var self = this; //when adding the event listener below, you can't directly use 'this' as it is part of a regular function and thus points at the global object
        //capturing 'this' in a variable in this fashion is a hacky workaround
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box number ' + self.position + ` and it is ` + self.color;
            alert(str);
        });
    }
}
box5.clickMe();

// ES6
const box6 = {
    color: `green`,
    position : 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = `This is box number ${this.position} and it is ${this.color}.`
            alert(str);
        });
    }
}
box6.clickMe();

// ES6
// const box666 = {
//     color: `green`,
//     position : 1,
//     clickMe: () => {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = `This is box number ${this.position} and it is ${this.color}.`
//             alert(str);
//         });
//     }
// }
// box666.clickMe();
/*
Alright this is a little murky BUT...This one doesn't work because by using an arrow function on line 185, it doesn't change the scope of the
'this' keyword at all. In other words, if you use only arrow functions within an object, then 'this' remains bound to the global object.
*/

function Person(name) {
    this.name = name;
};

function Persona(name) {
    this.name = name;
};

//ES5
Person.prototype.myFriends5 = 
function(friends) {

    var arr = friends.map(function(el)
    {
        return this.name + ' is friends with ' + el;
    }.bind(this));//'this' is bound to the callback function above with bind.
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];

new Person('John').myFriends5(friends);

//ES6
Persona.prototype.myFriends6 = 
function(friends) {

    var arr = friends.map((el) =>
        `${this.name} is friends with ${el}.`
    );//because of the arrow function, we no longer need to use the bind method
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];

new Persona('Juan').myFriends6(friends);

//Lecture: Destructuring

//ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];
console.log(name, age);

//ES6
const [nombre, edad] = ['John', 26];
console.log(nombre);
console.log(edad);

const obj = {
    firstNombre : 'Ryan',
    apellido : 'Helgerson'
};

const {firstNombre, apellido} = obj;
//the variable names inside of the braces MUST be the same as the names of the keys inside of the object in order to function
console.log(firstNombre);
console.log(apellido);

//if you don't want the variable names to match with the key names, you can use this structure:
const {firstNombre: a, apellido: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
    const age2 = new Date().getFullYear() - year;
    return [age2, 65 - age2];
}

const[age2, retirement] = calcAgeRetirement(1990);

console.log(age2);
console.log(retirement);

//Lecture: Arrays in ES6
//New array methods!

//const boxes = document.querySelectorAll('.box');
//this will return a node list instead of an array.
//ES5

// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(el) {
//     el.style.backgroundColor =
//     'tomato';
// });


//ES6 - the from method
// const boxesArr6 = Array.from(boxes)
// boxesArr6.forEach(el => el.style.backgroundColor = 'dodgerBlue');

/*
Suppose we were to want to change the inner text of the first and third boxes but skip the second one because it already says 'blue'...
*/

//ES5
/*
for (var i = 0; i < boxesArr5.length; i++) {
    console.log('It works.');

    if(boxesArr5[i].className === 'box blue') {
        continue;
    }

    boxesArr5[i].textContent = 'I changed to tomato!';
    
}
*/

//ES6 - the 'for of' loop
// for (const el of boxesArr6) {
//     if (el.className.includes('blue')) {
//         continue;
//     }
//     el.textContent = 'I changed to blue!'
// }

//ES5
var ages = [12, 17, 8, 21, 14, 11];

var legal = ages.map(function(el) {
    return el >= 18;
});
console.log(legal);

console.log(legal.indexOf(true));
console.log(ages[legal.indexOf(true)]);

//ES6 - findIndex
console.log(ages.findIndex(el => el >= 18));
console.log(ages.find(el => el >= 18));

//Lecture: The Spread Operator

function addFourAges (a, b, c, d) {
    return a + b + c + d;
};

var sum1 = addFourAges (18, 30, 12, 21);
console.log(sum1);

//What if all of the age values existed in an array? How could you feed the array into the function on line 334?

//ES5
var ages = [18, 30, 12, 21];

//We're going to use the apply method here, which receives an array and calls the function that it is called on. 
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);
//This is nifty. The 'spread' operator which is part of ES6 (the ellipses) basically takes the values out of the array that it is called on

const familyHelgerson = [`Don`, `Judy`, `Ryan`, `Troy`];
const familyCruz = [`Jose`, `Delia`, `Rudy`, `Jazmin`];
const offspringHelgyCruz = [`Damon`, `Roz`];
const bigFamily = [...familyHelgerson, ...familyCruz, ...offspringHelgyCruz];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

Array.from(all).forEach(el => el.style.color = 'purple');

//Lecture: Rest parameters

//they use the same notation as the spread operator (...)
//HOWEVER they are very different or perhaps inverse

//ES5
// function isLegalAge5(){
//     console.log(arguments);
//     var argsArr = Array.prototype.slice.call(arguments);

//     argsArr.forEach(function(el){
//         console.log((2020 - el) >= 21);
//     })
// }

// isLegalAge5(1999, 2001, 2010);
// isLegalAge5(1983, 1999, 1972, 2004, 2016);

// //ES6
// function isLegalAge6(...years) {
//     years.forEach(el => console.log((2020 - el) >= 21))
// };

// isLegalAge6(1990, 2000, 2010);

//ES5
function isLegalAge5(limit){
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);
    console.log(argsArr);

    argsArr.forEach(function(el){
        console.log((2020 - el) >= limit);
    })
}

isLegalAge5(21, 1999, 2001, 2010);
//isLegalAge5(1983, 1999, 1972, 2004, 2016);

//ES6
function isLegalAge6(limit, ...years) {
    years.forEach(el => console.log((2020 - el) >= limit))
};

isLegalAge6(1990, 2000, 2010, 1995, 1999, 2002);


//Lecture: Default parameters

//ES5
// function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

//     lastName === undefined ? lastName = `Smith` : lastName = lastName;
//     nationality === undefined ? nationality = `american` : nationality = nationality;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.yearOfBirth = yearOfBirth;
//     this.nationality = nationality;
// }


//ES6
function SmithPerson(firstName, yearOfBirth, lastName = `Smith`, nationality= `american`) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson(`John`, 1990);
console.log(john);

var emily = new SmithPerson('Emily', 1983, 'Cruz', 'spanish');
console.log(emily);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture: Maps

/*
What is a map?
A common use of objects in JS is to use them as 'hash maps'.
This means that they are used to map string keys to arbitrary values. (???)
We did that when we were making simple things like the "John" object.
That was then...this is ES6.
Instead of using an object, we can use 'maps'
A map is a new key-value data struture wherein we can use anything in the keys. Hm
*/

const question = new Map();
//And that's a Map!

//Use the set method to start adding data to the map
question.set('question', 'What is the official name of the latest major JavaScript version?');

//Now let's add some answers
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');

//add the correct answer
question.set(`correct`, 3);

//set what happens if the question is true or false
question.set(true, 'Correct Answer!');
question.set(false, 'No sir!');

//get data from the Map by using the 'get' method
console.log(question.get(`question`));

//this gives you the length of the map
console.log(question.size);
console.log(question);

//what about if you want to delete something from the map?
//question.delete(4);

//check to see if there is a given key inside of the map using the 'has' method
if(question.has(4)){
    console.log(`4 is here!`);
}

if(question.has(5)){
    console.log(`5 is here!`);
} else {
    console.log('No 5 here!')
}

//finally, if you want to clear everything from the map...
//question.clear();

//they are iterable! You can loop through the map!
//the forEach method is part of the map's prototype
// question.forEach((value, key) =>
// console.log(`This is key ${key} and it's value is ${value}.`))

//the 'for of' loop is also at our disposal
for (let [key, value] of question.entries()){
    //to get the value, we can use destructuring
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`)
    }
}

const ans = parseInt(prompt(`Write the correct answer`));

console.log(question.get(ans === question.get('correct')));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Lecture: Classes

//ES5
// var Person5 = function(name, birthYear, job) {
//     this.name = name;
//     this.birthYear = birthYear;
//     this.job = job;
// }

// Person5.prototype.calculateAge = function() {
//     var age = new Date().getFullYear() - this.birthYear;
//     console.log(age);
// }

// var john5 = new Person5('John', 1990, 'teacher');

// //console.log(`John's age is ${john5.calculateAge()}.`);

// //ES6
// class Person6 {
//     constructor (name, birthYear, job) {
//         this.name = name;
//         this.birthYear = birthYear;
//         this.job = job;
//     }

//     calculateAge() {
//         //add method code here, this class now has a method!
//         var d = new Date();
//         var age = d.getFullYear() - this.birthYear;
//         console.log(age); //there is some bug in the code in this section as this number logs NaN
//     }

//     static greeting(){
//         console.log('Hey there!');
//     }
// }

// const john6 = new Person6('John', 1990, 'teacher');

// Person6.greeting();

// john5.calculateAge();
// john6.calculateAge();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Lecture: Classes with Subclasses


//ES5
//Our good old 'Person' constructor will be our 'superclass'
var Person5 = function(name, birthYear, job) {
    this.name = name;
    this.birthYear = birthYear;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.birthYear;
    console.log(age);
}

//
var Athlete5 = function(name, birthYear, job, olympics, medals){
    //this is kinda wild bust basically by calling Person5 and setting 'this' to the current instantiation of a new Athlete, you invoke the Person constructor
    Person5.call(this, name, birthYear, job);
    this.olympics = olympics;
    this.medals = medals;
};

//we are manually setting the prototype of the Athlete class here to that of the Person prototype, so it now inherits its methods
Athlete5.prototype = Object.create(Person5.prototype);

//And then we can set new methods to the Athlete class that only it has access to
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
};

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

//ES6
class Person6 {
    constructor (name, birthYear, job) {
        this.name = name;
        this.birthYear = birthYear;
        this.job = job;
    }

    calculateAge() {
        //add method code here, this class now has a method!
        var d = new Date();
        var age = d.getFullYear() - this.birthYear;
        console.log(age); //there is some bug in the code in this section as this number logs NaN
    }

    static greeting(){
        console.log('Hey there!');
    }
}

class Athlete6 extends Person6 {
    constructor(name, birthYear, job, olympics, medals) {
        super(name, birthYear, job);
        this.olympics = olympics;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();