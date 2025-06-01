import File from '../model/File.js'
import FileRepository from '../repositories/file.repository.js'

export default class FileService {
    constructor() {
        this.repository = new FileRepository()
    }

    async create(folder, userId, deviceId, folderId = null) {
        return await this.repository.create(folder, userId, deviceId, folderId)
    }

    async find(id) {
        const folder = await this.repository.findById(id)
        return File.fromJson(folder)
    }

    async findAll(search) {
        const folderRaw = await this.repository.findAll(search)
        return folderRaw.map(folder => File.fromJson(folder))
    }

    async registerDownload(fileId, userId, device) {
        return await this.repository.registerDownload(fileId, userId, device)
    }
}