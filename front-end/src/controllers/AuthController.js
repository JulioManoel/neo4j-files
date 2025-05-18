import User from '@/models/User'
import BaseController from './BaseController'

class AuthController extends BaseController {
    async login(email, password) {
        const url = '/login'
        const { user, token } = await this.create({ 
            user: { email, password }
        }, url)        
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        return user
    }

    async logout() {
        const url = `/logout`;
        await this.create(null, url)

        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
}

export default new AuthController()
