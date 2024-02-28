const ApiError = require("../../Error/ApiError");
const { Genre, Movie } = require("../../models/models");

module.exports = async function (genreId, req, res, next) {
  try {
    const genre = await Genre.findOne({ where: { id: genreId } })

    if (!genre) {
      return next(ApiError.badRequest("Genre not found"));
    }

    const movies = await Movie.findAll({
      include: {
        model: Genre,
        where: { id: genreId },
        through: { attributes: [] }
      }
    });

    return res.json(movies)
  } catch (error) {
    next(ApiError.internal(error.message))
  }
}