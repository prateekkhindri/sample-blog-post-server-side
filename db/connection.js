const sqlite = require("sqlite3").verbose();

// Connecting to the database
const db = new sqlite.Database("./blogs.db");

const connectToDatabase = () => {
  // Database Logic
  const sqlQuery = `CREATE TABLE IF NOT EXISTS ${process.env.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        body TEXT
    );`;

  db.run(sqlQuery);
};

module.exports = {
  db,
  connectToDatabase,
};
