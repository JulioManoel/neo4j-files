import Folder from '../model/Folder.js'
import FolderService from '../services/folder.service.js'
import UserService from '../services/user.service.js'

export default class FolderController {
    constructor() {
        this.service = new FolderService()
        this.userService = new UserService()
    }

    create = async (req, res) => {
        try {
            const folderRaw = Folder.fromJson(req.body)
            const devices = await this.userService.getConnectedDevice(req.userId)
            const folder = await this.service.create(folderRaw.toJson(), req.userId, devices[0].id)
            return res.status(201).json(folder)
        } catch (error) {
            console.error('Error in creating folder:', error)
            return res.status(500).json({ error: error.message })
        }
    }
    
    find = async (req, res) => {
        try {
            const { id } = req.params
            const folder = await this.service.find(id)
            return res.status(200).json(folder)
        } catch (error) {
            console.error('Error in finding folder:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    findAll = async (req, res) => {
        try {
            const folders = await this.service.findAll(req.query)
            return res.status(200).json(folders)
        } catch (error) {
            console.error('Error in finding all folders:', error)
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