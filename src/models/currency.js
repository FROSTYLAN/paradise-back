import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const Currency = sequelize.define(
  'currencies',
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    symbol: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'currencies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Currency
