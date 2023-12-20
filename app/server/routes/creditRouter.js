const Router = require('express')
const router = new Router()
const creditController = require('../controllers/creditController')

router.post('/create', creditController.createCredit)
router.get('/get', creditController.getUserCredits)
router.get('/find', creditController.getCreditId)
router.get('/getone', creditController.getCredit)
router.get('/getpay', creditController.getMonthlyPay)
router.put('/pay', creditController.makePayment)

module.exports = router