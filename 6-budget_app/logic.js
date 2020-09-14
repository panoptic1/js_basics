console.log("Let's organize our finances!");

//the module pattern
//(uses an IIFE)

//BUDGET CONTROLLER
var budgetController = (function() {
    
    //expense object constructor
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //income object constructor
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {

        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //Create a new, unique ID based on the ID of the last index in the array
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1; //?
            } else {
                ID = 0;
            };

            //Create a new item based on 'inc' or 'exp' type
            if (type === `exp`) {
                newItem = new Expense(ID, des, val);
            } else if (type === `inc`) {
                newItem = new Income(ID, des, val);
            }

            //Push it into our data structure
            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

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
        inputBtn: `.add__btn`,
        incomeContainer: `.income__list`,
        expenseContainer: `.expenses__list`
    };

    return {
        getInput: function() {
            return {
                type : document.querySelector(DOMstrings.inputType).value, // will be either 'inc' or 'exp'
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //Create HTML string with placeholder text
            if (type === `inc`){
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%">
                        <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`
            } else if (type === `exp`) {
                element = DOMstrings.expenseContainer;
                html =  `<div class="item clearfix" id="expense-%id%">
                        <div class="item__description">%description%</div>
                        <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__percentage">21%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`
            }

            //Replace the placeholder text with some actual data
            newHtml = html.replace(`%id`, obj.id);
            newHtml = newHtml.replace(`%description%`, obj.description);
            newHtml = newHtml.replace(`%value%`, obj.value);

            console.log(obj);
            
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML(`beforeend`, newHtml);
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
        var input, newItem;
        
        // 1. get the field input data
        var input = UIController.getInput();

        // 2. add the item to the budget controller
        var newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. add the new item to the UI
        UIController.addListItem(newItem, input.type);

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