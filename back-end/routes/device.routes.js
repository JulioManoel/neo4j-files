import { Router } from 'express'
import DeviceController from '../controllers/device.controller.js'

export const router = Router()
const controller = new DeviceController()

router.post('/devices', controller.create)
router.get('/devices/:id', controller.find)
router.get('/devices', controller.findAll)
router.patch('/devices/:id', controller.update)
router.delete('/devices/:id', controller.delete)