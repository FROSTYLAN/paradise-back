import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'

const Subscription = sequelize.define(
  'subscriptions',
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
    pricing_id: {
      type: DataTypes.INTEGER
    },
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
    },
    state: {
      type: DataTypes.SMALLINT
    }
  },
  {
    tableName: 'subscriptions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Subscription
