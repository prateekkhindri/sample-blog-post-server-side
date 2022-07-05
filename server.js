const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

const { connectToDatabase } = require("./db/connection.js");
connectToDatabase();

const ejs = require("ejs");
const cors = require("cors");

const path = require("path");

const PORT = process.env.PORT || 3000;

// Applying middlewares for ejs
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", ejs.renderFile);

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.set("views", path.join(__dirname, "views"));
app.use(cors());

const blogRouter = require("./routes/blogRouter.js");

// console.log(__dirname);
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
