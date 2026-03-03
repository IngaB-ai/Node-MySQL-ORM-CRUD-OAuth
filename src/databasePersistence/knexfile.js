const config = require("./config/mysql_credentials");

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: config.database,
      user:     config.user,
      password: config.password,
      host:     config.host
    }, 
  },
  test: {
    client: 'mysql2',
    connection: {
      database: config.test_database, // separate DB, e.g. "myapp_test"
      user:     config.user,
      password: config.password,
      host:     config.host,
      port:     config.port
    }, 
     migrations: {
    directory: './src/databasePersistence/migrations'
  }
  }
};