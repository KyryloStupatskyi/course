import { $host } from "."

export const getTimesToDate = async (id, date) => {
  try {
    const { data } = await $host.get('api/reserveMovie/timesToDate', { params: { id, date } })
    return data
  } catch (error) {
    alert(error)
  }
}