import { useContext, useEffect } from "react"
import { Context } from ".."
import { getAllMovie, getMoviesByGenre } from "../http/movieApi"
import { Card, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import { getGenres } from "../http/genreApi"
import { useNavigate } from "react-router-dom"
import { MOVIE_ROUTE } from "../utils/consts"
import "../styles/css/KinoPage.css"
import "../styles/media/KinoPage.css"

const Kino = observer(() => {
  const { movie } = useContext(Context)
  const { cinema } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    getAllMovie().then(data => movie.setMovies(data))
    getGenres().then(data => movie.setGenres(data))
  }, [movie])

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const movies = await getMoviesByGenre(genreId);
      movie.setMovies(movies);
    } catch (err) {
      alert(err.response.data.message)
    }
  };

  const sortByGenre = (id) => {
    fetchMoviesByGenre(id)
    movie.setSelectedGenre(id);
  }

  const resetSorting = () => {
    getAllMovie().then(data => movie.setMovies(data));
    movie.setSelectedGenre(null)
  }

  return (
    <>
      <div className="genreContainer">
        <div style={{ cursor: "pointer" }}>
          <Card className="genreCard" onClick={resetSorting} sx={{
            backgroundColor: movie._selectedGenre === null ? "#a1d7ff" : "inherit"
          }}>
            <Typography>All Genres</Typography>
          </Card>
        </div>
        {movie._genres.map(genre =>
          <div key={genre.id} style={{ cursor: "pointer" }}>
            <Card className="genreCard" onClick={() => sortByGenre(genre.id)} sx={{
              backgroundColor: movie._selectedGenre === genre.id ? "#a1d7ff" : "inherit"
            }}>
              <Typography>{genre.name}</Typography>
            </Card>
          </div>
        )}
      </div>

      <div className="moviesItemsContainer">
        {movie._movies.map(({ id, name, img }) => (
          <div key={id} className="movieItem" onClick={() => {
            navigate(MOVIE_ROUTE + '/' + id);
            cinema.setSelectedCinemaCity({})
          }}>
            <img src={process.env.REACT_APP_API_URL + img} alt="loading" />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{name}</Typography>
          </div>
        ))}
      </div>
    </>
  )
})
export default Kino