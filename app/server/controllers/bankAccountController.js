const {User, BankAccount, Contact} = require('../models/models')

class BankAccountController {
    async createBankAccount(req, res) {
        const {name, userId, balance} = req.body
        const bankAccount = await BankAccount.create({name: name, balance: balance, userId: userId})
        res.json({
            id: bankAccount.id,
            name: bankAccount.name,
            balance: bankAccount.balance,
            accountId: bankAccount.accountId,
            userId: bankAccount.userId
        })
    }
    async getAllBankAccounts(req, res) {
        const userId = req.query.userId
        const bankAccounts = await BankAccount.findAll({where: {userId: userId}})
        res.json(bankAccounts)
    }
    async getBankAccountId(req, res) {
        const {userId, accName} = req.query
        const bankAccount = await BankAccount.findOne({where: {userId: userId, name: accName}})
        res.json({accId: bankAccount.id})
    }
    async getBankAccount(req, res) {
        const {accId} = req.query
        const bankAccount = await BankAccount.findOne({where: {id: accId}})
        res.json(bankAccount)
    }
}

module.exports = new BankAccountController()