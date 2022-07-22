require("dotenv").config();
const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const socket = require("socket.io");
const secret = process.env.SECRET_KEY;

const users = require("./controller/users.js");
const posts = require("./controller/posts.js");
const likes = require("./controller/likes.js");
const msg = require("./controller/messages.js");

massive({
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: "postgres",
  password: process.env.PASSWORD
})
  .then(db => {
    // console.log(db);
    const app = express();

    app.set("db", db);

    app.use(express.json());
    app.use(cors());

    app.post("/ig/users/create", users.create);
    app.post("/ig/users/login", users.login);
    app.patch("/ig/users/edit/:id", users.edit);
    app.get("/ig/users/getUser/:id", users.getUser);
    app.post("/ig/users/searchUser", users.searchUser);

    app.post("/ig/posts/addPost/:id", posts.create);
    app.get("/ig/posts/getPost/:id", posts.getPost);
    app.get("/ig/posts/getAllPost/", posts.getAll);
    app.get("/api/protected/data", function(req, res) {
      const db = req.app.get("db");

      if (!req.headers.authorization) {
        return res.status(401).end();
      }

      try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, secret);
        res
          .status(200)
          .json({ data: "here is the protected data.", token: token });
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }
    });

    app.get("/ig/likes/getLike/:post_id/:user_id", likes.getLike);
    app.post("/ig/likes/addLike/:id", likes.addLike);
    app.delete("/ig/likes/delLike/:id", likes.delLike);

    app.get("/ig/messages/allMsg/:id", msg.getAll);
    app.get("/ig/messages/searchMessage/:id/:userId", msg.searchMsg);
    app.post("/ig/messages/addMessage", msg.addMsg);

    const PORT = 3001;
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    var io = socket(server);

    io.on("connection", client => {
      client.on("chat", data => {
        io.sockets.emit("chat", data);
      });

      client.on("chatMsg", data => {
        // console.log(data.all);
        io.sockets.emit("chatMsg", data.all);
      });
    });
  })
  .catch(console.error);
