const ApiError = require("../Error/ApiError")
const { Comments, User } = require("../models/models")

class CommentsContoller {
  async createOne(req, res, next) {
    const { comment, userId, movieId } = req.body

    if (!comment) {
      return next(ApiError.badRequest("Comment field error"))
    }

    const commentTable = await Comments.create({ comment, userId, movieId })
    return res.json(commentTable)
  }

  async getAllToMovie(req, res, next) {
    const { movieId } = req.query
    try {
      const comments = await Comments.findAll({ where: { movieId }, include: [{ model: User, attributes: ['id', 'username'] }] })
      return res.json(comments)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new CommentsContoller()