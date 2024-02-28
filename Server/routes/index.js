const Router = require('express')
const router = new Router()

const cinemaRouter = require('./cinemaRouter')
const commentsRouter = require('./commentsRouter')
const genreRouter = require('./genreRouter')
const hallRouter = require('./hallRouter')
const movieRouter = require('./movieRouter')
const seatRouter = require('./seatRouter')
const ticketRouter = require('./ticketRouter')
const userRouter = require('./userRouter')
const movieInfos = require('./movieInfoRouter')
const gmailRouter = require('./gmailRouter')
const reserveMovieRouter = require('./reserveMovieRouter')


router.use('/cinema', cinemaRouter)
router.use('/comments', commentsRouter)
router.use('/movie', movieRouter)
router.use('/genre', genreRouter)
router.use('/hall', hallRouter)
router.use('/seat', seatRouter)
router.use('/ticket', ticketRouter)
router.use('/user', userRouter)
router.use('/movieInfos', movieInfos)
router.use('/gmail', gmailRouter)
router.use('/reserveMovie', reserveMovieRouter)

module.exports = router