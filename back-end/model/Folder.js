import { v4 as uuidv4 } from 'uuid'

export default class Folder {
    constructor({id, name} = {}) {
        this.id = id || uuidv4()
        this.name = name || ''
    }

    static fromJson(json) {
        return new Folder(json)
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
        }
    }
}