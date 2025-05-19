import { Router } from 'express'
import FolderController from '../controllers/folder.controller.js'
import { authenticate } from '../middleware/authenticate.js'

export const router = Router()
const controller = new FolderController()

router.post('/folders', authenticate, controller.create)
router.get('/folders/:id', authenticate, controller.find)
// router.get('/folders', authenticate, controller.findAll)
// router.patch('/folders/:id', authenticate, controller.update)
// router.delete('/folders/:id', authenticate, controller.delete)