import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserProfile = sequelize.define(
  'user_profile',
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
    nickname: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    about_me: {
      type: DataTypes.STRING
    },
    birthdate: {
      type: DataTypes.DATE
    },
    language: {
      type: DataTypes.STRING
    },
    smoker: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.INTEGER
    },
    looking_for: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'user_profile',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserProfile
