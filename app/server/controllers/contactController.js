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
    async getAllContacts(req, res) {
        const {userId} = req.query
        const contacts = await Contact.findAll({where: {userId: userId}})
        return res.json(contacts)
    }
    async getContactId(req, res) {
        const {userId, name} = req.query
        const contact = await Contact.findOne({where: {userId: userId, name: name}})
        return res.json({id: contact.id})
    }
    async getOneContact(req, res) {
        const {id} = req.query
        const contact = await Contact.findOne({where: {id: id}})
        return res.json(contact)
    }
    async deleteContact(req, res) {
        const {id} = req.body
        const count = await Contact.destroy({where: {id: id}})
        res.json({message: `Deleted contacts: ${count}`})
    }
}

module.exports = new ContactController()