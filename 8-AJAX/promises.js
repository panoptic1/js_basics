console.log("#434-Wherein I learn about promises.");

const getIDs = new Promise ((resolve, reject) => { //the function planted inside of the Promise is called 'the executor'. Pretty badass. 
    setTimeout(() => {
        resolve([13, 27, 43, 102, 265]);
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = {title: `Grilled Mushroom Tacos`, publisher: `Ryan`};
            resolve(`${ID} : ${recipe.title} by ${recipe.publisher}`);
        }, 1500, recID);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {title: `Italian Beanballs`, publisher: `Ryan`};
                resolve(`Also by ${pub} : ${recipe.title}`);
        }, 1500, publisher);
    })
};

// getIDs
// .then(IDs => {
//     console.log(IDs);
//     return getRecipe(IDs[2])
// })
// .then(recipe => {
//     console.log(recipe);
//     return getRelated('Ryan');
// })
// .then(recipe => {
//     console.log(recipe);
// })
// .catch(error => {
//     console.log(error);
// })

//Using Async/Await to consume promises

async function getRecipesAsync() {
    const IDs = await getIDs;
    console.log(IDs);
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    const related = await getRelated('Ryan Helgerson');
    console.log(related);
}

getRecipesAsync();