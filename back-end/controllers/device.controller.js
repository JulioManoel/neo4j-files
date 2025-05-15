
import Device from '../model/Device.js'
import DeviceService from '../services/device.service.js'

export default class DeviceController {
    constructor() {
        this.service = new DeviceService()
    }

    create = async (req, res) => {
        try {
            const device = Device.fromJson(req.body)
            const deviceResponse = await this.service.create(device)
            return res.status(201).json(deviceResponse)
        } catch (error) {
            console.error('Erro ao criar dispositivo:', error)
            return res.status(500).json({ error: error.message })
        }
    }
    
    find = async (req, res) => {
        try {
            const { id } = req.params
            const device = await this.service.find(id)
            return res.status(200).json(device)
        } catch (error) {
            console.error('Erro ao buscar dispositivo:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    findAll = async (req, res) => {
        try {
            const devices = await this.service.findAll()
            return res.status(200).json(devices)
        } catch (error) {
            console.error('Erro ao buscar dispositivos:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params
            const deviceRaw = Device.fromJson({...req.body, id})
            const device = await this.service.update(id, deviceRaw)
            return res.status(200).json(device)
        } catch (error) {
            console.error('Erro ao atualizar dispositivo:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params
            const device = await this.service.delete(id)
            return res.status(200).json(device)
        } catch (error) {
            console.error('Erro ao deletar dispositivo:', error)
            return res.status(500).json({ error: error.message })
        }
    }
}