import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieById, getMovieTimes } from "../http/movieApi"
import { Button, Card, Skeleton, Typography } from "@mui/material"
import { getAllCinemas, getAllCinemasInCity } from "../http/cinemaApi"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import Comments from "../components/Comments"
import SeatModel from "../modals/SeatModel"
import { getAllMovieInfo } from "../http/adminApi"
import '../styles/css/MovieItem.css'
import '../styles/media/MovieItem.css'
import { useWindowSize } from "react-use"
import { getTimesToDate } from "../http/reservationsApi"

const MovieItem = observer(() => {
  const { cinema } = useContext(Context)
  const movieStore = useContext(Context).movie
  const { id } = useParams()

  const { width: windowWidth } = useWindowSize();

  const [movie, setMovie] = useState()
  const [cinemaData, setCinemaData] = useState()
  const [cinemaInCity, setCinemasInCity] = useState([])
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState([])
  const [time, setTime] = useState([])

  const [info, setInfo] = useState([])
  const [description, setDescription] = useState()
  const [price, setPrice] = useState(0)

  const [selectedDate, setSelectedDate] = useState('');

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMovieTimes(id).then(data => {
      setDate(data)
    })

    getMovieById(id).then(data =>
      setMovie(data)
    )

    getAllCinemas().then(data => {
      setCinemaData(data)
    })

    getAllMovieInfo(id).then(data => {
      setInfo(data.filter(item => item.title !== 'Opis filmu'))
      setDescription(data.filter(item => item.title === 'Opis filmu'))

      setLoading(true)
    })
  }, [id])


  useEffect(() => {
    getTimesToDate(id, movieStore._selectedDate).then(data => {
      console.log("Запрос")
      setTime(data)
    })
  }, [movieStore._selectedDate])

  const getCinemasByCity = async (city) => {
    await getAllCinemasInCity(city, id).then(data => {
      setCinemasInCity(data)
    })
  }

  const selectCinemaCity = (item, city) => {
    getCinemasByCity(city, id)
    cinema.setSelectedCinemaCity(item)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    cinema.clearSelectedSeats()
    setPrice(0)
  }

  if (!loading) {
    return null
  }

  return (
    <div className="movieItemPageContainer">
      <SeatModel price={price} setPrice={setPrice} handleOpen={handleOpen} handleClose={handleClose} open={open} id={id} />
      {movie && movie.name ? (
        <div className="container">
          <div className="img-container">
            <img src={process.env.REACT_APP_API_URL + movie.img} alt="loading" className="img" />
          </div>
          <div style={{ width: '100%' }}>
            <Typography className="movie-title">{movie.name}</Typography>
            <div className="city-list--container">
              {
                cinemaData && cinemaData.map(item =>
                  <div key={item.id} style={{ cursor: "pointer" }} onClick={() => selectCinemaCity(item, item.city)}>
                    <Card className="city-list--card" sx={{
                      backgroundColor: cinema._selectedCinemaCity.id === item.id ? "#a1d7ff" : "inherit"
                    }}>
                      <Typography className="city-list--title">{item.city}</Typography>
                    </Card>
                  </div>
                )
              }
            </div>
            <Typography className="session-info">{movie.name}, session in city {cinema._selectedCinemaCity.city}:</Typography>
            {Object.keys(cinema._selectedCinemaCity).length === 0
              ?
              <Typography className="prev-title">Choose your city from the list below</Typography> :
              cinemaInCity && cinemaInCity.map(item => (
                <div key={item.id} className="cinema-list--container">
                  <div className="list-item--container">
                    <div>
                      <Typography className="list-item--name">Cinema "{item.cinema.name}"</Typography>
                      <Typography className="list-item--address">{item.cinema.city}, {item.cinema.adress}</Typography>
                    </div>

                    <div className="buttons-container">
                      {date.map(({ date }, index) =>
                        <Button
                          key={index}
                          variant={selectedDate === date ? 'contained' : 'outlined'}
                          size={windowWidth < 900 ? 'small' : 'medium'}
                          onClick={() => {
                            movieStore.setSelectedDate(date)
                            setSelectedDate(date);
                          }}>
                          {date}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="buttons-container" style={{ marginTop: '10px' }}>
                    {time.map(({ time }, index) =>
                      <Button variant="outlined" key={index} onClick={() => {
                        handleOpen()
                        cinema.setModalCinema(item)
                        cinema.setSelectedCinema(item)
                        movieStore.setSelectedTime(time)
                      }}>
                        {time}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            }

            <div className="description-container">
              <Typography className="description-title ">Description</Typography>
              {info.map(({ id, title, description }) =>
                <div key={id} className="description-item--container" style={{
                  backgroundColor: id % 2 === 0 ? 'lightgray' : 'transparent'
                }}>
                  <Typography className="description-item">{title}</Typography>
                  <Typography className="description-item">{description}</Typography>
                </div>
              )}
            </div>

            <div style={{ padding: '20px' }}>
              <Typography className="film-description--title">{description && description[0] && description[0].title}</Typography>
              <Typography className="film-description">
                {description && description[0] && description[0].description}
              </Typography>
            </div>

            <Comments />
          </div>
        </div>
      ) : (
        <Skeleton variant="cirular" width={40} height={40} />
      )}
    </div >
  )
})
export default MovieItem