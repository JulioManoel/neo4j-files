import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

export const router = Router()
const controller = new AuthController()

router.post('/login', controller.login)
router.post('/logout', controller.logout)