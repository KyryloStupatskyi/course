const { Cinema, Hall_Reserve } = require("../models/models")
const ApiError = require("../Error/ApiError")

class CinemaController {
  async createOne(req, res, next) {
    const { name, adress, capacity, city } = req.body

    if (await Cinema.findOne({ where: { adress, city } })) {
      return next(ApiError.badRequest('This cinema is already exist'))
    }

    const cinema = await Cinema.create({ name, adress, capacity, city })
    return res.json(cinema)
  }

  async getAll(req, res, next) {
    const { city, movieId } = req.query

    if (movieId) {
      let cinema = await Hall_Reserve.findAll({
        where: { movieId },
        include: [
          {
            model: Cinema,
            where: { city }
          }
        ]
      })

      let uniqueCities = new Set();

      let filteredCinema = cinema.filter(item => {
        if (item.cinema && !uniqueCities.has(item.cinema.city)) {
          uniqueCities.add(item.cinema.city);
          return true;
        }
        return false;
      });

      return res.json(filteredCinema)
    }

    const cinema = await Cinema.findAll()
    return res.json(cinema)
  }
}

module.exports = new CinemaController()   