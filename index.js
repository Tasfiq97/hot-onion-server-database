const express = require('express')
const app = express()
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId=require("mongodb").ObjectId;
const cors=require("cors")
const port =process.env.PORT || 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qbrq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors());
 app.use(express.json())


 async function run() {
    try {
      await client.connect();
      const database = client.db("hotOnion");
      const foodCollection = database.collection("foods");

    // get method 
app.get("/foodAdd",async(req,res)=>{

    const result=await foodCollection.find({}).toArray();
    res.send(result);
})

// get single food 
app.get("/foodAdd/:id",async (req,res)=>{
    const id=req.params.id;
    console.log(id);
    const query={_id:ObjectId(id)}
    const result=await foodCollection.findOne(query);
    res.send(result);

})

    //   post method 
app.post("/foods",async(req,res)=>{
const foods=req.body
    const result = await foodCollection.insertOne(foods) 
    console.log(result);
    res.json(result);
})
    //   delete method 

    app.delete("/foods/:id",async(req,res)=>{
        const id=req.params.id 
        console.log(id)
        const query={_id:ObjectId(id)}
        const result=await foodCollection.deleteOne(query)
        res.json(result)
    })

    // api get method 

    app.get("/hello",async(req,res)=>{
      res.send("hello from heroku");
    })
      
    } 
    
    finally {
    //   await client.close();
    }
  }

  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})