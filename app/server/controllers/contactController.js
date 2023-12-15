const {User, BankAccount, Contact} = require('../models/models')

class ContactController {
    async createContact(req, res) {
        const {name, accountId, userId} = req.body
        const contact = await Contact.create({name: name, accountId: accountId, userId: userId})
        res.json({
            id: contact.id,
            name: contact.name,
            accountId: contact.accountId,
            userId: contact.userId
        })
    }
    // async deleteContact(req, res) {
    //     const {userId, name} = req.body
    //     const count = await Contact.destroy({where: {userId: userId, name: name}})
    //     res.json({count: count})
    // }
    async getAllContacts(req, res) {
        const {userId} = req.query
        const contacts = await Contact.findAll({where: {userId: userId}})
        res.json(contacts)
    }
    async getContactId(req, res) {
        const {userId, name} = req.query
        const contact = await Contact.findOne({where: {userId: userId, name: name}})
        res.json({id: contact.id})
    }
    async getOneContact(req, res) {
        const {id} = req.query
        const contact = await Contact.findOne({where: {id: id}})
        res.json(contact)
    }
    // async makeTransaction(req, res) {
    //     const {sourceId, name, sum} = req.body
    //     const source = await User.findOne({where: {id: sourceId}})
    //     const destinationContact = await Contact.findOne({where: {name: name}})
    //     const destination = await User.findOne({where: {accountId: destinationContact.accountId}})
    //     if (sum > source.balance) {
    //         res.json({message: "Not enough money"})
    //         return
    //     }
    //     source.balance -= sum
    //     destination.balance += sum
    //     source.save()
    //     destination.save()
    //     res.json({message: "Transaction complete"})
    // }
    // async getBalance(req, res) {
    //     const {id} = req.body
    //     const user = await User.findOne({where: {id: id}})
    //     res.json({balance: user.balance})
    // }
}

module.exports = new ContactController()