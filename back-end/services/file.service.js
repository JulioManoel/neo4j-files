import File from '../model/File.js'
import FileRepository from '../repositories/file.repository.js'

export default class FileService {
    constructor() {
        this.repository = new FileRepository()
    }

    async create(folder) {
        return await this.repository.create(folder)
    }

    async find(id) {
        const folder = await this.repository.findById(id)
        return File.fromJson(folder)
    }

    async findAll(search) {
        const folderRaw = await this.repository.findAll(search)
        return folderRaw.map(folder => File.fromJson(folder))
    }

    // async update(id, updates) {
    //     const device = await this.repository.updateById(id, updates)
    //     return Folder.fromJson(device)
    // }

    // async delete(id) {
    //     return await this.repository.deleteById(id)
    // }
}