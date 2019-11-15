// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
var mysql = require("mysql");

// Set up our connection information
var connection;

if (process.env.NODE_ENV === "production") {
  const connectionString = process.env.JAWSDB_URL;
  connection = mysql.createConnection(connectionString);
} else {
  connection = mysql.createConnection({
    port: 3306,
    host: "127.0.0.1",
    user: "tetrisuser",
    password: "tetris",
    database: "tetris"
  });
}

// Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;