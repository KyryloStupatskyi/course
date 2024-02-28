const uuid = require('uuid')
const path = require('path')
const { Movie, Genre, Movie_info, Hall_Reserve } = require('../models/models')
const ApiError = require('../Error/ApiError')
const getAllByCinemaId = require('./getMovie/getAllByCinemaId')
const getAllByGenreId = require('./getMovie/getAllByGenreId')
const getAllByCinemaHall = require('./getMovie/getAllByCinemaHall')

class MovieController {
  async createOne(req, res, next) {
    let { name, genreId, info } = req.body;
    let { img } = req.files;

    try {
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const movie = await Movie.create({ name, img: fileName });

      if (info) {
        info = typeof info === 'string' ? JSON.parse(info) : info;

        info.forEach((i) =>
          Movie_info.create({
            title: i.title,
            description: i.description,
            movieId: movie.id,
          })
        );
      }

      if (genreId && genreId.length > 0) {
        var genres = await Genre.findAll({ where: { id: genreId } });
        await movie.addGenres(genres);
      }

      return res.json({ message: 'success' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params

    const numId = +id

    const movie = await Movie.findOne({
      where: { id: numId },
    })

    return res.json(movie)
  }

  async getTimes(req, res, next) {
    const { id } = req.params;

    try {
      const movies = await Hall_Reserve.findAll({ where: { movieId: id }, order: [['time', 'ASC']] });

      const uniqueDatesSet = new Set();

      const filteredDates = movies.filter(item => {
        if (!uniqueDatesSet.has(item.date)) {
          uniqueDatesSet.add(item.date);
          return true;
        }
        return false;
      });


      return res.json(filteredDates);
    } catch (error) {
      next(ApiError.badRequest(error));
    }
  }


  async getAll(req, res, next) {
    const { cinemaId, hallId, genreId } = req.query

    if (cinemaId) {
      getAllByCinemaId(cinemaId, next, req, res)
    }

    if (genreId) {
      getAllByGenreId(genreId, req, res, next)
    }

    if (cinemaId && hallId) {
      getAllByCinemaHall(cinemaId, hallId, req, res, next)
    }

    if (!cinemaId && !hallId && !genreId) {
      const movies = await Movie.findAll()

      return res.json(movies)
    }
  }
}

module.exports = new MovieController()