const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://mongo:mongo@java-coffee.06pqnyw.mongodb.net/?retryWrites=true&w=majority&appName=Java-Coffee";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();

        await addRecipe('John', 'Pasta', 'Boil water, Add pasta, Cook for 10 minutes', 'Pasta, Water');

        await getRecipe('Pasta', 'John');

    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function addRecipe(creator, food, steps, ings) {
    let ingredients = [];
    let recipe = [];
    step = ''
    let ing = '';

    for (let i = 0; i < ings.length; i++) {
        ing += ings[i];
        if (ings[i] == ',' || i == ings.length - 1) {
            if (i != ings.length - 1) {
                ing = ing.slice(0, ing.length - 1);
            }
            ingredients.push(ing);
            ing = '';
        }
    }

    for (let j = 0; j < steps.length; j++) {
        step += steps[j];
        if (steps[j] == ',' || j == steps.length - 1) {
            if (j != steps.length - 1) {
                step = step.slice(0, step.length - 1);
            }
            recipe.push(step);
            step = '';
        }
    }

    await client.db("DishDiscover").collection("Recipes").insertOne({creator: creator, name: food, recipe: recipe, ingredients: ingredients});
} 

async function getRecipe(food, creator) {
    const recipe = await client.db("DishDiscover").collection("Recipes").findOne({name: food, creator: creator});
    console.log(recipe);
}

async function doomsday() {
    await client.db("DishDiscover").collection("Recipes").deleteMany({});
}