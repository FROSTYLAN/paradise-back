import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const Language = sequelize.define(
  'languages',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    tableName: 'languages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Language
