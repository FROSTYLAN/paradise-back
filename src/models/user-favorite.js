import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserFavorite = sequelize.define(
  'user_favorites',
  {
    user_id: {
      type: DataTypes.INTEGER
    },
    user_favorite_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'user_favorites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserFavorite
