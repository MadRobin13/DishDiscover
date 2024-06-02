const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://mongo:mongo@java-coffee.06pqnyw.mongodb.net/?retryWrites=true&w=majority&appName=Java-Coffee";


async function main() {
    try {
        const client = new MongoClient(uri);
        await client.connect();

        await client.db("DishDiscover").collection("Recipes").insertOne({name: "Burger", recipe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales enim ac condimentum blandit. Curabitur iaculis nibh molestie eros dapibus, sit amet pharetra massa imperdiet.", ingredients: ["bun", "patty", "lettuce", "tomato", "onion"]});

    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);