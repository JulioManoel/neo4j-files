import User from '@/models/User'
import BaseController from './BaseController'

class UserController extends BaseController {
    path = '/users'

    async getAll(search) {
        if (search) {
            const users = await super.read(`${this.path}?search=${search}`, true)
            return users.map(user => User.fromJson(user))
        }
        const users = await super.read(this.path, true)
        return users.map(user => User.fromJson(user))
    }

    async create(user) {
        return await super.create(user.toJson(), this.path)
    }

    async update(user) {
        return await super.update(user.id, user.toJson(), this.path)
    }

    async delete(id) {
        return await super.delete(id, this.path)
    }
}

export default new UserController()
