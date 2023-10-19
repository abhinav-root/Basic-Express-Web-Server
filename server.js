const express = require("express");
require("dotenv").config();
const uuid = require("uuid");

const app = express();
app.use(express.json());
let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ msg: "Invalid request" });
  }
  const todo = { id: uuid.v4(), title };
  todos.push(todo);
  return res.status(201).json({ msg: "Todo created", data: todo });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "Invalid request" });
  }
  const updated = todos.filter((todo) => todo.id !== id);
  todos = updated;
  return res.json({ msg: `Delete todo with id ${id}` });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
