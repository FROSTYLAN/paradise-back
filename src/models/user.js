import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    login_type: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    reported: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    report_message: {
      type: DataTypes.STRING,
      default: null
    },
    verified_email: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    verified_phone: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    verified_photo: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    verified_gm: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    verified_fb: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    verified_ig: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    code: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.STRING
    },
    initial_steps: {
      type: DataTypes.BOOLEAN,
      default: true
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default User
