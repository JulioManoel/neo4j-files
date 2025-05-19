import FileService from '../services/file.service.js'

export default class FileSystemController {
    constructor() {
        this.service = new FileService()
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
}