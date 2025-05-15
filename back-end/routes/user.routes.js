import { Router } from 'express'
import UserController from '../controllers/user.controller.js'

export const router = Router()
const controller = new UserController()

router.post('/users', controller.create)
router.get('/users/:id', controller.find)
router.get('/users', controller.findAll)
router.patch('/users/:id', controller.update)
router.delete('/users/:id', controller.delete)