import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserPreference = sequelize.define(
  'user_preferences',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    gender_id: {
      type: DataTypes.INTEGER
    },
    location_id: {
      type: DataTypes.INTEGER
    },
    min_age: {
      type: DataTypes.INTEGER
    },
    max_age: {
      type: DataTypes.INTEGER
    },
    max_distance: {
      type: DataTypes.INTEGER
    },
    language: {
      type: DataTypes.STRING
    },
    body_build: {
      type: DataTypes.INTEGER
    },
    appearance: {
      type: DataTypes.INTEGER
    },
    ethnic_origin: {
      type: DataTypes.INTEGER
    },
    smoker: {
      type: DataTypes.INTEGER
    },
    looking_for: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'user_preferences',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserPreference
