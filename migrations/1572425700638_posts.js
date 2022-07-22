/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('posts', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      post_id: {
        type: 'text',        
      },
      user_id: {
        type: 'text',
      },
      info_id: {
        type: 'text',
      },
      date: {
        type: 'text',
      },
      caption: {
        type: 'text',
      },
      image: {
        type: 'text',
      }
    });
  };

