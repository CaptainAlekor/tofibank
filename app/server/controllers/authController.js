const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const vars = require('./vars')
const {User, BankAccount, Contact} = require('../models/models')

const sendEmail = async (recipient, subject, content) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sashakorostelev49@gmail.com',
        pass: 'ybfg nmol rnkw durp'
      }
    });
  
    const mailOptions = {
      from: 'sashakorostelev49@gmail.com',
      to: recipient,
      subject: subject,
      text: content
    };
  
    await transporter.sendMail(mailOptions);
  };

  function generateRandom4DigitNumber() {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
  
    // Generate a random number between min and max (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomNumber;
  }

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
            return res.json({message: 'Invalid email or password'})
        }
        let candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.json({message: `User with email ${email} already exists`})
        }
        candidate = null
        candidate = await User.findOne({where: {passport}})
        if (candidate) {
            return res.json({message: `User with passport ${passport} already exists`})
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name: name, patronymic: patronymic, surname: surname, email: email, password: hashPassword, passport: passport})
        const token = generateJwt(user.id, user.name, user.email, user.role, user.passport)
        res.json({token})
    }

    async login (req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.json({message: `User with email ${email} not found`})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.json({message: 'Incorrect password'})
        }
        const token = generateJwt(user.id, user.name, user.email, user.role, user.passport)

        const random4Digit = generateRandom4DigitNumber();
        sendEmail(email, 'Two-factor authentication Message', String(random4Digit));
        vars.setVar(email, String(random4Digit))
        console.log(vars.getVar(email))
        res.json({token})
    }

    async verify (req, res) {
        const {email, code} = req.body
        if (!vars) {
            vars.setVar('a', 'a')
        }
        if (code === vars.getVar(email)) {
            return res.json({message: "Success"})
        }
        else {
            return res.json({message: "Codes does not match"})
        }
    }
}

module.exports = new UserController()