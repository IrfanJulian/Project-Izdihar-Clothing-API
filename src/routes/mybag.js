const express = require('express')
const router = express.Router()
const bagController = require('../controllers/mybag')
const { protect } = require('../middlewares/auth')
// const { admin } = require('../middlewares/auth')
// const {hitCache} = require('../middlewares/redis')

router.get('/', protect, bagController.getBag)
router.post('/', protect, bagController.insertBag)
// router.put('/:id', categoryController.update)
// router.delete('/:id', categoryController.deleteData)

module.exports = router