import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserMessage = sequelize.define(
  'user_messages',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    from_user_id: {
      type: DataTypes.INTEGER
    },
    to_user_id: {
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.STRING
    },
    seen: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  },
  {
    tableName: 'user_messages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserMessage
