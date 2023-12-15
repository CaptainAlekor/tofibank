const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    passport: {type: DataTypes.STRING, unique: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "user", allowNull: false},
})

const BankAccount = sequelize.define('bankAccount', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    balance: {type:DataTypes.DOUBLE, allowNull: false},
    accountId: {type: DataTypes.UUID, defaultValue: sequelize.literal('uuid_generate_v4()'), allowNull: false}
})

const Contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    accountId: {type: DataTypes.UUID, allowNull: false}
})

const Credit = sequelize.define('credit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    base: {type: DataTypes.DOUBLE, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    term: {type: DataTypes.INTEGER, allowNull: false},
    percent: {type: DataTypes.DOUBLE, allowNull: false},
    progress: {type: DataTypes.DOUBLE, allowNull: false},
    sum: {type: DataTypes.DOUBLE, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false}
})

User.hasMany(BankAccount)
BankAccount.belongsTo(User)

User.hasMany(Contact)
Contact.belongsTo(User)

BankAccount.hasMany(Credit)
Credit.belongsTo(BankAccount)

module.exports = {
    User, BankAccount, Contact, Credit
}