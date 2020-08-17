var johnTabs = {
    name: 'John',
    subtotals : [124, 48, 268, 180, 42],
    
    calcTips : function () {
        this.tips = [];
        this.totals = [];

        for (var i = 0; i < this.subtotals.length; i++){
            var percentage;
            var bill = this.subtotals[i]
    
            if (bill < 50) {
                percentage = .2;
            }
            else if (bill >= 50 && bill < 200) {
                percentage = .15;
            }
            else {
                percentage = .1;
            }
    
            //Add results to the corresponding arrays
            this.tips[i] = bill * percentage;
            this.totals[i] = bill + bill * percentage; 
        }
        
    }

}

var markTabs = {
    name: 'Mark',
    subtotals : [77, 475, 110, 45],
    calcTips : function () {
        this.tips = [];
        this.totals = [];

        for (var i = 0; i < this.subtotals.length; i++)
        {
            var percentage;
            var bill = this.subtotals[i];

            if (bill < 100) {
                percentage = .2;
            }
            else if (bill >= 100 && bill < 300) {
                percentage = .1;
            }
            else {
                percentage = .25;
            }

            //Add results to the corresponding arrays
            this.tips[i] = bill * percentage;
            this.totals[i] = bill + bill * percentage;
        }
    },
}

johnTabs.calcTips();
markTabs.calcTips();

console.log(johnTabs, markTabs)

function calcAverage(tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; i++){
        sum += tips[i];
    }
    return sum / tips.length;
};

johnTabs.average = calcAverage(johnTabs.tips);
markTabs.average = calcAverage(markTabs.tips);

console.log(johnTabs, markTabs);