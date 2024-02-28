import { makeAutoObservable } from "mobx";

export default class AdminStore {
  constructor() {
    this._selectAdminAbility = {}
    makeAutoObservable(this)
  }

  setSelectAdminAbility(item) {
    this._selectAdminAbility = item
  }

  get selectedAdminAbility() {
    return this._selectAdminAbility
  }
} 