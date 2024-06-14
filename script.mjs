// const fs = require('fs').promises;
// const { MongoClient } = require('mongodb');

import {promises as fs} from 'fs';
import { MongoClient} from 'mongodb';
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

        await addRecipe();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

export async function addRecipe(newFood) {

    await client.db("DishDiscover").collection("Recipes").insertOne(newFood);

    console.log(newFood);
}

async function getRecipe(client, food, creator) {
    const recipe = await client.db("DishDiscover").collection("Recipes").findOne({ name: food, creator: creator });
    console.log(recipe);
}

async function doomsday(client) {
    await client.db("DishDiscover").collection("Recipes").deleteMany({});
}

//module.exports = { addRecipe, getRecipe, doomsday };