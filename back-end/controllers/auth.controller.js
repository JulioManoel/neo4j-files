import User from '../model/User.js'
import AuthService from '../services/auth.service.js'
import UserService from '../services/user.service.js'

export default class AuthController {
    constructor() {
        this.userService = new UserService()
        this.authService = new AuthService()
    }

    register = async (req, res) => {
        try {
            const user = User.fromJson(req.body.user)
            const userResponse = await this.service.create(user)
            return res.status(201).json(userResponse)
        } catch (error) {
            
        }
    }

    login = (req, res) => {}

    logout = (req, res) => {}
}