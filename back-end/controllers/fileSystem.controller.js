import FileSystemService from '../services/fileSystem.service.js'

export default class FileSystemController {
    constructor() {
        this.service = new FileSystemService()
    }

    findAll = async (req, res) => {
        try {
            const explorer = await this.service.findAll(req.query)
            return res.status(200).json(explorer)
        } catch (error) {
            console.error('Error in finding all files:', error)
            return res.status(500).json({ error: error.message })
        }
    }
}