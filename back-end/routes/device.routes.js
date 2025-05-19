import { Router } from 'express'
import DeviceController from '../controllers/device.controller.js'
import { authenticate } from '../middleware/authenticate.js'

export const router = Router()
const controller = new DeviceController()

router.post('/devices', authenticate, controller.create)
router.get('/devices/:id', authenticate, controller.find)
router.get('/devices', authenticate, controller.findAll)
router.patch('/devices/:id', authenticate, controller.update)
router.delete('/devices/:id', authenticate, controller.delete)