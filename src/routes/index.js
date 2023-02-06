const express = require('express')
const router = express.Router()
const productRouter = require('./products')
const categoryRouter = require('./category')
const transactionsRouter = require('./transactions')
const userRouter = require('./user')
const bagRouter = require('./mybag')
const contactRouter = require('./contact')
const checkoutRouter = require('./checkout')

router
    .use('/products', productRouter)
    .use('/category', categoryRouter)
    .use('/transactions', transactionsRouter)
    .use('/user', userRouter)
    .use('/mybag', bagRouter)
    .use('/contact', contactRouter)
    .use('/checkout', checkoutRouter)

module.exports = router
