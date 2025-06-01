import Folder from '../model/Folder.js'
import FolderRepository from '../repositories/folder.repository.js'

export default class FolderService {
    constructor() {
        this.repository = new FolderRepository()
    }

    async create(folder, userId, deviceId) {
        return await this.repository.create(folder, userId, deviceId)
    }

    async find(id) {
        const folder = await this.repository.findById(id)
        return Folder.fromJson(folder)
    }

    async findAll(search) {
        const folderRaw = await this.repository.findAll(search)
        return folderRaw.map(folder => Folder.fromJson(folder))
    }
}