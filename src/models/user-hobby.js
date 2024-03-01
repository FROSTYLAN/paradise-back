import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserHobby = sequelize.define(
  'user_hobbies',
  {
    user_id: {
      type: DataTypes.INTEGER
    },
    hobbie_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'user_hobbies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserHobby
