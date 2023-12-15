const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
//app.use(express.static(path.join(__dirname, '../client')))
//app.use('/', viewRouter)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'))
})
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/registration.html'))
})
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})
app.get('/create-account', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/create-account.html'))
})
app.get('/account-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/account-details.html'))
})
app.get('/transactions', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/transactions.html'))
})
app.get('/contacts', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/contacts.html'))
})
app.get('/contacts/create-contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/create-contact.html'))
})
app.get('/contacts/contact-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/contact-details.html'))
})
app.get('/credits', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/credit.html'))
})
app.get('/credits/credit-create', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/create-credit.html'))
})
app.get('/credits/credit-details', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/credit-details.html'))
})
app.use('/api', router)
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/404.html'))
})


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }
    catch(e) {
        console.log(e)
    }
}

start()