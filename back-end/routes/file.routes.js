import { Router } from 'express'
import { upload } from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js'
import FileController from '../controllers/file.controller.js'

export const router = Router()
const controller = new FileController()

router.post('/files', authenticate, upload.single('file'), controller.create)
router.get('/files/:id', authenticate, controller.find)
router.get('/files/:fileId/download', authenticate, controller.download)
// router.get('/folders', authenticate, controller.findAll)
// router.patch('/folders/:id', authenticate, controller.update)
// router.delete('/folders/:id', authenticate, controller.delete)