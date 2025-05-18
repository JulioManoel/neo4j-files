import UserService from '../../services/user.service.js'

const createAdmin = async () => {
    new UserService().create(new User({
        name: 'admin',
        email: 'super@admin.com',
        password: '#Super123'
    }))
}

export default [
    createAdmin
]