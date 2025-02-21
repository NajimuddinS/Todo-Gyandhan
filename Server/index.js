const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const Todo = require("./models/todo.js");
const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());

connectDB();


const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log(`the server is running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Todo app");
});

app.post("/api/todos", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const newTodo = new Todo({ title, description, priority });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({message:"error creating a todo" , err})
  }
});


app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ date: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
});

app.get('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo', error });
    }
});

app.get('/api/todos/:id/edit', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo for edit', error });
    }
})

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
})