const Router = require('express')
const router = new Router()
const hallController = require('../controllers/hallController')

router.get('/', hallController.getAll)
router.get('/getOne', hallController.getOne)
router.post('/', hallController.createOne)

module.exports = router