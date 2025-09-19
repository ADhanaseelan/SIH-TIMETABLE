const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "timetable",
  password: "12345",
  port: 5432,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
