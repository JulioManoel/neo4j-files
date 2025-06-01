export default class Folder {
    constructor({id, name} = {}) {
        this.id = id || ''
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
