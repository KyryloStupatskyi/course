const ApiError = require("../Error/ApiError")
const { Hall_Reserve, Hall } = require("../models/models")

class ReserveMovieContoller {
  async createReservation(req, res, next) {
    const { time, movieId, hallId, cinemaId, date } = req.body

    const checkReservation = await Hall_Reserve.findOne({ where: { hallId, time, date } })

    if (checkReservation) {
      return next(ApiError.badRequest("Hall is busy at this time, try again with another time or hall"))
    }

    const reservation = await Hall_Reserve.create({ time, movieId, hallId, cinemaId, date })
    return res.json(reservation)
  }

  async getHall(req, res, next) {
    const { movieId, time } = req.query

    const hallInfo = await Hall_Reserve.findOne({ where: { movieId, time } })
    if (!hallInfo) {
      return
    }
    const hallItem = await Hall.findOne({ where: { id: hallInfo.hallId } })

    return res.json(hallItem)
  }

  async getAllReservations(req, res, next) {
    const { hallId } = req.query;

    const hallReservation = await Hall_Reserve.findAll({
      where: {
        hallId,
      },
      order: [['time', 'ASC']]
    });

    return res.json(hallReservation);
  }

  async getTimesToDate(req, res, next) {
    const { id, date } = req.query

    try {
      const movies = await Hall_Reserve.findAll({ where: { movieId: id, date } })

      const times = movies.map(item => ({ time: item.time }));

      return res.json(times)
    } catch (error) {
      return next(ApiError.badRequest(error))
    }
  }
}

module.exports = new ReserveMovieContoller()