function getAll(req, res) {
  const db = req.app.get("db");

  const id = req.params.id;
  db.query(
    `SELECT * FROM messages WHERE sender_id = ${id} OR receiver_id = ${id}`
  )
    .then(msg => res.status(201).json(msg))
    .catch(err => console.log(err));
}

function searchMsg(req, res) {
  const db = req.app.get("db");
  // console.log(req.params);
  const { id, userId } = req.params;
  db.query(
    `SELECT * FROM messages WHERE (receiver_id = ${id} AND sender_id = ${userId}) OR (sender_id = ${id} AND receiver_id = ${userId}) `
  )
    .then(msg => res.status(201).json(msg))
    .catch(err => console.log(err));
}

function addMsg(req, res) {
  const db = req.app.get("db");

  const { r_id, s_id, value, date } = req.body;

  db.query(
    `SELECT * FROM messages WHERE (sender_id = ${s_id} AND receiver_id = ${r_id}) OR (sender_id = ${r_id} AND receiver_id = ${s_id})`
  )
    .then(mes =>
      mes.length === 0
        ? db
            .query(`SELECT * FROM chat ORDER BY ID DESC LIMIT 1`)
            .then(chat =>
              chat.length !== 0
                ? db
                    .query(`INSERT INTO chat (id) VALUES (${chat[0].id + 1})`)
                    .then(() =>
                      db
                        .query(
                          `INSERT INTO messages (sender_id, receiver_id, message, date, chat_id) VALUES (${s_id}, ${r_id}, '${value}', '${date}', ${chat[0]
                            .id + 1})`
                        )
                        .then(msg => res.status(201).json(msg))
                        .catch(err => console.log(err))
                    )
                : db.query(`INSERT INTO chat DEFAULT VALUES`).then(() =>
                    db
                      .query(
                        `INSERT INTO messages (sender_id, receiver_id, message, date, chat_id) VALUES (${s_id}, ${r_id}, '${value}', '${date}', 1)`
                      )
                      .then(msg => res.status(201).json(msg))
                      .catch(err => console.log(err))
                  )
            )
            .catch(err => console.log(err))
        : // db
          //     .query(
          //       `INSERT INTO messages (sender_id, receiver_id, message, date, chat_id) VALUES (${s_id}, ${r_id}, '${value}', '${date}', ${mes[0].chat_id}) `
          //     )
          db.messages
            .insert({
              sender_id: s_id,
              receiver_id: r_id,
              message: value,
              date: date,
              chat_id: mes[0].chat_id
            })
            .then(msg => res.status(201).json(msg))
            .catch(err => console.log(err))
    )
    .catch(err => console.log(err));
}

module.exports = {
  getAll,
  searchMsg,
  addMsg
};
