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

console.log(cardX);

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





