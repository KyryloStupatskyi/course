const Router = require('express')
const router = new Router()
const movieInfoController = require('../controllers/movieInfosController')

router.get('/', movieInfoController.getInfoToMovie)

module.exports = router