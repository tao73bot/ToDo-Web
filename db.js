const Pool = require("pg").Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'todo_db',
    password: 'me0r73swe_sust',
    port: 5432
  });

  module.exports = pool;