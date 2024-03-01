import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const Verification = sequelize.define(
  'verifications',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    image_01: {
      type: DataTypes.BLOB
    },
    image_02: {
      type: DataTypes.BLOB
    },
    type: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.INTEGER,
      default: 1
    }
  },
  {
    tableName: 'verifications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Verification
