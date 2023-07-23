const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());  // allows us to access the req.body

// Routes//

// Register and Login routes

app.use("/auth",require("./routes/jwtAuth"));

// dashboard route

app.use("/dashboard", require("./routes/dashboard"));

// create a todo

app.post("/todos",async(req,res) => {
    try{
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);

        res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

// get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a todo

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo  = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a todo

app.put("/todos/:id", async (req, res) =>{
    try {
        const { id } = req.params; // WHERE
        const { description } = req.body; // SET

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});


// Delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);

        res.json("Todo was Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () =>{
    console.log("sever is listening on port 5000");
});