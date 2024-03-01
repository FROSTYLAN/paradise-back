import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const Location = sequelize.define(
  'locations',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lat: {
      type: DataTypes.STRING
    },
    lng: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Location
