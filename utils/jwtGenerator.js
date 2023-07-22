const pool = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    // const expirationMinutes = 10;

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"});
}

module.exports = jwtGenerator;