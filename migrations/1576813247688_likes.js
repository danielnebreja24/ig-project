/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("likes", {
    id: {
      type: "serial",
      primaryKey: true
    },
    post_id: {
      type: "text"
    },
    user_id: {
      type: "text"
    },
    date: {
      type: "text"
    }
  });
};
