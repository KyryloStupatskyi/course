const ApiError = require("../Error/ApiError");
const { Movie_info } = require("../models/models");

class MovieInfos {
  async getInfoToMovie(req, res, next) {
    const { movieId } = req.query;

    if (movieId) {
      const infos = await Movie_info.findAll({ where: { movieId } })

      if (infos) {
        return res.json(infos)
      } else {
        return next(ApiError.badRequest('Movie not found'))
      }
    }
  }
}

module.exports = new MovieInfos()