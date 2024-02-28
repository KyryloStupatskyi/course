const ApiError = require("../Error/ApiError")
const { Hall, Cinema, Seat } = require("../models/models")

class HallController {
  async createOne(req, res, next) {
    try {
      const { hallName, capacity, cinemaId } = req.body

      if (!await Cinema.findOne({ where: { id: cinemaId } })) {
        return next(ApiError.badRequest(`Cinema with id ${cinemaId} is not exist`))
      }

      if (await Hall.findOne({ where: { hallName } })) {
        return next(ApiError.badRequest(`${hallName} is already exist`))
      }

      const hall = await Hall.create({ hallName, capacity, cinemaId })

      const seats = []

      for (let i = 1; i <= capacity; i++)
        seats.push({ nubmer: i, isAvailable: true, hallId: hall.id })

      await Seat.bulkCreate(seats)

      return res.json(hall)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res) {
    const { cinemaId } = req.query

    if (cinemaId) {
      const hall = await Hall.findAll({ where: { cinemaId } })
      return res.json(hall)
    }

    const hall = await Hall.findAll()
    return res.json(hall)
  }

  async getOne(req, res, next) {
    const { hallId } = req.query

    try {
      const hall = await Hall.findOne({ where: { id: hallId } })

      return res.json(hall)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new HallController()