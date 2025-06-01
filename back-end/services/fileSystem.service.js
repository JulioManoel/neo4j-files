import File from '../model/File.js'
import Folder from '../model/Folder.js'
import FileSystemRepository from '../repositories/fileSystem.repository.js'

export default class FileSystemService {
    constructor() {
        this.repository = new FileSystemRepository()
    }

    async findAll(search) {
        const explorer = await this.repository.findAll(search)
        explorer.files = explorer.files.map(file => new File(file))
        explorer.folders = explorer.folders.map(folder => new Folder(folder))
        return explorer
    }

    async linkToDevice(userId, deviceId) {
        await this.repository.linkToDevice(userId, deviceId)
    }
}