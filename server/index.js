const compression = require("compression");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const db = require("../server/db/db");

// Gzip
app.use(compression());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + "/../dist"));

// Start the app by listening on the default
// Heroku port
app.listen(port);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

app.get("/sign-in", (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/sign-in/sign-in.html"));
});

app.get("/aaa", (req, res) => {
  res.send("aaa");
});

app.get("/db", (req, res, next) => {
  console.log("db connetting...");
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
      res.send("err");
    } else {
      client.query("select * from users", (err, result) => {
        res.send(result.rows);
      });
    }
  });
});

console.log(`Server listening on ${port}`);
