import User from '../../model/User.js'
import UserService from '../../services/user.service.js'

const createAdmin = async () => {
    const service = new UserService()
    await service.create(new User({
        name: 'admin',
        email: 'super@admin.com',
        password: '#Super123'
    }))
}

export default [
    createAdmin
]