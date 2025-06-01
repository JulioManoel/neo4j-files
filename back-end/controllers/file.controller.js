import File from '../model/File.js'
import FileService from '../services/file.service.js'
import UserService from '../services/user.service.js'

export default class FileController {
    constructor() {
        this.service = new FileService()
        this.userService = new UserService()
    }

    create = async (req, res) => {
        try {
            const folderId = req.body.folderId
            const {originalname, mimetype, path} = req.file
            const fileRaw = File.fromJson({name: originalname, extension: mimetype, path})

            const devices = await this.userService.getConnectedDevice(req.userId)
            const file = await this.service.create(fileRaw.toJson(), req.userId, devices[0].id, folderId)
            return res.status(201).json(file)
        } catch (error) {
            console.error('Error in creating file:', error)
            return res.status(500).json({ error: error.message })
        }
    }
    
    find = async (req, res) => {
        try {
            const { id } = req.params
            const file = await this.service.find(id)
            return res.status(200).json(file)
        } catch (error) {
            console.error('Error in finding file:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    findAll = async (req, res) => {
        try {
            const files = await this.service.findAll(req.query)
            return res.status(200).json(files)
        } catch (error) {
            console.error('Error in finding all files:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    download = async (req, res) => {
        try {
            const { fileId } = req.params
            const file = await this.service.find(fileId)
            if (!file) return res.status(404).json({ error: 'File not found' })

            const devices = await this.userService.getConnectedDevice(req.userId)
            await this.service.registerDownload(fileId, req.userId, devices[0].id)

            res.download(file.path, file.name)
        } catch (error) {
            console.error('Error in downloading file:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    
}