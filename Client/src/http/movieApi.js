import { $host } from "."

export const getAllMovie = async () => {
  const { data } = await $host.get('api/movie')
  return data
}

export const getMoviesByGenre = async (genreId) => {
  const { data } = await $host.get('api/movie', { params: { genreId } });
  return data
}

export const getMovieById = async (id) => {
  const { data } = await $host.get(`api/movie/${id}`,)
  return data
}

export const getMovieTimes = async (id) => {
  const { data } = await $host.get(`api/movie/times/${id}`,)
  return data
}

