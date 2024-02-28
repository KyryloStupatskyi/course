import { $host } from "."

export const sentEmail = async (to, username, seats, time, date) => {
  try {
    const { data } = await $host.post('api/gmail', { to, username, seats, time, date })
    return data
  } catch (error) {
    console.log(error)
  }
}