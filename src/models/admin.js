import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const Admin = sequelize.define(
  'admins',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    refresh_token: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'admins',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Admin
