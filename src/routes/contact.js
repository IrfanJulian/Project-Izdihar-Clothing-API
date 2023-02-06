const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact')
const { protect } = require('../middlewares/auth')

router.get('/', protect, contactController.getContact)
router.get('/:id', protect, contactController.getContactById)
router.post('/', protect, contactController.insertContact)

module.exports = router