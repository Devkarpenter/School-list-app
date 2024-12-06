import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost', // Replace with your host
  user: 'root',      // Replace with your username
  password: 'Dev@0404',      // Replace with your password
  database: 'school', // Replace with your database name
});

export default db;
