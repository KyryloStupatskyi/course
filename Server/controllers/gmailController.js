const nodemailer = require('nodemailer')

class CinemaController {
  async sendEmail(req, res, next) {
    try {
      const { to, username, seats, time, date } = req.body

      const text = `Dear ${username}, we glad to tell You about successfull reserve places ${seats.map(({ id, nubmer, isAvailable }) => nubmer).join(', ')} at ${time} in ${date}`

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pracadyplomowapsk@gmail.com',
          pass: 'cwun nxmg zfgd bygu'
        }
      })

      const mailOptions = {
        from: 'pracadyplomowapsk@gmail.com',
        to,
        subject: 'Podtwiedzenie rezerwowania miejsca w Super Kino',
        text
      }

      const mail = await transporter.sendMail(mailOptions)

      return res.json(mail)
    } catch (error) {
      return console.log(error)
    }
  }
}

module.exports = new CinemaController()