const fs = require("fs");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("sampleDatabase.db");

const data = JSON.parse(fs.readFileSync("./data.json"));
db.run(`CREATE TABLE IF NOT EXISTS sampleData (
    userId INTEGER,
    id INTEGER,
    title TEXT,
    body TEXT
  );`);

data.forEach((item) => {
  db.run(
    `insert into sampleData (userId, id, title, body) values ('${item.userId}', '${item.id}', '${item.title}', '${item.body}');`
  );
});
