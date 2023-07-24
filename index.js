const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());  
app.use(bodyParser.json())

// Routes//

// Register and Login routes

app.use("/auth",require("./routes/jwtAuth"));

// dashboard route

app.use("/dashboard", require("./routes/dashboard"));

// create a todo

app.post("/createTodo",async(req,res) => {
    try{
        const { id, description, mail} = req.body;        
        const newTodo = await pool.query("INSERT INTO todo (description, id, email) VALUES ($1 , $2, $3) RETURNING *",[description, id, mail]);

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

app.put("/update/:id", async (req, res) =>{
    try {
        const { id } = req.params; // WHERE
        const { description } = req.body; // SET

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2",[description,id]);

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});


// Delete a todo

app.delete("/delete/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1",[id]);

        res.json("Todo was Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/fetch', async (req, res) => {
    const { mail } = req.body;

    
    if (!mail) {
        return res.status(400).json({ error: 'No mail provided.' });
    }

    try {

        const insertListSql = 'SELECT id, description from todo WHERE email = $1';
        reslt = await pool.query(insertListSql, [mail]);
        
        return res.json(reslt.rows);
    } catch (err) {
        
        console.error(' verification error:', err.message);
        return res.status(401).json({ error: 'Invalid .' });
    }
});

app.listen(5000, () =>{
    console.log("sever is listening on port 5000");
});