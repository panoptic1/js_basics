console.log("Let's organize our finances!");

//the module pattern
//(uses an IIFE)

var budgetController = (function() {
    var x = 23;

    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }
})();