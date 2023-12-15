const {User, BankAccount, Contact} = require('../models/models')

class TransactionController {
    async makeTransaction(req, res) {
        const {sourceAccId, destinationAccId, sum} = req.body
        const sourceAcc = await BankAccount.findOne({where: {id: sourceAccId}})
        const destinationAcc = await BankAccount.findOne({where: {accountId: destinationAccId}})
        if (sum > sourceAcc.balance) {
            res.json({message: "Not enough money"})
            return
        }
        sourceAcc.balance -= sum
        destinationAcc.balance += sum
        sourceAcc.save()
        destinationAcc.save()
        res.json({message: "Transaction complete"})
    }
}

module.exports = new TransactionController()