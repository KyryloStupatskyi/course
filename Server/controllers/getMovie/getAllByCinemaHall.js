const ApiError = require("../../Error/ApiError");
const { Movie, Hall, Cinema } = require("../../models/models");

module.exports = async function (cinemaId, hallId, req, res, next) {
  try {
    const cinema = await Cinema.findOne({ where: { id: cinemaId } });
    if (!cinema) {
      return next(ApiError.badRequest("Cinema not found"));
    }

    const hall = await Hall.findOne({ where: { id: hallId, cinemaId } })
    if (!hall) {
      return next(ApiError.badRequest("Hall not found"));
    }

    const movies = await Movie.findAll({ include: { model: Cinema_Movie, where: { cinemaId, hallId } } })

    return res.json(movies)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}