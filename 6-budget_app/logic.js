console.log("Let's organize our finances!");

//the module pattern
//(uses an IIFE)

//BUDGET CONTROLLER
var budgetController = (function() {
    //some code

})();

//because of the IIFE and the closure, none of the code within both
//of these functions will ever interact. 
//This is called 'Separation of Concerns'

//UI CONTROLLER
var UIController = (function() {
    //some code

})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        // 1. get the field input data

        // 2. add the item to the budget controller

        // 3. add the new item to the UI

        // 4. calculate the budget

        // 5. display the budget
        console.log(`It works!`);
    }
    document.querySelector(`.add__btn`).addEventListener(`click`, ctrlAddItem);

    document.addEventListener('keypress', function(event){
        console.log(event.keyCode);
        if (event.keyCode === 13 || event.which === 13){
            console.log(`You pressed enter!`);
            ctrlAddItem();
        };
    });
})(budgetController, UIController);