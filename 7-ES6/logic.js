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
