import { Client } from "pg";
import express from "express";
const app = express()
app.use(express.json())
// initialse the istance of Client
const pgClient = new Client("postgresql://neondb_owner:npg_8UJa5xnILoqT@ep-green-waterfall-av3r22an-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

pgClient.connect()

app.post('/signup', async(req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  const inseerQuery = `INSERT INTO users (username, email , password) VALUES ('${username}','${email}','${password}');`
  console.log(inseerQuery)
  const response = await pgClient.query(inseerQuery)
  
  res.json({
    message:"You signed up successflly"
  })

  
})

app.listen(3000)