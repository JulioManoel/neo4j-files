import AuthService from "../services/auth.service.js"

const authService = new AuthService()

export function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    const userId = authService.verifyToken(token)

    // if (!userId) return res.status(401).json({ message: 'Invalid token' })
    req.userId = userId
    next()
}