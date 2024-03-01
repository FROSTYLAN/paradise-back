import sequelize from './pg'

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established.')
    // 
    await sequelize.sync({force: true})
    console.log('Database connection synced.')
  } catch (error) {
    console.log(`Unable to connect to the database: ${error.message}`)
  }
}
