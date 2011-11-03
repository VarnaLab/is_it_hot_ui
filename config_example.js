module.exports.config = {
    port: 3050,
    couchdb: {
      database: 'db_name',
      host: 'http://127.0.0.1',
      port: 5984,
      cradleConfig: {
          cache: true,
          raw: false,
          auth: { username: 'user', password: 'pass' }
      }
  }
};
