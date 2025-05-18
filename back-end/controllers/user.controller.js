import User from '../model/User.js'
import UserService from '../services/user.service.js'

export default class UserController {
    constructor() {
        this.service = new UserService()
    }

    create = async (req, res) => {
        try {
            const user = User.fromJson(req.body)
            const userResponse = await this.service.create(user)
            return res.status(201).json(userResponse)
        } catch (error) {
            console.error('Erro ao criar usuário:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    find = async (req, res) => {
        try {
            const { id } = req.params
            const user = await this.service.find(id)
            return res.status(200).json(user)
        } catch (error) {
            console.error('Erro ao buscar usuário:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    findAll = async (req, res) => {
        try {
            const users = await this.service.findAll(req.query)
            return res.status(200).json(users)
        } catch (error) {
            console.error('Erro ao buscar usuários:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params
            const userRaw = User.fromJson({...req.body, id})
            const user = await this.service.update(id, userRaw)
            return res.status(200).json(user)
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error)
            return res.status(500).json({ error: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params
            const response = await this.service.delete(id)
            return res.status(200).json(response)
        } catch (error) {
            console.error('Erro ao deletar usuário:', error)
            return res.status(500).json({ error: error.message })
        }
    }
}