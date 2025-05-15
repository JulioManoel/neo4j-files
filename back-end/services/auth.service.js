const tokens = {}

export default class AuthService {
    _generateToken() {
        const token = Buffer.from(`${userId}:${Date.now()}`).toString('base64')
        tokens[token] = userId
        return token
    }

    _verifyToken(token) {
        return tokens[token] || null
    }
}