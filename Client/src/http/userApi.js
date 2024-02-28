import { $host } from "."

export const registration = async (email, password, username) => {
  const { data } = await $host.post('api/user/registration', { email, password, username })
  return data
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password })
  return data
}