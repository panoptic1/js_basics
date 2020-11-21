console.log(`#437-Making AJAX calls.`);


function getDumbassQuote() {
    fetch('https://api.tronalddump.io/random/quote')
.then(response => {
    //console.log(response);
    return response.json(); //I struggled with this for a moment as I had forgotten about having to use this method to convert the data
})
.then(data => {
    //console.log(data);
    console.log(`A random dumbass thing that was said by the orange president: "${data.value}" Seriously, what a dumbass.`);
})
.catch(error => console.log(error));

}

getDumbassQuote();

async function getDumbassQuoteAS(){
    const result = await fetch('https://api.tronalddump.io/random/quote');
    const data = await result.json();
    console.log(data);
    console.log(`Here is an asychronous dumbass quote: "${data.value}"`)
    return data;
}

getDumbassQuoteAS()

//if you want to get and store the value of the async function in the global scope, this will not work:
const dumbassQuote = getDumbassQuoteAS();
console.log(dumbassQuote);
// the reason for that is the reason why the log statement on line 32 makes it to the console before the statements
// on lines 23 and 24: the log statement on line 32 is executed before the value has been returned by the asynchronous function
let asyncDummy;
getDumbassQuoteAS().then(data => {
    asyncDummy = data;
    console.log(asyncDummy);
});

