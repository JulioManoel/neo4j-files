import File from '../model/File.js'
import FileService from '../services/file.service.js'

export default class FileController {
    constructor() {
        this.service = new FileService()
    }

    create = async (req, res) => {
        try {
            const {originalname, mimetype, path} = req.file
            const fileRaw = File.fromJson({originalname, mimetype, path})
            const file = await this.service.create(fileRaw.toJson())
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

    // update = async (req, res) => {
    //     try {
    //         const { id } = req.params
    //         const deviceRaw = Device.fromJson({...req.body, id})
    //         const device = await this.service.update(id, deviceRaw)
    //         return res.status(200).json(device)
    //     } catch (error) {
    //         console.error('Erro ao atualizar dispositivo:', error)
    //         return res.status(500).json({ error: error.message })
    //     }
    // }

    // delete = async (req, res) => {
    //     try {
    //         const { id } = req.params
    //         const device = await this.service.delete(id)
    //         return res.status(200).json(device)
    //     } catch (error) {
    //         console.error('Erro ao deletar dispositivo:', error)
    //         return res.status(500).json({ error: error.message })
    //     }
    // }
}