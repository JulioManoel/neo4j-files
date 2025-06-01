import Device from '../model/Device.js'
import AuthService from '../services/auth.service.js'
import DeviceService from '../services/device.service.js'
import UserService from '../services/user.service.js'

export default class AuthController {
    constructor() {
        this.authService = new AuthService()
        this.userService = new UserService()
        this.deviceService = new DeviceService()
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body.user
            const deviceRaw = Device.fromJson(req.body.device)
            
            const auth = await this.authService.login(email, password)
            const device = await this.deviceService.createOrUpdateByIp(deviceRaw.toJson())
            await this.userService.linkToDevice(auth.user.id, device.id)
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