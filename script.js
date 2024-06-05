const fs = require('fs').promises;
const { MongoClient } = require('mongodb');
let creator = document.getElementById('createName').value;
let food = document.getElementById('createFood').value;
let steps = document.getElementById('createRecipe').value;
let ings = document.getElementById('createIngredients').value;
let client;

let theKey = '';

async function readKey() {
    try {
        theKey = await fs.readFile('mongoKey', 'utf8');
        const uri = "mongodb+srv://mongo:" + theKey + "@java-coffee.06pqnyw.mongodb.net/?retryWrites=true&w=majority&appName=Java-Coffee";
        client = new MongoClient(uri);
    } catch (err) {
        console.error("Couldn't read from file: ", err);
        process.exit(1); 
    }
}

async function main() {
    await readKey();

    try {
        await client.connect();

        //await addRecipe(client, 'John', 'Pasta', 'Boil water, Add pasta, Cook for 10 minutes', 'Pasta, Water');
        // await getRecipe(client, 'Pasta', 'John');

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function addRecipe() {
    alert(creator + " " + food + " " + steps + " " + ings);
    let ingredients = ings.split(',').map(ing => ing.trim());
    let recipe = steps.split(',').map(step => step.trim());

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
