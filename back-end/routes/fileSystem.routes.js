import { Router } from 'express'
import { authenticate } from '../middleware/authenticate.js'
import FileSystemFileController from '../controllers/fileSystem.controller.js'

export const router = Router()
const controller = new FileSystemFileController()

router.get('/fileSystem', authenticate, controller.findAll)
