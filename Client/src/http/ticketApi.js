import { $host } from "."

export const reserve = async (time, userId, cinemaId, hallId, seats, date) => {
  const { data } = $host.post('api/ticket', { time, userId, cinemaId, hallId, seats, date })
  return data
}