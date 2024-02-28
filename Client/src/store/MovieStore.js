import { makeAutoObservable } from "mobx"

export default class MovieStore {
  constructor() {
    this._movies = []
    this._genres = []
    this._selectedGenre = null
    this._selectedCinema = {}
    this._selectedTime = ""
    this._selectedDate = "09-02-2024"
    makeAutoObservable(this)
  }

  setSelectedDate(date) {
    this._selectedDate = date
  }

  get date() {
    return this._selectedDate
  }

  setSelectedTime(time) {
    this._selectedTime = time
  }

  get time() {
    return this._selectedTime
  }

  setMovies(movie) {
    this._movies = movie
  }

  get movie() {
    return this._movies
  }

  setGenres(genre) {
    this._genres = genre
  }

  get genre() {
    return this._genres
  }

  setSelectedGenre(genre) {
    this._selectedGenre = genre
  }

  get selectedGenre() {
    return this._selectedGenre
  }

  setSelectedCinema(cinema) {
    this._selectedCinema = cinema
  }

  get selectedCinema() {
    return this._selectedCinema
  }
}