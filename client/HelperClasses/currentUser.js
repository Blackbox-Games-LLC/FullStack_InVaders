export default class CurrentUser {
    constructor() {
        this._id = 1,
            this._username = null
    }
    set id(value) {
        this._id = value
    }
    get id() {
        return this._id
    }
    set username(value) {
        this._username = value
    }
    get username() {
        return this._username
    }
}