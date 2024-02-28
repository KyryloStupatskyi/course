const ApiError = require("../../Error/ApiError");
const { Cinema } = require("../../models/models");

module.exports = async function (cinemaId, next, req, res) {
  try {
    const cinema = await Cinema.findOne({ where: { id: cinemaId } });
    if (!cinema) {
      return next(ApiError.badRequest("Cinema not found"));
    }

    const movies = await cinema.getMovies()

    return res.json(movies);
  } catch (error) {
    next(ApiError.internal(error.message))
  }
}