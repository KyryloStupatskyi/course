const Router = require('express')
const router = new Router()
const cinemaController = require('../controllers/cinemaController')

router.get('/', cinemaController.getAll)
router.post('/', cinemaController.createOne)

module.exports = router