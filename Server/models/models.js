const sequelize = require('../db.js')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Comments = sequelize.define('comments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  comment: { type: DataTypes.STRING, allowNull: false }
})

const Ticket = sequelize.define('ticket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  time: { type: DataTypes.TIME },
  date: { type: DataTypes.DATEONLY }
})

const Cinema = sequelize.define('cinema', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  adress: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false }
})

const Movie = sequelize.define('movie', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false }
})

const Ticket_Movie = sequelize.define('ticket_movie', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Hall = sequelize.define('hall', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  hallName: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
})

const Seat = sequelize.define('seat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nubmer: { type: DataTypes.STRING, unique: false, allowNull: false },
  isAvailable: { type: DataTypes.BOOLEAN, allowNull: false },
})

const Movie_info = sequelize.define('movie_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false }
})

const Genre = sequelize.define('genre', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Movie_Genre = sequelize.define('movie_genre', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Hall_Reserve = sequelize.define('hall_reserver', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  time: { type: DataTypes.TIME },
  date: { type: DataTypes.DATEONLY }
})

const Hall_Reserve_Movie = sequelize.define("hall_reserve_movie", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Hall_Reserve.belongsTo(Cinema, { foreignKey: 'cinemaId' });
Hall_Reserve.belongsTo(Movie);
Hall.hasMany(Hall_Reserve)
Hall_Reserve.belongsTo(Hall)

User.hasMany(Comments)
Comments.belongsTo(User)

User.hasMany(Ticket)
Ticket.belongsTo(User)

Cinema.hasMany(Ticket)
Ticket.belongsTo(Cinema)

Hall.hasOne(Ticket)
Ticket.belongsTo(Hall)

Hall.hasMany(Seat)
Seat.belongsTo(Hall)

Cinema.hasMany(Hall, { foreignKey: 'cinemaId' })
Hall.belongsTo(Cinema, { foreignKey: 'cinemaId' })

Movie.hasMany(Movie_info, { as: 'info' })
Movie_info.belongsTo(Movie)

Ticket.hasMany(Seat)
Seat.belongsTo(Ticket)

Ticket.belongsTo(Seat, { foreignKey: 'seatId' });

Movie.hasMany(Comments)
Comments.belongsTo(Movie)

Ticket.belongsToMany(Movie, { through: Ticket_Movie })
Movie.belongsToMany(Ticket, { through: Ticket_Movie })

Movie.belongsToMany(Genre, { through: Movie_Genre })
Genre.belongsToMany(Movie, { through: Movie_Genre })

Movie.belongsToMany(Hall_Reserve, { through: Hall_Reserve_Movie })
Hall_Reserve.belongsToMany(Movie, { through: Hall_Reserve_Movie })

module.exports = {
  User,
  Comments,
  Ticket,
  Cinema,
  Seat,
  Hall,
  Ticket_Movie,
  Movie,
  Movie_info,
  Movie_Genre,
  Genre,
  Hall_Reserve
}
