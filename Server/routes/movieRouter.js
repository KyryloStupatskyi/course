const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movieContoller')

router.post('/', movieController.createOne)
router.get('/', movieController.getAll)
router.get('/:id', movieController.getOne)
router.get('/times/:id', movieController.getTimes)


module.exports = router