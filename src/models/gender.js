import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const Gender = sequelize.define(
  'gender_identities',
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
    tableName: 'gender_identities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Gender
