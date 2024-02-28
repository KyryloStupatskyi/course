const Router = require('express')
const router = new Router()
const gmailController = require('../controllers/gmailController')

router.post('/', gmailController.sendEmail)

module.exports = router