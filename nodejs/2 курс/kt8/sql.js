const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test_db',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});