import { v4 as uuidv4 } from 'uuid'

export default class User {
    constructor({id, name, email, password} = {}) {
        this.id = id || uuidv4()
        this.name = name
        this.email = email
        this.password = password
    }

    static fromJson(json) {
        return new User(json)
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
}