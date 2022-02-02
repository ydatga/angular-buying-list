const compression = require("compression");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const db = require("../models/index");

app.use(express.json());
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
  res.sendFile(path.join(__dirname + "/../src/index.html"));
});

app.get("/api/show", (req, res, next) => {
  db.user
    .findAll({
      attributes: ["id", "name", "login_id", "pass"],
    })
    .then((users) => {
      res.send({ users: users });
    });
});

app.post("/api/createUser", (req, res) => {
  console.log(req.body);
  try {
    let falg = false;
    db.user
      .findAll({ where: { login_id: req.body.login_id } })
      .then((users) => {
        if (users.length > 0) {
          res.json({ success: false, id: null, name: null });
          flag = true;
        }
      });
    if (!flag) {
      db.user.create(req.body).then((user) => {
        res.json({ success: true, id: user.id, name: user.name });
      });
    }
  } catch {}
});

app.get("/api/delete-user/:id", (req, res) => {
  console.log("user deleting...");
  db.user.findByPk(req.params.id).then((user) => {
    res.send(user.destroy());
  });
});

app.get("/api/login", (req, res) => {
  const login_id = req.query.login_id;
  const password = req.query.password;
  db.user
    .findAll({ where: { login_id: login_id, pass: password } })
    .then((users) => {
      if (users.length !== 1) {
        res.json({ success: false, id: null, name: null });
      } else {
        const user = users[0];
        res.json({ success: true, id: user.id, name: user.name });
      }
    });
});

console.log(`Server listening on ${port}`);
