/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("messages", {
    id: {
      type: "serial",
      primaryKey: true
    },
    sender_id: {
      type: "integer",
      reference: "users"
    },
    receiver_id: {
      type: "integer",
      reference: "user"
    },
    message: {
      type: "text"
    },
    date: {
      type: "text"
    }
  });
};

// exports.down = (pgm) => {

// };
