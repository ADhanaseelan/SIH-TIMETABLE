const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "timetable",
  password: "123456789",
  port: 5432,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
