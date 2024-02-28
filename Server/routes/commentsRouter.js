const Router = require('express')
const commentController = require('../controllers/commentsController')
const router = new Router()

router.post('/', commentController.createOne)
router.get('/', commentController.getAllToMovie)

module.exports = router