import AuthService from "../services/auth.service.js"

const service = new AuthService()

export function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    const userId = service.verifyToken(token)

    if (!userId) return res.status(401).json({ message: 'Invalid token' })
    next()
}