import { $host } from "."

export const getOneHall = async (hallId) => {
  try {
    const { data } = await $host.get("api/hall/getOne", { params: { hallId } })
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const getHall = async (movieId, time) => {
  try {
    const { data } = await $host.get("api/reserveMovie/hall", { params: { movieId, time } })
    return data
  } catch (error) {
    console.log(error)
  }
}
