const {User, BankAccount, Contact, Credit} = require('../models/models')

function getDate(){
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
}

class CreditController {
    async createCredit(req, res) {
        const {name, base, term, percent, type, accId, userId} = req.body
        const date = getDate()
        const progress = 0
        let sum = 0
        if (type === 'Annuity') {
            const monthlyStavka = percent / (100 * 12)
            const monthlyPay = base * (monthlyStavka / (1 - (1 + monthlyStavka)**(-term)))
            sum = Math.round(monthlyPay) * term
        }
        else if (type === 'Differential') {
            let creditTerm = term;
            let totalSum = 0;
            let creditSum = base;
            let mouthDebt = creditSum / term;
            let mouthPercent = 0;
            let mouthPay = 0;
            while (creditTerm > 0) {
                mouthPercent = (creditSum * (percent / 100) * 30) / 365
                mouthPay = (mouthDebt + mouthPercent);
                totalSum += mouthPay;
                creditSum -= mouthDebt;
                creditTerm--;
            }
            sum = Math.round(totalSum)
        }
        const credit = await Credit.create({
            name: name,
            base: base, 
            date: date,
            term: term,
            percent: percent,
            progress: progress,
            sum: sum,
            type: type,
            bankAccountId: accId,
            userId: userId
        })
        const bankAccount = await BankAccount.findOne({where: {id: accId}})
        bankAccount.balance += base
        bankAccount.save()
        res.json(credit)
    }
    async getUserCredits(req, res) {
        const {userId} = req.query
        const credits = await Credit.findAll({where: {userId: userId}})
        res.json(credits)
    }
    async getCreditId(req, res) {
        const {userId, name} = req.query 
        const credit = await Credit.findOne({where: {userId: userId, name: name}})
        res.json({id: credit.id})
    }
    async getCredit(req, res) {
        const {id} = req.query
        const credit = await Credit.findOne({where: {id: id}})
        res.json(credit)
    }
    async getMonthlyPay(req, res) {
        const {id} = req.query
        const credit = await Credit.findOne({where: {id: id}})
        if (credit.type === 'Annuity') {
            const monthlyStavka = credit.percent / (100 * 12)
            const monthlyPay = credit.base * (monthlyStavka / (1 - (1 + monthlyStavka)**(-credit.term)))
            res.json({monthlyPay: Math.round(monthlyPay)})
        }
        else if(credit.type === 'Differential') {
            const mouthDebt = credit.base / credit.term
            const mouthPercent = ((credit.sum - credit.progress) * (credit.percent / 100) * 30) / 365
            const mouthPay = (mouthDebt + mouthPercent);
            res.json({monthlyPay: Math.round(mouthPay)})
        }

    }
    async makePayment(req, res) {
        const {id, paymentsum} = req.body
        const credit = await Credit.findOne({where: {id: id}})
        const accId = credit.bankAccountId
        const bankAccount = await BankAccount.findOne({where: {id: accId}})
        if (paymentsum > bankAccount.balance) {
            res.json({message: 'Not enough money'})
            return
        }
        bankAccount.balance -= paymentsum
        credit.progress += paymentsum
        bankAccount.save()
        credit.save()
        res.json({message: 'Payment completed'})
    }
}

module.exports = new CreditController()