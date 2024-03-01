import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserLocation = sequelize.define(
  'user_locations',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    location_id: {
      type: DataTypes.INTEGER
    },
    current: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  },
  {
    tableName: 'user_locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserLocation
