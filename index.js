const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express');
const cors = require('cors');
require('dotenv').config()
const items = require('./pottery.json');
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(express.json())
app.use(cors())

console.log(process.env.DB_USER);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wal4hcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const craftCollection = client.db('craftDB').collection('craftProduct');


    app.get('/addProduct', async(req, res)=>{
      const cursor = craftCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get("/myProduct/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await craftCollection.find({ userEmail: req.params. email }).toArray();
      res.send(result)
    })


    app.post('/addProduct', async(req, res)=>{
      const newProduct = req.body;
      console.log(newProduct);
      const result = await craftCollection.insertOne(newProduct);
      res.send(result)
    })


    app.put('/item/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updatedItem = req.body;

      const product = {

        // name,
        // subcategory,
        // description,
        // price,
        // rating,
        // customization,
        // processingTime,
        // stockStatus,
        // photo


          $set: {
              name: updatedItem.name, 
              subcategory: updatedItem.subcategory, 
              description: updatedItem.description, 
              price: updatedItem.price, 
              rating: updatedItem.rating, 
              customization: updatedItem.customization, 
              processingTime: updatedItem.processingTime, 
              stockStatus: updatedItem.stockStatus, 
              photo: updatedItem.photo
          }
      }

      const result = await coffeeCollection.updateOne(filter, product, options);
      res.send(result);
  })


  app.delete('/item/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await craftCollection.deleteOne(query);
    res.send(result);
})









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get('/', (req, res) => {
    res.send('Hello')
  })
app.get('/items', (req, res) => {
    res.send(items)
  })
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item=> item.id === id) || {}
    res.send(item)
  })














  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
