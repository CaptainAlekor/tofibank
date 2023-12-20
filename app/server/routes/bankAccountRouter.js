const Router = require('express')
const router = new Router()
const bankAccountController = require('../controllers/bankAccountController')

router.post('/create', bankAccountController.createBankAccount)
router.get('/get-all', bankAccountController.getAllBankAccounts)
router.get('/find', bankAccountController.getBankAccountId)
router.get('/get', bankAccountController.getBankAccount)

module.exports = router