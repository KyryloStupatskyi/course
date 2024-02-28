const ApiError = require("../Error/ApiError")
const { Seat, Ticket } = require("../models/models")

class SeatController {
  async createOne(req, res, next) { }

  async getAll(req, res, next) {
    const { cinemaId, hallId, time, date } = req.query

    try {
      const existedTickets = await Ticket.findAll({ where: { cinemaId, hallId, time, date } })

      if (existedTickets.length === 0) {
        const seats = await Seat.findAll({
          where: { hallId },
          order: [['id', 'ASC']]
        });
        return res.json(seats)
      }

      let seats = await Seat.findAll({
        where: { hallId },
        order: [['id', 'ASC']]
      });

      seats = seats.map(seat => {
        const ticket = existedTickets.find(ticket => ticket.seatId === seat.id)

        if (ticket) {
          return { ...seat, isAvailable: false }
        } else {
          return seat
        }
      })

      return res.json(seats)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new SeatController()