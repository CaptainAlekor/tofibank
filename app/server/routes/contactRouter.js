const Router = require('express')
const router = new Router()
const contactController = require('../controllers/contactController')

router.post('/create', contactController.createContact)
// router.post('/del', contactController.deleteContact)
router.get('/get', contactController.getAllContacts)
router.get('/getId', contactController.getContactId)
router.get('/getOne', contactController.getOneContact)
router.delete('/delete', contactController.deleteContact)
// router.post('/transact', contactController.makeTransaction)
// router.post('/getbalance', contactController.getBalance)

module.exports = router