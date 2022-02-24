const compression = require("compression");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const token = require("./token");

const db = require("../models/index");
const thing = require("../models/thing");

app.use(express.json());
// Gzip
app.use(compression());

app.use(express.static(__dirname + "/../dist"));

app.listen(port);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/../src/index.html"));
});

// app.get("/api/show", (req, res, next) => {
//   db.user
//     .findAll({
//       attributes: ["id", "name", "login_id", "pass"],
//     })
//     .then((users) => {
//       res.send({ users: users });
//     });
// });

app.post("/api/createUser", (req, res) => {
  try {
    let falg = false;
    db.user
      .findAll({ where: { login_id: req.body.login_id } })
      .then((users) => {
        if (users.length > 0) {
          res.json({ success: false, id: null, name: null });
          return;
        }
        const _token = token.createToken();
        db.user.create({ ...req.body, token: _token }).then((user) => {
          res.json({
            success: true,
            id: user.id,
            name: user.name,
            token: user.token,
          });
        });
      });
  } catch {}
});

// app.get("/api/delete-user/:id", (req, res) => {
//   console.log("user deleting...");
//   db.user.findByPk(req.params.id).then((user) => {
//     res.send(user.destroy());
//   });
// });

app.get("/api/login", (req, res) => {
  const login_id = req.query.login_id;
  const password = req.query.password;
  db.user
    .findOne({ where: { login_id: login_id, pass: password } })
    .then((user) => {
      if (user === null) {
        res.json({ success: false, id: null, name: null });
      } else {
        const _token = token.createToken();
        user.token = _token;
        user.save();
        res.json({
          success: true,
          id: user.id,
          name: user.name,
          token: user.token,
        });
      }
    });
});

app.post("/api/create-list", async (req, res) => {
  const authSuccess = await auth(req.body.authInfo);
  if (!authSuccess) {
    res.json({ error: "auth error" });
    return;
  }
  if (req.body.createinfo.user_id !== req.body.authInfo.user_id) {
    res.json({ error: "auth error" });
    return;
  }
  db.buying_list
    .create({
      ...req.body.createinfo,
      finished: false,
    })
    .then((list) => {
      res.json(list);
    });
});

app.post("/api/get-buying-lists/:user_id", async (req, res) => {
  const authSuccess = await auth({
    user_id: req.params.user_id,
    token: req.body.token,
  });
  if (authSuccess) {
    db.buying_list
      .findAll({ where: { user_id: req.params.user_id } })
      .then((lists) => {
        res.json(lists);
      });
  } else {
    res.json({ error: "auth error" });
  }
});

app.post("/api/get-buying-list/:id", async (req, res) => {
  let response = { success: true };
  const authSuccess = await auth(req.body.authInfo);
  if (!authSuccess) {
    res.json({ error: "auth error" });
    return;
  }
  db.buying_list.findByPk(req.params.id).then((value) => {
    if (value.user_id !== req.body.authInfo.user_id) {
      res.json({ error: "auth error" });
      return;
    }
    if (value === null) {
      res.json({ success: false });
    } else {
      db.thing.findAll({ where: { list_id: value.id } }).then((items) => {
        response.value = { ...value.dataValues, items };
        res.json(response);
      });
    }
  });
  return;
});

app.post("/api/create-thing", async (req, res) => {
  const authSuccess = await auth(req.body.authInfo);
  if (!authSuccess) {
    res.json({ error: "auth error" });
    return;
  }
  db.buying_list.findByPk(req.body.create_info.list_id).then((list) => {
    if (list.user_id !== req.body.authInfo.user_id) {
      res.json({ error: "auth error" });
      return;
    }
  });
  db.thing.create({ ...req.body.create_info, checked: false }).then((item) => {
    res.json({ success: true, ...item });
  });
});

app.post("/api/toggle-thing", (req, res) => {
  db.thing
    .findOne({
      include: [{ model: db.buying_list, include: ["user"] }],
      where: { id: req.body.id },
    })
    .then((value) => {
      if (value.buying_list.user.token !== req.body.token) {
        res.json({ error: "auth error" });
        return;
      }
      db.thing.findByPk(req.body.id).then((thing) => {
        thing.check = !thing.check;
        thing.save();
        res.json({ success: true });
      });
    });
});

app.post("/api/delete-thing", (req, res) => {
  db.thing
    .findOne({
      include: [{ model: db.buying_list, include: ["user"] }],
      where: { id: req.body.id },
    })
    .then((value) => {
      if (value.buying_list.user.token !== req.body.token) {
        res.json({ error: "auth error" });
        return;
      }
      db.thing.findByPk(req.body.id).then((thing) => {
        thing.destroy();
        res.json({ success: true });
      });
    });
});

app.post("/api/update-list", (req, res) => {
  db.buying_list
    .findOne({
      include: [{ model: ["user"] }],
      where: { id: req.body.id },
    })
    .then((value) => {
      if (value.user.token !== req.body.token) {
        res.json({ error: "auth error" });
        return;
      }
      db.buying_list
        .update(req.body.updateInfo, { where: { id: req.body.id } })
        .then((value) => {
          res.json({ success: true });
        });
    });
});

const auth = async ({ user_id, token }) => {
  let flag = true;
  await db.user.findOne({ where: { id: user_id, token } }).then((user) => {
    if (user === null) {
      flag = false;
    }
  });
  return flag;
};

console.log(`Server listening on ${port}!!`);
