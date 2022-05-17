require('dotenv').config()
const {MongoClient} = require('mongodb');
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Add route where u add a new user with schema
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log("--------------/--------------")
  client.connect(async err => {
    const collection = client.db("pickMeUp").collection("pickMeUp.pickupLines");
    if (err){
      res.send("Error: ", err)
    }
    else{
      res.send("Connected to MongoDB")
    }
  })  
})

app.put('/get-pickup-lines', async (req, res)=>{
    console.log("--------------/get-pickup-lines--------------")
    const {name: nameDB} = req.body;
    client.connect(async err => {
        const collection = client.db("pickMeUp").collection("pickMeUp.pickupLines");
        collection.find({name:nameDB}).sort({rating:-1}).toArray((err, result) => {
          res.send(result.slice(result.length/2))
        })
    })
  }) 

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})