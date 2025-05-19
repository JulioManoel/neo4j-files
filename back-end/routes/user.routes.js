import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import { authenticate } from '../middleware/authenticate.js'

export const router = Router()
const controller = new UserController()

router.post('/users', authenticate, controller.create)
router.get('/users/:id', authenticate, controller.find)
router.get('/users', authenticate, controller.findAll)
router.patch('/users/:id', authenticate, controller.update)
router.delete('/users/:id', authenticate, controller.delete)