function addLike(req, res) {
  const db = req.app.get("db");
  const { id } = req.body;

  // console.log(id);

  db.likes
    .insert({
      post_id: req.params.id,
      user_id: id
    })
    .then(likes => res.status(201).json(likes))
    .catch(err => console.log(err));
}

function getLike(req, res) {
  const db = req.app.get("db");
  const { post_id, user_id } = req.params;

  db.likes
    .findOne({
      post_id: post_id,
      user_id: user_id
    })
    .then(like => res.status(201).json(like))
    .catch(err => console.log(err));
}

function delLike(req, res) {
  const db = req.app.get("db");
  // console.log(req.params.id);
  db.likes
    .destroy({ id: req.params.id })
    .then(like => res.status(201).json(like))
    .catch(err => console.log(err));
}

module.exports = {
  addLike,
  getLike,
  delLike
};
