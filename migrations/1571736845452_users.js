/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        id: {
          type: 'serial',
          primaryKey: true,
        },
        fullname: {
          type: 'text',
          notNull: true,
        },
        mobile_email: {
          type: 'text',
          notNull: true,
        },
        username: {
          type: 'text',
          notNull: true,
        },
        password: {
          type: 'text',
          notNull: true,
        }        
      });
};


