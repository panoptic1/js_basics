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
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    //income object constructor
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    var data = {

        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },
        
        budget: 0,
        percentage: -1
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

        deleteItem: function(type, id) {
            var ids, index;
            // id = 6
            //if ids = [1, 2, 4, 6, 8]
            //how would you determine that 6 is at ids[3]?

            var ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            }
        },

        calculateBudget: function() {

            // calculate total income and expenses
            calculateTotal(`exp`);
            calculateTotal(`inc`);

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },

        calculatePercentages: function() {
            /*
            percentage = item / income.
            */
           data.allItems.exp.forEach(function(current){
               current.calculatePercentage(data.totals.inc);
           });
        },

        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(current){
                return current.getPercentage();
            });
            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        expenseContainer: `.expenses__list`,
        budgetLabel: `.budget__value`,
        incomeLabel: `.budget__income--value`,
        expenseLabel: `.budget__expenses--value`,
        percentageLabel: `.budget__expenses--percentage`,
        container: `.container`,
        itemPercentage: `.item__percentage`,
        dateLabel: `.budget__title--month`
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec;
        /*
        + or - before the number
        exactly two decimal points
        comma separating the thousands
        */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split(`.`);

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3 , 3); //input 2310, output 2,310
        }
        dec = numSplit[1];

        return (type === 'exp' ? `-` :  `+`) + ` ` + int + `.` + dec;
    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type : document.querySelector(DOMstrings.inputType).value, // will be either 'inc' or 'exp'
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //Create HTML string with placeholder text
            if (type === `inc`){
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="inc-%id%">
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
                html =  `<div class="item clearfix" id="exp-%id%">
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
            newHtml = html.replace(`%id%`, obj.id);
            newHtml = newHtml.replace(`%description%`, obj.description);
            newHtml = newHtml.replace(`%value%`, formatNumber(obj.value, type));

            console.log(obj);
            
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML(`beforeend`, newHtml);
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + `,` + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, `inc`);
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, `exp`);

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + `%`;
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = `---`;
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.itemPercentage);

            nodeListForEach(fields, function(current, index){
                // do stuff
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + `%`;
                } else {
                    current.textContent = '---'
                }

            });
        },

        displayMonth: function() {
            var now, month, months, year;
            now = new Date();
            
            months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `September`, `October`, `November`, `December`];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

        },

        changeType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + `,` +
                DOMstrings.inputDescription + `,` +
                DOMstrings.inputValue
            );
            
            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

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

        document.querySelector(DOM.container).addEventListener(`click`, ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener(`change`, UIController.changeType)
    };

    var updatePercentages = function() {
        // 1. Calculate percentages
        budgetController.calculatePercentages();

        // 2. Read percentages from the budget controller
        var percentages = budgetController.getPercentages();

        // 3. Update the UI with the new percentages
        UIController.displayPercentages(percentages);
    }

    var updateBudget = function() {
        // 1. calculate the budget
        budgetController.calculateBudget();

        // 2. return the budget
        var budget = budgetController.getBudget();

        // 3. display the budget
        UIController.displayBudget(budget);
    }

    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. get the field input data
        var input = UIController.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0){

            // 2. add the item to the budget controller
            var newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. add the new item to the UI
            UIController.addListItem(newItem, input.type);

            // 4. clear the fields
            UIController.clearFields();

            // 5. Calculate and update the budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event){
        
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split(`-`);
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete the item from the data structure
            budgetController.deleteItem(type, ID);

            // 2. delete the item from the UI
            UIController.deleteListItem(itemID);

            // 3. update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
    }

    return {
        init: function() {
            console.log(`Application has started.`);
            UIController.displayMonth();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();