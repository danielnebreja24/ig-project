const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
// const secret =

function create(req, res) {
  const db = req.app.get("db");

  const { mobile, name, uname, pwd } = req.body;

  // console.log(req.body);
  argon2
    .hash(pwd)
    .then(hash => {
      return db
        .query(
          `SELECT * FROM users WHERE username = '${mobile}' OR mobile_email = '${mobile}' OR username = '${uname}' OR mobile_email = '${uname}'`
        )
        .then(user => {
          user.length !== 0
            ? res.status(200).send("duplicate")
            : db.users.insert({
                fullname: name,
                mobile_email: mobile,
                username: uname,
                password: hash
              });
        });
    })
    .then(users => {
      const token = jwt.sign({ userId: users.id }, secret);
      res.status(201).json({ ...users, token });
    })
    .catch(err => {
      console.log(err);
    });
  // db.query(
  //   `SELECT * FROM users WHERE username = '${mobile}' OR mobile_email = '${mobile}' OR username = '${uname}' OR mobile_email = '${uname}'`
  // )
  //   .then(user => {
  //     // console.log(user.length)
  //     user.length !== 0
  //       ? res.status(200).send("duplicate")
  //       : db.users
  //           .insert({
  //             fullname: name,
  //             mobile_email: mobile,
  //             username: uname,
  //             password: pwd
  //           })
  //           .then(user => res.status(201).json(user))
  //           .catch(err => {
  //             res.status(500).end();
  //           });
  //   })
  //   .catch(user => {
  //     res.status(500).end();
  //   });
}

function login(req, res) {
  const db = req.app.get("db");

  const { username, password } = req.body;

  const uname = username.toLowerCase(),
    pwd = password.toLowerCase();

  db.query(
    `SELECT * FROM users WHERE (LOWER(mobile_email) = '${uname}' OR username = '${uname}') AND (LOWER(password) = '${pwd}') `
  )
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).end();
    });
}

function edit(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;
  const { url, bioVal, nameVal, unameVal, mobile } = req.body;

  // console.log(bioVal)

  db.query(
    `UPDATE users SET fullname = '${nameVal}', username = '${unameVal}', mobile_email = '${mobile}', bio = '${bioVal}', profile_img = '${url}' WHERE id= '${id}' `
  )
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).end();
    });
}

function getUser(req, res) {
  const db = req.app.get("db");

  const { id } = req.params;

  db.users
    .find({
      id: id
    })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).end();
    });
}

function searchUser(req, res) {
  const db = req.app.get("db");

  const { user } = req.body;
  db.query(
    `SELECT * from users WHERE fullname ILIKE '%${user}%' OR username ILIKE '%${user}%' `
  )
    .then(user => res.status(201).json(user))
    .catch(err => console.log(err));
}

module.exports = {
  create,
  login,
  edit,
  getUser,
  searchUser
};
