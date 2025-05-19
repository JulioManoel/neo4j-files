import Folder from '../model/Folder.js'
import FolderRepository from '../repositories/folder.repository.js'

export default class FolderService {
    constructor() {
        this.repository = new FolderRepository()
    }

    async create(folder) {
        return await this.repository.create(folder)
    }

    async find(id) {
        const folder = await this.repository.findById(id)
        return Folder.fromJson(folder)
    }

    async findAll(search) {
        const folderRaw = await this.repository.findAll(search)
        return folderRaw.map(folder => Folder.fromJson(folder))
    }

    // async update(id, updates) {
    //     const device = await this.repository.updateById(id, updates)
    //     return Folder.fromJson(device)
    // }

    // async delete(id) {
    //     return await this.repository.deleteById(id)
    // }
}