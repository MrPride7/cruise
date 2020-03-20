export class Store {
    constructor(initState) {
        this._state = initState;
        this.listeners = []
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    onStateChange() {
        this.listeners.forEach(listener => listener[this._state])
    }

    get state() {
        return this._state;
    }
}
