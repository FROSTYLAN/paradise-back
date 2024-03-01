import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserMatch = sequelize.define(
  'user_match',
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
    state: {
      type: DataTypes.INTEGER
    },
    is_new: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    tableName: 'user_match',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserMatch
