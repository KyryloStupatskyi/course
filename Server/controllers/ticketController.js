const ApiError = require('../Error/ApiError')
const { Ticket } = require('../models/models')

class TicketController {
  async createRecord(req, res, next) {
    const { time, userId, cinemaId, hallId, seats, date } = req.body

    try {
      for (const { id, nubmer, isAvalable } of seats) {
        const check = await Ticket.findOne({ where: { seatId: id, time, cinemaId, hallId, date } })

        if (check) {
          return next(ApiError.badRequest("Record with same parameters already exist"))
        }

        await Ticket.create({ time, userId, cinemaId, hallId, seatId: id, date })
      }

      return res.json("Ticket successfuly created")
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async getOne(req, res, next) {

  }

  async getAll(req, res, next) {

  }
}

module.exports = new TicketController() 