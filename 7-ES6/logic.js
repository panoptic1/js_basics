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

let i = 23;

for (let i =0; i < 5; i++) {
    console.log(i); //This logs 0, 1, 2, 3, 4...
}

console.log(i); //... and this logs '23'

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