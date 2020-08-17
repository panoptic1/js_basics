console.log("So how does this shit work behind the scenes, anyway?");

//Hoisting
// calculateAge(1983);

// function calculateAge(year) {
//     console.log(2020 - year);
// }

// retirement(1983);

var retirement = function(year){
    console.log(65 - (2020-year));
}

retirement(1990);
/**
 * Why does this execute right away? In the creation phase
 * of the execution context (the global execution context),
 * the function declaration calculateAge is stored on the
 * variable object before the code is executed.
 * Thus, it's ready to go right away. 
 * Why would you want to call it before defining it?
 * I'm not sure. 
 * But it doesn't work with function expressions.
 */

 //variables

 console.log(age);
 var age = 37;
 console.log(age);

 //this is how hoisting works with variables.
 function foo() {
     var age = 65;
     console.log(age);
 }

 foo();
 console.log(age);
//  37 logs 65 as it is called within the context of the foo function
//  41 logs 37, as it is scoped on the global level

//Step 2: The creation of the Scope chain

//Scoping answers the question: where can we access a given variable?
//Each new function creates a scope: the space/environment in which the variables it defines are accessible
//Lexical scoping: a function that is lexically within another function gets access to the scope of hte outer function

var a = 'Hello?';
var chorus = "There is no pain; you are receding."

first();

function first() {
    var b = 'Is there anybody out there?';
    second();
    function second() {
        var c = 'Just knock if you can hear me. ';
        console.log(a + b + c);
        third(); //so this one works becauase of hoisting...
    }
}

function third() {
    var d = "Is there anyone at all?";
    // console.log(a + b + c + d);
    //...but this one ^ doesn't work because of scoping. 
    console.log(d, chorus); //but this one works because 'd' is local and 'chorus' is global
}

//This is the scope chain, it works backward toward the parents toward GOD(the window)

//What about 'this' tho?

//The 'this' keyword, as I know by now, behaves differently depending on where it is called
//If called as part of a regular function call, it refers to the global object (the window)
//If called as part of a method, it refers to the object that is calling the method
//'this' is not assigned a value when called within an object. It's referant is fluid, as it is attached to an execution context...
//which is only established when a function is invoked.

console.log(this); //logs the window object

//let's return to our calculate age function...
// calculateAge(1983);

// function calculateAge(year) {
//     console.log(2020 - year,);
//     console.log(this); //this ALSO logs the window object, as it is being invoked as part of a regular function call
// }

var ryan = {
    fullName : 'Ryan Helgerson',
    yob: 1983,
    sign: 'Aries',
    elucidateThis: function(){
        console.log(this);
    },
    calculateAge: function(){
        console.log(2020 - this.yob);
        innerFunction();
        function innerFunction(){
            console.log(this);
        }
    },
}

ryan.elucidateThis();
ryan.calculateAge();

var mike = {
    name: 'Mikey D',
    yob: 1984,
}

//Say we want to calculate Mikey D's age, but we don't want
//to go through the trouble of duplicating the code for the calculateAge
//method on the 'john' object.
//This is where 'method borrowing' could come in handy...

mike.calculateAge = ryan.calculateAge;

//BOOM. You declare a new property on the mike object and set it as equal
//to the the method that you want to emulate. 

mike.calculateAge();

//the fact that Mike's info is logged with a method that was originally attached
//to the 'ryan' object...that demonstrates how 'this' only takes on meaning after
//it has been invoked.



