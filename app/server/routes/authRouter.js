const Router = require('express')
const router = new Router()
const userController = require('../controllers/authController')
//const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/verify', userController.verify)
//router.get('/auth', authMiddleware, userController.check)
//router.get('/auth', userController.check)


module.exports = router