import UserService from "./user.service.js"

const tokens = {}

export default class AuthService {
    constructor() {
        this.userService = new UserService()
    }
    
    async login(email, password) {
        const user = await this.userService.findByEmail(email)
        if (user.password !== password) {
            throw new Error('Invalid password')
        }
        const token = this._generateToken(user)
        return { user, token}
    }

    async logout(token) {
        delete tokens[token]
    }

    _generateToken(user) {
        const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')
        tokens[token] = user.id
        return token
    }

    verifyToken(token) {
        return tokens[token] || null
    }
}