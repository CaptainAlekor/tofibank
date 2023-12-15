const Router = require('express')
const router = new Router()

const userRouter = require('./authRouter')
const bankAccountRouter = require('./bankAccountRouter')
const contactRouter = require('./contactRouter')
const transactionRouter = require('./transactionRouter')
const creditRouter = require('./creditRouter')

router.use('/auth', userRouter)
router.use('/bankacc', bankAccountRouter)
router.use('/contact', contactRouter)
router.use('/transaction', transactionRouter)
router.use('/credit', creditRouter)

module.exports = router