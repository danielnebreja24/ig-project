/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("chat", {
    id: {
      type: "serial",
      primaryKey: "true"
    }
  });
};
