require('dotenv').config()
import { MongoClient } from 'mongodb';
import express, { json } from 'express';
const app = express()
const port = 5000
import cors from 'cors';
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Add route where u add a new user with schema
app.use(cors())
app.use(json())

app.get('/', (req, res) => {
  client.connect(async err => {
    const collection = client.db("BlackJack").collection("Users");
    if (err){
      res.send("Error: ", err)
    }
    else{
      res.send("Connected to MongoDB")
    }
  })  
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})