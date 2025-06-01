import File from '@/models/File'
import Folder from '@/models/Folder'
import BaseController from './BaseController'

class DeviceController extends BaseController {
    path = '/fileSystem'

    async getAll(search) {
        let explorer
        if (search) {
            explorer = await super.read(`${this.path}?search=${search}`, true)
        } else {
            explorer = await super.read(this.path, true)
        }

        explorer.files = explorer.files.map(file => File.fromJson(file))
        explorer.folders = explorer.folders.map(folder => Folder.fromJson(folder))
        return explorer
    }

    async createFolder(folder) {
        return await super.request('post', '/folders', folder)
    }

    async createFile(file, folderId) {
        const formData = new FormData()
        formData.append('file', file)
        if (folderId) formData.append('folderId', folderId)
            
        return await super.request('post', '/files', formData)
    }

    async downloadFile(fileId) {
        return await super.request('get', `/files/${fileId}/download`, null)
    }
}

export default new DeviceController()
