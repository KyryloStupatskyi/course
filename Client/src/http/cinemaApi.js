import { $host } from "."

export const getAllCinemas = async () => {
  const { data } = await $host.get('api/cinema')
  return data
}

export const getAllCinemasInCity = async (city, movieId) => {
  const { data } = await $host.get('api/cinema', { params: { city, movieId } })
  return data
}