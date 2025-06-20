import { v4 as uuidv4 } from 'uuid'

export default class Device {
    constructor({id, ip, language, platform, brower, date} = {}) {
        this.id = id || uuidv4()
        this.ip = ip || ''
        this.language = language || ''
        this.platform = platform || ''
        this.brower = brower || ''
        this.date = date ? new Date(date) : new Date()
    }

    static fromJson(json) {
        return new Device(json)
    }

    toJson() {
        return {
            id: this.id,
            ip: this.ip,
            language: this.language,
            platform: this.platform,
            brower: this.brower,
            date: this.date.toISOString()
        }
    }
}