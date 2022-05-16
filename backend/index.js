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

app.get('/get-pickup-lines', async (req, res)=>{
    console.log("--------------/get-pickup-lines--------------")
    client.connect(async err => {
        const collection = client.db("pickMeUp").collection("pickMeUp.pickupLines");
        collection.find({}).sort({rating:-1}).toArray((err, result) => {
            if (err){
                res.send(err)
                res.send(400)
            }
            else{
                res.send(result)
                res.sendStatus(200)
            }
        })
    })
  }) 

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})