export default class File {
    constructor({id, name,extension, path} = {}) {
        this.id = id || ''
        this.name = name || ''
        this.extension = extension || ''
        this.path = path || ''
    }

    static fromJson(json) {
        return new File(json)
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            extension: this.extension,
            path: this.path
        }
    }
}
