import axios from 'axios'
import BaseController from './BaseController'

class AuthController extends BaseController {
    async login(email, password) {
        const url = '/login'
        const ip = await this.getIp()

        const { user, token } = await this.create({ 
            user: { email, password },
            device: { 
                ip: ip,
                language: navigator.language,
                brower: navigator.userAgent,
                platform: navigator.platform,
                date: new Date()
            }
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
    
    getIp() {
        return new Promise((resolve) => {
            function response(s) {
                resolve(window.userip)
                s.onload = s.onerror = null
                document.body.removeChild(s)
            }
    
            function trigger() {
                window.userip = false
                const s = document.createElement("script")
                s.async = true
                s.onload = () => response(s)
                s.onerror = () => response(s)
                s.src = "https://l2.io/ip.js?var=userip"
                document.body.appendChild(s)
            }
    
            if (/^(interactive|complete)$/i.test(document.readyState)) {
                trigger()
            } else {
                document.addEventListener('DOMContentLoaded', trigger)
            }
        })
    }
}

export default new AuthController()
