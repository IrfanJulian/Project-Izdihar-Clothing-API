const express = require('express')
const router = express.Router()
const checkoutController = require('../controllers/checkout')
const { protect } = require('../middlewares/auth')

router.get('/:id', protect, checkoutController.historyCheckout)
router.get('/myorder/:id', protect, checkoutController.myOrder)
router.post('/', protect, checkoutController.postCheckout)
router.put('/:id', protect, checkoutController.processCheckout)


module.exports = router