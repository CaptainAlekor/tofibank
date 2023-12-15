const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {User, BankAccount, Contact} = require('../models/models')

const generateJwt = (id, name, email, role, passport) => {
    return jwt.sign(
        {id, name, email, role, passport},
        'jwtkey',
        {expiresIn: '48h'})
}

class UserController {
    async registration (req, res, next) {
        const {name, patronymic, surname, email, password, passport} = req.body
        if (!email || !password) {
            //return next(ApiError.badRequest('Invalid email or password'))
            return res.json({message: 'Invalid email or password'})
        }
        let candidate = await User.findOne({where: {email}})
        if (candidate) {
            //return next(ApiError.badRequest(`User with email ${email} already exists`))
            return res.json({message: `User with email ${email} already exists`})
        }
        candidate = null
        candidate = await User.findOne({where: {passport}})
        if (candidate) {
            //return next(ApiError.badRequest(`User with passport ${passport} already exists`))
            return res.json({message: `User with passport ${passport} already exists`})
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name: name, patronymic: patronymic, surname: surname, email: email, password: hashPassword, passport: passport})
        const token = generateJwt(user.id, user.name, user.email, user.role, user.passport)
        res.json({token})
        // res.json({
        //     id: user.id,
        //     name: user.name,
        //     patronymic: user.patronymic,
        //     surname: user.surname,
        //     email: user.email,
        //     password: user.password,
        //     passport: user.passport,
        //     role: user.role,
        //     accountId: user.accountId,
        //     balance: user.balance
        // })
    }

    async login (req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            //return next(ApiError.internal(`User with email ${email} not found`))
            return res.json({message: `User with email ${email} not found`})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            //return next(ApiError.internal('Incorrect password'))
            return res.json({message: 'Incorrect password'})
        }
        const token = generateJwt(user.id, user.name, user.email, user.role, user.passport)
        res.json({token})
        //res.json(user)
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role, req.user.passport)
        //return res.json({token})
        res.json({token})
    }
}

module.exports = new UserController()