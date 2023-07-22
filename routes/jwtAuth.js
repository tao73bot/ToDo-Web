const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// registering

router.post("/register", async (req, res) =>{
    try {
        // the req.body (name,email,password)

        const { name, email, password} = req.body;

        // check if user exit

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);

        if(user.rows.length !==0){
            return res.status(401).send("User already exist");
        }

        // Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // enter new user inside our database

        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES($1, $2, $3)",[name,email,bcryptPassword]);

        // generating jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;