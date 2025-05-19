import User from '../model/User.js'
import UserRepository from '../repositories/user.repository.js'

export default class UserService {
    constructor() {
        this.repository = new UserRepository()
    }

    async create(user) {
        return await this.repository.create(user)
    }

    async find(id) {
        const user = await this.repository.findById(id)
        return User.fromJson(user)
    }

    async findByEmail(email) {
        const user = await this.repository.findByEmail(email)
        return User.fromJson(user)
    }

    async findAll(search) {
        const usersRaw = await this.repository.findAll(search)
        return usersRaw.map(user => User.fromJson(user))
    }

    async update(id, updates) {
        const user = await this.repository.updateById(id, updates)
        return User.fromJson(user)
    }
    
    async delete(id) {
        return await this.repository.deleteById(id)
    }

    async linkToDevice(userId, deviceId) {
        await this.repository.linkToDevice(userId, deviceId)
    }
}