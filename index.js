// import { ObjectId } from "mongodb";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId  } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://iridescent-lily-be83f9.netlify.app",
//     ],
//     credentials: true,
//   })
// );


app.use(cors({
  origin: ['http://localhost:5173',
 'https://665d9386c001c34401e43ad4--lucent-ganache-1a7d20.netlify.app',
 "https://665d97d8c001c34840e43a4a--stalwart-rabanadas-c04778.netlify.app"


]
 
 ,credentials: true}));

app.use(morgan('dev'))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My portfolio is representing");
});

// app.get("/users", (req, res) => {
//   res.send(users);
// });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qwpvc8e.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const portfolioCollection
    = client.db("portfolioDb").collection("portfolioCollection");


     
  app.get('/project',async(req,res) => {
    const cursor =portfolioCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  })

   
  app.get('/project/:id',async(req,res) => {
    const id = req.params.id;
    const query ={_id : ObjectId(id)};
    const result = await portfolioCollection.findOne(query);
    res.send(result);
  })




    app.post("/project", async (req, res) => {
      const newProject = req.body;
      console.log(newProject);
      const result = await portfolioCollection.insertOne(newProject);
      res.send(result);
    });


    app.delete('/project/:id',async(req,res)=> {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await portfolioCollection.deleteOne(query);
      res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`sever is running on port ${port}`);
});





