const Router = require('express')
const router = new Router()
const genreController = require('../controllers/genreContoller')

router.get('/', genreController.getAll)
router.post('/', genreController.create)

module.exports = router