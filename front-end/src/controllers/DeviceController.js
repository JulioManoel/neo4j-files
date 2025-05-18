import Device from '@/models/Device'
import BaseController from './BaseController'

class DeviceController extends BaseController {
    path = '/devices'

    async getAll(search) {
        if (search) {
            const devices = await super.read(`${this.path}?search=${search}`, true)
            return devices.map(user => Device.fromJson(user))
        }
        const devices = await super.read(this.path, true)
        return devices.map(user => Device.fromJson(user))
    }
}

export default new DeviceController()
