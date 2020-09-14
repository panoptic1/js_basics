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
    
    var DOMstrings = {
        inputType: `.add__type`,
        inputDescription: `.add__description`,
        inputValue: `.add__value`,
        inputBtn: `.add__btn`
    };

    return {
        getInput: function() {
            return {
                type : document.querySelector(DOMstrings.inputType).value, // will be either 'inc' or 'exp'
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

//GLOBAL APP CONTROLLER
//the app controller is the place where we tell the other modules what to do
//think of it as a 'go-between' or a 'corpus callosum' if you will
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function(){
        var DOM = UIController.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener(`click`, ctrlAddItem);

        document.addEventListener('keypress', function(event){
        
        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
            };
        });
    };



    var ctrlAddItem = function() {
        // 1. get the field input data
        var input = UIController.getInput();

        console.log(input);

        // 2. add the item to the budget controller

        // 3. add the new item to the UI

        // 4. calculate the budget

        // 5. display the budget
        
    };

    return {
        init: function() {
            console.log(`Application has started.`);
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();