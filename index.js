const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL database connection configuration
const dbConfig = {
  host: 'mysql',
  user: 'rootkhalid',
  password: 'rootkhalid',
  database: 'pole'
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Route to check the database connection
app.get('/', (req, res) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection error:', err.message);
      res.status(500).send(`Database connection error: ${err.message}`);
      return;
    }

    // Check if the connection is successful
    res.send('Database connection successful');

    // Release the connection back to the pool
    connection.release();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
