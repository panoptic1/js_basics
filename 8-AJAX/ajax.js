console.log(`#437-Making AJAX calls.`);

fetch('https://api.tronalddump.io/random/quote')
.then(response => {
    console.log(response);
    return response.json(); //I struggled with this for a moment as I had forgotten about having to use this method to convert the data
})
.then(data => {
    console.log(data);
    console.log(data.value);
})
.catch(error => console.log(error));