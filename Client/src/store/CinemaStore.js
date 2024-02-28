import { makeAutoObservable } from "mobx"

export default class CinemaStore {
  constructor() {
    this._selectedCinemaCity = {}
    this._selectedCinema = {}
    this._modalCinema = {}
    this._selectedSeats = []
    makeAutoObservable(this)
  }

  setSelectedCinema(cinema) {
    this._selectedCinema = cinema
  }

  get selectedCinema() {
    return this._selectedCinema
  }

  setSelectedCinemaCity(cinema) {
    this._selectedCinemaCity = cinema
  }

  get selectedCinemaCity() {
    return this._selectedCinemaCity
  }

  setModalCinema(cinema) {
    this._modalCinema = cinema
  }

  get modalCinema() {
    return this._modalCinema
  }

  setSelectedSeats(seat) {
    this._selectedSeats.push(seat)
  }

  removeSelectedSeat(seat) {
    this._selectedSeats = this._selectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id);
  }

  clearSelectedSeats() {
    this._selectedSeats = [];
  }

  get selectedSeats() {
    return this._selectedSeats
  }
}