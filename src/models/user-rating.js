import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserRating = sequelize.define(
  'user_rating',
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
    rating: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'user_rating',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserRating
