const Router = require('express')
const router = new Router()
const transactionController = require('../controllers/transactionController')

router.put('/transfer', transactionController.makeTransaction)

module.exports = router