const router = require("express").Router();
const { db } = require("../db/connection.js");

function getAllblogs(res) {
  db.all(`SELECT * FROM ${process.env.tableName};`, [], (_, blogs) => {
    // console.log(data);
    res.render("index.html", { blogs });
  });
}

// Query for getting a single blog
function getSingleBlog(res, id) {
  db.get(
    `SELECT * FROM ${process.env.tableName} WHERE id=?;`,
    [id],
    (err, blog) => {
      if (err) return;
      res.render("blog.html", { blog });
    }
  );
}

// Get all blogs
router.get("/", (req, res) => {
  console.log("Started request on endpoint / ");
  getAllblogs(res);
});

// Get individual blog
// Specifying a dynamic parameter
router.get("/:blog_id", (req, res) => {
  console.log("Started request on endpoint / ");

  // res.send("This is a sample response");

  // const id = req.params.blog_id;
  // const { blog_id: id } = req.params;
  // console.log(req);
  const { blog_id } = req.params;

  getSingleBlog(res, blog_id);
});

// Create a new blog
router.post("/", (req, res) => {
  console.log("Started POST request on endpoint / ");
  console.log(req.body);
  console.log("Posting a blog");
  //   Queries

  db.run(
    `INSERT INTO ${process.env.tableName}(title, body) VALUES(?, ?)`,
    [req.body.title, req.body.body],
    (err) => {
      if (err) return console.log("Not successful");
      console.log("Insert successful");
    }
  );

  getAllblogs(res);
});

// Update an existing blog
// Specifying a dynamic parameter
router.put("/:blog_id", (req, res) => {
  console.log("Started PUT request on endpoint / ");

  const { blog_id } = req.params;

  console.log(req.query.body);

  // console.log(JSON.parse(Object.keys(req.body)[0]));

  db.run(
    `UPDATE ${process.env.tableName} SET title=?, body=? WHERE id=?;`,
    [req.query.title, req.query.body, blog_id],
    (err, data) => {
      // console.log(data);

      if (err) return;
      res.sendStatus(200);
    }
  );

  // res.send("Editing existing blog");
});

// Delete an existing blog
// Specifying a dynamic parameter
router.delete("/:blog_id", (req, res) => {
  console.log("Started delete request on endpoint / ");

  const { blog_id } = req.params;

  db.run(
    `DELETE FROM ${process.env.tableName} WHERE id=?;`,
    [blog_id],
    (err, data) => {
      // console.log(data);

      if (err) return;
      res.sendStatus(200);
    }
  );

  // res.send("This is a sample response");
});

module.exports = router;
