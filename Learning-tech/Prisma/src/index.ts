import "dotenv/config";
import express from 'express'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";


const app=express()
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const client = new PrismaClient({ adapter });

app.get("/users", async(req, res) => {
  const users = await client.user.findMany()
  res.json({
    users
  })
})
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id
  const id=Number(userId)
  const user = await client.user.findFirst({
    where: {
      id
    },
    select: {
      todos: true,
      username: true,
      password: true,
      age:true
    }
  })
  res.json({
    user
  })
})
app.listen(3000)