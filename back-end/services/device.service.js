import Device from '../model/Device.js'
import DeviceRepository from '../repositories/device.repository.js'

export default class DeviceService {
    constructor() {
        this.repository = new DeviceRepository()
    }

    async create(device) {
        return await this.repository.create(device)
    }

    async createOrUpdateByIp(device) {
        const devices = await this.findAll({ search: device.ip })
        if (devices.length > 0) {
            return await this.update(devices[0].id, {...device, id: devices[0].id})
        } 
        else return await this.create(device)
    }

    async find(id) {
        const device = await this.repository.findById(id)
        return Device.fromJson(device)
    }

    async findAll(search) {
        const devicesRaw = await this.repository.findAll(search)
        return devicesRaw.map(device => Device.fromJson(device))
    }

    async update(id, updates) {
        const device = await this.repository.updateById(id, updates)
        return Device.fromJson(device)
    }

    async delete(id) {
        return await this.repository.deleteById(id)
    }
}