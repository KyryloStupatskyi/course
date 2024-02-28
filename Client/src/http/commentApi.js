import { $host } from "."

export const commentPost = async (comment, userId, movieId) => {
  const { data } = await $host.post("api/comments",
    { comment, userId, movieId })
  return data
}

export const getComment = async (movieId) => {
  const { data } = await $host.get("api/comments", { params: { movieId } })
  return data
}