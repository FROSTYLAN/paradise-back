import 'dotenv/config'
import Sequelize from 'sequelize'

const PGHOST = process.env.PGHOST
const PGUSER = process.env.PGUSER
const PGPORT = process.env.PGPORT
const PGPASSWORD = process.env.PGPASSWORD
const PGDATABASE = process.env.PGDATABASE
const PGDIALECT = process.env.PGDIALECT

// const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
//   dialect: PGDIALECT,
//   host: PGHOST,
//   port: PGPORT,
//   logging: false,
//   dialectOptions: { ssl: true }
// })

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  logging: false,
});

export default sequelize
