import { $host } from "."

export const addCinema = async (name, adress, capacity, city) => {
  try {
    const { data } = await $host.post('api/cinema', { name, adress, capacity, city })
    return data
  } catch (error) {
    alert(error)
  }
}

export const addHall = async (hallName, capacity, cinemaId) => {
  try {
    const { data } = await $host.post("api/hall", { hallName, capacity, cinemaId })
    return data
  } catch (error) {
    alert(error)
  }
}

export const addGenre = async (name) => {
  try {
    const { data } = await $host.post('api/genre', { name })
    return data
  } catch (error) {
    return alert(error)
  }
}

export const registerAdmin = async (email, password, username, role) => {
  try {
    const { data } = await $host.post('api/user/registration', { email, password, username, role })
    return data
  } catch (error) {
    alert(error)
  }
}

export const getAllHallByCinemaId = async (cinemaId) => {
  try {
    const { data } = await $host.get("api/hall", { params: { cinemaId } })
    return data
  } catch (error) {
    alert(error)
  }
}
export const createMovie = async (movie) => {
  try {
    const { data } = $host.post('api/movie', movie)
    return data
  } catch (error) {
    alert(error)
  }
}

export const getAllMovieInfo = async (movieId) => {
  try {
    const { data } = await $host.get('/api/movieInfos', { params: { movieId } })
    return data
  } catch (error) {
    alert(error)
  }
}

export const getAllReservations = async (hallId) => {
  try {
    const { data } = await $host.get('/api/reserveMovie/freeTime', { params: { hallId } })
    return data
  } catch (error) {
    alert(error)
  }
}

export const createReservation = async (time, movieId, hallId, cinemaId, date) => {
  try {
    const { data } = await $host.post('/api/reserveMovie', { time, movieId, hallId, cinemaId, date })
    return data
  } catch (error) {
    alert(error)
  }
}