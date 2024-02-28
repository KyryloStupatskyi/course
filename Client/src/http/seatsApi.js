import { $host } from "."

export const getSeats = async (cinemaId, hallId, time, date) => {
  const { data } = await $host.get("api/seat", { params: { cinemaId, hallId, time, date } })
  return data
}