import { DataTypes } from 'sequelize'
import sequelize from '../database/pg'
import Currency from './currency'

const Pricing = sequelize.define(
  'pricings',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    plan_id: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    frequency: {
      type: DataTypes.INTEGER
    },
    frequency_type: {
      type: DataTypes.STRING
    },
    free_trial_frequency: {
      type: DataTypes.INTEGER
    },
    free_trial_frequency_type: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.INTEGER
    },
    discount_percent: {
      type: DataTypes.INTEGER
    },
    currency_code: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'pricings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

// Pricing.hasOne(Currency, {
//   foreignKey: 'code',
//   sourceKey: 'currency_code'
// })

// Currency.belongsTo(Pricing, {
//   foreignKey: 'code',
//   sourceKey: 'currency_code'
// })

Pricing.belongsTo(Currency, {
  foreignKey: 'currency_code', // Clave foránea en Pricing
  targetKey: 'code' // Clave primaria en Currency
})

Currency.hasMany(Pricing, {
  foreignKey: 'currency_code', // Clave foránea en Pricing
  sourceKey: 'code' // Clave primaria en Currency
})

export default Pricing
