const Router = require('express')
const router = new Router()
const reserveMovieContoller = require('../controllers/reserveMovieController')

router.post('/', reserveMovieContoller.createReservation)
router.get('/hall', reserveMovieContoller.getHall)
router.get('/freeTime', reserveMovieContoller.getAllReservations)
router.get('/timesToDate', reserveMovieContoller.getTimesToDate)

module.exports = router