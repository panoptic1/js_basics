console.log("#434-From Callback Hell to Promises");

function getRecipe() {
    setTimeout(() => {
        const recipeIDs = [13, 27, 43, 102, 265];
        console.log(recipeIDs);

        setTimeout((id) => {
            const recipe = {title: `Grilled Mushroom Tacos`, publisher: `Ryan`};
            console.log(`${id} : ${recipe.title} by ${recipe.publisher}`);
            setTimeout( publisher => {
                const recipe2 = {title: `Italian Beanballs`, publisher: `Ryan`};
                console.log(`Also by ${publisher}: ${recipe2.title}`);
            }, 1500, recipe.publisher);

        }, 1000, recipeIDs[2]);

    }, 1500);
}

getRecipe();

//The triangular shape that is forming as the setTimeouts continue to nest is what is known as 'callback hell'
