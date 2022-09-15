import dotenv from 'dotenv'
dotenv.config()

module.exports = {
  development: {
    username: process.env.DBMYSQL_USER,
    password: process.env.DBMYSQL_PASSWORD,
    database: process.env.DBMYSQL_NAME,
    host: process.env.DBMYSQL_HOST,
    port: process.env.DBMYSQL_PORT,
    dialect: 'mysql'
  },

  production: {
    username: process.env.DBMYSQL_USER,
    password: process.env.DBMYSQL_PASSWORD,
    database: process.env.DBMYSQL_NAME,
    host: process.env.DBMYSQL_HOST,
    port: process.env.DBMYSQL_PORT,
    dialect: 'mysql'
  }
}
