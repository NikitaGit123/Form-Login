// config/db.js
const mysql = require('mysql');

const createDBConnection = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admin'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  return connection;
};

module.exports = createDBConnection;
