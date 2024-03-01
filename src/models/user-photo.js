import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const UserPhoto = sequelize.define(
  'user_photos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    path: {
      type: DataTypes.STRING
    },
    main: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  },
  {
    tableName: 'user_photos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default UserPhoto
