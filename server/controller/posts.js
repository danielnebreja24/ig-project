function create(req, res) {
  const db = req.app.get("db");

  const { urL, val, dateTime, post_id } = req.body;
  const { id } = req.params;

  // console.log(req.body)

  db.posts
    .insert({
      user_id: id,
      caption: val,
      image: urL,
      post_id: post_id,
      date: dateTime
    })
    .then(user => {
      res.status(201).json(user);
      db.query(`UPDATE users SET post_id = ${post_id} WHERE id = ${id} `);
    })
    .catch(err => {
      res.status(500).end();
    });
}

function getPost(req, res) {
  const db = req.app.get("db");

  const { id } = req.params;

  db.posts
    .find({
      user_id: id
    })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).end();
    });
}

function getAll(req, res) {
  const db = req.app.get("db");
  console.log("Yeah");
  db.query("SELECT * FROM posts")
    .then(post => res.status(201).json(post))
    .catch(err => console.log(err));
}

module.exports = {
  create,
  getPost,
  getAll
};
