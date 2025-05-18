import AuthService from '../services/auth.service.js'

export default class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body.user
            const auth = await this.authService.login(email, password)
            return res.status(200).json(auth)
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    logout = (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            this.authService.logout(token)
            return res.status(200).json({ message: 'Logout realizado com sucesso!' })
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
            return res.status(500).json({ error: error.message })
        }
    }
}