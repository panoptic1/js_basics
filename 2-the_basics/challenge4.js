/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. 
Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. 
   Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. 
   Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/

console.log("Challenge accepted!");

var ryan = {
    first: "ryan",
    last: "helgerson",
    weight: 200,
    toKg: function () {
        this.weightKg = this.weight / 2.205
    },
    inchesTall: 74,
    toMeters: function () {
        this.heightMeters = this.inchesTall * .0254;
    },
    calcBmi: function () {
        this.bmi = this.weightKg / (this.heightMeters * this.heightMeters);
    },
};

ryan.toKg();
ryan.toMeters();
ryan.calcBmi();
console.log(ryan);

var troy = {
    first: "troy",
    last: "helgerson",
    weight: 220,
    toKg: function () {
        this.weightKg = this.weight / 2.205
    },
    inchesTall: 75,
    toMeters: function () {
        this.heightMeters = this.inchesTall * .0254;
    },
    calcBmi: function () {
        this.bmi = this.weightKg / (this.heightMeters * this.heightMeters);
    },
};

troy.toKg();
troy.toMeters();
troy.calcBmi();

var danny = {
    first: "danny",
    last: "tipping",
    weight: 165,
    toKg: function () {
        this.weightKg = this.weight / 2.205
    },
    inchesTall: 71,
    toMeters: function () {
        this.heightMeters = this.inchesTall * .0254;
    },
    calcBmi: function () {
        this.bmi = this.weightKg / (this.heightMeters * this.heightMeters);
    },
};

danny.toKg();
danny.toMeters();
danny.calcBmi();

console.log(ryan.bmi, troy.bmi, danny.bmi);

if (ryan.bmi > troy.bmi && ryan.bmi > danny.bmi) {
    console.log(`${ryan.first}` + ` ` + `${ryan.last} has the highest BMI, coming in at an index of ${ryan.bmi}.`)
} else if (troy.bmi > ryan.bmi && troy.bmi > danny.bmi) {
    console.log(`${troy.first}` + ` ` + `${troy.last} has the highest BMI, coming in at an index of ${troy.bmi}.`)
} else if (danny.bmi > troy.bmi && danny.bmi > ryan.bmi) {
    console.log(`${danny.first}` + ` ` + `${danny.last} has the highest BMI, coming in at an index of ${danny.bmi}.`)
} else if (ryan.bmi > troy.bmi && ryan.bmi > danny.bmi) {
    console.log(`${ryan.first}` + ` ` + `${ryan.last} has the highest BMI, coming in at an index of ${ryan.bmi}.`)
} else if (ryan.bmi === danny.bmi) {
    console.log(`${ryan.first} & ${danny.first} both have the hightest BMI, coming in at an index of ${ryan.bmi}.`)
} else if (ryan.bmi === troy.bmi) {
    console.log(`${ryan.first} & ${troy.first} both have the highest BMI, coming in at an index of ${ryan.bmi}.`)
}  else if (danny.bmi === troy.bmi) {
    console.log(`${danny.first} & ${troy.first} both have the highest BMI, coming in at an index of ${troy.bmi}.`)
}  else {
    console.log("Something's not right here!");
}

