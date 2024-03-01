import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserReport = sequelize.define(
  'user_report',
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
    image: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'user_report',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserReport
