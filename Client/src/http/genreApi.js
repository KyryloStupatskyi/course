import { $host } from "."

export const getGenres = async () => {
  const { data } = await $host.get('api/genre')
  return data
}