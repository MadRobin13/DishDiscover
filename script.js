const fs = require('fs').promises;
const { MongoClient } = require('mongodb');

let theKey = '';

async function readKey() {
    try {
        theKey = await fs.readFile('mongoKey', 'utf8');
    } catch (err) {
        console.error("Couldn't read from file: ", err);
        process.exit(1); 
    }
}

async function main() {
    await readKey();

    const uri = "mongodb+srv://mongo:" + theKey + "@java-coffee.06pqnyw.mongodb.net/?retryWrites=true&w=majority&appName=Java-Coffee";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        await addRecipe(client, 'John', 'Pasta', 'Boil water, Add pasta, Cook for 10 minutes', 'Pasta, Water');
        await getRecipe(client, 'Pasta', 'John');

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function addRecipe(client) {
    alert('in');
    let creator = document.getElementById('createName').value;
    let food = document.getElementById('createFood').value;
    let steps = document.getElementById('createRecipe').value;
    let ings = document.getElementById('createIngredients').value;
    let ingredients = [];
    let recipe = [];
    let step = '';
    let ing = '';

    for (let i = 0; i < ings.length; i++) {
        ing += ings[i];
        if (ings[i] == ',' || i == ings.length - 1) {
            if (i != ings.length - 1) {
                ing = ing.slice(0, ing.length - 1);
            }
            ingredients.push(ing.trim());
            ing = '';
        }
    }

    for (let j = 0; j < steps.length; j++) {
        step += steps[j];
        if (steps[j] == ',' || j == steps.length - 1) {
            if (j != steps.length - 1) {
                step = step.slice(0, step.length - 1);
            }
            recipe.push(step.trim());
            step = '';
        }
    }

    await client.db("DishDiscover").collection("Recipes").insertOne({
        creator: creator,
        name: food,
        recipe: recipe,
        ingredients: ingredients
    });
}

async function getRecipe(client, food, creator) {
    const recipe = await client.db("DishDiscover").collection("Recipes").findOne({ name: food, creator: creator });
    console.log(recipe);
}

async function doomsday(client) {
    await client.db("DishDiscover").collection("Recipes").deleteMany({});
}
