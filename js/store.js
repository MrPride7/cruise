export class Store {
  _state = {};

  constructor(initState) {
    this._state = initState;
  }

  get state() {
    return this._state
  }

  set state(newState) {
    this._state = newState;
  }
}

