const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//Middle Ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jeljpdw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {

    try {
        await client.connect
        const serviceCollection = client.db("E-tools").collection("Service");

        const userCollection = client.db("E-tools").collection("User");
        const reviewCollection = client.db("E-tools").collection("Review");
        const orderCollection = client.db("E-tools").collection("Order");
        const adminCollection = client.db("E-tools").collection("Admin");


        console.log("db-connected")

        //get service Api
        app.get("/service", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        //get order Api
        app.get("/order", async (req, res) => {
            const query = {};
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })
        //post order Api
        app.post("/order", async (req, res) => {
            const order = req.body;
            const orders = await orderCollection.insertOne(order);
            res.send(orders);
        })
        //get service Api
        app.get("/service/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const cursor = await serviceCollection.deleteOne(query);

            res.send(cursor);
        })
        //get User Order Api
        app.get("/order/:email", async (req, res) => {
            const email = req.params.email
            const query = { email: email };
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray()
            res.send(result);
        })
        //get service Api
        app.get("/user/admin/:email", async (req, res) => {
            const email = req.params.email
            const query = { email:email };
            const cursor = await adminCollection.deleteOne(query);

            res.send(cursor);
        })
        //post Admin Api
        app.post("/admins", async (req, res) => {
            const admin = req.body;
            const admins = await adminCollection.insertOne(admin);
            res.send(admins);
        })
        //get Admin Api
        app.get("/admins", async (req, res) => {
            const query = {};
            const result = adminCollection.find(query);
            const admin = await result.toArray()
            res.send(admin);
        })
        //get user Admin Api
        app.get("/admins/:email", async (req, res) => {
            const email = req.params.email
            const query = {email:email};
            const result =await adminCollection.findOne(query);
            res.send(result);
        })
        //post service Api
        app.post("/service", async (req, res) => {
            const service = req.body;
            const services = await serviceCollection.insertOne(service);
            res.send(services);
        })
        //post user Api
        app.post("/user", async (req, res) => {
            const user = req.body;
            const users = await userCollection.insertOne(user);
            res.send(users);
        })
        //get user Api
        app.get("/user", async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
        //post user Review Api
        app.post("/review", async (req, res) => {
            const review = req.body;
            const reviews = await reviewCollection.insertOne(review);
            res.send(reviews);
        })
        //get user Review Api
        app.get("/review", async (req, res) => {
            const cursor = {};
            const reviews = reviewCollection.find(cursor);
            const result = await reviews.toArray()
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello From e tools!')
})

app.listen(port, () => {
    console.log(`e-tools App listening on port ${port}`)
})