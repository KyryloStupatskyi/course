const bcrypt = require('bcrypt')
const ApiError = require('../Error/ApiError')
const { User } = require('../models/models')

class UserController {
  async registration(req, res, next) {
    const { email, password, username, role } = req.body
    try {
      if (!email || !password) {
        return next(ApiError.badRequest('Bad login or password'))
      }

      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return next(ApiError.badRequest("User with same email alredy exist"))
      }

      const hashPassword = await bcrypt.hash(password, 5)

      const user = await User.create({ email, password: hashPassword, username, role })

      return res.json(user)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return next(ApiError.internal('User is not exist'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
      return next(ApiError.internal('Password Error'))
    }

    return res.json(user)
  }
}

module.exports = new UserController()