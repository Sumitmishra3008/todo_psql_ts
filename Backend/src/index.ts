import express from "express";
const app = express();
import cors from "cors";
app.use(cors());

import { PrismaClient } from "@prisma/client";
import { parse } from "path";
const prisma = new PrismaClient();

app.use(express.json());
app.get("/todo", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json({ todos });
});

app.post("/addtodo", async (req, res) => {
  const { title, description } = req.body;
  const todo = await prisma.todo
    .create({
      data: {
        title: title as string,
        description: description as string,
        completed: false,
      },
    })
    .catch((e: any) => {
      console.error("Error creating todo:", e);
      res.status(500).json({ error: "Failed to create todo" });
    });
  res.status(201).json({ todo });
});

app.put("/updatetodo", async (req, res) => {
  const id = req.query.id;
  const id2: number = parseInt(id as string);
  const todo = await prisma.todo
    .update({
      where: { id: id2 },
      data: {
        completed: !req.body.completed,
      },
    })
    .catch((e: any) => {
      console.error("Error updating todo:", e);
      res.status(500).json({ error: "Failed to update todo" });
    });
  res.status(200).json({ message: "Todo updated successfully", todo });
});

app.put("/deletetodo/", async (req, res) => {
  const id: any = req.query.id;
  const id2: number = parseInt(id);
  const todo = await prisma.todo
    .delete({
      where: { id: id2 },
    })
    .catch((e: any) => {
      console.error("Error deleting todo:", e);
      res.status(500).json({ error: "Failed to delete todo" });
    });
  res.status(200).send({ message: "Todo deleted successfully", todo });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
