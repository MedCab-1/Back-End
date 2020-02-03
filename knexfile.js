module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ''///update this file after meeting with backend dev
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreing_keys = ON', done);
      }
    },
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
    },
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      database: '',////add file name after talking with backend dev
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    },
  },
};
