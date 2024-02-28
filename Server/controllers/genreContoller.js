const ApiError = require("../Error/ApiError")
const { Genre } = require("../models/models")

class GenreController {
  async create(req, res, next) {
    const { name } = req.body

    try {
      if (await Genre.findOne({ where: { name } })) {
        return next(ApiError.badRequest(`${name} is existing`))
      }

      const genre = await Genre.create({ name })
      return res.json(genre)
    } catch (error) {
      return next(ApiError.forbidden('ad'))
    }
  }

  async getAll(req, res) {
    const genre = await Genre.findAll()
    return res.json(genre)
  }
}

module.exports = new GenreController()