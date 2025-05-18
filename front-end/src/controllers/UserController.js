import User from '@/models/User'
import BaseController from './BaseController'

class UserController extends BaseController {
    path = '/users'

    async getAll() {
        const users = await super.read(this.path, true)
        return users.map(user => User.fromJson(user))
    }

    async create(user) {
        return await super.create(user.toJson(), this.path)
    }

    async delete(id) {
        return await super.delete(id, this.path)
    }

//    async editUser(id, element) {
//        const user = new User(element)
//        return await super.update(id, user.toJson(), path)
//   }

//     async deactivateUser(id) {
//         return await super.delete(id, path);
//     }

//     async restore(id) {
//         const url = `${path}/${id}/restore`;
//         return await super.create(null, url);
//     }

//     async passwordUser(userId, editedUser) {
//         return await super.update(userId, editedUser, path +'/password')
//   }
}

export default new UserController()
