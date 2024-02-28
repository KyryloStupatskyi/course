const Router = require('express')
const ticketController = require('../controllers/ticketController')
const router = new Router()

router.get('/', ticketController.getAll)
router.get('/:id', ticketController.getOne)
router.post('/', ticketController.createRecord)

module.exports = router