const Router = require('express')
const router = new Router()
const seatController = require('../controllers/seatController')

router.get('/', seatController.getAll)
router.post('/', seatController.createOne)

module.exports = router