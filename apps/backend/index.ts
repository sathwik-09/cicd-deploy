import express from "express";
import { prisma } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  prisma.user.findMany()
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(401).json({ error: "Username and password are required" });
    return
  }

  prisma.user.create({
    data: {
      email,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080);